import { Linkedin, Mail } from 'lucide-react';
import Logo from './Logo';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer role="contentinfo" className="bg-softWhite text-ink border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="mb-6">
              <Logo variant="stacked" color="dark" className="h-20 w-auto" />
            </div>
            <p className="text-base text-slate mb-4 font-medium">
              The currency of the future
            </p>
            <p className="text-base text-slate">
              Building AI fluency and social wealth for lasting career impact.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Navigation</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3 text-base">
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
            <h3 className="text-lg font-semibold mb-6">Connect</h3>
            <div className="space-y-4">
              <a
                href="mailto:info@careercapital.io"
                className="flex items-center gap-2 text-base text-slate hover:text-navy transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@careercapital.io
              </a>
              <a
                href="https://www.linkedin.com/in/nisainirexach/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-slate hover:text-navy transition-colors"
              >
                <Linkedin className="w-5 h-5" strokeWidth={0} fill="currentColor" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex justify-center">
          <p className="text-base text-slate">
            &copy; 2026 Career Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
