import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SectionWithContent } from '../../lib/supabase';

interface HeroBannerProps {
  section: SectionWithContent;
}

export default function HeroBanner({ section }: HeroBannerProps) {
  const navigate = useNavigate();

  const heading = section.content_blocks.find(b => b.block_type === 'heading');
  const subheading = section.content_blocks.find(b => b.block_type === 'subheading');
  const paragraph = section.content_blocks.find(b => b.block_type === 'paragraph');
  const badges = section.content_blocks.filter(b => b.block_type === 'badge');
  const backgroundImage = section.content_blocks.find(b => b.block_type === 'background_image');

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
      aria-label={heading?.content || 'Hero section'}
      className={`relative overflow-hidden ${section.background_color} min-h-[600px]`}
    >
      {backgroundImage && (
        <picture className="absolute inset-0">
          {backgroundImage.metadata.desktop && (
            <source
              media="(min-width: 1024px)"
              srcSet={backgroundImage.metadata.desktop}
              type="image/webp"
            />
          )}
          {backgroundImage.metadata.tablet && (
            <source
              media="(min-width: 640px)"
              srcSet={backgroundImage.metadata.tablet}
              type="image/webp"
            />
          )}
          <img
            src={backgroundImage.metadata.fallback || backgroundImage.content}
            alt=""
            className="w-full h-full object-cover object-right sm:object-center"
            loading="eager"
          />
        </picture>
      )}

      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${section.padding}`}>
        {heading && (
          <h1 className={`text-5xl md:text-6xl font-semibold ${section.text_color} mb-6 leading-tight drop-shadow-lg`}>
            <span dangerouslySetInnerHTML={{ __html: heading.content }} />
          </h1>
        )}

        {subheading && (
          <p className={`text-2xl md:text-3xl ${section.text_color}/95 mb-4 leading-relaxed drop-shadow-md font-medium`}>
            {subheading.content}
          </p>
        )}

        {paragraph && (
          <p className={`text-lg ${section.text_color}/90 mb-10 leading-relaxed drop-shadow-md max-w-3xl`}>
            {paragraph.content}
          </p>
        )}

        {section.buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-28">
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

        {badges.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {badges
              .sort((a, b) => a.display_order - b.display_order)
              .map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center px-4 py-2 bg-trueWhite/20 backdrop-blur-md border-2 border-trueWhite text-trueWhite text-sm font-medium"
                >
                  {badge.content}
                </span>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
