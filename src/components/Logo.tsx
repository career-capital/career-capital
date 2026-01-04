interface LogoProps {
  variant?: 'stacked' | 'horizontal';
  color?: 'dark' | 'light';
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  const altText = 'Career Capital';

  return (
    <img
      src="/careercapital_standardlogo.webp"
      alt={altText}
      className={className}
    />
  );
}
