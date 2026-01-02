import { Mail, MessageSquare, Calendar, Rocket, ArrowRight } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface ContactProps {
  onNavigate: (page: Page) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('Contact component loaded');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    console.log('Form submission started', formData);

    try {
      const { data, error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          inquiry_type: formData.inquiryType,
          message: formData.message,
          status: 'new',
        }])
        .select();

      console.log('Database response:', { data, error: dbError });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Failed to save your submission: ${dbError.message}`);
      }

      console.log('Database insert successful, sending email notification...');

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-form-handler`;

      try {
        const emailResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log('Email notification response:', emailResponse.status);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      console.log('Form submission completed successfully');
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        organization: '',
        inquiryType: '',
        message: '',
      });

      const statusElement = document.getElementById('form-status');
      if (statusElement) {
        statusElement.focus();
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setFormData({
      name: '',
      email: '',
      organization: '',
      inquiryType: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-softWhite">
      <section
        aria-labelledby="contact-heading"
        className="relative overflow-hidden bg-navy"
      >
        <picture className="absolute inset-0">
          <source
            media="(min-width: 1024px)"
            srcSet="/sitehero_desktop.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 640px)"
            srcSet="/sitehero_tablet.webp"
            type="image/webp"
          />
          <source
            srcSet="/sitehero_mobile.webp"
            type="image/webp"
          />
          <img
            src="/sitehero_fallback.jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </picture>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <h1 id="contact-heading" className="text-5xl md:text-6xl font-light text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Contact
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            Let's build your career capital
          </p>
        </div>
      </section>

      <section aria-label="Contact form and information" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 id="form-heading" className="text-2xl font-light text-ink mb-8">Get in Touch</h2>

            {submitted ? (
              <div
                id="form-status"
                className="bg-surface p-8 border border-border"
                role="status"
                aria-live="polite"
                tabIndex={-1}
              >
                <h3 className="text-xl font-medium text-ink mb-4">
                  Thank you for reaching out!
                </h3>
                <p className="text-slate leading-relaxed mb-6">
                  We'll review your message and get back to you within 1-2 business days
                  to discuss next steps.
                </p>
                <button
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="form-heading" noValidate>
                {error && (
                  <div className="bg-red-50 border border-red-200 p-4 text-red-800" role="alert">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-ink mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base font-medium text-ink mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-base font-medium text-ink mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    autoComplete="organization"
                    className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-base font-medium text-ink mb-2">
                    I'm interested in... *
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                    aria-required="true"
                  >
                    <option value="">Select one</option>
                    <option value="consulting">Consulting & Advisory Services</option>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="workshop">Workshop or Facilitation</option>
                    <option value="other">Other / Just exploring</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-base font-medium text-ink mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors resize-none"
                    placeholder="Tell me about your organization and what you're looking for..."
                    aria-required="true"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={(e) => console.log('Button clicked', e)}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div>
            <h2 id="expectations-heading" className="text-2xl font-light text-ink mb-8">What to Expect</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-medium text-ink mb-2">Response Time</h3>
                  <p className="text-slate leading-relaxed">
                    We respond to all inquiries within 1-2 business days.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-medium text-ink mb-2">Discovery Conversation</h3>
                  <p className="text-slate leading-relaxed">
                    We'll schedule a call to discuss your needs, challenges, and goals in detail.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-medium text-ink mb-2">Tailored Proposal</h3>
                  <p className="text-slate leading-relaxed">
                    We'll create a customized approach based on your organization's context.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Rocket className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-medium text-ink mb-2">Project Launch</h3>
                  <p className="text-slate leading-relaxed">
                    Lock in scope, align on expectations, and get to work.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface p-8 border border-border mt-12">
              <h3 className="text-lg font-medium text-ink mb-4">
                Just exploring?
              </h3>
              <p className="text-slate leading-relaxed">
                No pressure, no formal pitch required. Reach out with questions, share what's on your mind, or simply start a conversation. Sometimes the best partnerships begin with a casual exchange—come as you are.
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section aria-labelledby="services-cta-heading" className="bg-navy text-trueWhite py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="services-cta-heading" className="text-3xl md:text-4xl font-light mb-6">
              Not sure where to start?
            </h2>
            <p className="text-xl text-trueWhite/90 mb-8 leading-relaxed">
              Browse the full range of services—from strategic advisory and AI enablement to speaking engagements and workshops. Understanding what's possible can help frame our conversation.
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigate('services');
              }}
              className="btn-primary-on-dark"
            >
              View Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
