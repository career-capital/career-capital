import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SectionWithContent } from '../../lib/supabase';

interface CTASectionProps {
  section: SectionWithContent;
}

export default function CTASection({ section }: CTASectionProps) {
  const navigate = useNavigate();

  const heading = section.content_blocks.find(b => b.block_type === 'heading');
  const paragraphs = section.content_blocks.filter(b => b.block_type === 'paragraph');

  const handleButtonClick = (button: any) => {
    if (button.link_type === 'external') {
      window.open(button.link_destination, '_blank', 'noopener,noreferrer');
    } else if (button.link_type === 'internal') {
      window.scrollTo(0, 0);
      navigate(button.link_destination);
    } else if (button.link_type === 'document') {
      window.open(button.link_destination, '_blank');
    }
  };

  return (
    <section
      aria-labelledby={`section-${section.id}`}
      className={`${section.background_color} ${section.text_color} ${section.padding}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {heading && (
            <h2 id={`section-${section.id}`} className="text-4xl md:text-5xl font-semibold mb-8 leading-tight">
              {heading.content}
            </h2>
          )}

          {paragraphs.length > 0 && (
            <div className="space-y-4 mb-8">
              {paragraphs
                .sort((a, b) => a.display_order - b.display_order)
                .map((p) => (
                  <p key={p.id} className="text-lg leading-relaxed opacity-80">
                    {p.content}
                  </p>
                ))}
            </div>
          )}

          {section.buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {section.buttons
                .sort((a, b) => a.display_order - b.display_order)
                .map((button) => (
                  <button
                    key={button.id}
                    onClick={() => handleButtonClick(button)}
                    className={button.style_variant}
                  >
                    {button.button_text}
                    {button.is_external ? (
                      <ExternalLink className="ml-2 w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    )}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
