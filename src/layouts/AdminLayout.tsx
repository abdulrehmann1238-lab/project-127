import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  RefreshCw,
  Store,
  ExternalLink,
  ShieldCheck,
  Bell,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { lastSyncTime, isSyncing, triggerManualSync, products } = useInventory();

  const lowStockCount = products.filter((p) => p.stock <= 3).length;

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    {
      label: 'POS Inventory Sync',
      path: '/admin/inventory-sync',
      icon: RefreshCw,
      badge: 'WOW DEMO'
    },
    { label: 'Products & Stock', path: '/admin/products', icon: Package, alert: lowStockCount > 0 },
    { label: 'Customer Orders', path: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex text-[#1C1C1A]">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#14211A] text-[#FAF8F3] hidden md:flex flex-col justify-between border-r border-[#FAF8F3]/10 shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#FAF8F3]/10">
            <Link to="/" className="block">
              <span className="font-serif text-lg font-medium tracking-[0.08em] text-[#FAF8F3]">
                THE ELEVATED GREEN
              </span>
              <span className="text-[10px] text-[#B8916A] uppercase tracking-[0.2em] font-sans block mt-0.5">
                Operations &amp; POS Portal
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1F3B2C] text-white shadow-sm border border-[#2E6B47]/40'
                      : 'text-[#D7CEBE] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#B8916A]" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="bg-[#B8916A] text-[#14211A] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider animate-pulse">
                      {item.badge}
                    </span>
                  )}

                  {item.alert && (
                    <span className="bg-[#B4763A] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {lowStockCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Status Card */}
        <div className="p-4 m-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6B47] animate-pulse" />
              <span className="text-xs font-semibold text-white">Square POS</span>
            </div>
            <span className="text-[10px] text-[#8B897D] font-mono">{lastSyncTime}</span>
          </div>

          <p className="text-[11px] text-[#8B897D] leading-tight">
            Terminal #4 (Carmel Pro Shop) online and bidirectional webhook channel open.
          </p>

          <Link
            to="/"
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Exit to Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Operational Bar */}
        <header className="bg-white border-b border-[#E4E0D6] px-6 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Nav Link Indicator */}
            <div className="md:hidden flex items-center gap-2">
              <Link to="/" className="font-serif text-sm font-semibold text-[#1F3B2C]">
                ELEVATED GREEN
              </Link>
              <span className="text-xs text-stone-400">/ Admin</span>
            </div>

            {/* Live POS Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#2E6B47]/10 border border-[#2E6B47]/20 rounded-full text-xs font-medium text-[#2E6B47]">
              <span className="w-2 h-2 rounded-full bg-[#2E6B47] animate-ping" />
              <span>Square POS Integration: Connected &bull; Synced {lastSyncTime}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerManualSync()}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded text-xs font-semibold text-stone-700 transition-colors"
              title="Force full inventory reconcile"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#1F3B2C]' : ''}`} />
              <span className="hidden sm:inline">Force Sync</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F3B2C] hover:bg-[#16291F] text-white rounded text-xs font-semibold shadow-sm transition-colors"
            >
              <span>View Live Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Mobile Admin Nav Strip */}
        <div className="md:hidden bg-[#14211A] text-white p-2 flex overflow-x-auto gap-2 text-xs">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                location.pathname === item.path ? 'bg-[#1F3B2C] text-white' : 'text-stone-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Page Outlet */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
