import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Check, Gift, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { Product } from '../types';

export const GiftCards: React.FC = () => {
  const { addToCart } = useCart();

  const [denomination, setDenomination] = useState<number>(150);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Balance lookup simulator
  const [checkCode, setCheckCode] = useState('');
  const [checkedBalance, setCheckedBalance] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const giftCardProduct: Product = {
    id: 'prod-12',
    slug: 'the-elevated-green-digital-gift-card',
    name: 'The Elevated Green Digital Gift Card',
    subtitle: 'Curated Luxury for the Discerning Golfer',
    category: 'Gift Cards',
    price: customAmount ? parseInt(customAmount, 10) || denomination : denomination,
    sku: 'EG-GC-DIG-12',
    description: 'Delivered digitally with personalized note and Apple Wallet integration.',
    details: ['Redeemable online and in-store via Square POS'],
    materials: 'Digital Redemption Code',
    care: '',
    fit: '',
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'],
    colors: [{ name: 'Fairway & Brass', hex: '#1F3B2C' }],
    sizes: [`$${denomination}`],
    stock: 999,
    posStock: 999,
    rating: 5.0,
    reviewCount: 88
  };

  const activeAmount = customAmount ? parseInt(customAmount, 10) || denomination : denomination;

  const handleAddToCart = () => {
    addToCart(
      { ...giftCardProduct, price: activeAmount },
      giftCardProduct.colors[0],
      `$${activeAmount}`,
      1
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleCheckBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkCode.trim()) return;
    setIsChecking(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsChecking(false);
    setCheckedBalance(150.0);
  };

  return (
    <div className="bg-[#FAF8F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-semibold tracking-[0.18em] text-[#8A7A5C]">
            The Clubhouse Gift
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A] mt-1">
            The Elevated Green Gift Card
          </h1>
          <p className="text-xs sm:text-sm text-[#57564E] mt-2">
            Presented digitally with instant clubhouse redemption, custom personalized inscription, and Apple Wallet synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Digital Card Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-[1.58/1] rounded-2xl bg-gradient-to-br from-[#14211A] via-[#1F3B2C] to-[#0D1611] p-6 sm:p-8 text-white shadow-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#B8916A]/10 blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start z-10">
                <div>
                  <div className="font-serif text-lg tracking-wider text-[#FAF8F3]">THE ELEVATED GREEN</div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#B8916A]">Member Club Card</div>
                </div>
                <div className="font-serif text-2xl font-bold text-[#B8916A]">
                  ${activeAmount}
                </div>
              </div>

              <div className="z-10">
                <div className="text-[11px] text-white/60 mb-1">Presented To:</div>
                <div className="font-serif text-base text-white truncate">
                  {recipientName || 'Valued Patron'}
                </div>
              </div>

              <div className="flex justify-between items-end text-[10px] text-white/50 font-mono z-10">
                <span>REDEEM ONLINE &bull; SQUARE POS IN-STORE</span>
                <span>EG-VAL-2026</span>
              </div>
            </div>

            {/* Check Balance Box */}
            <div className="bg-white p-6 rounded-xl border border-[#E4E0D6] shadow-sm">
              <h3 className="font-serif text-base text-[#1C1C1A] mb-1">Check Existing Card Balance</h3>
              <p className="text-xs text-[#8B897D] mb-3">Enter the 16-character code on your physical or digital pass.</p>
              
              <form onSubmit={handleCheckBalance} className="flex gap-2">
                <input
                  type="text"
                  placeholder="EG-XXXX-XXXX-XXXX"
                  value={checkCode}
                  onChange={(e) => setCheckCode(e.target.value)}
                  className="flex-1 bg-[#FAF8F3] border border-[#E4E0D6] rounded px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-[#1F3B2C]"
                />
                <button
                  type="submit"
                  disabled={isChecking || !checkCode.trim()}
                  className="btn-secondary px-4 py-2 text-xs font-semibold uppercase disabled:opacity-50"
                >
                  {isChecking ? 'Checking...' : 'Lookup'}
                </button>
              </form>

              {checkedBalance !== null && (
                <div className="mt-3 p-3 bg-[#2E6B47]/10 border border-[#2E6B47]/30 rounded text-xs text-[#2E6B47] flex items-center justify-between">
                  <span>Available Balance:</span>
                  <span className="font-mono font-bold text-sm">${checkedBalance.toFixed(2)} USD</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Configurator Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E4E0D6] shadow-sm space-y-6">
            
            {/* Amount Selection */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1C1A] block mb-2">
                Select Card Value
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[50, 100, 150, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setDenomination(amt);
                      setCustomAmount('');
                    }}
                    className={`py-3 text-xs font-bold rounded-lg border transition-all ${
                      denomination === amt && !customAmount
                        ? 'bg-[#1F3B2C] text-[#FAF8F3] border-[#1F3B2C] shadow-sm'
                        : 'bg-[#FAF8F3] text-[#1C1C1A] border-[#E4E0D6] hover:border-[#1F3B2C]'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <input
                  type="number"
                  placeholder="Or enter custom amount ($50 - $2,000)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#E4E0D6] rounded px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1F3B2C]"
                />
              </div>
            </div>

            {/* Recipient details */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1C1A] block">
                Recipient Information
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#57564E] block mb-1">Recipient Name</label>
                  <input
                    type="text"
                    placeholder="Marcus Whitfield"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#FAF8F3] border border-[#E4E0D6] rounded px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1F3B2C]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#57564E] block mb-1">Recipient Email</label>
                  <input
                    type="email"
                    placeholder="marcus@pinehurst.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full bg-[#FAF8F3] border border-[#E4E0D6] rounded px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1F3B2C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#57564E] block mb-1">Personal Note / Course Inscription</label>
                <textarea
                  rows={3}
                  placeholder="To 18 great holes at Pebble Beach..."
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#E4E0D6] rounded px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1F3B2C]"
                />
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full btn-primary py-4 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Gift Card Added to Bag ✓</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>Add Gift Card to Bag &bull; ${activeAmount}</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-[#8B897D]">
              <ShieldCheck className="w-4 h-4 text-[#2E6B47]" />
              <span>Instant digital transmission with zero expiration fees</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
