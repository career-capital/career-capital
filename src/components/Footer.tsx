import { Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-softWhite text-ink border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="mb-6">
              <Logo variant="stacked" color="dark" className="h-20 w-auto" />
            </div>
            <p className="text-base text-slate font-medium">
              Career Capital for the AI Era - helping individuals and teams build the capital that matters most in the future of work.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Navigation</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3 text-base">
                <li>
                  <Link
                    to="/"
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/speaking"
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Speaking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-slate hover:text-navy transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/testimonials"
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-slate hover:text-navy transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Connect</h3>
            <div className="space-y-4">
              <a
                href="mailto:info@careercapital.io"
                className="flex items-center gap-2 text-base text-slate hover:text-navy transition-colors"
                aria-label="Send email to info@careercapital.io (opens in your email application)"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                info@careercapital.io
              </a>
              <a
                href="https://www.linkedin.com/in/nisainirexach/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-slate hover:text-navy transition-colors"
                aria-label="Connect on LinkedIn (opens in new window)"
              >
                <Linkedin className="w-5 h-5" strokeWidth={0} fill="currentColor" aria-hidden="true" />
                LinkedIn
                <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
                <span className="sr-only"> (opens in new window)</span>
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
