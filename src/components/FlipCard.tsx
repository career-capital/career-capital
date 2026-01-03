import { useState } from 'react';
import { RotateCw } from 'lucide-react';

interface FlipCardProps {
  front: {
    title: string;
    description: string;
  };
  back: {
    content: string[];
  };
}

export default function FlipCard({ front, back }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="flip-card-container">
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-pressed={isFlipped}
        aria-label={`${front.title}. Click to ${isFlipped ? 'see overview' : 'see details'}`}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-ink pr-4 leading-tight">
                {front.title}
              </h3>
              <RotateCw className="w-5 h-5 text-steel flex-shrink-0 transition-transform duration-300" aria-hidden="true" />
            </div>
            <p className="text-slate leading-relaxed text-base mb-4">
              {front.description}
            </p>
            <p className="text-xs text-slate/70 mt-auto hidden sm:block">
              Click for details
            </p>
            <p className="text-xs text-slate/70 mt-auto sm:hidden">
              Tap for details
            </p>
          </div>

          <div className="flip-card-back">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-ink pr-4 leading-tight">
                {front.title}
              </h3>
              <RotateCw className="w-5 h-5 text-steel flex-shrink-0" aria-hidden="true" />
            </div>
            <ul className="space-y-2">
              {back.content.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm text-slate leading-relaxed">
                  <span className="text-steel font-medium flex-shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
