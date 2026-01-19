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
            Bridging human relationships and AI‑ready communication.
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
                </a> is a strategic communicator, mentor, and main stage TEDxChicago speaker whose work sits at the intersection of relationship‑driven growth and AI‑ready communication. Her philosophy is rooted in the belief that careers accelerate when clarity, connection, and credibility work together—and she helps individuals and organizations build all three with intention.
              </p>
              <p>
                Her signature framework, How social wealth can transform your career, draws from lived experiences spanning Chicago's public housing to Fortune 500 boardrooms. It's a reminder that every encounter is an interview, every relationship is an asset, and every moment is an opportunity to shape how others experience you.
              </p>
              <p>
                Through Career Capital, Nisaini brings curiosity, structural agility, and relationship management to every engagement. She helps clients communicate with precision, strengthen their professional presence, and build the relational capital needed to thrive in an AI‑accelerating world.
              </p>
              <p>
                Whether she's coaching emerging leaders, advising executives, or speaking on national stages, Nisaini is committed to one thing: helping people show up with clarity, confidence, and purpose—so their work, their voice, and their impact carry further.
              </p>
            </div>
          </div>

          <div className="lg:aspect-[3/4] lg:overflow-hidden max-w-2xl lg:max-w-none">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet="/nisaini_rexach_headshot_2025 copy.jpg"
              />
              <img
                src="/nisaini_rexach_headshot_2025 copy copy.jpg"
                alt="Nisaini Rexach headshot"
                className="w-full h-full shadow-lg lg:object-cover lg:object-[center_20%]"
                loading="lazy"
              />
            </picture>
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
                Relationships matter most
              </h3>
              <p className="text-slate leading-relaxed">
                Technology amplifies human capability, but relationships create the foundation
                for sustainable success. Strong connections enable organizations to navigate
                change with resilience and clarity.
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

      <section aria-labelledby="cta-heading" className="bg-navy text-trueWhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="cta-heading" className="text-4xl md:text-5xl font-semibold text-softWhite mb-6">
              Let's work together
            </h2>
            <p className="text-lg text-trueWhite/90 mb-8">
              If you're ready to build AI fluency in your organization while strengthening
              relationships, we'd love to hear from you.
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
