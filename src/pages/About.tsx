import { Heart, Target, Compass, ExternalLink } from 'lucide-react';

type Page = 'home' | 'services' | 'speaking' | 'about' | 'testimonials' | 'contact';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="bg-softWhite">
      <section
        aria-labelledby="about-heading"
        className="relative overflow-hidden bg-navy min-h-[350px]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/siteherojan2026_opac80.png)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <h1 id="about-heading" className="text-5xl md:text-6xl font-light text-trueWhite mb-6 leading-tight drop-shadow-lg">
            About
          </h1>
          <p className="text-xl text-trueWhite/95 mb-8 leading-relaxed drop-shadow-md">
            This work is grounded in real relationships, not hype.
          </p>
        </div>
      </section>

      <section aria-label="About Nisaini Rexach" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          <div>
            <div className="space-y-6 text-lg text-slate leading-relaxed">
              <p>
                Career Capital was founded on a simple observation: the organizations that will
                thrive in the age of AI aren't the ones with the most sophisticated technology—they're
                the ones that combine technical capability with strong human relationships.
              </p>
              <p>
                Through years of facilitating workshops, advising leaders, and speaking at conferences,
                I've seen firsthand how mindset shifts can transform an organization's approach to AI.
                When leaders move from fear to fluency, when teams learn to work with AI tools
                confidently, and when relationships remain strong through technological change—that's
                when real transformation happens.
              </p>
              <p>
                My work focuses on making AI accessible and practical while never losing sight of
                what makes organizations truly effective: trust, communication, and genuine human connection.
              </p>
            </div>

            <div className="space-y-6 text-lg text-slate leading-relaxed mt-8">
              <p>
                <a
                  href="https://www.linkedin.com/in/nisainirexach/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-navy hover:text-steel transition-colors font-medium"
                >
                  Nisaini Rexach
                  <ExternalLink className="w-4 h-4" aria-label="opens in new window" />
                </a>
                {" "}is a leader in social impact in big tech, specializing in Corporate Social Responsibility. As a Teach For America alum, her journey began with a deep curiosity for learning and a commitment to service—experiences that shaped her perspective and brought her to this space where she explores the intersection of generative AI and relationship building. Her professional experience spans Fortune 500 companies, startups, and community organizations—bringing both technical depth and relationship-building expertise to every engagement.
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
              />
            </picture>
          </div>
        </div>
        </div>
      </section>

      <section aria-labelledby="philosophy-heading" className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="philosophy-heading" className="text-3xl font-light text-ink mb-12">Core Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <Heart className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">
                Relationships Matter Most
              </h3>
              <p className="text-slate leading-relaxed">
                Technology amplifies human capability, but relationships create the foundation
                for sustainable success. Strong connections enable organizations to navigate
                change with resilience and clarity.
              </p>
            </div>

            <div className="space-y-4">
              <Target className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">
                Practical Over Theoretical
              </h3>
              <p className="text-slate leading-relaxed">
                AI guidance should be actionable, not abstract. Every strategy must translate
                into real capability building and tangible organizational improvement.
              </p>
            </div>

            <div className="space-y-4">
              <Compass className="w-12 h-12 text-navy" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-ink">
                Clarity Through Change
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
            <h2 id="cta-heading" className="text-3xl font-light mb-6">
              Let's work together
            </h2>
            <p className="text-lg text-trueWhite/90 mb-8">
              If you're ready to build AI fluency in your organization while strengthening
              relationships, I'd love to hear from you.
            </p>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigate('contact');
              }}
              className="btn-primary-on-dark"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
