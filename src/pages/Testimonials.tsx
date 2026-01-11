import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote, ArrowRight } from 'lucide-react';
import { supabase, Testimonial } from '../lib/supabase';

const ENGAGEMENT_TYPES = [
  'Public Speaking',
  'Workshop Facilitation',
  'Executive Coaching',
  'Strategy & Roadmap',
];

const TESTIMONIALS_PER_PAGE = 8;

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
    quote: 'The future of work belongs to those who understand the power of relationships, and Nisaini stands apart by pairing deep lived experience with countless real-world examples from her own community— and a rare gift for using powerful, accessible language to give people the tools, confidence, and clarity to practice meaningful, intentional connection in their work and lives.',
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

export default function Testimonials() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEngagementTypes, setSelectedEngagementTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'client' | 'professional_endorsement'>('all');
  const [availableEngagementTypes, setAvailableEngagementTypes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(TESTIMONIALS_PER_PAGE);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching testimonials:', error);
      const testimonialsData = FALLBACK_TESTIMONIALS;
      setTestimonials(testimonialsData);

      // Find which engagement types are actually used in testimonials
      const usedTypes = new Set<string>();
      testimonialsData.forEach(t => {
        t.tags?.forEach(tag => {
          if (ENGAGEMENT_TYPES.includes(tag)) {
            usedTypes.add(tag);
          }
        });
      });
      setAvailableEngagementTypes(Array.from(usedTypes));
    } else if (data && data.length > 0) {
      setTestimonials(data);

      // Find which engagement types are actually used in testimonials
      const usedTypes = new Set<string>();
      data.forEach(t => {
        t.tags?.forEach(tag => {
          if (ENGAGEMENT_TYPES.includes(tag)) {
            usedTypes.add(tag);
          }
        });
      });
      setAvailableEngagementTypes(Array.from(usedTypes).sort());
    } else {
      // If data is empty, use fallback
      const testimonialsData = FALLBACK_TESTIMONIALS;
      setTestimonials(testimonialsData);

      const usedTypes = new Set<string>();
      testimonialsData.forEach(t => {
        t.tags?.forEach(tag => {
          if (ENGAGEMENT_TYPES.includes(tag)) {
            usedTypes.add(tag);
          }
        });
      });
      setAvailableEngagementTypes(Array.from(usedTypes));
    }
    setLoading(false);
  };

  const toggleEngagementType = (type: string) => {
    setSelectedEngagementTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setVisibleCount(TESTIMONIALS_PER_PAGE);
  };

  const handleTypeChange = (type: 'all' | 'client' | 'professional_endorsement') => {
    setSelectedType(type);
    setVisibleCount(TESTIMONIALS_PER_PAGE);
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const typeMatch = selectedType === 'all' || testimonial.testimonial_type === selectedType;
    const engagementMatch = selectedEngagementTypes.length === 0 ||
      selectedEngagementTypes.some(type => testimonial.tags?.includes(type));
    return typeMatch && engagementMatch;
  });

  const visibleTestimonials = filteredTestimonials.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTestimonials.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + TESTIMONIALS_PER_PAGE);
  };

  if (loading) {
    return (
      <div className="bg-softWhite min-h-screen flex items-center justify-center">
        <p className="text-slate">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="bg-softWhite">
      <section
        aria-labelledby="testimonials-heading"
        className="relative overflow-hidden bg-navy"
      >
        <div className="absolute inset-0">
          <img
            src="/banner_testimonials_desktop.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <h1 id="testimonials-heading" className="text-5xl md:text-6xl font-semibold text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Testimonials
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            Real stories, real transformation. Client testimonials and professional endorsements spanning public speaking, workshops, coaching, and strategic partnerships—proof of impact from those who've experienced it firsthand.
          </p>
        </div>
      </section>

      <section aria-labelledby="feedback-heading" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="feedback-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-3">Client Stories & Endorsements</h2>
          <p className="text-lg text-slate mb-12 leading-relaxed">
            Insights from clients and professional partners who've experienced the impact firsthand.
          </p>
          <div className="bg-trueWhite border border-border p-6 mb-10">
          <h3 className="text-base font-medium text-slate mb-6 uppercase tracking-wide">Filter Testimonials</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-steel mb-3">Testimonial Source</label>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Testimonial source filter">
                <button
                  onClick={() => handleTypeChange('all')}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    selectedType === 'all'
                      ? 'bg-navy text-trueWhite border-navy'
                      : 'bg-softWhite text-ink border-border hover:bg-steel hover:text-trueWhite hover:border-steel'
                  }`}
                  aria-pressed={selectedType === 'all'}
                >
                  All
                </button>
                <button
                  onClick={() => handleTypeChange('client')}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    selectedType === 'client'
                      ? 'bg-navy text-trueWhite border-navy'
                      : 'bg-softWhite text-ink border-border hover:bg-steel hover:text-trueWhite hover:border-steel'
                  }`}
                  aria-pressed={selectedType === 'client'}
                >
                  Client Testimonials
                </button>
                <button
                  onClick={() => handleTypeChange('professional_endorsement')}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    selectedType === 'professional_endorsement'
                      ? 'bg-navy text-trueWhite border-navy'
                      : 'bg-softWhite text-ink border-border hover:bg-steel hover:text-trueWhite hover:border-steel'
                  }`}
                  aria-pressed={selectedType === 'professional_endorsement'}
                >
                  Professional Endorsements
                </button>
              </div>
            </div>

            {availableEngagementTypes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-steel mb-3">
                  Engagement Type
                </label>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Engagement type filter">
                  {availableEngagementTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleEngagementType(type)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        selectedEngagementTypes.includes(type)
                          ? 'bg-navy text-trueWhite border-navy'
                          : 'bg-softWhite text-ink border-border hover:bg-steel hover:text-trueWhite hover:border-steel'
                      }`}
                      aria-pressed={selectedEngagementTypes.includes(type)}
                      aria-label={`${selectedEngagementTypes.includes(type) ? 'Remove' : 'Add'} ${type} filter`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {selectedEngagementTypes.length > 0 && (
                  <button
                    onClick={() => setSelectedEngagementTypes([])}
                    className="text-sm text-slate hover:text-steel transition-colors mt-2 underline"
                  >
                    Clear engagement filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto" role="region" aria-live="polite" aria-atomic="false">
          {filteredTestimonials.length > 0 ? (
            <>
              {visibleTestimonials.map((testimonial) => (
                <article key={testimonial.id} className="bg-trueWhite p-8 relative border border-border">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-navy/10" strokeWidth={1.5} aria-hidden="true" />
                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                      <span className={`text-xs px-2 py-1 font-medium ${
                        testimonial.testimonial_type === 'professional_endorsement'
                          ? 'bg-slate/20 text-slate'
                          : 'bg-navy/10 text-navy'
                      }`}>
                        {testimonial.testimonial_type === 'professional_endorsement' ? 'Professional Endorsement' : 'Client'}
                      </span>
                      {testimonial.tags && testimonial.tags.filter(tag => ENGAGEMENT_TYPES.includes(tag)).length > 0 && (
                        <>
                          {testimonial.tags.filter(tag => ENGAGEMENT_TYPES.includes(tag)).map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-navy text-trueWhite text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                    <blockquote className="text-lg md:text-xl text-ink leading-relaxed italic font-light mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <footer className="text-slate">
                      <p className="font-medium text-ink text-base">{testimonial.author}</p>
                      <p className="text-base">{testimonial.company}</p>
                    </footer>
                  </div>
                </article>
              ))}
              {hasMore && (
                <div className="text-center pt-8">
                  <button
                    onClick={loadMore}
                    className="btn-primary"
                    aria-label={`Load more testimonials. Currently showing ${visibleCount} of ${filteredTestimonials.length}`}
                  >
                    Load More Testimonials
                  </button>
                  <p className="text-sm text-slate mt-3 max-w-none mx-auto" aria-live="polite">
                    Showing {visibleCount} of {filteredTestimonials.length} testimonials
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-trueWhite border border-border" role="status">
              <p className="text-slate">No testimonials match your selected filters.</p>
            </div>
          )}
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {filteredTestimonials.length > 0
              ? `Showing ${Math.min(visibleCount, filteredTestimonials.length)} of ${filteredTestimonials.length} testimonials.`
              : 'No testimonials match your selected filters.'
            }
          </div>
        </div>
        </div>
      </section>

      <section aria-labelledby="testimonials-cta-heading" className="bg-navy text-trueWhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="testimonials-cta-heading" className="text-4xl md:text-5xl font-semibold text-softWhite mb-6">
              Ready to experience these results in your organization?
            </h2>
            <p className="text-lg text-trueWhite/90 mb-8">
              Let's discuss how we can work together.
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
              className="btn-primary-on-dark w-full sm:w-auto"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
