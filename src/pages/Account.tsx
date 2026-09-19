import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import {
  Package,
  MapPin,
  CreditCard,
  Award,
  ChevronRight,
  X,
  CheckCircle2,
  Clock,
  Truck,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const Account: React.FC = () => {
  const { user, orders, isAuthenticated, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payments' | 'perks'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#FAF8F3]">
        <div className="max-w-md w-full bg-white p-8 rounded-xl border border-[#E4E0D6] shadow-sm text-center">
          <span className="text-xs uppercase font-semibold tracking-[0.15em] text-[#8A7A5C]">
            Clubhouse Access
          </span>
          <h2 className="font-serif text-2xl text-[#1C1C1A] mt-1 mb-6">Patron Member Sign-In</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="space-y-4 text-left"
          >
            <div>
              <label className="text-xs font-medium text-[#57564E] block mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="sarah.jenkins@elevatedgreen.com"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#57564E] block mb-1">Passcode</label>
              <input
                type="password"
                defaultValue="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary py-3 text-xs uppercase tracking-wider font-semibold shadow-md mt-2"
            >
              Sign In to Member Portal
            </button>
            <p className="text-[11px] text-[#8B897D] text-center">
              (Demo access: Any input signs in as Sarah Jenkins)
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header Banner */}
        <div className="bg-white rounded-2xl border border-[#E4E0D6] p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1F3B2C] text-[#FAF8F3] font-serif text-xl flex items-center justify-center font-semibold">
                {user.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl text-[#1C1C1A]">{user.name}</h1>
                  <span className="bg-[#FAF8F3] text-[#1F3B2C] border border-[#E4E0D6] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                    {user.memberTier}
                  </span>
                </div>
                <div className="text-xs text-[#8B897D] mt-0.5 space-x-3">
                  <span>Home Club: {user.homeClub}</span>
                  <span>&bull;</span>
                  <span>Handicap Index: {user.handicap}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="text-right hidden sm:block">
                <div className="text-[#8B897D]">Member Spending</div>
                <div className="font-semibold text-[#1C1C1A] font-mono">${user.totalSpent.toLocaleString()}</div>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 border border-[#E4E0D6] rounded text-[#57564E] hover:text-[#A23B33] hover:border-[#A23B33] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#E4E0D6] overflow-x-auto">
            {[
              { id: 'orders', label: 'Order History', icon: Package, count: orders.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
              { id: 'payments', label: 'Payment Methods', icon: CreditCard },
              { id: 'perks', label: 'Patron Perks', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1F3B2C] text-[#FAF8F3] shadow-sm'
                      : 'text-[#57564E] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-[#E4E0D6] p-6 shadow-sm hover:border-[#8A7A5C] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E4E0D6] gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-[#1C1C1A]">{order.orderNumber}</span>
                    <span className="text-[#8B897D]">&bull; Placed on {order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-medium text-[11px] ${
                        order.status === 'Delivered'
                          ? 'bg-[#2E6B47]/10 text-[#2E6B47] border border-[#2E6B47]/30'
                          : order.status === 'Shipped'
                          ? 'bg-[#3C5A73]/10 text-[#3C5A73] border border-[#3C5A73]/30'
                          : order.status === 'Ready for Pickup'
                          ? 'bg-[#B4763A]/10 text-[#B4763A] border border-[#B4763A]/30'
                          : 'bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="font-mono font-bold text-sm text-[#1F3B2C]">${order.total}</span>
                  </div>
                </div>

                {/* Items Summary Row */}
                <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-x-auto py-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 shrink-0">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-14 object-cover rounded bg-[#FAF8F3] border border-[#E4E0D6]"
                        />
                        <div className="text-xs max-w-[140px]">
                          <div className="font-medium text-[#1C1C1A] line-clamp-1">{item.productName}</div>
                          <div className="text-[11px] text-[#8B897D]">Qty: {item.quantity} &bull; {item.size}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="btn-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider self-start sm:self-auto shrink-0 flex items-center gap-1.5"
                  >
                    <span>Inspect Order &bull; Timeline</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border-2 border-[#1F3B2C] shadow-sm relative">
              <span className="absolute top-4 right-4 bg-[#1F3B2C] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                Default Residence
              </span>
              <h3 className="font-serif text-lg text-[#1C1C1A] mb-2">Pebble Beach Residence</h3>
              <p className="text-xs text-[#57564E] leading-relaxed">
                Sarah Jenkins<br />
                42 Cypress Point Way<br />
                Clubhouse Residence 4B<br />
                Pebble Beach, CA 93953<br />
                United States
              </p>
              <div className="mt-4 pt-4 border-t border-[#E4E0D6] flex gap-3 text-xs">
                <button className="text-[#1F3B2C] underline font-medium">Edit</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E4E0D6] shadow-sm">
              <h3 className="font-serif text-lg text-[#1C1C1A] mb-2">Monterey Peninsula Country Club Locker</h3>
              <p className="text-xs text-[#57564E] leading-relaxed">
                Sarah Jenkins &bull; Locker #14<br />
                3000 Club Road<br />
                Pebble Beach, CA 93953<br />
                United States
              </p>
              <div className="mt-4 pt-4 border-t border-[#E4E0D6] flex gap-3 text-xs">
                <button className="text-[#1F3B2C] underline font-medium">Set as Default</button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Payment Methods */}
        {activeTab === 'payments' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E4E0D6] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 rounded bg-stone-900 text-white flex items-center justify-center font-bold text-xs font-mono">
                  VISA
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1C1C1A]">Visa ending in 4242</div>
                  <div className="text-[11px] text-[#8B897D]">Expires 11/28 &bull; Default</div>
                </div>
              </div>
              <span className="text-xs text-[#2E6B47] font-semibold">Active</span>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E4E0D6] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 rounded bg-black text-white flex items-center justify-center font-mono text-xs">
                  Pay
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1C1C1A]">Apple Pay Linked</div>
                  <div className="text-[11px] text-[#8B897D]">Express checkout authenticated</div>
                </div>
              </div>
              <span className="text-xs text-[#2E6B47] font-semibold">Active</span>
            </div>
          </div>
        )}

        {/* Tab 4: Perks */}
        {activeTab === 'perks' && (
          <div className="bg-white rounded-xl border border-[#E4E0D6] p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase font-semibold tracking-[0.15em] text-[#8A7A5C]">
                Tier Status
              </span>
              <h3 className="font-serif text-2xl text-[#1C1C1A] mt-1">Clubhouse Patron Member</h3>
              <p className="text-xs text-[#57564E] mt-1">
                You enjoy complimentary clubhouse expedited delivery, annual monogramming privileges, and early reservation access to private fitting rooms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E4E0D6]">
              <div className="p-4 bg-[#FAF8F3] rounded-lg border border-[#E4E0D6]">
                <div className="font-serif text-xl font-bold text-[#1F3B2C]">1,248</div>
                <div className="text-xs font-medium text-[#1C1C1A] mt-1">Patron Points</div>
                <div className="text-[11px] text-[#8B897D]">Redeemable for bespoke headcovers</div>
              </div>
              <div className="p-4 bg-[#FAF8F3] rounded-lg border border-[#E4E0D6]">
                <div className="font-serif text-xl font-bold text-[#1F3B2C]">Unlimited</div>
                <div className="text-xs font-medium text-[#1C1C1A] mt-1">Monogramming</div>
                <div className="text-[11px] text-[#8B897D]">On all gloves and leather yardage books</div>
              </div>
              <div className="p-4 bg-[#FAF8F3] rounded-lg border border-[#E4E0D6]">
                <div className="font-serif text-xl font-bold text-[#1F3B2C]">Priority</div>
                <div className="text-xs font-medium text-[#1C1C1A] mt-1">In-Store Valet Pickup</div>
                <div className="text-[11px] text-[#8B897D]">Carmel &amp; Pebble Beach Flagships</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Order Detail Drawer (Timeline & Items) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setSelectedOrder(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-[#E4E0D6]">
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#E4E0D6] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#1C1C1A]">Order Details</h3>
                  <div className="text-xs text-[#8B897D] font-mono">{selectedOrder.orderNumber} &bull; {selectedOrder.date}</div>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-stone-500 hover:text-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Status Stepper Timeline */}
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-[#1C1C1A] mb-4">
                    Shipment Tracking &bull; {selectedOrder.status}
                  </h4>
                  <div className="space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                    {selectedOrder.timeline.map((item, idx) => (
                      <div key={idx} className="relative text-xs">
                        <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          item.completed
                            ? 'bg-[#1F3B2C] border-[#1F3B2C] text-white'
                            : 'bg-white border-stone-300'
                        }`}>
                          {item.completed && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <div className="font-semibold text-[#1C1C1A]">{item.title}</div>
                        <div className="text-[11px] text-[#8B897D]">{item.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div className="pt-4 border-t border-[#E4E0D6]">
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-[#1C1C1A] mb-3">
                    Items Purchased ({selectedOrder.items.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-3 text-xs p-3 bg-[#FAF8F3] rounded-lg border border-[#E4E0D6]">
                        <img src={item.image} alt={item.productName} className="w-14 h-16 object-cover rounded bg-white" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="font-semibold text-[#1C1C1A]">{item.productName}</div>
                            <div className="text-[11px] text-[#8B897D]">
                              Qty: {item.quantity} &bull; Size: {item.size} &bull; Color: {item.color}
                            </div>
                          </div>
                          <span className="font-mono font-semibold text-[#1F3B2C]">${item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping info */}
                <div className="pt-4 border-t border-[#E4E0D6] text-xs space-y-1">
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-[#1C1C1A] mb-2">
                    Delivery Destination
                  </h4>
                  <p className="text-[#57564E]">
                    {selectedOrder.customerName}<br />
                    {selectedOrder.shippingAddress.street}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                  </p>
                  {selectedOrder.trackingNumber && (
                    <div className="pt-2 font-mono text-[11px] text-[#8A7A5C]">
                      Carrier Tracking: {selectedOrder.trackingNumber}
                    </div>
                  )}
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-[#FAF8F3] border-t border-[#E4E0D6] flex justify-between items-center text-xs">
                <span className="text-[#57564E]">Order Total</span>
                <span className="font-mono font-bold text-base text-[#1F3B2C]">${selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
