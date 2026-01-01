import { useState, useEffect } from 'react';
import { ArrowRight, Users, Sparkles, TrendingUp, ExternalLink } from 'lucide-react';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { supabase, Testimonial } from '../lib/supabase';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .eq('featured', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching testimonials:', error);
      } else {
        setTestimonials(data || []);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="bg-softWhite">
      <section aria-label="Introduction and main message" className="relative overflow-hidden bg-navy min-h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/career_capital_hero_image.png)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-light text-trueWhite mb-6 leading-tight drop-shadow-lg">
              AI fluency + strong relationships are the new career capital
            </h1>
            <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
              Strategic guidance for organizations ready to build AI readiness without losing
              the human side of work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  onNavigate('services');
                }}
                className="btn-primary-on-dark"
              >
                Explore Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  onNavigate('contact');
                }}
                className="btn-secondary-on-dark"
              >
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="capabilities-heading" className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="capabilities-heading" className="sr-only">Core Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <Sparkles className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">AI Fluency</h3>
              <p className="text-slate leading-relaxed">
                Build organizational confidence and capability around AI through strategic
                guidance and practical enablement.
              </p>
            </div>

            <div className="space-y-4">
              <Users className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">Relationship Management</h3>
              <p className="text-slate leading-relaxed">
                Strengthen the human connections that drive business success, even as
                technology evolves.
              </p>
            </div>

            <div className="space-y-4">
              <TrendingUp className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">Mindset Shifts</h3>
              <p className="text-slate leading-relaxed">
                Transform how leaders think about AI—from threat to tool, from confusion
                to clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="testimonials-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-light text-ink mb-12 text-center">
          What Clients Say
        </h2>
{testimonials.length > 0 ? (
          <>
            <TestimonialCarousel testimonials={testimonials} />
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  onNavigate('testimonials');
                }}
                className="inline-flex items-center text-navy hover:text-steel font-medium transition-colors group underline underline-offset-2"
                aria-label="Navigate to testimonials page to see all client reviews"
              >
                View All Testimonials
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-slate">Loading testimonials...</p>
        )}
      </section>

      <section aria-labelledby="speaking-heading" className="bg-navy text-trueWhite py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="speaking-heading" className="text-3xl md:text-4xl font-light mb-6">
              TEDx Chicago Speaker
            </h2>
            <p className="text-xl text-trueWhite/90 mb-4 leading-relaxed">
              "How social wealth can transform your career"
            </p>
            <p className="text-lg text-trueWhite/80 mb-8 leading-relaxed">
              Relationships are career capital. When you invest in building genuine connections—your
              "social wealth"—your network becomes the foundation that underwrites your next opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  onNavigate('contact');
                }}
                className="btn-primary-on-dark"
              >
                Book for Your Event
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <a
                href="https://youtu.be/vT3fUJ1-BvA?si=VM77gHpuH9371MAY"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-on-dark inline-flex items-center justify-center"
              >
                Watch the Talk
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
