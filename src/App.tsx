import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import SkipLink from './components/SkipLink';
import Home from './pages/Home';
import Services from './pages/Services';
import Speaking from './pages/Speaking';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { initializeProgressiveEnhancement } from './utils/progressiveEnhancement';
import { detectKeyboardNavigation } from './utils/accessibility';
import { supabase } from './lib/supabase';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    initializeProgressiveEnhancement();
    detectKeyboardNavigation();

    const checkPath = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentPage('admin');
      }
    };

    checkPath();

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setAuthChecked(true);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    }) as any);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const renderPage = () => {
    if (currentPage === 'admin') {
      if (!authChecked) {
        return (
          <div className="bg-softWhite min-h-screen flex items-center justify-center">
            <p className="text-slate">Loading...</p>
          </div>
        );
      }

      if (!isAuthenticated) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
      }

      return <Admin />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'services':
        return <Services onNavigate={setCurrentPage} />;
      case 'speaking':
        return <Speaking onNavigate={setCurrentPage} />;
      case 'about':
        return <About onNavigate={setCurrentPage} />;
      case 'testimonials':
        return <Testimonials onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-softWhite">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-softWhite">
      <SkipLink />
      <header role="banner">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      </header>
      <main role="main" id="main-content" className="pt-20">
        {renderPage()}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
