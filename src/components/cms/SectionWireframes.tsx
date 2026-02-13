interface WireframeProps {
  sectionType: string;
  className?: string;
}

export default function SectionWireframe({ sectionType, className = '' }: WireframeProps) {
  const wireframes: Record<string, JSX.Element> = {
    hero_banner: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#1E3A5F" rx="4"/>
        <rect width="200" height="120" fill="url(#heroGradient)" opacity="0.3"/>
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#4A5568', stopOpacity:0.5}} />
            <stop offset="100%" style={{stopColor:'#1E3A5F', stopOpacity:0.8}} />
          </linearGradient>
        </defs>
        <rect x="15" y="25" width="140" height="14" fill="#FFFFFF" opacity="0.95" rx="2"/>
        <rect x="15" y="44" width="110" height="7" fill="#FFFFFF" opacity="0.85" rx="1"/>
        <rect x="15" y="55" width="130" height="5" fill="#FFFFFF" opacity="0.75" rx="1"/>
        <rect x="15" y="68" width="45" height="14" fill="#FFFFFF" opacity="0.9" rx="7"/>
        <rect x="65" y="68" width="45" height="14" fill="#FFFFFF" opacity="0.3" rx="7"/>
        <rect x="15" y="95" width="35" height="10" fill="#FFFFFF" opacity="0.25" rx="5"/>
        <rect x="55" y="95" width="38" height="10" fill="#FFFFFF" opacity="0.25" rx="5"/>
        <rect x="98" y="95" width="42" height="10" fill="#FFFFFF" opacity="0.25" rx="5"/>
        <text x="100" y="13" fontSize="7" fill="#FFFFFF" opacity="0.5" textAnchor="middle">Full-Width Hero Banner</text>
      </svg>
    ),

    icon_grid_3: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#F8F9FA" rx="4"/>
        <rect x="50" y="15" width="100" height="9" fill="#1E3A5F" opacity="0.9" rx="2"/>
        <rect x="60" y="28" width="80" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <circle cx="35" cy="56" r="10" stroke="#1E3A5F" strokeWidth="2.5" opacity="0.7"/>
        <rect x="20" y="72" width="30" height="5" fill="#1E3A5F" opacity="0.8" rx="1"/>
        <rect x="20" y="80" width="30" height="3" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="20" y="85" width="30" height="3" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="20" y="90" width="25" height="3" fill="#64748B" opacity="0.5" rx="1"/>
        <circle cx="100" cy="56" r="10" stroke="#1E3A5F" strokeWidth="2.5" opacity="0.7"/>
        <rect x="85" y="72" width="30" height="5" fill="#1E3A5F" opacity="0.8" rx="1"/>
        <rect x="85" y="80" width="30" height="3" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="85" y="85" width="30" height="3" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="85" y="90" width="25" height="3" fill="#64748B" opacity="0.5" rx="1"/>
        <circle cx="165" cy="56" r="10" stroke="#1E3A5F" strokeWidth="2.5" opacity="0.7"/>
        <rect x="150" y="72" width="30" height="5" fill="#1E3A5F" opacity="0.8" rx="1"/>
        <rect x="150" y="80" width="30" height="3" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="150" y="85" width="30" height="3" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="150" y="90" width="25" height="3" fill="#64748B" opacity="0.5" rx="1"/>
        <text x="100" y="110" fontSize="7" fill="#64748B" opacity="0.5" textAnchor="middle">3-Column Icon Grid</text>
      </svg>
    ),

    cta: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#1E3A5F" rx="4"/>
        <rect x="30" y="30" width="140" height="12" fill="#FFFFFF" opacity="0.95" rx="2"/>
        <rect x="45" y="48" width="110" height="5" fill="#FFFFFF" opacity="0.8" rx="1"/>
        <rect x="50" y="57" width="100" height="4" fill="#FFFFFF" opacity="0.75" rx="1"/>
        <rect x="40" y="72" width="50" height="15" fill="#FFFFFF" opacity="0.95" rx="7"/>
        <rect x="95" y="72" width="50" height="15" fill="#FFFFFF" opacity="0.35" rx="7"/>
        <text x="100" y="13" fontSize="7" fill="#FFFFFF" opacity="0.6" textAnchor="middle">Centered Call-to-Action</text>
      </svg>
    ),

    text_block: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#FFFFFF" rx="4"/>
        <rect x="20" y="20" width="95" height="10" fill="#1E3A5F" opacity="0.9" rx="2"/>
        <rect x="20" y="40" width="160" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="20" y="47" width="160" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="20" y="54" width="155" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="20" y="61" width="160" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="20" y="73" width="160" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="20" y="80" width="160" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="20" y="87" width="145" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="20" y="94" width="160" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <text x="100" y="110" fontSize="7" fill="#64748B" opacity="0.5" textAnchor="middle">Heading + Paragraphs</text>
      </svg>
    ),

    image_text: (
      <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#F8F9FA" rx="4"/>
        <rect x="10" y="15" width="80" height="90" fill="#E2E8F0" rx="3"/>
        <circle cx="50" cy="48" r="14" stroke="#94A3B8" strokeWidth="2.5"/>
        <path d="M35 70 L50 58 L65 70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="100" y="25" width="85" height="8" fill="#1E3A5F" opacity="0.9" rx="2"/>
        <rect x="100" y="42" width="80" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="100" y="49" width="80" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="100" y="56" width="75" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="100" y="63" width="80" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="100" y="75" width="80" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="100" y="82" width="80" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="100" y="89" width="70" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <text x="100" y="110" fontSize="7" fill="#64748B" opacity="0.5" textAnchor="middle">Side-by-Side Image + Text</text>
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
        <rect x="25" y="18" width="85" height="8" fill="#1E3A5F" opacity="0.85" rx="2"/>
        <rect x="25" y="35" width="150" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="25" y="42" width="150" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="25" y="49" width="145" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="25" y="56" width="150" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="25" y="63" width="140" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="25" y="75" width="150" height="4" fill="#64748B" opacity="0.6" rx="1"/>
        <rect x="25" y="82" width="150" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="25" y="89" width="135" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <rect x="25" y="96" width="150" height="4" fill="#64748B" opacity="0.5" rx="1"/>
        <text x="100" y="110" fontSize="7" fill="#64748B" opacity="0.5" textAnchor="middle">Multiple Paragraphs</text>
      </svg>
    ),
  };

  return wireframes[sectionType] || wireframes.text_block;
}
