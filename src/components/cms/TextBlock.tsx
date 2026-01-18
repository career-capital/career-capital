import { SectionWithContent } from '../../lib/supabase';

interface TextBlockProps {
  section: SectionWithContent;
}

export default function TextBlock({ section }: TextBlockProps) {
  const heading = section.content_blocks.find(b => b.block_type === 'heading');
  const subheading = section.content_blocks.find(b => b.block_type === 'subheading');
  const paragraphs = section.content_blocks.filter(b => b.block_type === 'paragraph');

  return (
    <section
      aria-labelledby={`section-${section.id}`}
      className={`${section.background_color} ${section.padding}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {heading && (
            <h2 id={`section-${section.id}`} className={`text-4xl font-semibold ${section.text_color} mb-4`}>
              {heading.content}
            </h2>
          )}

          {subheading && (
            <p className={`text-xl ${section.text_color === 'text-trueWhite' ? 'text-trueWhite/80' : 'text-slate'} mb-8 leading-relaxed`}>
              {subheading.content}
            </p>
          )}

          {paragraphs.length > 0 && (
            <div className="space-y-6">
              {paragraphs
                .sort((a, b) => a.display_order - b.display_order)
                .map((p) => (
                  <p key={p.id} className={`text-base ${section.text_color === 'text-trueWhite' ? 'text-trueWhite/80' : 'text-slate'} leading-relaxed`}>
                    {p.content}
                  </p>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
