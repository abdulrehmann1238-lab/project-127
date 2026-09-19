import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 600);
  };

  return (
    <footer className="bg-[#14211A] text-[#FAF8F3] border-t border-[#FAF8F3]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-[#FAF8F3]/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-medium tracking-[0.06em] text-[#FAF8F3]">
                THE ELEVATED GREEN
              </span>
            </Link>
            <p className="text-[#8B897D] text-sm leading-relaxed max-w-sm">
              Tailored golf and lifestyle apparel for those who value the quiet mastery of the game. Dressed for the course. Built for life.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FAF8F3] hover:bg-[#B8916A] hover:border-[#B8916A] hover:text-[#14211A] transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FAF8F3] hover:bg-[#B8916A] hover:border-[#B8916A] hover:text-[#14211A] transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <span className="text-xs text-[#8B897D] pl-2 font-mono">@theelevatedgreen</span>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B8916A]">
              Collections
            </h4>
            <ul className="space-y-2 text-sm text-[#8B897D]">
              <li><Link to="/shop?category=Apparel" className="hover:text-[#FAF8F3] transition-colors">Course Apparel</Link></li>
              <li><Link to="/shop?category=Footwear" className="hover:text-[#FAF8F3] transition-colors">Vibram Footwear</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-[#FAF8F3] transition-colors">Leather &amp; Headcovers</Link></li>
              <li><Link to="/gift-cards" className="hover:text-[#FAF8F3] transition-colors">Digital Gift Cards</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-[#FAF8F3] transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Col 2: Services & Clubhouse */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B8916A]">
              Concierge &amp; House
            </h4>
            <ul className="space-y-2 text-sm text-[#8B897D]">
              <li><Link to="/concierge" className="hover:text-[#FAF8F3] transition-colors">Bespoke Fitting Inquiry</Link></li>
              <li><Link to="/about" className="hover:text-[#FAF8F3] transition-colors">The Heritage Story</Link></li>
              <li><Link to="/contact" className="hover:text-[#FAF8F3] transition-colors">Clubhouse Locations</Link></li>
              <li><Link to="/admin/inventory-sync" className="hover:text-[#FAF8F3] transition-colors font-medium text-[#FAF8F3]/70 hover:text-[#B8916A]">POS Live Sync Portal</Link></li>
            </ul>
          </div>

          {/* Col 3: Newsletter §7 & §20 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B8916A]">
              Clubhouse Journal
            </h4>
            <p className="text-xs text-[#8B897D] leading-relaxed">
              Invitations to private seasonal drops, tournament capsule releases, and course condition notes.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-[#1F3B2C] border border-[#2E6B47] rounded-md text-xs text-[#FAF8F3] flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#FAF8F3] shrink-0" />
                <span>You're on the list — welcome to The Elevated Green.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-md px-3.5 py-2.5 text-xs text-[#FAF8F3] placeholder-[#8B897D] focus:outline-none focus:border-[#B8916A] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#FAF8F3] text-[#14211A] hover:bg-[#FAF8F3]/90 rounded text-xs font-medium transition-all flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    {isSubmitting ? (
                      <span className="w-3 h-3 border-2 border-[#14211A] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-[#8B897D]">Unsubscribe anytime. Zero spam guarantee.</p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B897D] gap-4">
          <div>
            &copy; 2026 The Elevated Green, LLC. All rights reserved. Handcrafted luxury performance.
          </div>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-[#FAF8F3] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#FAF8F3] transition-colors">Terms of Service</a>
            <a href="#accessibility" className="hover:text-[#FAF8F3] transition-colors">Accessibility</a>
            <Link to="/admin" className="text-[#8A7A5C] hover:text-[#FAF8F3] transition-colors font-mono">
              [Admin Login]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
