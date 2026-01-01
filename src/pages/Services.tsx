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
        className="relative overflow-hidden bg-navy min-h-[350px]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/siteherojan2026_opac80.png)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <h1 id="services-heading" className="text-5xl md:text-6xl font-light text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Services
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            Your brand is in the room even when you&apos;re not. Let&apos;s build AI fluency that compounds over time—strategic, practical guidance for organizations ready to invest in capability without losing their humanity.
          </p>
        </div>
      </section>

      <section aria-labelledby="core-services-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="core-services-heading" className="text-3xl font-light text-ink mb-12">Core Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {coreServices.map((service, index) => (
              <FlipCard key={index} front={service.front} back={service.back} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="engagements-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="engagements-heading" className="text-3xl font-light text-ink mb-8">How Engagements Work</h2>
          <div className="max-w-3xl">
            <div className="flex gap-6 relative">
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-navy mt-2 relative z-10"></div>
                {/* Line segment from this dot to next */}
                <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
              </div>
              <div className="pb-8">
                <h3 className="font-medium text-ink mb-2">Discovery Conversation</h3>
                <p className="text-slate leading-relaxed">
                  Every encounter is an interview. We start by understanding your organization&apos;s context, challenges, and the future you&apos;re building toward.
                </p>
              </div>
            </div>

            <div className="flex gap-6 relative">
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-navy mt-2 relative z-10"></div>
                {/* Line segment from this dot to next */}
                <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
              </div>
              <div className="pb-8">
                <h3 className="font-medium text-ink mb-2">Tailored Approach</h3>
                <p className="text-slate leading-relaxed">
                  Come to the table prepared. Every engagement is customized to your specific needs—because one-size-fits-all doesn&apos;t build real capability.
                </p>
              </div>
            </div>

            <div className="flex gap-6 relative">
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-navy mt-2 relative z-10"></div>
                {/* Line segment from this dot to next */}
                <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
              </div>
              <div className="pb-8">
                <h3 className="font-medium text-ink mb-2">Practical Implementation</h3>
                <p className="text-slate leading-relaxed">
                  Make deposits with intention. Focus on actionable steps and real capability building—not just strategy documents that sit on a shelf.
                </p>
              </div>
            </div>

            <div className="flex gap-6 relative">
              <div className="w-3 h-3 rounded-full bg-navy flex-shrink-0 mt-2"></div>
              <div>
                <h3 className="font-medium text-ink mb-2">Sustained Support</h3>
                <p className="text-slate leading-relaxed">
                  The dividends will surprise you. Ongoing guidance ensures momentum and addresses challenges as they emerge—relationships that compound over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="addons-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 id="addons-heading" className="text-3xl font-light text-ink mb-4">Add-On Services</h2>
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
