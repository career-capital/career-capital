import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Zap, TrendingUp, MessageCircle, Presentation, Compass } from 'lucide-react';
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
            Don't just keep up with AI. <em>Get ahead with it</em>.
          </h1>
          <p className="text-2xl md:text-3xl text-trueWhite/95 mb-4 leading-relaxed drop-shadow-md font-medium">
            We turn AI potential into competitive advantage
          </p>
          <p className="text-lg text-trueWhite/90 mb-10 leading-relaxed drop-shadow-md max-w-3xl">
            Organizations that master AI now will lead their markets tomorrow. We help businesses at every fluency level—from foundational adoption to advanced implementation—scale AI capabilities, accelerate transformation, and multiply impact across operations.
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
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/20 backdrop-blur-md border-2 border-trueWhite text-trueWhite text-sm font-medium">
              AI Training Programs
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/20 backdrop-blur-md border-2 border-trueWhite text-trueWhite text-sm font-medium">
              Strategic Implementation
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/20 backdrop-blur-md border-2 border-trueWhite text-trueWhite text-sm font-medium">
              Enterprise Enablement
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/20 backdrop-blur-md border-2 border-trueWhite text-trueWhite text-sm font-medium">
              Organizational Transformation
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-trueWhite/20 backdrop-blur-md border-2 border-trueWhite text-trueWhite text-sm font-medium">
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
              Career Capital delivers comprehensive AI enablement that helps organizations transform AI from an emerging challenge into a clear competitive advantage.
            </p>
            <p className="text-lg text-slate leading-relaxed">
              We work with businesses at every level of AI maturity—providing practical training, strategic implementation guidance, and organizational transformation support that drives measurable results:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Presentation className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  AI Training Programs
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Customized programs for teams at all fluency levels—from foundational tool adoption to advanced workflow optimization. Hands-on, practical training that creates immediate business impact.
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
                  End-to-end consulting to integrate AI into operations, scale capabilities across departments, and maximize ROI on AI investments. From strategy to execution.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <MessageCircle className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Change Management
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Navigate the human side of AI adoption. Build organizational readiness, accelerate buy-in, and create sustainable transformation across all levels of your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-cc-heading" className="bg-surface py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="why-cc-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-8">
            Why Organizations Choose Career Capital
          </h2>
          <div className="space-y-6 max-w-4xl mb-12">
            <p className="text-xl text-ink leading-relaxed font-medium">
              The AI revolution isn't coming—it's here. Organizations that build AI capabilities now will dominate their markets. Those that wait will struggle to catch up.
            </p>
            <p className="text-lg text-slate leading-relaxed">
              We help you move fast and scale smart with AI enablement designed for real-world results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Target className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  All Fluency Levels
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Whether your team is just starting with AI or already using advanced tools daily, we accelerate your progress with training tailored to your current capabilities.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Zap className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Rapid Implementation
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  No theoretical frameworks or lengthy transformations. We deliver practical, hands-on enablement that creates measurable business value in weeks, not months.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <TrendingUp className="w-12 h-12 text-navy" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">
                  Competitive Edge
                </h3>
                <p className="text-base text-slate leading-relaxed">
                  Scale AI capabilities across your organization to multiply productivity, accelerate innovation, and outpace competitors still figuring out where to start.
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

    </div>
  );
}
