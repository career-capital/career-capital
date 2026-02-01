import { Users, Lightbulb, ArrowRight, ExternalLink, Mic, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Speaking() {
  const navigate = useNavigate();
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  const topics = [
    {
      title: 'From AI Awareness to AI Advantage',
      description: 'The organizations that master AI now will dominate their markets tomorrow. Learn how to move from reactive adoption to strategic competitive advantage.',
      content: [
        'Why AI fluency is now a business imperative',
        'Moving from experimentation to strategic implementation',
        'Building capabilities that scale across operations',
        'Creating competitive advantage through AI adoption',
      ],
    },
    {
      title: 'AI Fluency for Leadership',
      description: 'Leaders don\'t need to code—but they must understand AI well enough to make strategic decisions, guide teams confidently, and champion transformation.',
      content: [
        'Executive-level AI fluency (no technical background required)',
        'Evaluating opportunities, risks, and ROI',
        'Leading teams through AI adoption with clarity',
        'Navigating the hype cycle and making informed decisions',
      ],
    },
    {
      title: 'Leading AI Transformation Without Losing Your Culture',
      description: 'Build technical capability while maintaining organizational values. Practical approaches to AI adoption that strengthen culture rather than erode it.',
      content: [
        'Assessing organizational AI readiness',
        'Change management strategies for sustainable adoption',
        'Balancing rapid implementation with team trust',
        'Building psychological safety during technological change',
      ],
    },
    {
      title: 'Scaling AI Capabilities Across Your Organization',
      description: 'Moving beyond pilot programs to enterprise-wide AI fluency. Practical roadmaps for scaling adoption, standardizing practices, and maximizing impact.',
      content: [
        'From isolated use cases to strategic implementation',
        'Building AI playbooks and standardized practices',
        'Cross-functional alignment and capability building',
        'Measuring success and ROI at scale',
      ],
    },
  ];

  return (
    <div className="bg-softWhite">
      <section
        aria-labelledby="speaking-page-heading"
        className="relative overflow-hidden bg-navy"
      >
        <div className="absolute inset-0">
          <img
            src="/banner_speaking_desktop.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <h1 id="speaking-page-heading" className="text-5xl md:text-6xl font-semibold text-trueWhite mb-6 leading-tight drop-shadow-lg">
            Speaking & Workshops
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            Energize teams and align leadership around AI transformation with keynotes, workshops, and strategy sessions that deliver actionable frameworks and immediate clarity.
          </p>
        </div>
      </section>

      <section aria-labelledby="formats-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="formats-heading" className="text-4xl md:text-5xl font-medium text-ink mb-12">Engagement Formats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Mic className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-xl font-medium text-ink">Keynote Speeches</h3>
              <p className="text-slate leading-relaxed">
                45-60 minute presentations for conferences, leadership summits, and
                corporate events.
              </p>
            </div>

            <div className="space-y-4">
              <Users className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-xl font-medium text-ink">Workshops</h3>
              <p className="text-slate leading-relaxed">
                Half-day or full-day interactive sessions for leadership teams and
                departments building AI capability.
              </p>
            </div>

            <div className="space-y-4">
              <Lightbulb className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
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
          <h2 id="topics-heading" className="text-4xl md:text-5xl font-medium text-ink mb-3">Speaking Topics</h2>
          <p className="text-lg text-slate mb-12 leading-relaxed">
            Customizable keynotes and workshops focused on AI transformation, strategic implementation, and leadership in technological change.
          </p>
          <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {topics.map((topic, index) => {
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
                    aria-controls={`topic-details-${index}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-ink mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-base text-slate leading-relaxed">
                          {topic.description}
                        </p>
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
                    id={`topic-details-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isExpanded}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-navy/20">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-steel mb-3">
                          Key Themes
                        </h4>
                        <ul className="space-y-2">
                          {topic.content.map((item, i) => (
                            <li key={i} className="flex gap-3 text-slate leading-relaxed">
                              <span className="text-steel font-medium flex-shrink-0 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </section>

      <section aria-labelledby="speaking-cta-heading" className="bg-navy text-trueWhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 id="speaking-cta-heading" className="text-4xl md:text-5xl font-medium text-softWhite mb-6">
              TEDxChicago Main Stage Speaker
            </h2>
            <p className="text-lg text-trueWhite/95 leading-relaxed">
              See Nisaini in action—proven stage presence, compelling storytelling, and frameworks that audiences can immediately apply to their work.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <p className="text-lg text-trueWhite/90 leading-relaxed mb-4">
                This TEDx talk demonstrates the speaking style and practical frameworks Nisaini brings to every engagement.
                Through personal stories and strategic insights, she explores how intentional relationship-building becomes
                career capital—a foundation that's even more critical as AI transforms how we work.
              </p>
              <p className="text-lg text-trueWhite/90 leading-relaxed mb-4">
                <strong className="text-trueWhite">What this shows about working with Nisaini:</strong> Clear communication,
                actionable frameworks, authentic storytelling, and the ability to connect complex concepts to real-world application.
              </p>
              <p className="text-lg text-trueWhite/90 leading-relaxed mb-8">
                <strong className="text-trueWhite">Why this matters in the AI era:</strong> As technology handles more routine tasks,
                the ability to build genuine connections, communicate with clarity, and lead through change becomes your competitive advantage.
                Nisaini brings this perspective to every AI transformation conversation.
              </p>
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/contact');
                }}
                className="btn-primary-on-dark w-full sm:w-auto"
              >
                Book for Your Event
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </button>
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

      <section aria-labelledby="publications-heading" className="bg-softWhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="publications-heading" className="text-4xl md:text-5xl font-medium text-ink mb-4">
            Featured In
          </h2>
          <p className="text-lg text-slate mb-12 max-w-3xl">
            Insights on leadership, social impact, and building meaningful connections.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="card-info group">
              <a
                href="https://chicago.suntimes.com/other-views/2024/12/24/philanthropy-more-than-writing-check-teach-for-america-access-kids-young-people-nisaini-rexach"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
                aria-label="Read article: Philanthropy is about more than writing a check (opens in new window)"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-5 h-5 text-navy flex-shrink-0 group-hover:text-steel transition-colors" aria-hidden="true" />
                  <span className="text-sm font-medium text-navy uppercase tracking-wide">Chicago Sun-Times</span>
                </div>
                <h3 className="text-lg font-medium text-ink mb-2 group-hover:text-navy transition-colors">
                  Philanthropy is about more than writing a check
                </h3>
                <p className="text-sm text-slate">
                  Exploring the deeper meaning of giving back through relationship-building and community engagement.
                </p>
                <span className="sr-only">(opens in new window)</span>
              </a>
            </article>

            <article className="card-info group">
              <a
                href="https://www.chicagobusiness.com/people-on-the-move/nisaini-rexach"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
                aria-label="Read article: Nisaini Rexach at Teach For America (opens in new window)"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-5 h-5 text-navy flex-shrink-0 group-hover:text-steel transition-colors" aria-hidden="true" />
                  <span className="text-sm font-medium text-navy uppercase tracking-wide">Crain's Chicago Business</span>
                </div>
                <h3 className="text-lg font-medium text-ink mb-2 group-hover:text-navy transition-colors">
                  Nisaini Rexach at Teach For America
                </h3>
                <p className="text-sm text-slate">
                  Profile highlighting leadership in education and commitment to expanding opportunities for Chicago youth.
                </p>
                <span className="sr-only">(opens in new window)</span>
              </a>
            </article>

            <article className="card-info group">
              <a
                href="https://chitechforgood.com/f/nisaini-rexach-pioneering-a-new-era-of-social-impact-in-chicago"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
                aria-label="Read article: Nisaini Rexach - Pioneering a New Era of Social Impact in Chicago (opens in new window)"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-5 h-5 text-navy flex-shrink-0 group-hover:text-steel transition-colors" aria-hidden="true" />
                  <span className="text-sm font-medium text-navy uppercase tracking-wide">Chi Tech for Good</span>
                </div>
                <h3 className="text-lg font-medium text-ink mb-2 group-hover:text-navy transition-colors">
                  Nisaini Rexach: Pioneering a New Era of Social Impact in Chicago
                </h3>
                <p className="text-sm text-slate">
                  Feature on innovative approaches to social change and technology's role in community transformation.
                </p>
                <span className="sr-only">(opens in new window)</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="differentiators-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md">
            <h2 id="differentiators-heading" className="text-4xl md:text-5xl font-medium text-ink mb-4">What Makes This Different</h2>
          </div>
          <p className="text-xl text-slate mb-12">Practical, actionable insights designed for real-world implementation and lasting organizational impact.</p>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <div className="flex gap-6 relative items-stretch">
                <div className="relative flex-shrink-0 w-3">
                  <div className="w-3 h-3 rounded-full bg-navy relative z-10 mt-[0.4rem]"></div>
                  <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg text-ink mb-2">Practical over theoretical</h3>
                  <p className="text-slate leading-relaxed">
                    Every presentation delivers actionable frameworks your team can implement immediately—not abstract concepts that sit in notebooks. You'll leave with clear next steps and tools you can use right away.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative items-stretch">
                <div className="relative flex-shrink-0 w-3">
                  <div className="w-3 h-3 rounded-full bg-navy relative z-10 mt-[0.4rem]"></div>
                  <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg text-ink mb-2">Customized to your context</h3>
                  <p className="text-slate leading-relaxed">
                    No generic presentations. Every keynote and workshop is tailored to your organization's specific challenges, industry context, and current AI maturity level—because what resonates for one audience won't work for another.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative items-stretch">
                <div className="relative flex-shrink-0 w-3">
                  <div className="w-3 h-3 rounded-full bg-navy relative z-10 mt-[0.4rem]"></div>
                  <div className="absolute left-[5px] top-[2rem] bottom-[0.5rem] w-0.5 bg-border"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-lg text-ink mb-2">Capability building, not inspiration alone</h3>
                  <p className="text-slate leading-relaxed">
                    Energizing your team matters—but building lasting capability matters more. Sessions focus on developing AI fluency and strategic thinking that compounds long after the event ends.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 relative items-start">
                <div className="w-3 h-3 rounded-full bg-navy flex-shrink-0 mt-[0.4rem]"></div>
                <div>
                  <h3 className="text-lg text-ink mb-2">Real implementation support</h3>
                  <p className="text-slate leading-relaxed">
                    Optional follow-up strategy sessions ensure your team can translate insights into action. We can help bridge the gap between inspiration and implementation with ongoing support.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[500px] flex-shrink-0">
              <div className="overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src="/public-speaking.jpg"
                  alt="Nisaini Rexach presenting at podium"
                  className="w-full h-full object-cover object-[40%_center]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="final-cta-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="final-cta-heading" className="text-4xl md:text-5xl font-medium text-ink mb-6">
              Ready to energize your team around AI transformation?
            </h2>
            <p className="text-xl text-slate leading-relaxed mb-8">
              Let's discuss how a keynote, workshop, or strategy session can help your organization build AI capabilities, align leadership, and accelerate transformation.
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
              className="btn-primary w-full sm:w-auto"
            >
              Discuss Your Event
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
