import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { useState } from 'react';

function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Auth check error:', error);
        }
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        console.log('Auth state changed:', event, session);
        setIsAuthenticated(!!session);
      })();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!authChecked) {
    return (
      <div className="bg-softWhite min-h-screen flex items-center justify-center">
        <p className="text-slate">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <Admin />;
}

function Layout() {
  return (
    <div className="min-h-screen bg-softWhite">
      <SkipLink />
      <header role="banner">
        <Navigation />
      </header>
      <main role="main" id="main-content" className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    initializeProgressiveEnhancement();
    detectKeyboardNavigation();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (location.pathname === '/admin') {
    return (
      <div className="min-h-screen bg-softWhite">
        <AdminRoute />
      </div>
    );
  }

  return <Layout />;
}

export default App;
