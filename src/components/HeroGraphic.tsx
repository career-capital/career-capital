export default function HeroGraphic() {
  const createWaveDots = (
    startY: number,
    amplitude: number,
    frequency: number,
    dotSize: number,
    spacing: number,
    opacity: number
  ) => {
    const dots = [];
    const width = 1200;

    for (let x = 0; x < width; x += spacing) {
      const y = startY + Math.sin((x / width) * Math.PI * frequency) * amplitude;

      for (let offset = -amplitude * 0.8; offset <= amplitude * 0.8; offset += spacing) {
        const yPos = y + offset;
        const distanceFromCenter = Math.abs(offset) / amplitude;
        const sizeFactor = 1 - distanceFromCenter * 0.5;
        const currentDotSize = dotSize * sizeFactor;
        const currentOpacity = opacity * (1 - distanceFromCenter * 0.3);

        if (yPos >= 0 && yPos <= 600) {
          dots.push(
            <circle
              key={`${x}-${offset}`}
              cx={x}
              cy={yPos}
              r={currentDotSize}
              fill="white"
              opacity={currentOpacity}
            />
          );
        }
      }
    }

    return dots;
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#0F2A44" />
        </linearGradient>
      </defs>

      <rect width="1200" height="600" fill="url(#bgGradient)" />

      <g>
        {createWaveDots(480, 60, 2, 2, 12, 0.4)}
      </g>

      <g>
        {createWaveDots(440, 70, 2.2, 1.8, 14, 0.35)}
      </g>

      <g>
        {createWaveDots(400, 80, 2.4, 1.5, 16, 0.3)}
      </g>

      <g>
        {createWaveDots(360, 90, 2.6, 1.2, 18, 0.25)}
      </g>

      <g>
        {createWaveDots(320, 100, 2.8, 1, 20, 0.2)}
      </g>

      <g opacity="0.15">
        <ellipse cx="900" cy="300" rx="350" ry="250" fill="white" />
      </g>
    </svg>
  );
}
