import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SectionWithContent } from '../../lib/supabase';
import { getButtonStyleVariant } from '../../utils/buttonStyles';

interface ImageTextProps {
  section: SectionWithContent;
}

export default function ImageText({ section }: ImageTextProps) {
  const navigate = useNavigate();

  const heading = section.content_blocks.find(b => b.block_type === 'heading');
  const paragraphs = section.content_blocks.filter(b => b.block_type === 'paragraph');
  const image = section.content_blocks.find(b => b.block_type === 'image');

  const imagePosition = section.content_blocks.find(b => b.block_type === 'config')?.metadata?.image_position || 'left';

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

  const textContent = (
    <div className="flex-1">
      {heading && (
        <h2 className={`text-4xl font-semibold ${section.text_color} mb-6`}>
          {heading.content}
        </h2>
      )}

      {paragraphs.length > 0 && (
        <div className="space-y-4 mb-8">
          {paragraphs
            .sort((a, b) => a.display_order - b.display_order)
            .map((p) => (
              <p key={p.id} className={`text-base ${section.text_color === 'text-trueWhite' ? 'text-trueWhite/80' : 'text-slate'} leading-relaxed`}>
                {p.content}
              </p>
            ))}
        </div>
      )}

      {section.buttons.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4">
          {section.buttons
            .sort((a, b) => a.display_order - b.display_order)
            .map((button) => (
              <button
                key={button.id}
                onClick={() => handleButtonClick(button)}
                className={getButtonStyleVariant(button.button_type as 'primary' | 'secondary', section.background_color)}
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
  );

  const imageContent = image && (
    <div className="w-full lg:w-[450px] flex-shrink-0">
      <div className="overflow-hidden shadow-2xl">
        <img
          src={image.content}
          alt={image.metadata.alt || ''}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );

  return (
    <section
      aria-labelledby={`section-${section.id}`}
      className={`${section.background_color} ${section.padding}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {imagePosition === 'left' ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
