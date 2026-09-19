import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Shield, Feather, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-[#FAF8F3] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#8A7A5C]">
            Our Origins &amp; Ethos
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1C1A] leading-tight font-medium">
            The Architecture of Quiet Mastery
          </h1>
          <p className="text-sm sm:text-base text-[#57564E] leading-relaxed font-light">
            Founded along the windswept cliffs of Pebble Beach, The Elevated Green was conceived for golfers who believe their attire should reflect the quiet discipline and natural grace of the sport itself.
          </p>
        </div>

        {/* Large Editorial Image */}
        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-[#E4E0D6]">
          <img
            src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1600&q=80"
            alt="Golf course at sunset"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-[#E4E0D6] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#1F3B2C]/10 text-[#1F3B2C] flex items-center justify-center mb-4">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1C1A]">Natural Nobility</h3>
            <p className="text-xs text-[#57564E] leading-relaxed">
              We prioritize natural performance fibers — Australian extra-fine merino wool, breathable organic piqué, and Grade-AAA Ethiopian cabretta leather over synthetic plastics.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E4E0D6] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#1F3B2C]/10 text-[#1F3B2C] flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1C1A]">Course-Tested Kinematics</h3>
            <p className="text-xs text-[#57564E] leading-relaxed">
              Every raglan armhole, waistband grip, and storm seam is engineered to move freely through the shoulder turn and hip clearance of a full championship swing.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E4E0D6] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#1F3B2C]/10 text-[#1F3B2C] flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1C1A]">Clubhouse Transition</h3>
            <p className="text-xs text-[#57564E] leading-relaxed">
              Garments tailored with clean dress lines, mother-of-pearl buttons, and muted heritage tones that feel completely natural in the boardroom or private dining room.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-[#14211A] text-[#FAF8F3] rounded-2xl p-8 sm:p-14 border border-[#FAF8F3]/10 space-y-6">
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#B8916A]">
            The Fairway Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F3]">
            "We make clothing for the player whose scorecard speaks softly, but whose presence is unmistakable."
          </h2>
          <div className="pt-4 flex items-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-[#FAF8F3] text-[#14211A] hover:bg-white text-xs uppercase font-bold tracking-wider rounded-md transition-colors"
            >
              Explore the Collection
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
