import { useState } from 'react';
import { RotateCw } from 'lucide-react';

interface FlipCardProps {
  front: {
    title: string;
    idealFor: string;
    delivers: string[];
  };
  back: {
    includes: string[];
    credibility?: string;
    cta?: string;
  };
  onCtaClick?: () => void;
}

export default function FlipCard({ front, back, onCtaClick }: FlipCardProps) {
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

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCtaClick) {
      onCtaClick();
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
          <div className="flip-card-front flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-ink pr-4 leading-tight">
                {front.title}
              </h3>
              <RotateCw className="w-5 h-5 text-steel flex-shrink-0 transition-transform duration-300" aria-hidden="true" />
            </div>
            <div className="mb-1">
              <p className="text-sm font-medium text-steel mb-1">Ideal For</p>
              <p className="text-slate leading-relaxed text-base">
                {front.idealFor}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-steel mb-2">What It Delivers</p>
              <ul className="space-y-1">
                {front.delivers.map((item, index) => (
                  <li key={index} className="flex gap-2 text-base text-slate leading-relaxed">
                    <span className="text-steel font-medium flex-shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              {back.cta && (
                <button
                  onClick={handleCtaClick}
                  className="text-navy hover:text-steel font-medium text-base underline underline-offset-2 hover:underline-offset-4 transition-all text-left"
                >
                  {back.cta}
                </button>
              )}
              <p className="text-xs text-slate/70 mt-3 hidden sm:block">
                Click for more details
              </p>
              <p className="text-xs text-slate/70 mt-3 sm:hidden">
                Tap for more details
              </p>
            </div>
          </div>

          <div className="flip-card-back flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-ink pr-4 leading-tight">
                {front.title}
              </h3>
              <RotateCw className="w-5 h-5 text-steel flex-shrink-0" aria-hidden="true" />
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-steel mb-2">Includes</p>
              <ul className="space-y-2">
                {back.includes.map((item, index) => (
                  <li key={index} className="flex gap-3 text-base text-slate leading-relaxed">
                    <span className="text-steel font-medium flex-shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              {back.credibility && (
                <p className="text-sm text-slate/80 italic mb-4">
                  <span className="font-medium text-steel">Credibility:</span> {back.credibility}
                </p>
              )}
              {back.cta && (
                <button
                  onClick={handleCtaClick}
                  className="text-navy hover:text-steel font-medium text-base underline underline-offset-2 hover:underline-offset-4 transition-all text-left"
                >
                  {back.cta}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
