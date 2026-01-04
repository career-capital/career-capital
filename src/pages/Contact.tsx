import { Mail, MessageSquare, Calendar, Rocket, ArrowRight, ExternalLink } from 'lucide-react';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface ContactProps {
  onNavigate: (page: Page) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  return (
    <div className="bg-softWhite">
      <section
        aria-labelledby="contact-heading"
        className="relative overflow-hidden bg-navy"
      >
        <div className="absolute inset-0">
          <img
            src="/banner_contact_desktop.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <h1 id="contact-heading" className="text-5xl md:text-6xl font-light text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Contact
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            Let's build your career capital.
          </p>
        </div>
      </section>

      <section aria-label="Contact information" className="md:py-16">
        <div className="bg-navy md:bg-transparent py-16 md:py-0 md:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-trueWhite mb-6">Ready to start a conversation?</h2>
            <div className="bg-surface border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-navy flex-shrink-0" />
                <h3 className="text-xl text-ink">Send us an email</h3>
              </div>
              <p className="text-slate leading-relaxed mb-6">
                Whether you're exploring possibilities or ready to move forward, reach out directly and we'll respond within 1-2 business days.
              </p>
              <a
                href="mailto:info@careercapital.io"
                className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-trueWhite font-medium hover:bg-steel hover:text-trueWhite transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 group no-underline w-full sm:w-auto justify-center"
                aria-label="Send email to info@careercapital.io (opens in email client)"
              >
                <span>info@careercapital.io</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="py-16 md:py-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-2 md:gap-16">
              <div className="hidden md:block">
                <h2 className="text-2xl font-semibold text-ink mb-6">Ready to start a conversation?</h2>
                <div className="bg-surface border border-border p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="w-6 h-6 text-navy flex-shrink-0" />
                    <h3 className="text-xl text-ink">Send us an email</h3>
                  </div>
                  <p className="text-slate leading-relaxed mb-6">
                    Whether you're exploring possibilities or ready to move forward, reach out directly and we'll respond within 1-2 business days.
                  </p>
                  <a
                    href="mailto:info@careercapital.io"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-trueWhite font-medium hover:bg-steel hover:text-trueWhite transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 group no-underline"
                    aria-label="Send email to info@careercapital.io (opens in email client)"
                  >
                    <span>info@careercapital.io</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-ink mb-8">What to expect</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h3 className="text-lg text-ink mb-2">Response Time</h3>
                      <p className="text-slate leading-relaxed">
                        We respond to all inquiries within 1-2 business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MessageSquare className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h3 className="text-lg text-ink mb-2">Discovery Conversation</h3>
                      <p className="text-slate leading-relaxed">
                        We'll schedule a call to discuss your needs, challenges, and goals in detail.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Calendar className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h3 className="text-lg text-ink mb-2">Tailored Proposal</h3>
                      <p className="text-slate leading-relaxed">
                        We'll create a customized approach based on your organization's context.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Rocket className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h3 className="text-lg text-ink mb-2">Project Launch</h3>
                      <p className="text-slate leading-relaxed">
                        It's time to lock in the scope, align on expectations, and get to work.
                      </p>
                    </div>
                  </div>
                </div>
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
              className="btn-primary-on-dark w-full sm:w-auto"
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
