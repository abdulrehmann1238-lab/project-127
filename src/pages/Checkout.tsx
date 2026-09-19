import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

type CheckoutStep = 'info' | 'shipping' | 'payment' | 'confirmation';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, total, shipping, tax, promoDiscount, promoCode, clearCart } = useCart();
  const { addNewOrder, user } = useAuth();

  const [step, setStep] = useState<CheckoutStep>('info');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    email: user?.email || 'sarah.jenkins@elevatedgreen.com',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    address: '42 Cypress Point Way',
    apartment: 'Clubhouse Residence 4B',
    city: 'Pebble Beach',
    state: 'CA',
    zip: '93953',
    phone: '(831) 555-0192',
    shippingMethod: 'express', // standard, express, curbside
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '11/28',
    cardCvv: '•••',
    saveInfo: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInfo = () => {
    const errs: Record<string, string> = {};
    if (!formData.email || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.firstName) errs.firstName = 'First name is required';
    if (!formData.lastName) errs.lastName = 'Last name is required';
    if (!formData.address) errs.address = 'Street address is required';
    if (!formData.city) errs.city = 'City is required';
    if (!formData.zip) errs.zip = 'Postal code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInfo()) {
      setStep('shipping');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (paymentType: 'card' | 'apple_pay' | 'google_pay') => {
    setIsProcessing(true);

    // Simulated payment processing delay (1.2s per PRD §10)
    await new Promise((res) => setTimeout(res, 1200));

    const orderNumber = `EG-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: 'Sep 20, 2026',
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      subtotal,
      shipping,
      tax,
      total,
      status: 'Processing',
      items: cart.map((i, idx) => ({
        id: `item-${idx}`,
        productName: i.product.name,
        color: i.selectedColor.name,
        size: i.selectedSize,
        quantity: i.quantity,
        price: i.product.price,
        image: i.product.images[0]
      })),
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip
      },
      trackingNumber: `EG-EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
      estimatedDelivery: 'Sep 23, 2026',
      timeline: [
        { title: 'Order Placed', timestamp: 'Today at 03:30 AM', completed: true },
        { title: `Payment Confirmed via ${paymentType === 'apple_pay' ? 'Apple Pay' : paymentType === 'google_pay' ? 'Google Pay' : 'Card'}`, timestamp: 'Today at 03:31 AM', completed: true },
        { title: 'Fulfillment Routing to Carmel Hub', timestamp: 'In progress', completed: false }
      ]
    };

    addNewOrder(newOrder);
    setCreatedOrder(newOrder);
    clearCart();
    setIsProcessing(false);
    setStep('confirmation');

    // Confetti delight celebration
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#1F3B2C', '#8A7A5C', '#B8916A', '#FAF8F3']
      });
    } catch {
      // ignore
    }
  };

  // If cart is empty and not in confirmation step
  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-[#8B897D] mb-4">
          <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
        </div>
        <h2 className="font-serif text-2xl text-[#1C1C1A]">Your shopping bag is empty</h2>
        <p className="text-xs text-[#8B897D] mt-2 mb-6 max-w-xs">
          Select items from our golf &amp; lifestyle catalog to proceed through checkout.
        </p>
        <Link to="/shop" className="btn-primary px-6 py-2.5 text-xs uppercase tracking-wider">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-serif text-2xl font-medium tracking-[0.08em] text-[#1F3B2C]">
              THE ELEVATED GREEN
            </span>
          </Link>
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#8A7A5C] mt-1 font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Clubhouse Checkout</span>
          </div>
        </div>

        {/* Step Indicator (1. Information -> 2. Shipping -> 3. Payment) */}
        {step !== 'confirmation' && (
          <div className="max-w-md mx-auto mb-10">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div
                className={`flex items-center gap-2 ${
                  step === 'info' ? 'text-[#1F3B2C]' : 'text-[#8B897D]'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step === 'info' ? 'bg-[#1F3B2C] text-white' : 'bg-stone-200 text-stone-600'
                }`}>1</span>
                <span>Information</span>
              </div>
              <div className="w-8 h-[1px] bg-stone-300" />
              <div
                className={`flex items-center gap-2 ${
                  step === 'shipping' ? 'text-[#1F3B2C]' : 'text-[#8B897D]'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step === 'shipping' ? 'bg-[#1F3B2C] text-white' : 'bg-stone-200 text-stone-600'
                }`}>2</span>
                <span>Shipping</span>
              </div>
              <div className="w-8 h-[1px] bg-stone-300" />
              <div
                className={`flex items-center gap-2 ${
                  step === 'payment' ? 'text-[#1F3B2C]' : 'text-[#8B897D]'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step === 'payment' ? 'bg-[#1F3B2C] text-white' : 'bg-stone-200 text-stone-600'
                }`}>3</span>
                <span>Payment</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation Screen (§10 & §21 SVG checkmark draw) */}
        {step === 'confirmation' && createdOrder && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E4E0D6] p-8 sm:p-12 text-center shadow-lg animate-fadeIn">
            
            {/* Animated SVG Checkmark */}
            <div className="w-20 h-20 mx-auto rounded-full bg-[#2E6B47]/10 flex items-center justify-center text-[#2E6B47] mb-6">
              <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="#2E6B47" strokeWidth="3" opacity="0.2" />
                <path
                  d="M14 24L21 31L34 18"
                  stroke="#2E6B47"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-checkmark"
                />
              </svg>
            </div>

            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8A7A5C]">
              Order Confirmed &bull; Clubhouse Registered
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A] mt-2 font-medium">
              You're all set, {createdOrder.customerName.split(' ')[0]}.
            </h1>

            <p className="text-xs sm:text-sm text-[#57564E] mt-3 max-w-md mx-auto leading-relaxed">
              Order <span className="font-semibold text-[#1C1C1A] font-mono">#{createdOrder.orderNumber}</span> has been transmitted to our Pebble Beach fulfillment center. A formal receipt and courier tracking details have been sent to <span className="font-semibold text-[#1C1C1A]">{createdOrder.customerEmail}</span>.
            </p>

            {/* Order Details Card */}
            <div className="mt-8 p-6 bg-[#FAF8F3] rounded-xl border border-[#E4E0D6] text-left space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#E4E0D6] text-xs">
                <div>
                  <span className="text-[#8B897D]">Order ID: </span>
                  <span className="font-mono font-bold text-[#1C1C1A]">{createdOrder.orderNumber}</span>
                </div>
                <div className="text-[#2E6B47] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Paid in Full (${createdOrder.total.toFixed(2)})</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {createdOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.productName} className="w-12 h-14 object-cover rounded bg-white" />
                      <div>
                        <div className="font-semibold text-[#1C1C1A]">{item.productName}</div>
                        <div className="text-[11px] text-[#8B897D]">Qty: {item.quantity} &bull; Size: {item.size} &bull; Color: {item.color}</div>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-[#1F3B2C]">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="pt-3 border-t border-[#E4E0D6] text-xs flex justify-between text-[#57564E]">
                <span>Shipping To:</span>
                <span className="font-medium text-[#1C1C1A] text-right">
                  {createdOrder.shippingAddress.street}, {createdOrder.shippingAddress.city}, {createdOrder.shippingAddress.state} {createdOrder.shippingAddress.zip}
                </span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/account"
                className="w-full sm:w-auto btn-primary px-8 py-3.5 text-xs uppercase tracking-wider font-semibold"
              >
                Track in Account Portal
              </Link>
              <Link
                to="/shop"
                className="w-full sm:w-auto btn-secondary px-8 py-3.5 text-xs uppercase tracking-wider font-semibold"
              >
                Continue Shopping
              </Link>
            </div>

          </div>
        )}

        {/* Step 1, 2, 3 Main Layout */}
        {step !== 'confirmation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Form Steps (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E4E0D6] shadow-sm">
              
              {/* STEP 1: INFORMATION */}
              {step === 'info' && (
                <form onSubmit={handleInfoSubmit} className="space-y-6">
                  {/* Express Mock Buttons (§1, #4) */}
                  <div>
                    <span className="text-xs uppercase font-semibold text-[#8B897D] tracking-wider block mb-3 text-center">
                      Express One-Click Checkout
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handlePlaceOrder('apple_pay')}
                        disabled={isProcessing}
                        className="py-3 px-4 bg-black text-white rounded-md text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        {isProcessing ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span className="font-mono text-sm">Pay</span>
                            <span>Apple Pay</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePlaceOrder('google_pay')}
                        disabled={isProcessing}
                        className="py-3 px-4 bg-white border border-stone-300 text-stone-800 rounded-md text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        {isProcessing ? (
                          <span className="w-4 h-4 border-2 border-stone-800 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span className="font-bold text-sm text-blue-600">G</span>
                            <span>Pay</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="w-full border-t border-[#E4E0D6]" />
                    <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-[#8B897D] absolute">
                      Or standard shipping
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-lg text-[#1C1C1A]">Contact Details</h3>
                    <div>
                      <label className="text-xs font-medium text-[#57564E] block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 bg-[#FAF8F3] border rounded-md text-xs focus:outline-none focus:border-[#1F3B2C] ${
                          errors.email ? 'border-[#A23B33]' : 'border-[#E4E0D6]'
                        }`}
                        placeholder="sarah.jenkins@elevatedgreen.com"
                      />
                      {errors.email && <p className="text-[11px] text-[#A23B33] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-3 pt-2">
                    <h3 className="font-serif text-lg text-[#1C1C1A]">Clubhouse or Residence Address</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-[#57564E] block mb-1">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#57564E] block mb-1">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#57564E] block mb-1">Street Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#57564E] block mb-1">Suite / Villa / Locker (Optional)</label>
                      <input
                        type="text"
                        value={formData.apartment}
                        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-medium text-[#57564E] block mb-1">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#57564E] block mb-1">State</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#57564E] block mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3.5 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Continue to Delivery Options</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* STEP 2: SHIPPING OPTIONS */}
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="p-4 bg-[#FAF8F3] rounded-lg border border-[#E4E0D6] text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#8B897D]">Ship to:</span>
                      <span className="font-medium text-[#1C1C1A]">
                        {formData.address}, {formData.city}, {formData.state} {formData.zip}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B897D]">Recipient:</span>
                      <span className="font-medium text-[#1C1C1A]">{formData.firstName} {formData.lastName}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-lg text-[#1C1C1A]">Select Delivery Tier</h3>
                    <div className="space-y-2.5">
                      <label className="flex items-center justify-between p-4 bg-white border border-[#1F3B2C] rounded-lg cursor-pointer ring-1 ring-[#1F3B2C]">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={formData.shippingMethod === 'express'}
                            onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                            className="w-4 h-4 text-[#1F3B2C] accent-[#1F3B2C]"
                          />
                          <div>
                            <div className="text-xs font-semibold text-[#1C1C1A]">
                              Clubhouse White-Glove Priority (2-3 Business Days)
                            </div>
                            <div className="text-[11px] text-[#8B897D]">Includes monogrammed cedar hanger and breathable garment travel bag</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#1F3B2C]">
                          {shipping === 0 ? 'COMPLIMENTARY' : '$15.00'}
                        </span>
                      </label>

                      <label className="flex items-center justify-between p-4 bg-white border border-[#E4E0D6] rounded-lg cursor-pointer hover:border-[#1F3B2C]">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={formData.shippingMethod === 'curbside'}
                            onChange={() => setFormData({ ...formData, shippingMethod: 'curbside' })}
                            className="w-4 h-4 text-[#1F3B2C] accent-[#1F3B2C]"
                          />
                          <div>
                            <div className="text-xs font-semibold text-[#1C1C1A]">
                              Curbside Pickup &bull; Pebble Beach Flagship Pro Shop
                            </div>
                            <div className="text-[11px] text-[#2E6B47] font-medium">Ready in 2 hours with in-store Square POS verification</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#2E6B47]">FREE</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep('info')}
                      className="w-1/3 py-3.5 border border-[#E4E0D6] rounded-md text-xs font-semibold text-[#57564E] hover:bg-stone-50 flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 btn-primary py-3.5 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {step === 'payment' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E4E0D6]">
                    <h3 className="font-serif text-lg text-[#1C1C1A]">Payment Details</h3>
                    <div className="flex items-center gap-2 text-xs text-[#8A7A5C]">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Simulated Sandbox Test</span>
                    </div>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-[#57564E] block mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs font-mono focus:outline-none focus:border-[#1F3B2C]"
                        />
                        <CreditCard className="w-4 h-4 text-[#8A7A5C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-[#57564E] block mb-1">Expiration Date</label>
                        <input
                          type="text"
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs font-mono focus:outline-none focus:border-[#1F3B2C]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#57564E] block mb-1">Security Code (CVV)</label>
                        <input
                          type="password"
                          value={formData.cardCvv}
                          onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs font-mono focus:outline-none focus:border-[#1F3B2C]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      disabled={isProcessing}
                      className="w-1/3 py-3.5 border border-[#E4E0D6] rounded-md text-xs font-semibold text-[#57564E] hover:bg-stone-50 flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePlaceOrder('card')}
                      disabled={isProcessing}
                      className="w-2/3 btn-primary py-3.5 text-xs uppercase tracking-wider font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Authorizing Clubhouse Charge...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Authorize &bull; ${total.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E4E0D6] shadow-sm space-y-4 self-start">
              <h3 className="font-serif text-base font-medium text-[#1F3B2C] pb-3 border-b border-[#E4E0D6]">
                Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} items)
              </h3>

              {/* Items preview */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                    className="flex gap-3 text-xs"
                  >
                    <div className="relative">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-16 object-cover rounded bg-[#FAF8F3] border border-[#E4E0D6]"
                      />
                      <span className="absolute -top-1.5 -right-1.5 bg-[#1F3B2C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium text-[#1C1C1A] line-clamp-1">{item.product.name}</h4>
                        <p className="text-[11px] text-[#8B897D]">{item.selectedColor.name} &bull; {item.selectedSize}</p>
                      </div>
                      <span className="font-mono font-semibold text-[#1F3B2C]">${item.product.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="pt-4 border-t border-[#E4E0D6] space-y-2 text-xs">
                <div className="flex justify-between text-[#57564E]">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#2E6B47] font-medium">
                    <span>Promotion ({promoCode})</span>
                    <span className="font-mono">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#57564E]">
                  <span>Shipping</span>
                  <span className="font-mono">{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-[#57564E]">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1C1C1A] pt-3 border-t border-[#E4E0D6]">
                  <span>Total</span>
                  <span className="font-mono text-[#1F3B2C]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F3] rounded border border-[#E4E0D6] text-[11px] text-[#8B897D] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B8916A] shrink-0" />
                <span>Earn 154 Clubhouse Patron tier points with this purchase.</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
