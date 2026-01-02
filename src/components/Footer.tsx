import { Linkedin, Mail } from 'lucide-react';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer role="contentinfo" className="bg-softWhite text-ink border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <p className="text-lg font-light mb-2">Career Capital</p>
            <p className="text-sm text-slate mb-4">
              The currency of the future
            </p>
            <p className="text-sm text-slate">
              Building AI fluency and social wealth for lasting career impact.
            </p>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Navigation</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onNavigate?.('home');
                    }}
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onNavigate?.('about');
                    }}
                    className="text-slate hover:text-navy transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onNavigate?.('services');
                    }}
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onNavigate?.('speaking');
                    }}
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Speaking & Workshops
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onNavigate?.('testimonials');
                    }}
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onNavigate?.('contact');
                    }}
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-base font-medium mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@careercapital.io"
                className="flex items-center gap-2 text-sm text-slate hover:text-navy transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@careercapital.io
              </a>
              <a
                href="https://www.linkedin.com/in/nisainirexach/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate hover:text-navy transition-colors"
              >
                <Linkedin className="w-4 h-4" fill="currentColor" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-slate text-center">
            &copy; 2026 Career Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
