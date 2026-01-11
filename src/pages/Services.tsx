import { ArrowRight } from 'lucide-react';
import FlipCard from '../components/FlipCard';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const services = [
    {
      front: {
        title: 'AI Enablement & Adoption Workshops',
        description: 'Practical, human-centered training for teams learning to work alongside AI.',
      },
      back: {
        content: [
          'Interactive workshops tailored to team roles',
          'Hands-on demonstrations of AI tools and use cases',
          'Guidance on responsible use and change readiness',
          'Confidence-building exercises',
          'Optional team-specific AI playbooks',
        ],
        credibility: '75+ AI enablement sessions delivered across industries.',
        cta: 'Book a Workshop',
      },
    },
    {
      front: {
        title: 'AI-Ready Communication Lab',
        description: 'For leaders and teams navigating AI adoption and internal messaging.',
      },
      back: {
        content: [
          'Discovery session to understand communication gaps',
          'Custom framework for talking about AI with clarity and empathy',
          'Messaging templates and talking points',
          'Follow-up refinement session',
        ],
        cta: 'Start a Lab Session',
      },
    },
    {
      front: {
        title: 'Social Wealth Workshops & Coaching',
        description: 'Coaching and workshops that build relationship capital as a strategic asset.',
      },
      back: {
        content: [
          'TEDx-inspired keynote on Social Wealth',
          'Relational mapping exercises',
          'Tools for trust-building and influence',
          'Optional cohort or team coaching',
        ],
        cta: 'Build Social Wealth',
      },
    },
    {
      front: {
        title: 'Future-of-Work Keynotes & Strategy Sessions',
        description: 'High-impact talks paired with actionable strategy for leaders and teams.',
      },
      back: {
        content: [
          'Keynote on AI readiness, mindset, and human-centered leadership',
          'Strategy session to translate insights into next steps',
          'Optional rollout plan or messaging guide',
        ],
        cta: 'Book a Speaking Engagement',
      },
    },
    {
      front: {
        title: 'Coaching for Individuals & Leaders',
        description: 'One-on-one coaching that strengthens AI-ready mindsets, communication, and relational influence.',
      },
      back: {
        content: [
          'AI fluency and mindset development',
          'Leadership communication',
          'Navigating change and uncertainty',
          'Building Social Wealth for career mobility',
        ],
        cta: 'Start Coaching',
      },
    },
  ];

  return (
    <div className="bg-softWhite">
      <section
        aria-labelledby="services-heading"
        className="relative overflow-hidden bg-navy"
      >
        <div className="absolute inset-0">
          <img
            src="/banner_services_desktop.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <h1 id="services-heading" className="text-5xl md:text-6xl font-light text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Services
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md max-w-4xl">
            Build the mindset, relationships, and AI fluency needed to thrive in the future of work.
          </p>
        </div>
      </section>

      <section aria-labelledby="services-heading-main" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-heading-main" className="text-3xl font-semibold text-ink mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <FlipCard
                key={index}
                front={service.front}
                back={service.back}
                onCtaClick={() => {
                  window.scrollTo(0, 0);
                  onNavigate('contact');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="who-we-work-with-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="who-we-work-with-heading" className="text-3xl md:text-4xl font-semibold text-ink mb-6">
            Who We Work With
          </h2>
          <div className="text-lg text-slate leading-relaxed max-w-4xl space-y-4">
            <p>Career Capital partners with:</p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="text-steel font-medium flex-shrink-0 mt-1">•</span>
                <span>Individuals building future-ready mindsets and relationships</span>
              </li>
              <li className="flex gap-3">
                <span className="text-steel font-medium flex-shrink-0 mt-1">•</span>
                <span>Leaders navigating AI-driven change</span>
              </li>
              <li className="flex gap-3">
                <span className="text-steel font-medium flex-shrink-0 mt-1">•</span>
                <span>Teams adopting AI tools and new ways of working</span>
              </li>
              <li className="flex gap-3">
                <span className="text-steel font-medium flex-shrink-0 mt-1">•</span>
                <span>Organizations strengthening communication, culture, and adaptability</span>
              </li>
            </ul>
            <div className="pt-6">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  onNavigate('contact');
                }}
                className="btn-primary"
              >
                Let's Talk
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-cta-heading" className="bg-navy text-trueWhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="services-cta-heading" className="text-3xl font-light mb-6">
              Ready to build your career capital?
            </h2>
            <p className="text-lg text-trueWhite/90 mb-8">
              Let's discuss how we can help you or your team thrive in the AI era.
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigate('contact');
              }}
              className="btn-primary-on-dark w-full sm:w-auto"
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
