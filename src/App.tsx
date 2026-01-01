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
import { initializeProgressiveEnhancement } from './utils/progressiveEnhancement';
import { detectKeyboardNavigation } from './utils/accessibility';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    initializeProgressiveEnhancement();
    detectKeyboardNavigation();
  }, []);

  const renderPage = () => {
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
        return <Contact />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

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
