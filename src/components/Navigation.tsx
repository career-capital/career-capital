import { useState, useEffect, useRef } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import Logo from './Logo';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const focusTrapRef = useFocusTrap(mobileMenuOpen);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  const links = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'services' as Page, label: 'Services' },
    { id: 'speaking' as Page, label: 'Speaking' },
    { id: 'about' as Page, label: 'About' },
    { id: 'testimonials' as Page, label: 'Testimonials' },
    { id: 'contact' as Page, label: 'Contact' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-ink/10 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav
        className={`bg-softWhite border-b border-border fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center h-12"
              aria-label="Career Capital home"
            >
              <Logo variant="horizontal" color="dark" className="h-full w-auto" />
            </button>

            <div className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium tracking-wide transition-all relative pb-1 ${
                    currentPage === link.id
                      ? 'text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-steel'
                      : 'text-slate hover:text-steel after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-steel after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200'
                  }`}
                  aria-current={currentPage === link.id ? 'page' : undefined}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              className={`md:hidden relative w-10 h-10 ${
                mobileMenuOpen ? 'hamburger-open' : ''
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-line hamburger-line-1"></span>
              <span className="hamburger-line hamburger-line-2"></span>
              <span className="hamburger-line hamburger-line-3"></span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            ref={focusTrapRef}
            className="md:hidden mobile-menu-enter bg-softWhite border-b border-border shadow-lg"
          >
            <div className="px-6 py-8 space-y-1">
              {links.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left text-lg font-medium py-4 px-5 transition-all duration-200 menu-item-${index + 1} ${
                    currentPage === link.id
                      ? 'text-ink border-l-4 border-steel bg-steel/10'
                      : 'text-slate border-l-4 border-transparent hover:bg-steel/20 hover:text-steel active:bg-steel/25'
                  }`}
                  aria-current={currentPage === link.id ? 'page' : undefined}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
