import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    promoCode,
    promoDiscount,
    promoError,
    isApplyingPromo,
    applyPromoCode,
    removePromoCode,
    subtotal,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping
  } = useCart();

  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState('');
  const [highlightTotal, setHighlightTotal] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Flash highlight on total when promo code applies
  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const ok = await applyPromoCode(inputCode);
    if (ok) {
      setHighlightTotal(true);
      setTimeout(() => setHighlightTotal(false), 1200);
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  const progressPct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F3] shadow-2xl flex flex-col transform transition-transform duration-350 ease-out border-l border-[#E4E0D6]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E4E0D6] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-medium text-[#1F3B2C]">Shopping Bag</h2>
              <span className="text-xs bg-[#FAF8F3] text-[#57564E] px-2 py-0.5 rounded-full border border-[#E4E0D6]">
                {cart.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#57564E] hover:text-[#1C1C1A] transition-colors rounded-md hover:bg-gray-100"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#1F3B2C]/5 px-5 py-3 border-b border-[#E4E0D6]">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-xs text-[#1F3B2C] font-medium mb-1.5">
                Add <span className="font-bold">${amountNeededForFreeShipping.toFixed(2)}</span> more to qualify for <span className="font-bold">Complimentary Clubhouse Delivery</span>.
              </p>
            ) : (
              <p className="text-xs text-[#2E6B47] font-semibold flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                You've unlocked Complimentary Express Delivery!
              </p>
            )}
            <div className="w-full bg-[#E4E0D6] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1F3B2C] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E4E0D6]/40 mx-auto flex items-center justify-center text-[#8B897D]">
                  <Tag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#1C1C1A]">Your bag is currently empty</h3>
                  <p className="text-xs text-[#8B897D] mt-1 max-w-xs mx-auto">
                    Explore our tailored golf apparel, fine Italian knitwear, and handcrafted leather goods.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="btn-primary px-6 py-2.5 text-xs uppercase tracking-wider"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-[#E4E0D6] shadow-sm transition-all duration-200"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded bg-[#FAF8F3] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-[#1C1C1A] leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedColor.name, item.selectedSize)
                          }
                          className="text-[#8B897D] hover:text-[#A23B33] p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#8B897D] mt-0.5 space-x-2">
                        <span>Color: {item.selectedColor.name}</span>
                        <span>•</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#E4E0D6] rounded bg-[#FAF8F3]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.name,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-0.5 text-xs text-[#57564E] hover:text-[#1C1C1A]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#1C1C1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.name,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-0.5 text-xs text-[#57564E] hover:text-[#1C1C1A]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-semibold text-[#1F3B2C]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E4E0D6] space-y-3.5">
              
              {/* Promo Code Form §7 & §10 */}
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-[#2E6B47]/10 border border-[#2E6B47]/30 rounded-md text-xs text-[#2E6B47]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span className="font-semibold">Promo Applied: {promoCode} (-${promoDiscount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-[#8B897D] hover:text-[#A23B33] text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. GREEN10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 bg-[#FAF8F3] border border-[#E4E0D6] rounded px-3 py-1.5 text-xs uppercase placeholder:normal-case placeholder-[#8B897D] focus:outline-none focus:border-[#1F3B2C]"
                    />
                    <button
                      type="submit"
                      disabled={isApplyingPromo || !inputCode.trim()}
                      className="btn-secondary px-3 py-1.5 text-xs uppercase tracking-wider font-semibold disabled:opacity-50"
                    >
                      {isApplyingPromo ? (
                        <span className="w-3 h-3 border-2 border-[#1F3B2C] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Apply'
                      )}
                    </button>
                  </form>
                  {promoError && (
                    <p className="text-[11px] text-[#A23B33] mt-1 font-medium">{promoError}</p>
                  )}
                </div>
              )}

              {/* Financial Calculation Lines */}
              <div className="space-y-1.5 text-xs pt-1 border-t border-[#FAF8F3]">
                <div className="flex justify-between text-[#57564E]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#2E6B47] font-medium">
                    <span>Club Promotion</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#57564E]">
                  <span>Shipping</span>
                  <span>{subtotal >= freeShippingThreshold ? 'FREE (Clubhouse)' : '$15.00'}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1C1C1A] pt-2 border-t border-[#E4E0D6]">
                  <span>Total Estimated</span>
                  <span className={`transition-colors duration-500 ${highlightTotal ? 'text-[#2E6B47] font-bold scale-105' : ''}`}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full btn-primary py-3 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8B897D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B47]" />
                <span>Simulated secure SSL clubhouse checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
