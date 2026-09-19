import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Track scroll position for header glass transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Shop All', path: '/shop' },
    { label: 'Apparel', path: '/shop?category=Apparel' },
    { label: 'Footwear', path: '/shop?category=Footwear' },
    { label: 'Accessories', path: '/shop?category=Accessories' },
    { label: 'Gift Cards', path: '/gift-cards' },
    { label: 'Concierge Fitting', path: '/concierge' },
    { label: 'Our Story', path: '/about' },
  ];

  return (
    <>
      {/* Top Banner: Client Demo Navigation Quick-Bar */}
      <div className="bg-[#14211A] text-[#FAF8F3] px-4 py-1.5 text-xs font-medium border-b border-[#FAF8F3]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2E6B47] animate-pulse" />
            <span className="text-[#D7CEBE] hidden sm:inline">Square POS Live Cloud Sync Active</span>
            <span className="text-[#D7CEBE] sm:hidden">Live POS Sync Active</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[#8B897D]">Complimentary clubhouse delivery on orders $150+</span>
            <Link
              to="/admin/inventory-sync"
              className="inline-flex items-center gap-1.5 bg-[#FAF8F3]/10 hover:bg-[#FAF8F3]/20 px-2.5 py-0.5 rounded text-[#FAF8F3] transition-colors font-sans text-[11px] uppercase tracking-wider"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8916A]" />
              <span>Admin Operations & POS Demo</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F3]/95 backdrop-blur-md shadow-sm border-b border-[#E4E0D6]/80 py-3'
            : 'bg-[#FAF8F3] border-b border-[#E4E0D6]/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#1C1C1A] hover:text-[#1F3B2C] transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Brand Wordmark (Fraunces serif) */}
            <div className="flex items-center">
              <Link to="/" className="group flex flex-col items-start">
                <span className="font-serif text-xl sm:text-2xl font-medium tracking-[0.06em] text-[#1F3B2C] group-hover:text-[#16291F] transition-colors">
                  THE ELEVATED GREEN
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8A7A5C] -mt-0.5 font-sans font-medium">
                  Golf &amp; Lifestyle
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = location.pathname + location.search === link.path;
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`relative text-[13px] font-sans font-medium uppercase tracking-[0.08em] transition-colors py-1 ${
                      isActive ? 'text-[#1F3B2C]' : 'text-[#57564E] hover:text-[#1F3B2C]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8916A] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Account, Cart */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-[#57564E] hover:text-[#1F3B2C] transition-colors"
                aria-label="Search Store"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Account Link */}
              <Link
                to="/account"
                className="p-2 text-[#57564E] hover:text-[#1F3B2C] transition-colors flex items-center gap-1.5"
                aria-label="Customer Account"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
                <span className="hidden xl:inline text-xs font-medium text-[#57564E]">
                  {user ? 'Sarah' : 'Patron'}
                </span>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#1F3B2C] hover:text-[#16291F] transition-transform active:scale-95 flex items-center"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#1F3B2C] text-[#FAF8F3] text-[10px] font-bold rounded-full border-2 border-[#FAF8F3] animate-bounce-short">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Expandable Search Input Dropdown */}
          {isSearchOpen && (
            <form onSubmit={handleSearchSubmit} className="mt-3 pt-3 border-t border-[#E4E0D6] flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8A7A5C]" />
              <input
                type="text"
                placeholder="Search cashmere pullovers, spiked shoes, cabretta leather..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm focus:outline-none placeholder-[#8B897D] text-[#1C1C1A]"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-[#8B897D] hover:text-[#1C1C1A] px-2 py-1"
              >
                Close
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Mobile Slide-Up Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};
