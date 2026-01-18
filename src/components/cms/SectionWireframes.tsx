interface WireframeProps {
  sectionType: string;
  className?: string;
}

export default function SectionWireframe({ sectionType, className = '' }: WireframeProps) {
  const wireframes: Record<string, JSX.Element> = {
    hero_banner: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#1E3A5F" rx="4"/>
        <rect x="20" y="30" width="160" height="12" fill="#FFFFFF" opacity="0.9" rx="2"/>
        <rect x="40" y="48" width="120" height="6" fill="#FFFFFF" opacity="0.7" rx="1"/>
        <rect x="50" y="60" width="100" height="5" fill="#FFFFFF" opacity="0.6" rx="1"/>
        <rect x="30" y="75" width="35" height="18" fill="#FFFFFF" opacity="0.2" rx="9"/>
        <rect x="70" y="75" width="35" height="18" fill="#FFFFFF" opacity="0.2" rx="9"/>
        <rect x="110" y="75" width="35" height="18" fill="#FFFFFF" opacity="0.2" rx="9"/>
        <text x="100" y="13" fontSize="8" fill="#FFFFFF" opacity="0.5" textAnchor="middle">Hero with Image</text>
      </svg>
    ),

    icon_grid_3: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#F8F9FA" rx="4"/>
        <rect x="60" y="10" width="80" height="8" fill="#1E3A5F" opacity="0.8" rx="2"/>
        <circle cx="35" cy="50" r="8" stroke="#1E3A5F" strokeWidth="2" opacity="0.6"/>
        <rect x="20" y="65" width="30" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="20" y="72" width="30" height="3" fill="#64748B" opacity="0.4" rx="1"/>
        <rect x="20" y="78" width="25" height="3" fill="#64748B" opacity="0.4" rx="1"/>
        <circle cx="100" cy="50" r="8" stroke="#1E3A5F" strokeWidth="2" opacity="0.6"/>
        <rect x="85" y="65" width="30" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="85" y="72" width="30" height="3" fill="#64748B" opacity="0.4" rx="1"/>
        <rect x="85" y="78" width="25" height="3" fill="#64748B" opacity="0.4" rx="1"/>
        <circle cx="165" cy="50" r="8" stroke="#1E3A5F" strokeWidth="2" opacity="0.6"/>
        <rect x="150" y="65" width="30" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="150" y="72" width="30" height="3" fill="#64748B" opacity="0.4" rx="1"/>
        <rect x="150" y="78" width="25" height="3" fill="#64748B" opacity="0.4" rx="1"/>
        <text x="100" y="105" fontSize="7" fill="#64748B" opacity="0.5" textAnchor="middle">3 Icon Cards</text>
      </svg>
    ),

    cta: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#1E3A5F" rx="4"/>
        <rect x="40" y="35" width="120" height="10" fill="#FFFFFF" opacity="0.9" rx="2"/>
        <rect x="50" y="52" width="100" height="5" fill="#FFFFFF" opacity="0.7" rx="1"/>
        <rect x="55" y="60" width="90" height="4" fill="#FFFFFF" opacity="0.6" rx="1"/>
        <rect x="50" y="75" width="45" height="16" fill="#FFFFFF" opacity="0.9" rx="8"/>
        <rect x="105" y="75" width="45" height="16" fill="#FFFFFF" opacity="0.3" rx="8"/>
        <text x="100" y="13" fontSize="8" fill="#FFFFFF" opacity="0.5" textAnchor="middle">Call to Action</text>
      </svg>
    ),

    text_block: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#FFFFFF" rx="4"/>
        <rect x="30" y="25" width="100" height="8" fill="#1E3A5F" opacity="0.8" rx="2"/>
        <rect x="30" y="45" width="140" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="30" y="52" width="140" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="30" y="59" width="135" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="30" y="70" width="140" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="30" y="77" width="140" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="30" y="84" width="120" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <text x="100" y="105" fontSize="7" fill="#64748B" opacity="0.5" textAnchor="middle">Text Content</text>
      </svg>
    ),

    image_text: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#F8F9FA" rx="4"/>
        <rect x="15" y="20" width="75" height="80" fill="#E2E8F0" rx="2"/>
        <circle cx="52.5" cy="50" r="12" stroke="#94A3B8" strokeWidth="2"/>
        <path d="M40 75 L52.5 65 L65 75" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="105" y="30" width="75" height="7" fill="#1E3A5F" opacity="0.8" rx="1"/>
        <rect x="105" y="45" width="70" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="105" y="52" width="70" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="105" y="59" width="65" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="105" y="70" width="70" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="105" y="77" width="70" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <text x="100" y="105" fontSize="7" fill="#64748B" opacity="0.5" textAnchor="middle">Image + Text</text>
      </svg>
    ),

    badge_list: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#F8F9FA" rx="4"/>
        <rect x="20" y="40" width="40" height="12" fill="#1E3A5F" opacity="0.2" rx="6"/>
        <rect x="65" y="40" width="50" height="12" fill="#1E3A5F" opacity="0.2" rx="6"/>
        <rect x="120" y="40" width="60" height="12" fill="#1E3A5F" opacity="0.2" rx="6"/>
        <rect x="30" y="60" width="55" height="12" fill="#1E3A5F" opacity="0.2" rx="6"/>
        <rect x="90" y="60" width="45" height="12" fill="#1E3A5F" opacity="0.2" rx="6"/>
        <text x="100" y="95" fontSize="7" fill="#64748B" opacity="0.5" textAnchor="middle">Badge Pills</text>
      </svg>
    ),

    text_only: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#FFFFFF" rx="4"/>
        <rect x="30" y="20" width="90" height="9" fill="#1E3A5F" opacity="0.8" rx="2"/>
        <rect x="30" y="40" width="140" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="30" y="47" width="140" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="30" y="54" width="135" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="30" y="65" width="140" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="30" y="72" width="140" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="30" y="79" width="130" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="30" y="90" width="140" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="30" y="97" width="125" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <text x="100" y="110" fontSize="7" fill="#64748B" opacity="0.5" textAnchor="middle">Text Only</text>
      </svg>
    ),
  };

  return wireframes[sectionType] || wireframes.text_block;
}
