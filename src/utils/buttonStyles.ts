export function getButtonStyleVariant(
  buttonType: 'primary' | 'secondary',
  sectionBackgroundColor: string
): string {
  const darkBackgrounds = [
    'bg-navy',
    'bg-ink',
    'bg-slate',
    'bg-charcoal',
    'bg-black',
    'bg-gray-900',
    'bg-gray-800',
  ];

  const isDarkBackground = darkBackgrounds.some(darkBg =>
    sectionBackgroundColor.includes(darkBg)
  );

  if (buttonType === 'primary') {
    return isDarkBackground ? 'btn-primary-on-dark' : 'btn-primary';
  } else {
    return isDarkBackground ? 'btn-secondary-on-dark' : 'btn-secondary';
  }
}
