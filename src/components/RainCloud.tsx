import React from 'react';

const RainCloud: React.FC = () => {
  const drops = Array.from({ length: 80 });
  return (
    <div className="rain-scene relative w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-6 w-44 sm:w-56">
          <svg viewBox="0 0 256 160" className="w-full h-auto" aria-label="Rain cloud icon">
            <defs>
              <linearGradient id="cloudGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="hsl(240 10% 60% / 0.65)" />
                <stop offset="100%" stopColor="hsl(240 10% 70% / 0.55)" />
              </linearGradient>
            </defs>
            <path
              d="M64 120c-30 0-48-16-48-40 0-22 16-40 40-44 6-20 26-34 48-34 26 0 48 18 54 42 22 2 42 18 42 42 0 22-18 34-42 34H64z"
              fill="url(#cloudGrad)"
              stroke="hsl(240 10% 80% / 0.25)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {drops.map((_, i) => {
        const x = Math.random() * 100; // percent
        const delay = Math.random() * 1.2; // seconds
        const dur = 1.1 + Math.random() * 0.8; // seconds
        const size = 12 + Math.floor(Math.random() * 9); // px height
        return (
          <span
            key={i}
            className="rain-drop"
            style={{
              // @ts-ignore custom props
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

export default RainCloud;
