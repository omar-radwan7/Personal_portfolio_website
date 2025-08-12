import React from 'react';

const ThunderCloud: React.FC = () => {
  const bolts = Array.from({ length: 6 });
  const flashes = Array.from({ length: 3 });
  const rainDrops = Array.from({ length: 25 });

  return (
    <div className="thunder-scene relative w-full h-full overflow-hidden pointer-events-none">
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

      {/* Cloud graphic */}
      <div className="absolute inset-0 z-10">
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

      {/* Bolts - positioned under the cloud */}
      {bolts.map((_, i) => {
        const x = 30 + Math.random() * 40; // keep within center area under cloud
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
            <svg viewBox="0 0 20 120" width="10" height="120">
              <defs>
                <linearGradient id="boltGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(55 100% 95%)" />
                  <stop offset="100%" stopColor="hsl(45 100% 60%)" />
                </linearGradient>
              </defs>
              <polygon
                points="10,0 14,30 6,30 12,60 4,60 10,90 6,90 10,120"
                fill="url(#boltGrad)"
                stroke="hsl(55 100% 85%)"
                strokeWidth="1"
                opacity="0.95"
              />
            </svg>
          </div>
        );
      })}

      {/* Light Rain */}
      {rainDrops.map((_, i) => {
        const x = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const dur = 1.0 + Math.random() * 0.6;
        const size = 8 + Math.floor(Math.random() * 6);
        return (
          <span
            key={`rain-${i}`}
            className="light-rain-drop"
            style={{
              // @ts-ignore custom CSS props
              '--x': `${x}%`,
              '--delay': `${delay}s`,
              '--d': `${dur}s`,
              '--h': `${size}px`,
              height: `${size}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

export default ThunderCloud;
