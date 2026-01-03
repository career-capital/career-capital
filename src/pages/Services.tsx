import { ArrowRight } from 'lucide-react';
import FlipCard from '../components/FlipCard';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const coreServices = [
    {
      front: {
        title: 'AI Readiness Assessment',
        description: "Every encounter is an opportunity to level up. We'll evaluate where your organization stands today—technically, culturally, and strategically—so you can invest your energy where it matters most.",
      },
      back: {
        content: [
          'Technical infrastructure evaluation',
          'Cultural readiness assessment',
          'Leadership fluency gap analysis',
          'Strategic alignment review',
          'Prioritized recommendations report',
        ],
      },
    },
    {
      front: {
        title: 'AI Strategy & Roadmap Development',
        description: "Small, consistent deposits yield bigger returns. Together, we'll build a practical roadmap that compounds over time—quick wins now, long-term capability later.",
      },
      back: {
        content: [
          'Custom AI strategy development',
          'Phased implementation roadmap',
          'Use case prioritization framework',
          'ROI modeling and success metrics',
          'Tailored change management approach',
        ],
      },
    },
    {
      front: {
        title: 'Ongoing Advisory',
        description: 'Your network underwrites your next opportunity. Regular strategic guidance keeps momentum strong as you navigate challenges, course-correct, and build the future you envision.',
      },
      back: {
        content: [
          'Regular strategic check-ins',
          'Real-time guidance on AI opportunities',
          'Leadership decision-making support',
          'Course-correction and roadmap adjustments',
          'Thought partnership for transformation',
        ],
      },
    },
    {
      front: {
        title: 'AI Enablement Support',
        description: "Let's live the learning. Hands-on support that builds real confidence in your teams—because AI fluency isn't just about tools, it's about transforming how people think and work.",
      },
      back: {
        content: [
          'Hands-on training programs',
          'Custom workshops and skill-building',
          'Pilot project and POC support',
          'Best practices documentation',
          'Internal champions development',
        ],
      },
    },
  ];

  const addOns = [
    {
      front: {
        title: 'Executive Coaching for Leaders',
        description: 'Make deposits with care. One-on-one guidance for executives who want to champion their teams through AI transformation while strengthening the relationships that drive real results.',
      },
      back: {
        content: [
          'One-on-one coaching sessions',
          'Executive AI fluency building',
          'Leadership communication strategies',
          'Stakeholder buy-in navigation',
          'Personal leadership development',
        ],
      },
    },
    {
      front: {
        title: 'Office Hours',
        description: 'When people feel seen, they remember. Regular access for questions, guidance, and strategic thinking—a space where challenges become clarity.',
      },
      back: {
        content: [
          'Scheduled open sessions',
          'Ad-hoc questions and guidance',
          'Real-time problem-solving',
          'Cross-team connection point',
          'Continuous learning and sharing',
        ],
      },
    },
  ];

  return (
    <div className="bg-softWhite">
      <section
        aria-labelledby="services-heading"
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
          <h1 id="services-heading" className="text-5xl md:text-6xl font-light text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Services
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            <strong>Your brand is in the room even when you&apos;re not.</strong> Let&apos;s build AI fluency that compounds over time—strategic, practical guidance for organizations ready to invest in capability without losing their humanity.
          </p>
        </div>
      </section>

      <section aria-labelledby="core-services-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="core-services-heading" className="text-3xl font-semibold text-ink mb-12">Core Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {coreServices.map((service, index) => (
              <FlipCard key={index} front={service.front} back={service.back} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="engagements-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="engagements-heading" className="text-3xl font-semibold text-ink mb-4">How Engagements Work</h2>
          <p className="text-xl text-slate mb-12">A clear, collaborative process designed around you.</p>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <div className="flex gap-6 relative items-stretch">
                <div className="relative flex-shrink-0 w-3">
                  <div className="w-3 h-3 rounded-full bg-navy relative z-10 mt-[0.4rem]"></div>
                  <svg className="absolute left-0 w-3 overflow-visible" style={{ top: 'calc(0.4rem + 18px)', height: 'calc(100% - 0.8rem - 30px)' }}>
                    <line x1="6" y1="0" x2="6" y2="100%" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg text-ink mb-2">Every encounter is an interview</h3>
                  <p className="text-slate leading-relaxed">
                    We start by understanding your organization's context, challenges, and the future you're building toward.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative items-stretch">
                <div className="relative flex-shrink-0 w-3">
                  <div className="w-3 h-3 rounded-full bg-navy relative z-10 mt-[0.4rem]"></div>
                  <svg className="absolute left-0 w-3 overflow-visible" style={{ top: 'calc(0.4rem + 18px)', height: 'calc(100% - 0.8rem - 30px)' }}>
                    <line x1="6" y1="0" x2="6" y2="100%" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg text-ink mb-2">We come to the table prepared</h3>
                  <p className="text-slate leading-relaxed">
                    Every engagement is customized to your specific needs—because one-size-fits-all doesn't build real capability.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative items-stretch">
                <div className="relative flex-shrink-0 w-3">
                  <div className="w-3 h-3 rounded-full bg-navy relative z-10 mt-[0.4rem]"></div>
                  <svg className="absolute left-0 w-3 overflow-visible" style={{ top: 'calc(0.4rem + 18px)', height: 'calc(100% - 0.8rem - 30px)' }}>
                    <line x1="6" y1="0" x2="6" y2="100%" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg text-ink mb-2">We make deposits with intention</h3>
                  <p className="text-slate leading-relaxed">
                    We focus on actionable steps and real capability building—not just strategy documents that sit on a shelf.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative items-start">
                <div className="w-3 h-3 rounded-full bg-navy flex-shrink-0 mt-[0.4rem]"></div>
                <div>
                  <h3 className="text-lg text-ink mb-2">The dividends will surprise you</h3>
                  <p className="text-slate leading-relaxed">
                    Ongoing guidance ensures momentum and addresses challenges as they emerge—relationships that compound over time.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[500px] flex-shrink-0">
              <div className="overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src="/3865532919418905075.webp"
                  alt="Workshop facilitation and team collaboration"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="addons-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 id="addons-heading" className="text-3xl font-semibold text-ink mb-4">Add-On Services</h2>
            <p className="text-lg text-slate leading-relaxed max-w-3xl">Complement your core engagement with additional support options designed for sustained momentum and deeper learning.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {addOns.map((addon, index) => (
              <FlipCard key={index} front={addon.front} back={addon.back} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="services-cta-heading" className="bg-navy text-trueWhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="services-cta-heading" className="text-3xl font-light mb-6">
              Ready to build AI capability in your organization?
            </h2>
            <p className="text-lg text-trueWhite/90 mb-8">
              Let's discuss what approach makes sense for your team.
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigate('contact');
              }}
              className="btn-primary-on-dark"
            >
              Start a Conversation
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
