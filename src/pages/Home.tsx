import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Zap, TrendingUp, RefreshCw, Presentation, Compass } from 'lucide-react';
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
    quote: 'The future of work belongs to those who understand the power of relationships, and Nisaini stands apart by pairing deep lived experience with countless real-world examples from her own community—and a rare gift for using powerful, accessible language to give people the tools, confidence, and clarity to practice meaningful, intentional connection in their work and lives.',
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
          <img
            src="/sitehero-fallback.jpg"
            alt=""
            className="w-full h-full object-cover object-right sm:object-center"
            loading="eager"
          />
        </picture>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-36">
          <h1 className="text-5xl md:text-6xl font-semibold text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Building momentum in the AI Era
          </h1>
          <p className="text-2xl md:text-3xl text-trueWhite/95 mb-4 leading-relaxed drop-shadow-md font-medium">
            Helping individuals and teams develop AI fluency and AI‑ready mindsets.
          </p>
          <p className="text-lg text-trueWhite/90 mb-10 leading-relaxed drop-shadow-md max-w-3xl">
            Learn. Adapt. Thrive. Career Capital is a boutique advisory firm that builds AI fluency and AI‑ready mindsets across organizations, helping teams learn, adapt, and thrive in an Analog + AI world.
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
              <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} aria-hidden="true" />
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
        </div>
      </section>

      <section aria-labelledby="what-we-do-heading" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="what-we-do-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-12">
            What We Do
          </h2>

          <div className="space-y-6 max-w-4xl mb-16">
            <p className="text-lg text-slate leading-relaxed">
              Career Capital helps organizations build AI fluency, develop AI‑ready mindsets, and scale learning across the business so teams can work confidently with AI and unlock meaningful productivity gains.
            </p>
            <p className="text-lg text-slate leading-relaxed">
              We combine practical training, human‑centered enablement, and strategic guidance to help organizations move beyond experimentation and turn AI into a sustainable competitive advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Target className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  AI Adoption
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Hands‑on training that builds AI fluency from foundational literacy to advanced workflow optimization, driving immediate productivity gains.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Compass className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Strategic Implementation
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Integrate AI into core operations, scale capability, and turn investments into measurable outcomes.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <RefreshCw className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Change Management & AI Mindset Development
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Build the confidence and buy‑in needed for sustainable adoption, ensuring AI becomes a capability, not a disruption.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <TrendingUp className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Enterprise Enablement
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Scalable programs that embed AI fluency organization‑wide, making capability a cultural strength, not a siloed initiative.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Presentation className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Future‑of‑Work Keynotes & Leadership Sessions
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Energizing guidance that inspires action and aligns teams around the skills and mindsets needed to thrive with AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-cc-heading" className="bg-surface py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="why-cc-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-16">
            Why Organizations Choose Career Capital
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <RefreshCw className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Human‑Centered AI Enablement
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  We build the mindsets and behaviors that make AI adoption stick.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Target className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  All Fluency Levels
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  We accelerate progress with training tailored to your team's current capabilities.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Zap className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Rapid, Practical Implementation
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Hands‑on learning and real‑world workflows that create measurable business value fast.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Compass className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Scalable Learning Across the Business
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  We embed AI fluency at every level, making capability a shared strength, not a siloed skill.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <TrendingUp className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  A Competitive Edge in an Analog + AI World
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Build AI fluency now to lead tomorrow. Move fast, scale smart, and stay ahead.
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
              <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} aria-hidden="true" />
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
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-slate">Loading testimonials...</p>
        )}
      </section>

      <section aria-labelledby="home-cta-heading" className="bg-navy text-trueWhite py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 id="home-cta-heading" className="text-4xl md:text-5xl font-semibold text-softWhite mb-6">
              Ready to build AI fluency across your organization?
            </h2>
            <p className="text-xl text-trueWhite/90 mb-8 leading-relaxed">
              Let's discuss how we can help your teams develop AI‑ready mindsets, scale learning, and thrive in an Analog + AI world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/contact');
                }}
                className="btn-primary-on-dark"
              >
                Start a Conversation
                <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/services');
                }}
                className="btn-secondary-on-dark"
              >
                View All Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
