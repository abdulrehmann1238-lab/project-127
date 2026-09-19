import React, { useEffect, useState } from 'react';

interface OpeningLoaderProps {
  onFinish?: () => void;
}

export const OpeningLoader: React.FC<OpeningLoaderProps> = ({ onFinish }) => {
  const [phase, setPhase] = useState<'initial' | 'line' | 'fading' | 'done'>('initial');

  useEffect(() => {
    // Phase 1: Text tracking & fade-in (100ms - 500ms)
    const timer1 = setTimeout(() => {
      setPhase('line');
    }, 450);

    // Phase 2: Fairway line draws (500ms - 900ms)
    const timer2 = setTimeout(() => {
      setPhase('fading');
    }, 950);

    // Phase 3: Dissolve out (900ms - 1300ms)
    const timer3 = setTimeout(() => {
      setPhase('done');
      onFinish?.();
    }, 1350);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#14211A] transition-opacity duration-400 pointer-events-none select-none ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: '400ms' }}
    >
      <div className="flex flex-col items-center max-w-xs sm:max-w-md px-6 text-center">
        {/* Subtle Clubhouse Monogram */}
        <div className="mb-4 opacity-70 transition-opacity duration-500">
          <svg className="w-8 h-8 text-[#B8916A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
            <path d="M12 7v10M8 10l4-3 4 3" />
          </svg>
        </div>

        {/* Wordmark with smooth tracking */}
        <h1
          className={`font-serif text-2xl sm:text-3xl text-[#FAF8F3] font-medium tracking-[0.25em] transition-all duration-700 ease-out ${
            phase !== 'initial' ? 'tracking-[0.08em] opacity-100' : 'tracking-[0.25em] opacity-0'
          }`}
        >
          THE ELEVATED GREEN
        </h1>

        <p className="text-[11px] font-sans tracking-[0.2em] text-[#8A7A5C] uppercase mt-2 opacity-80">
          Curated Golf & Lifestyle
        </p>

        {/* 1px Fairway Line Draw */}
        <div className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden">
          <div
            className={`absolute inset-0 bg-[#B8916A] transition-all duration-500 ease-out ${
              phase === 'initial' ? 'w-0' : 'w-full'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
