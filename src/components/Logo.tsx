interface LogoProps {
  variant?: 'stacked' | 'horizontal';
  color?: 'dark' | 'light';
  className?: string;
}

export default function Logo({ variant = 'stacked', color = 'dark', className = '' }: LogoProps) {
  const logoMap = {
    'stacked-dark': '/logo.svg',
    'stacked-light': '/logo-white.svg',
    'horizontal-dark': '/logo-horizontal.svg',
    'horizontal-light': '/logo-horizontal-white.svg',
  };

  const logoSrc = logoMap[`${variant}-${color}`];
  const altText = 'Career Capital';

  return (
    <img
      src={logoSrc}
      alt={altText}
      className={className}
    />
  );
}
