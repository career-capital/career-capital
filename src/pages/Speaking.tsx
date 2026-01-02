import { Users, Lightbulb, ArrowRight, ExternalLink, Mic } from 'lucide-react';
import FlipCard from '../components/FlipCard';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface SpeakingProps {
  onNavigate: (page: Page) => void;
}

export default function Speaking({ onNavigate }: SpeakingProps) {
  const topics = [
    {
      front: {
        title: 'Social Wealth: Building Career Capital',
        description: 'Your network underwrites your next move. Learn how intentional relationship-building creates opportunities traditional networking never could.',
      },
      back: {
        content: [
          'Strategic investment vs transactional networking',
          'How "social wealth" compounds over time',
          'Practical relationship-building frameworks',
          'Every encounter is an interview',
        ],
      },
    },
    {
      front: {
        title: 'AI Fluency as Leadership Imperative',
        description: 'Leaders must understand AI—not as technologists, but as strategic thinkers who can guide their teams through transformation.',
      },
      back: {
        content: [
          'AI fluency for executives (no coding required)',
          'Evaluating opportunities and risks',
          'Building confidence through hands-on experience',
          'Navigating the hype cycle with clarity',
        ],
      },
    },
    {
      front: {
        title: 'Relationship Management in AI Age',
        description: 'Human connection becomes more valuable as AI handles routine tasks. Strengthen collaboration as technology transforms the workplace.',
      },
      back: {
        content: [
          'Why relationships matter more, not less',
          'Balancing technology with culture and trust',
          'Maintaining connection in digital workplaces',
          'Leading teams through change with empathy',
        ],
      },
    },
    {
      front: {
        title: 'Building AI Readiness With Humanity',
        description: 'Create technical capability while maintaining your values. Practical roadmaps that balance quick wins with long-term organizational health.',
      },
      back: {
        content: [
          'Assess readiness: culture, skills, and strategy',
          'Practical roadmaps with quick wins',
          'Navigate ethical considerations',
          'Build psychological safety for learning',
        ],
      },
    },
  ];

  return (
    <div className="bg-softWhite">
      <section
        aria-labelledby="speaking-page-heading"
        className="relative overflow-hidden bg-navy"
      >
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
          <h1 id="speaking-page-heading" className="text-5xl md:text-6xl font-light text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Speaking & Workshops
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            TEDx‑Level Insight for Your Team or Organization
          </p>
        </div>
      </section>

      <section aria-labelledby="formats-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="formats-heading" className="text-3xl font-light text-ink mb-12">Engagement Formats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Mic className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">Keynote Speeches</h3>
              <p className="text-slate leading-relaxed">
                45-60 minute presentations for conferences, leadership summits, and
                corporate events.
              </p>
            </div>

            <div className="space-y-4">
              <Users className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">Workshops</h3>
              <p className="text-slate leading-relaxed">
                Half-day or full-day interactive sessions for leadership teams and
                departments building AI capability.
              </p>
            </div>

            <div className="space-y-4">
              <Lightbulb className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">Facilitation</h3>
              <p className="text-slate leading-relaxed">
                Guided strategy sessions and offsites focused on AI readiness and
                organizational change.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="topics-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="topics-heading" className="text-3xl font-light text-ink mb-12">Speaking Topics</h2>
          <div className="grid md:grid-cols-2 gap-8 speaking-flip-cards">
            {topics.map((topic, index) => (
              <FlipCard key={index} front={topic.front} back={topic.back} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="speaking-cta-heading" className="bg-navy text-trueWhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <h2 id="speaking-cta-heading" className="text-3xl font-light mb-6">
                Public Speaking with Purpose: TEDx Chicago
              </h2>
              <p className="text-lg text-trueWhite/90 leading-relaxed mb-4">
                A powerful exploration of intentional relationship-building as career capital.
                Through personal stories spanning from Chicago's government housing to boardrooms
                with Fortune 500 CEOs, this talk introduces the "social wealth" framework—showing
                how your supporters become the foundation for every career move you make.
              </p>
              <p className="text-lg text-trueWhite/90 leading-relaxed mb-8">
                <strong className="text-trueWhite">Key insight:</strong> Your network doesn't just open doors—it underwrites your next opportunity.
                Every encounter is an interview, and investing in genuine relationships compounds over time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    onNavigate('contact');
                  }}
                  className="btn-primary-on-dark"
                >
                  Inquire About Availability
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <a
                  href="https://youtu.be/vT3fUJ1-BvA?si=VM77gHpuH9371MAY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-on-dark"
                >
                  Watch the Talk
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="w-full lg:w-[500px] flex-shrink-0">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/vT3fUJ1-BvA?si=jTm2jKfgNmEgjH_1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="differentiators-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="differentiators-heading" className="text-3xl font-light text-ink mb-12">What Makes These Engagements Different</h2>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <div className="flex gap-6 relative">
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-navy mt-2 relative z-10"></div>
                  <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
                </div>
                <div className="pb-8">
                  <h3 className="font-medium text-ink mb-2">Relationships First, Always</h3>
                  <p className="text-slate leading-relaxed">
                    This isn't transactional consulting. We build trust and genuine connection alongside technical capability—because lasting transformation happens through people, not just processes.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative">
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-navy mt-2 relative z-10"></div>
                  <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
                </div>
                <div className="pb-8">
                  <h3 className="font-medium text-ink mb-2">Customized to Your Reality</h3>
                  <p className="text-slate leading-relaxed">
                    No templates or cookie-cutter frameworks. Every engagement is shaped around your organization's unique context, culture, and challenges—because what works for one team rarely fits another.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative">
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-navy mt-2 relative z-10"></div>
                  <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
                </div>
                <div className="pb-8">
                  <h3 className="font-medium text-ink mb-2">Fluency Over Dependency</h3>
                  <p className="text-slate leading-relaxed">
                    The goal is to build your team's lasting capability, not create reliance on outside expertise. We work together to develop the confidence and skills that compound long after our engagement ends.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative">
                <div className="w-3 h-3 rounded-full bg-navy flex-shrink-0 mt-2"></div>
                <div>
                  <h3 className="font-medium text-ink mb-2">Long-Term Partnership Mindset</h3>
                  <p className="text-slate leading-relaxed">
                    Quick wins matter, but sustained success matters more. This work is about making strategic deposits that compound over time—building relationships and capabilities that create lasting value.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[450px] flex-shrink-0">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/tedx02.jpg"
                  alt="Nisaini presenting at TEDx Chicago"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="final-cta-heading" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="final-cta-heading" className="text-4xl font-light text-ink mb-6">
            Ready to Bring This Insight to Your Organization?
          </h2>
          <p className="text-xl text-slate leading-relaxed mb-8">
            Let's discuss how a keynote, workshop, or facilitated session can help your team build the relationships and capabilities that drive lasting success.
          </p>
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              onNavigate('contact');
            }}
            className="btn-primary inline-flex items-center"
          >
            Get in Touch
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
