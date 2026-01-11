import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

interface Service {
  title: string;
  subtitle: string;
  idealFor: string;
  delivers: string[];
  includes: string[];
  includesLabel?: string;
  credibility?: string;
  cta: string;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());
  const [expandedAddonIndices, setExpandedAddonIndices] = useState<Set<number>>(new Set());

  const services: Service[] = [
    {
      title: 'AI Enablement & Adoption Workshops',
      subtitle: 'Build team confidence and competence with AI through practical training designed for real-world application.',
      idealFor: 'Teams facing uncertainty about where to start with AI in their workflow',
      delivers: [
        'Hands-on training',
        'Real use cases',
        'Responsible AI guidance',
      ],
      includes: [
        'Interactive workshops tailored to team roles',
        'Hands-on demonstrations of AI tools and use cases',
        'Guidance on responsible use and change readiness',
        'Confidence-building exercises',
        'Optional team-specific AI playbooks',
      ],
      credibility: '75+ AI enablement sessions delivered across industries.',
      cta: 'Book a Workshop',
    },
    {
      title: 'AI-Ready Communication Lab',
      subtitle: 'Transform how your organization talks about AI—reducing anxiety and building trust during transitions.',
      idealFor: 'Organizations struggling to explain AI changes to employees without causing anxiety or confusion',
      delivers: [
        'Messaging frameworks',
        'Talking points',
        'Clarity for internal communication',
      ],
      includes: [
        'Discovery session to understand communication gaps',
        'Custom framework for talking about AI with clarity and empathy',
        'Messaging templates and talking points',
        'Follow-up refinement session',
      ],
      cta: 'Start a Lab Session',
    },
    {
      title: 'Social Wealth Workshops & Coaching',
      subtitle: 'Turn relationships into your most valuable career asset with a proven framework for building authentic influence.',
      idealFor: 'Professionals who recognize networking matters but need a strategic framework to build authentic connections',
      delivers: [
        'Relationship mapping',
        'Trust-building tools',
        'Influence development',
      ],
      includes: [
        'TEDx-inspired keynote on Social Wealth',
        'Relational mapping exercises',
        'Tools for trust-building and influence',
        'Optional cohort or team coaching',
      ],
      cta: 'Build Social Wealth',
    },
    {
      title: 'Future-of-Work Keynotes & Strategy Sessions',
      subtitle: 'Move from inspiration to implementation with talks that energize and sessions that translate ideas into action.',
      idealFor: 'Organizations needing to energize teams around change while translating vision into concrete plans',
      delivers: [
        'High-impact insights',
        'Actionable next steps',
      ],
      includes: [
        'Keynote on AI readiness, mindset, and human-centered leadership',
        'Strategy session to translate insights into next steps',
        'Optional rollout plan or messaging guide',
      ],
      cta: 'Book a Speaking Engagement',
    },
    {
      title: 'Coaching for Individuals & Leaders',
      subtitle: 'Personalized support to break through obstacles, clarify your path forward, and lead with confidence during uncertainty.',
      idealFor: 'Leaders and high-performers feeling stuck or overwhelmed by rapid change in their industry',
      delivers: [
        'AI fluency',
        'Mindset development',
        'Communication',
        'Career strategy',
      ],
      includes: [
        'AI fluency and mindset development',
        'Leadership communication',
        'Navigating change and uncertainty',
        'Building Social Wealth for career mobility',
      ],
      includesLabel: 'Focus Areas',
      cta: 'Start Coaching',
    },
  ];

  const addonServices: Service[] = [
    {
      title: 'Executive Coaching for Leaders',
      subtitle: 'Make deposits with care. One-on-one guidance for executives who want to champion their teams through AI transformation while strengthening the relationships that drive real results.',
      idealFor: 'Executives leading through complex change',
      delivers: [
        'AI fluency',
        'Strategic communication',
        'Relationship management',
      ],
      includes: [
        'One-on-one coaching sessions',
        'Executive AI fluency building',
        'Leadership communication strategies',
        'Stakeholder buy-in navigation',
        'Personal leadership development',
      ],
      cta: 'Schedule a Session',
    },
    {
      title: 'Office Hours',
      subtitle: 'When people feel seen, they remember. Regular access for questions, guidance, and strategic thinking—a space where challenges become clarity.',
      idealFor: 'Teams seeking ongoing support and guidance',
      delivers: [
        'Continuous support',
        'Real-time guidance',
        'Team connection',
      ],
      includes: [
        'Scheduled open sessions',
        'Ad-hoc questions and guidance',
        'Real-time problem-solving',
        'Cross-team connection point',
        'Continuous learning and sharing',
      ],
      cta: 'Learn About Office Hours',
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-heading-main" className="text-3xl font-semibold text-ink mb-12">Our Services</h2>
          <div className="space-y-4">
            {services.map((service, index) => {
              const isExpanded = expandedIndices.has(index);
              const toggleExpanded = () => {
                const newSet = new Set(expandedIndices);
                if (isExpanded) {
                  newSet.delete(index);
                } else {
                  newSet.add(index);
                }
                setExpandedIndices(newSet);
              };
              return (
                <div
                  key={index}
                  className="bg-trueWhite border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <button
                    onClick={toggleExpanded}
                    className="w-full text-left px-6 py-5 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-inset"
                    aria-expanded={isExpanded}
                    aria-controls={`service-details-${index}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-ink mb-2">
                          {service.title}
                        </h3>
                        <p className="text-base text-slate mb-4 leading-relaxed">
                          {service.subtitle}
                        </p>
                        <p className="text-sm text-steel mb-3">
                          <span className="font-medium">Ideal For:</span> {service.idealFor}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.delivers.map((item, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-navy/5 text-navy"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-steel flex-shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>

                  <div
                    id={`service-details-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isExpanded}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-steel mb-3">
                          {service.includesLabel || 'What\'s Included'}
                        </h4>
                        <ul className="space-y-2">
                          {service.includes.map((item, i) => (
                            <li key={i} className="flex gap-3 text-slate leading-relaxed">
                              <span className="text-steel font-medium flex-shrink-0 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {service.credibility && (
                        <div className="mb-6 p-4 bg-navy/5 rounded-lg">
                          <p className="text-sm text-slate">
                            <span className="font-semibold text-navy">Track Record:</span>{' '}
                            {service.credibility}
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          window.scrollTo(0, 0);
                          onNavigate('contact');
                        }}
                        className="btn-secondary"
                      >
                        {service.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="addon-services-heading" className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="addon-services-heading" className="text-3xl font-semibold text-ink mb-3">Add-On Services</h2>
          <p className="text-lg text-slate mb-12 leading-relaxed">
            Complement your core engagement with additional support options designed for sustained momentum and deeper learning.
          </p>
          <div className="space-y-4">
            {addonServices.map((service, index) => {
              const isExpanded = expandedAddonIndices.has(index);
              const toggleExpanded = () => {
                const newSet = new Set(expandedAddonIndices);
                if (isExpanded) {
                  newSet.delete(index);
                } else {
                  newSet.add(index);
                }
                setExpandedAddonIndices(newSet);
              };
              return (
                <div
                  key={index}
                  className="bg-trueWhite border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <button
                    onClick={toggleExpanded}
                    className="w-full text-left px-6 py-5 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-inset"
                    aria-expanded={isExpanded}
                    aria-controls={`addon-service-details-${index}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-ink mb-2">
                          {service.title}
                        </h3>
                        <p className="text-base text-slate mb-4 leading-relaxed">
                          {service.subtitle}
                        </p>
                        <p className="text-sm text-steel mb-3">
                          <span className="font-medium">Ideal For:</span> {service.idealFor}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.delivers.map((item, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-navy/5 text-navy"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-steel flex-shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>

                  <div
                    id={`addon-service-details-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isExpanded}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-steel mb-3">
                          {service.includesLabel || 'What\'s Included'}
                        </h4>
                        <ul className="space-y-2">
                          {service.includes.map((item, i) => (
                            <li key={i} className="flex gap-3 text-slate leading-relaxed">
                              <span className="text-steel font-medium flex-shrink-0 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => {
                          window.scrollTo(0, 0);
                          onNavigate('contact');
                        }}
                        className="btn-secondary"
                      >
                        {service.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="who-we-work-with-heading" className="bg-softWhite py-16">
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
