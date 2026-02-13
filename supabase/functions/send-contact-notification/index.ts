import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  organization: string;
  inquiry_type: string;
  message: string;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@careercapital.net";
    const siteUrl = Deno.env.get("SITE_URL") || "https://careercapital.net";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const submission: ContactSubmission = await req.json();

    const inquiryTypeLabels: Record<string, string> = {
      consulting: "Consulting",
      speaking: "Speaking Engagement",
      workshop: "Workshop Facilitation",
      other: "Other",
    };

    const inquiryLabel = inquiryTypeLabels[submission.inquiry_type] || "Other";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a365d; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f8f9fa; padding: 30px; border: 1px solid #e0e0e0; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #1a365d; margin-bottom: 5px; }
            .value { padding: 10px; background-color: white; border-left: 3px solid #1a365d; }
            .message-box { padding: 15px; background-color: white; border: 1px solid #e0e0e0; white-space: pre-wrap; }
            .button { display: inline-block; padding: 12px 24px; background-color: #1a365d; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .reply-info { background-color: #e3f2fd; padding: 15px; border-radius: 4px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value">${submission.name}</div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${submission.email}">${submission.email}</a></div>
              </div>

              ${submission.organization ? `
              <div class="field">
                <div class="label">Organization:</div>
                <div class="value">${submission.organization}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">Inquiry Type:</div>
                <div class="value">${inquiryLabel}</div>
              </div>

              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${submission.message}</div>
              </div>

              <div class="reply-info">
                <strong>💡 Quick Reply:</strong> Simply reply to this email to respond directly to ${submission.name} at ${submission.email}
              </div>

              <div style="text-align: center;">
                <a href="${siteUrl}/admin" class="button">View in Admin Dashboard</a>
              </div>

              <div class="footer">
                <p>Submitted on ${new Date(submission.created_at).toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Contact Form Submission

From: ${submission.name}
Email: ${submission.email}
${submission.organization ? `Organization: ${submission.organization}\n` : ''}
Inquiry Type: ${inquiryLabel}

Message:
${submission.message}

---
Reply directly to this email to respond to ${submission.email}
Or view in admin dashboard: ${siteUrl}/admin

Submitted: ${new Date(submission.created_at).toLocaleString()}
    `.trim();

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Career Capital <notifications@careercapital.net>",
        to: [adminEmail],
        reply_to: submission.email,
        subject: `New ${inquiryLabel} Inquiry from ${submission.name}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${emailResponse.status}`);
    }

    const result = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, emailId: result.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send notification",
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
