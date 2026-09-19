import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductColor } from '../types';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, colorName: string, size: string) => void;
  updateQuantity: (productId: string, colorName: string, size: string, quantity: number) => void;
  clearCart: () => void;
  promoCode: string;
  promoDiscount: number;
  promoError: string | null;
  isApplyingPromo: boolean;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromoCode: () => void;
  cartCount: number;
  subtotal: number;
  total: number;
  shipping: number;
  tax: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'elevated_green_cart_v1';
const PROMO_STORAGE_KEY = 'elevated_green_promo_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = sessionStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      // Preload one sample item for immediate demo readiness
      {
        product: {
          id: 'prod-1',
          slug: 'fairway-quarter-zip-pullover',
          name: 'Fairway Quarter-Zip Pullover',
          subtitle: 'Italian Performance Merino Blend',
          category: 'Apparel',
          price: 188,
          sku: 'EG-QZ-MOS-01',
          description: '',
          details: [],
          materials: '',
          care: '',
          fit: '',
          images: [
            'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80'
          ],
          colors: [{ name: 'Moss Green', hex: '#243C2E' }],
          sizes: ['M'],
          stock: 14,
          posStock: 14,
          rating: 4.9,
          reviewCount: 38
        },
        selectedColor: { name: 'Moss Green', hex: '#243C2E' },
        selectedSize: 'M',
        quantity: 1
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>(() => {
    return sessionStorage.getItem(PROMO_STORAGE_KEY) || '';
  });
  const [promoDiscount, setPromoDiscount] = useState<number>(() => {
    return sessionStorage.getItem(PROMO_STORAGE_KEY) === 'GREEN10' ? 10 : 0;
  });
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState<boolean>(false);

  // Sync to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (product: Product, color: ProductColor, size: string, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [...prev, { product, selectedColor: color, selectedSize: size, quantity }];
    });

    // Auto open drawer per PRD §10
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, colorName: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor.name === colorName && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: string, colorName: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor.name === colorName &&
          item.selectedSize === size
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setPromoDiscount(0);
    sessionStorage.removeItem(PROMO_STORAGE_KEY);
  };

  const applyPromoCode = async (code: string): Promise<boolean> => {
    setIsApplyingPromo(true);
    setPromoError(null);

    // Simulated network verification delay
    await new Promise((res) => setTimeout(res, 450));

    const clean = code.trim().toUpperCase();
    if (clean === 'GREEN10') {
      setPromoCode('GREEN10');
      setPromoDiscount(10);
      sessionStorage.setItem(PROMO_STORAGE_KEY, 'GREEN10');
      setIsApplyingPromo(false);
      return true;
    } else {
      setPromoError('Invalid promotion code. Try "GREEN10" for $10 off.');
      setIsApplyingPromo(false);
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoError(null);
    sessionStorage.removeItem(PROMO_STORAGE_KEY);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.max(0, subtotal - promoDiscount + shipping + tax);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        promoCode,
        promoDiscount,
        promoError,
        isApplyingPromo,
        applyPromoCode,
        removePromoCode,
        cartCount,
        subtotal,
        total,
        shipping,
        tax,
        freeShippingThreshold,
        amountNeededForFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
