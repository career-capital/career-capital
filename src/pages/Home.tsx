import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Sparkles, TrendingUp, ExternalLink, MessageCircle, Presentation, Compass } from 'lucide-react';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { supabase, Testimonial } from '../lib/supabase';

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'fallback-1',
    quote: 'Nisaini\'s mentorship has been transformative. She taught me to leverage authentic relationships as social wealth, redefining my brand, empowering my voice, and opening endless career opportunities.',
    author: 'Gabriela S.',
    company: 'United Airlines',
    display_order: 1,
    is_active: true,
    featured: true,
    tags: ['Career Capital', 'Social Wealth'],
    testimonial_type: 'professional_endorsement',
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
    tags: ['Public Speaking', 'Leadership Development', 'Relationship Management'],
    testimonial_type: 'professional_endorsement',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'fallback-3',
    quote: 'The future of work belongs to those who understand the power of relationships, and Nisaini stands apart by pairing deep lived experience with countless real-world examples from her own community—\u00A0and a rare gift for using powerful, accessible language to give people the tools, confidence, and clarity to practice meaningful, intentional connection in their work and lives.',
    author: 'Kelly F.',
    company: 'TEDxChicago',
    display_order: 3,
    is_active: true,
    featured: true,
    tags: ['Public Speaking', 'Social Wealth', 'Leadership Development'],
    testimonial_type: 'professional_endorsement',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function Home() {
  const navigate = useNavigate();
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
            srcSet="/sitehero-desktop.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 640px)"
            srcSet="/sitehero-tablet.webp"
            type="image/webp"
          />
          <source
            srcSet="/sitehero-mobile.webp"
            type="image/webp"
          />
          <img
            src="/sitehero-fallback.jpg"
            alt=""
            className="w-full h-full object-cover object-right sm:object-center"
            loading="eager"
          />
        </picture>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-36">
          <h1 className="text-5xl md:text-6xl font-semibold text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Don't just adapt to AI. <em>Lead with it</em>.
          </h1>
          <p className="text-2xl md:text-3xl text-trueWhite/95 mb-4 leading-relaxed drop-shadow-md font-medium">
            We turn AI awareness into AI advantage
          </p>
          <p className="text-lg text-trueWhite/90 mb-10 leading-relaxed drop-shadow-md max-w-3xl">
            In a world reshaped by AI, your greatest advantage is the mindset and relationships you cultivate. We help people, leaders, and organizations develop the human and strategic capacity needed to adapt, grow, and thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-28">
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
              className="btn-primary-on-dark"
            >
              Work With Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/services');
              }}
              className="btn-secondary-on-dark"
            >
              Explore Services
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/5 border border-trueWhite/20 text-trueWhite text-sm font-medium">
              AI Fluency
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/5 border border-trueWhite/20 text-trueWhite text-sm font-medium">
              Leadership Coaching
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/5 border border-trueWhite/20 text-trueWhite text-sm font-medium">
              Relationship Management
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/5 border border-trueWhite/20 text-trueWhite text-sm font-medium">
              Strategic Guidance
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/5 border border-trueWhite/20 text-trueWhite text-sm font-medium">
              Keynote Speaking
            </span>
          </div>
        </div>
      </section>

      <section aria-labelledby="what-we-do-heading" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="what-we-do-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-12">
            What We Do
          </h2>

          <div className="space-y-6 max-w-4xl mb-12">
            <p className="text-lg text-slate leading-relaxed">
              Career Capital blends strategic AI guidance, mindset development, and relationship management to help individuals and teams thrive in a rapidly evolving world.
            </p>
            <p className="text-lg text-slate leading-relaxed">
              We offer coaching, workshops, and strategic guidance that build the human and relational capital needed to navigate change with clarity and confidence:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <MessageCircle className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Coaching
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  One-on-one and small group coaching to develop strategic thinking, build confidence, and navigate career transitions in the AI era.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Presentation className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Workshops
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Interactive sessions that equip teams with practical tools for AI fluency, relationship building, and adaptive mindsets.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Compass className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Strategic Guidance
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Organizational consulting to integrate AI strategy, strengthen culture, and build leadership capacity for the future of work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-cc-heading" className="bg-surface py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="why-cc-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-8">
            Why Career Capital
          </h2>
          <div className="space-y-6 max-w-4xl mb-12">
            <p className="text-xl text-ink leading-relaxed font-medium">
              Your career capital is the combination of your mindset, relationships, and AI fluency—\u00A0the assets that shape your opportunities in a rapidly evolving world.
            </p>
            <p className="text-lg text-slate leading-relaxed">
              Career Capital helps you grow these assets with clarity, confidence, and humanity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Sparkles className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  AI Fluency
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Build confidence and capability around AI through strategic guidance and practical enablement.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Users className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Relationship Management
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Strengthen the human connections that drive business success, even as technology evolves.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <TrendingUp className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Mindset Shifts
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Transform how leaders think about AI—from\u00A0threat to tool, from confusion to clarity.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/about');
              }}
              className="btn-primary"
            >
              Learn More About Us
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section aria-labelledby="testimonials-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-12 text-center">
          What People Say
        </h2>
{testimonials.length > 0 ? (
          <>
            <TestimonialCarousel testimonials={testimonials} />
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/testimonials');
                }}
                className="inline-flex items-center text-base text-navy hover:text-steel font-medium transition-colors group underline underline-offset-2"
                aria-label="Navigate to testimonials page to see all client reviews"
              >
                View All Testimonials
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
              <h2 id="speaking-heading" className="text-4xl md:text-5xl font-semibold text-softWhite mb-6">
                TEDxChicago Speaker
              </h2>
              <p className="text-xl text-trueWhite/90 mb-4 leading-relaxed">
                "How social wealth can transform your career"
              </p>
              <p className="text-lg text-trueWhite/80 mb-8 leading-relaxed">
                Relationships are career capital. When you invest in building genuine connections—your\u00A0"social wealth"—your\u00A0network becomes the foundation that underwrites your next opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/contact');
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
                  src="/tedx03.jpg"
                  alt="Nisaini Rexach presenting at TEDxChicago"
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
