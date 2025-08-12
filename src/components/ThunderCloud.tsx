import React from 'react';

const ThunderCloud: React.FC = () => {
  const bolts = Array.from({ length: 6 });
  const flashes = Array.from({ length: 3 });

  return (
    <div className="thunder-scene relative w-full h-full overflow-hidden pointer-events-none">
      {/* Cloud graphic */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-6 w-44 sm:w-56">
          <svg viewBox="0 0 256 160" className="w-full h-auto" aria-label="Thunder cloud icon">
            <defs>
              <linearGradient id="cloudGrad2" x1="0" x2="1">
                <stop offset="0%" stopColor="hsl(240 10% 60% / 0.65)" />
                <stop offset="100%" stopColor="hsl(240 10% 70% / 0.55)" />
              </linearGradient>
            </defs>
            <path
              d="M64 120c-30 0-48-16-48-40 0-22 16-40 40-44 6-20 26-34 48-34 26 0 48 18 54 42 22 2 42 18 42 42 0 22-18 34-42 34H64z"
              fill="url(#cloudGrad2)"
              stroke="hsl(240 10% 80% / 0.25)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Flashes */}
      {flashes.map((_, i) => {
        const delay = Math.random() * 2.5;
        const dur = 2.2 + Math.random() * 1.2;
        const x = 20 + Math.random() * 60; // % across the screen
        return (
          <div
            key={`flash-${i}`}
            className="flash-overlay"
            style={{
              // @ts-ignore custom CSS props
              '--delay': `${delay}s`,
              '--flash-d': `${dur}s`,
              '--x': `${x}%`,
            } as React.CSSProperties}
          />
        );
      })}

      {/* Bolts */}
      {bolts.map((_, i) => {
        const x = 20 + Math.random() * 60; // keep within center area
        const delay = Math.random() * 3.0; // seconds
        const dur = 2.3 + Math.random() * 1.2; // seconds
        const scaleX = Math.random() < 0.5 ? 1 : -1;
        return (
          <div
            key={`bolt-${i}`}
            className="bolt"
            style={{
              // @ts-ignore custom CSS props
              '--x': `${x}%`,
              '--delay': `${delay}s`,
              '--d': `${dur}s`,
              transform: `scaleX(${scaleX})`,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 20 160" width="10" height="160">
              <defs>
                <linearGradient id="boltGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(55 100% 95%)" />
                  <stop offset="100%" stopColor="hsl(45 100% 60%)" />
                </linearGradient>
              </defs>
              <polygon
                points="10,0 14,40 6,40 12,80 4,80 10,120 6,120 10,160"
                fill="url(#boltGrad)"
                stroke="hsl(55 100% 85%)"
                strokeWidth="1"
                opacity="0.95"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default ThunderCloud;
