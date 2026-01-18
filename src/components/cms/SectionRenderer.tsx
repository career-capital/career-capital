import { SectionWithContent } from '../../lib/supabase';
import HeroBanner from './HeroBanner';
import IconGrid3 from './IconGrid3';
import CTASection from './CTASection';
import TextBlock from './TextBlock';
import ImageText from './ImageText';

interface SectionRendererProps {
  section: SectionWithContent;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  if (!section.is_published) {
    return null;
  }

  switch (section.section_type) {
    case 'hero_banner':
      return <HeroBanner section={section} />;

    case 'icon_grid_3':
      return <IconGrid3 section={section} />;

    case 'cta':
      return <CTASection section={section} />;

    case 'text_block':
      return <TextBlock section={section} />;

    case 'image_text':
      return <ImageText section={section} />;

    default:
      console.warn(`Unknown section type: ${section.section_type}`);
      return null;
  }
}
