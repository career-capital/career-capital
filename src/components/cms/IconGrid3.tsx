import * as LucideIcons from 'lucide-react';
import { SectionWithContent } from '../../lib/supabase';

interface IconGrid3Props {
  section: SectionWithContent;
}

export default function IconGrid3({ section }: IconGrid3Props) {
  const sectionHeading = section.content_blocks.find(b => b.block_type === 'section_heading');
  const sectionSubheading = section.content_blocks.find(b => b.block_type === 'section_subheading');
  const items = section.content_blocks.filter(b => b.block_type === 'icon_item');

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Circle;
  };

  return (
    <section
      aria-labelledby={`section-${section.id}`}
      className={`${section.background_color} ${section.padding}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sectionHeading && (
          <div className="mb-16 text-center">
            <h2 id={`section-${section.id}`} className={`text-4xl font-semibold ${section.text_color} mb-4`}>
              {sectionHeading.content}
            </h2>
            {sectionSubheading && (
              <p className={`text-lg ${section.text_color === 'text-trueWhite' ? 'text-trueWhite/80' : 'text-slate'} max-w-3xl mx-auto leading-relaxed`}>
                {sectionSubheading.content}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {items
            .sort((a, b) => a.display_order - b.display_order)
            .map((item) => {
              const Icon = getIcon(item.metadata.icon || 'Circle');
              return (
                <div key={item.id}>
                  <div className="flex flex-col items-start h-full">
                    <div className="mb-6">
                      <Icon
                        className={`w-12 h-12 ${section.text_color === 'text-trueWhite' ? 'text-trueWhite' : 'text-navy'}`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className={`text-2xl font-semibold ${section.text_color} mb-4`}>
                      {item.metadata.title}
                    </h3>
                    <p className={`text-base ${section.text_color === 'text-trueWhite' ? 'text-trueWhite/80' : 'text-slate'} leading-relaxed`}>
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
