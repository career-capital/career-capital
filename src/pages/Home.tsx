import { useState, useEffect } from 'react';
import { ArrowRight, Users, Sparkles, TrendingUp, ExternalLink } from 'lucide-react';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { supabase, Testimonial } from '../lib/supabase';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'fallback-1',
    quote: 'Nisaini\'s mentorship has been transformative. She taught me to leverage authentic relationships as social wealth, redefining my brand, empowering my voice, and opening endless career opportunities.',
    author: 'Gabriela S.',
    company: 'United Airlines',
    display_order: 1,
    is_active: true,
    featured: true,
    tags: ['Executive Coaching', 'Career Capital', 'Social Wealth'],
    testimonial_type: 'character_witness',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'fallback-2',
    quote: 'I\'ve had the pleasure of collaborating with Nisaini on multiple public presentations and events, and Nisaini has proven herself to be an exceptional collaborator and speaker. Her passion for giving to her network, combined with her strategic approach to connection, makes her an invaluable partner on stage and a trusted leader off it.',
    author: 'Melissa L.',
    company: 'Microsoft',
    display_order: 2,
    is_active: true,
    featured: true,
    tags: ['Keynote Speaking', 'Leadership Development', 'Relationship Management'],
    testimonial_type: 'character_witness',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'fallback-3',
    quote: 'The future of work belongs to those who understand the power of relationships, and Nisaini stands apart by pairing deep lived experience with countless real-world examples from her own community— and a rare gift for using powerful, accessible language to give people the tools, confidence, and clarity to practice meaningful, intentional connection in their work and lives.',
    author: 'Kelly F.',
    company: 'TEDxChicago',
    display_order: 3,
    is_active: true,
    featured: true,
    tags: ['Keynote Speaking', 'Social Wealth', 'Leadership Development'],
    testimonial_type: 'character_witness',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

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
        setTestimonials(FALLBACK_TESTIMONIALS);
      } else if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(FALLBACK_TESTIMONIALS);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="bg-softWhite">
      <section aria-label="Introduction and main message" className="relative overflow-hidden bg-navy min-h-[600px]">
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
          <h1 className="text-5xl md:text-6xl font-light text-trueWhite mb-6 leading-tight drop-shadow-lg">
            AI Fluency + Social Wealth = Your New Competitive Edge
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            Strategic guidance for organizations building AI readiness while elevating the human side of work.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-trueWhite/10 backdrop-blur-sm border border-trueWhite/20 text-trueWhite text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-trueWhite"></span>
              TEDx Chicago Main Stage Speaker
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-trueWhite/10 backdrop-blur-sm border border-trueWhite/20 text-trueWhite text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-trueWhite"></span>
              Fortune 100 Experience
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-trueWhite/10 backdrop-blur-sm border border-trueWhite/20 text-trueWhite text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-trueWhite"></span>
              Social Impact Leader
            </span>
          </div>
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
      </section>

      <section aria-labelledby="capabilities-heading" className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="capabilities-heading" className="text-3xl md:text-4xl font-light text-ink mb-12 text-center">
            Building AI fluency and social wealth for lasting career impact
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <Sparkles className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">AI fluency</h3>
              <p className="text-slate leading-relaxed">
                Build organizational confidence and capability around AI through strategic
                guidance and practical enablement.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <Users className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">Relationship management</h3>
              <p className="text-slate leading-relaxed">
                Strengthen the human connections that drive business success, even as
                technology evolves.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <TrendingUp className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">Mindset shifts</h3>
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
          What clients say
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
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <h2 id="speaking-heading" className="text-3xl md:text-4xl font-light mb-6">
                TEDx Chicago speaker
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
            <div className="w-full lg:w-[450px] flex-shrink-0">
              <div className="overflow-hidden shadow-2xl">
                <img
                  src="/nisaini-tedxchicago-closeup.jpg"
                  alt="Nisaini Rexach presenting at TEDx Chicago"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
