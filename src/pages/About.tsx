import { Heart, Target, Compass, ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="bg-softWhite">
      <section
        aria-labelledby="about-heading"
        className="relative overflow-hidden bg-navy"
      >
        <div className="absolute inset-0">
          <img
            src="/banner_about_desktop.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <h1 id="about-heading" className="text-5xl md:text-6xl font-semibold text-trueWhite mb-6 leading-tight drop-shadow-lg">
            About
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            Building AI fluency through clear communication and strategic change leadership.
          </p>
        </div>
      </section>

      <section aria-labelledby="problem-heading" className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="problem-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-6">
            The Problem We Solve
          </h2>
          <p className="text-lg text-slate leading-relaxed mb-6 max-w-4xl">
            AI is reshaping work faster than most people and organizations can adapt.
          </p>
          <p className="text-lg text-slate leading-relaxed mb-6 max-w-4xl">
            Teams are unsure what AI means for their roles. Leaders struggle to communicate change with empathy. Individuals feel pressure to stay relevant without a roadmap. Organizations want to modernize without losing their culture.
          </p>
          <p className="text-lg text-slate leading-relaxed max-w-4xl">
            Career Capital helps build the mindsets, relationships, and AI fluency needed to navigate this shift—without losing the human side of work.
          </p>
        </div>
      </section>

      <section aria-labelledby="nisaini-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="nisaini-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-8">Meet the Founder</h2>
          <div className="flex flex-wrap gap-3 mb-12">
            <span className="inline-flex items-center px-4 py-2 bg-navy/5 border-2 border-navy/30 text-navy text-sm font-medium">
              TEDxChicago Main Stage Speaker
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-navy/5 border-2 border-navy/30 text-navy text-sm font-medium">
              Fortune 100 Experience
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-navy/5 border-2 border-navy/30 text-navy text-sm font-medium">
              Social Impact Leader
            </span>
          </div>
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          <div>
            <div className="space-y-6 text-lg text-slate leading-relaxed">
              <p>
                <a
                  href="https://www.linkedin.com/in/nisainirexach/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-navy hover:text-steel inline-flex items-center gap-1"
                  aria-label="Nisaini Rexach's LinkedIn profile (opens in new window)"
                >
                  Nisaini Rexach<ExternalLink className="w-4 h-4" aria-hidden="true" /><span className="sr-only"> (opens in new window)</span>
                </a> is an AI transformation strategist, organizational change expert, and main stage TEDxChicago speaker who helps organizations navigate the intersection of technological advancement and human capability. Her approach combines AI fluency building with change leadership—ensuring teams adopt new capabilities while maintaining trust, culture, and strategic clarity.
              </p>
              <p>
                With experience spanning Fortune 500 companies and mission-driven organizations, Nisaini understands that successful AI transformation isn't just about technology—it's about people, communication, and organizational readiness. She translates complex AI concepts into practical frameworks that leaders and teams can implement immediately.
              </p>
              <p>
                Through Career Capital, Nisaini delivers comprehensive AI enablement: from hands-on training workshops and strategic implementation consulting to executive coaching and keynote presentations. She helps organizations at every AI maturity level build capabilities, scale adoption, and achieve competitive advantage.
              </p>
              <p>
                Whether she's training operational teams, advising executives, or speaking on national stages, Nisaini is committed to one thing: helping organizations transform AI potential into measurable business results—with clarity, confidence, and sustainable momentum.
              </p>
            </div>
          </div>

          <div className="lg:aspect-[3/4] lg:overflow-hidden max-w-2xl lg:max-w-none">
            <img
              src="/nisaini_rexach_headshot_2025.jpg"
              alt="Nisaini Rexach, Founder of Career Capital"
              className="w-full h-full shadow-lg lg:object-cover lg:object-[center_20%]"
              loading="lazy"
            />
          </div>
        </div>
        </div>
      </section>

      <section aria-labelledby="philosophy-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="philosophy-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-12">Core Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <Heart className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-xl font-medium text-ink">
                Human trust powers AI adoption
              </h3>
              <p className="text-slate leading-relaxed">
                AI capabilities scale faster when leaders communicate with clarity and teams
                trust the transformation process. Strong organizational relationships create
                the foundation for sustainable AI adoption and lasting competitive advantage.
              </p>
            </div>

            <div className="space-y-4">
              <Target className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-xl font-medium text-ink">
                Practical over theoretical
              </h3>
              <p className="text-slate leading-relaxed">
                AI guidance should be actionable, not abstract. Every strategy must translate
                into real capability building and tangible organizational improvement.
              </p>
            </div>

            <div className="space-y-4">
              <Compass className="w-12 h-12 text-navy" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-xl font-medium text-ink">
                Clarity through change
              </h3>
              <p className="text-slate leading-relaxed">
                Technological transformation doesn't have to be chaotic. With the right guidance,
                organizations can build AI fluency while maintaining their values and culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="publications-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="publications-heading" className="text-4xl md:text-5xl font-semibold text-ink mb-4">
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

      <section aria-labelledby="cta-heading" className="bg-navy text-trueWhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="cta-heading" className="text-4xl md:text-5xl font-semibold text-softWhite mb-6">
              Let's work together
            </h2>
            <p className="text-lg text-trueWhite/90 mb-8">
              If you're ready to build AI fluency across your organization while leading
              transformation with clarity and confidence, we'd love to hear from you.
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
              className="btn-primary-on-dark w-full sm:w-auto"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
