import { ArrowRight, ChevronDown, Users, Lightbulb, Building2, Network } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function Services() {
  const navigate = useNavigate();
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());
  const [expandedAddonIndices, setExpandedAddonIndices] = useState<Set<number>>(new Set());

  const services: Service[] = [
    {
      title: 'AI Enablement & Adoption Workshops',
      subtitle: 'Build team confidence and AI fluency through practical, hands-on training that drives immediate business impact.',
      idealFor: 'Teams at any fluency level looking to accelerate AI adoption and scale capabilities across operations',
      delivers: [
        'Hands-on training',
        'Real use cases',
        'Immediate implementation',
      ],
      includes: [
        'Interactive workshops customized by team role and current fluency level',
        'Hands-on demonstrations of AI tools with relevant business use cases',
        'Practical frameworks for responsible AI implementation',
        'Team-specific AI playbooks and workflow integration strategies',
        'Post-workshop resources and implementation support',
      ],
      credibility: '75+ AI enablement sessions delivered across industries.',
      cta: 'Book a Workshop',
    },
    {
      title: 'AI Strategy Development & Implementation',
      subtitle: 'End-to-end consulting to integrate AI into your operations, scale capabilities across departments, and maximize ROI.',
      idealFor: 'Organizations ready to move beyond experimentation to strategic, enterprise-wide AI transformation',
      delivers: [
        'Strategic roadmap',
        'Implementation support',
        'Capability scaling',
      ],
      includes: [
        'Current state assessment and capability audit',
        'Customized AI adoption roadmap aligned to business objectives',
        'Department-by-department implementation planning',
        'Change management and stakeholder alignment support',
        'Success metrics and ROI tracking framework',
      ],
      cta: 'Start Strategic Planning',
    },
    {
      title: 'AI-Ready Communication & Change Management',
      subtitle: 'Navigate the human side of AI adoption. Build organizational readiness, accelerate buy-in, and communicate transformation with clarity.',
      idealFor: 'Organizations implementing AI changes and needing to align teams, reduce anxiety, and drive sustainable adoption',
      delivers: [
        'Messaging frameworks',
        'Change readiness',
        'Stakeholder alignment',
      ],
      includes: [
        'Discovery session to identify communication gaps and resistance points',
        'Custom messaging framework for internal AI communication',
        'Stakeholder mapping and engagement strategy',
        'Leadership communication templates and talking points',
        'Follow-up support during implementation phases',
      ],
      cta: 'Build Communication Strategy',
    },
    {
      title: 'Keynote Speaking & Executive Briefings',
      subtitle: 'Energize teams and align leadership around AI transformation with high-impact presentations that inspire action.',
      idealFor: 'Organizations launching AI initiatives or needing to build momentum around transformation at key inflection points',
      delivers: [
        'Inspirational insights',
        'Strategic context',
        'Actionable takeaways',
      ],
      includes: [
        'Customized keynote on AI leadership, transformation, and competitive advantage',
        'Executive briefing on AI strategy and organizational readiness',
        'Q&A and breakout sessions for deeper engagement',
        'Optional strategy session to translate insights into action plans',
      ],
      cta: 'Book a Speaking Engagement',
    },
    {
      title: 'Executive Coaching for AI Leadership',
      subtitle: 'One-on-one guidance for leaders championing AI transformation while maintaining team trust and organizational culture.',
      idealFor: 'Executives leading complex AI initiatives and needing strategic support to navigate transformation confidently',
      delivers: [
        'AI fluency',
        'Strategic communication',
        'Change leadership',
      ],
      includes: [
        'Executive-level AI fluency building',
        'Leadership communication strategies for AI transformation',
        'Stakeholder management and buy-in navigation',
        'Personal leadership development through technological change',
        'Ongoing support during critical implementation phases',
      ],
      includesLabel: 'Focus Areas',
      cta: 'Start Coaching',
    },
  ];

  const addonServices: Service[] = [
    {
      title: 'AI Implementation Office Hours',
      subtitle: 'Ongoing support for teams actively implementing AI. Regular access for questions, troubleshooting, and strategic guidance as challenges emerge.',
      idealFor: 'Teams mid-implementation seeking continuous support without full consulting engagements',
      delivers: [
        'Continuous support',
        'Real-time guidance',
        'Implementation momentum',
      ],
      includes: [
        'Scheduled monthly or bi-weekly open sessions',
        'Ad-hoc questions on AI tools, workflows, and adoption challenges',
        'Real-time problem-solving and strategic troubleshooting',
        'Cross-functional team alignment support',
        'Best practice sharing and continuous learning',
      ],
      cta: 'Learn About Office Hours',
    },
    {
      title: 'AI Playbook Development',
      subtitle: 'Custom documentation that captures your organization\'s AI standards, use cases, and implementation guidelines for sustainable scaling.',
      idealFor: 'Organizations needing standardized AI practices to scale adoption across multiple teams or departments',
      delivers: [
        'Custom playbooks',
        'Standardized practices',
        'Scalable frameworks',
      ],
      includes: [
        'Discovery sessions to document current AI use cases and workflows',
        'Development of organization-specific AI implementation playbooks',
        'Best practices, templates, and decision frameworks',
        'Guidelines for responsible AI use and governance',
        'Training materials for rolling out playbooks to new teams',
      ],
      cta: 'Create Your Playbook',
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
          <h1 id="services-heading" className="text-5xl md:text-6xl font-semibold text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Services
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md max-w-4xl">
            We help organizations build AI fluency and AI‑ready mindsets so their people can work confidently with AI and thrive in an Analog + AI world.
          </p>
        </div>
      </section>

      <section aria-labelledby="who-we-work-with-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="who-we-work-with-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-4">
            Who We Work With
          </h2>
          <p className="text-xl text-slate mb-12 leading-relaxed max-w-4xl">
            Career Capital partners with organizations at every stage of AI maturity—helping teams develop AI fluency, build AI‑ready mindsets, and scale learning across the business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Lightbulb className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">Leadership Teams</h3>
                <p className="text-base text-slate leading-relaxed">
                  Executives and managers championing AI transformation while maintaining team trust, driving strategic adoption, and building organizational readiness.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Network className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">Operational Teams</h3>
                <p className="text-base text-slate leading-relaxed">
                  Departments and workgroups implementing AI tools into daily workflows, scaling capabilities, and building team-wide fluency for competitive advantage.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Building2 className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">Enterprise Organizations</h3>
                <p className="text-base text-slate leading-relaxed">
                  Companies pursuing enterprise-wide AI transformation, standardizing practices across multiple teams, and maximizing ROI on AI investments.
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-start h-full">
                <div className="mb-6">
                  <Users className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-ink mb-4">Innovation-Focused Businesses</h3>
                <p className="text-base text-slate leading-relaxed">
                  Forward-thinking organizations using AI to accelerate product development, improve operations, and establish market leadership through technology adoption.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
              className="btn-primary"
            >
              Let's Talk
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-heading-main" className="py-16 bg-softWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-heading-main" className="text-4xl md:text-5xl font-semibold text-ink mb-4">Our Services</h2>
          <p className="text-xl text-slate mb-12 leading-relaxed">
            Practical training, human‑centered enablement, and strategic guidance to help organizations build AI fluency and turn AI into a sustainable competitive advantage.
          </p>
          <div className="max-w-4xl mx-auto">
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
                  className="bg-trueWhite border border-navy/20 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
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
                    <div className="px-6 pb-6 pt-2 border-t border-navy/20">
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
                          navigate('/contact');
                        }}
                        className="btn-secondary"
                      >
                        {service.cta}
                        <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>

          <div className="mt-16">
            <h2 id="addon-services-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-4">Add-On Services</h2>
            <p className="text-xl text-slate mb-12 leading-relaxed">
              Complement your core engagement with additional support options designed for sustained momentum and deeper learning.
            </p>
            <div className="max-w-4xl mx-auto">
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
                  className="bg-trueWhite border border-navy/20 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
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
                    <div className="px-6 pb-6 pt-2 border-t border-navy/20">
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
                          navigate('/contact');
                        }}
                        className="btn-secondary"
                      >
                        {service.cta}
                        <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-engagements-work-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="how-engagements-work-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-4">
            How Engagements Work
          </h2>
          <p className="text-xl text-slate mb-12 leading-relaxed">
            A straightforward, collaborative process designed to get you results quickly.
          </p>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <div className="flex gap-6 relative items-stretch">
                <div className="relative flex-shrink-0 w-3">
                  <div className="w-3 h-3 rounded-full bg-navy relative z-10 mt-[0.4rem]"></div>
                  <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-ink mb-2">1. Discovery Conversation</h3>
                  <p className="text-slate leading-relaxed">
                    We start with a focused discussion to understand where you are with AI, what you want to achieve, and what challenges stand in your way. This helps us design the right engagement for your needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative items-stretch">
                <div className="relative flex-shrink-0 w-3">
                  <div className="w-3 h-3 rounded-full bg-navy relative z-10 mt-[0.4rem]"></div>
                  <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-ink mb-2">2. Customized Engagement Design</h3>
                  <p className="text-slate leading-relaxed">
                    Based on your goals and current state, we design a customized program—whether that's a workshop series, strategic consulting, or ongoing implementation support. Every engagement is tailored to your organization.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative items-stretch">
                <div className="relative flex-shrink-0 w-3">
                  <div className="w-3 h-3 rounded-full bg-navy relative z-10 mt-[0.4rem]"></div>
                  <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-ink mb-2">3. Hands-On Implementation</h3>
                  <p className="text-slate leading-relaxed">
                    We work alongside your team to build real AI capabilities—not just deliver presentations. You'll see immediate progress through practical training, strategic guidance, and actionable frameworks you can use right away.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative items-start">
                <div className="w-3 h-3 rounded-full bg-navy flex-shrink-0 mt-[0.4rem]"></div>
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-2">4. Sustained Momentum</h3>
                  <p className="text-slate leading-relaxed">
                    After initial implementation, we provide ongoing support options to ensure your team maintains momentum, addresses new challenges, and continues building AI fluency as your capabilities mature.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[500px] flex-shrink-0">
              <div className="overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src="/workshop-facilitation.webp"
                  alt="Workshop facilitation session"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-cta-heading" className="bg-navy text-trueWhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="services-cta-heading" className="text-4xl md:text-5xl font-semibold text-softWhite mb-6">
              Ready to build AI fluency across your organization?
            </h2>
            <p className="text-lg text-trueWhite/90 mb-8">
              Let's discuss how we can help your teams develop AI‑ready mindsets, scale learning, and thrive in an Analog + AI world.
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
              className="btn-primary-on-dark w-full sm:w-auto"
            >
              Start a Conversation
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
