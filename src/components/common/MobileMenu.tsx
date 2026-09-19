import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; path: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks }) => {
  const { cartCount, setIsCartOpen } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#14211A] text-[#FAF8F3] animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#FAF8F3]/10">
        <div className="flex flex-col">
          <span className="font-serif text-lg tracking-[0.06em] text-[#FAF8F3]">THE ELEVATED GREEN</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#B8916A]">Golf &amp; Lifestyle</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 -mr-2 text-[#FAF8F3] hover:text-[#B8916A] transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Navigation Links (Large Editorial Tap Targets) */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col space-y-5">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            onClick={onClose}
            className="font-serif text-2xl font-medium tracking-tight text-[#FAF8F3]/90 hover:text-[#FAF8F3] hover:translate-x-1 transition-all flex items-center justify-between border-b border-[#FAF8F3]/5 pb-4"
          >
            <span>{link.label}</span>
            <ArrowRight className="w-4 h-4 opacity-40 text-[#B8916A]" />
          </Link>
        ))}

        {/* Highlighted Admin & POS Live Demo Link */}
        <div className="pt-4">
          <Link
            to="/admin/inventory-sync"
            onClick={onClose}
            className="flex items-center justify-between p-4 bg-[#FAF8F3]/10 rounded-lg border border-[#FAF8F3]/15 text-[#FAF8F3]"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#B8916A]" />
              <div>
                <div className="text-sm font-semibold">Admin &amp; POS Sync Demo</div>
                <div className="text-xs text-[#8B897D]">Live Square inventory test screen</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#B8916A]" />
          </Link>
        </div>
      </div>

      {/* Pinned Bottom Bar */}
      <div className="px-6 py-5 bg-[#0D1611] border-t border-[#FAF8F3]/10 flex items-center justify-around">
        <Link
          to="/account"
          onClick={onClose}
          className="flex flex-col items-center gap-1 text-[#D7CEBE] hover:text-[#FAF8F3]"
        >
          <User className="w-5 h-5" />
          <span className="text-[11px] font-medium tracking-wide">Account</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            onClose();
            setIsCartOpen(true);
          }}
          className="flex flex-col items-center gap-1 text-[#D7CEBE] hover:text-[#FAF8F3] relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#B8916A] text-[#14211A] text-[9px] font-bold px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium tracking-wide">Bag</span>
        </button>
      </div>
    </div>
  );
};
