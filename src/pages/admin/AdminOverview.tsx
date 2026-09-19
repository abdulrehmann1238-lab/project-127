import React from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Store,
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { MOCK_KPIS, REVENUE_CHART_DATA } from '../../data/mockAdminKpis';
import { useInventory } from '../../context/InventoryContext';
import { useAuth } from '../../context/AuthContext';

export const AdminOverview: React.FC = () => {
  const { products, lastSyncTime } = useInventory();
  const { orders } = useAuth();

  const lowStockProducts = products.filter((p) => p.stock <= 3);

  // Calculate max revenue for chart height scale
  const maxRevenue = Math.max(...REVENUE_CHART_DATA.map((d) => d.revenue));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Page Title & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1A]">Operations Overview</h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time retail telemetry, Square POS sync telemetry, and order velocity.
          </p>
        </div>

        <Link
          to="/admin/inventory-sync"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1F3B2C] hover:bg-[#16291F] text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#B8916A]" />
          <span>Launch POS Live Sync Simulation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 KPI Cards (PRD §11 & §12) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Monthly Revenue */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Monthly Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-[#2E6B47]/10 text-[#2E6B47] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1A]">
            ${MOCK_KPIS.monthlyRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#2E6B47] font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{MOCK_KPIS.revenueGrowth}% vs last month</span>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-[#3C5A73]/10 text-[#3C5A73] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1A]">
            {orders.length + 308}
          </div>
          <div className="text-xs text-stone-500 mt-2">
            <span>Online + In-Store Terminal #4</span>
          </div>
        </div>

        {/* KPI 3: Average Order Value */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Avg Order Value</span>
            <div className="w-8 h-8 rounded-lg bg-[#8A7A5C]/10 text-[#8A7A5C] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1C1A]">
            ${MOCK_KPIS.avgOrderValue}
          </div>
          <div className="text-xs text-stone-500 mt-2">
            <span>Luxury golf lifestyle tier</span>
          </div>
        </div>

        {/* KPI 4: Low Stock Items */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Low Stock SKUs</span>
            <div className="w-8 h-8 rounded-lg bg-[#B4763A]/10 text-[#B4763A] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#B4763A]">
            {lowStockProducts.length}
          </div>
          <div className="text-xs text-[#B4763A] font-semibold mt-2">
            <span>&le; 3 units remaining</span>
          </div>
        </div>

      </div>

      {/* POS Synchronization Alert & Direct Test Banner */}
      <div className="bg-[#14211A] text-white p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2E6B47]/20 border border-[#2E6B47]/40 flex items-center justify-center text-[#2E6B47] shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-medium text-white">Square POS Bi-Directional Cloud Conduit</h3>
              <span className="bg-[#2E6B47] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
              In-store sales at the Carmel &amp; Pebble Beach pro shops instantly deduct online inventory to eliminate double-selling. Tested every 60 seconds with sub-second webhook latency.
            </p>
          </div>
        </div>

        <Link
          to="/admin/inventory-sync"
          className="btn-primary bg-[#FAF8F3] text-[#14211A] hover:bg-white px-5 py-3 text-xs uppercase tracking-wider font-semibold shrink-0 shadow-md flex items-center gap-2"
        >
          <span>Open Live Sync Lab</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Middle Grid: Revenue Trend Chart & Low Stock Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Revenue Trend Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-base font-semibold text-[#1C1C1A]">September Revenue Velocity</h3>
              <p className="text-xs text-stone-400">Daily combined omni-channel gross sales</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#1F3B2C] bg-[#1F3B2C]/10 px-2.5 py-1 rounded">
              Total: $48,210
            </span>
          </div>

          {/* Bar chart representation */}
          <div className="h-48 pt-6 flex items-end justify-between gap-2 sm:gap-3">
            {REVENUE_CHART_DATA.map((pt, idx) => {
              const heightPct = Math.round((pt.revenue / maxRevenue) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 bg-stone-900 text-white text-[10px] font-mono py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    ${pt.revenue} ({pt.orders} orders)
                  </div>

                  <div className="w-full bg-stone-100 rounded-t h-36 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-[#1F3B2C] group-hover:bg-[#B8916A] transition-all duration-300 rounded-t"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono rotate-0">{pt.day.split(' ')[1]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Inventory Warnings (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-serif text-base font-semibold text-[#1C1C1A]">Low Stock Priority</h3>
            <span className="text-xs font-semibold text-[#B4763A] bg-[#B4763A]/10 px-2 py-0.5 rounded">
              {lowStockProducts.length} Alerts
            </span>
          </div>

          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-stone-500 py-6 text-center">All catalog SKUs adequately stocked.</p>
            ) : (
              lowStockProducts.map((p) => (
                <div key={p.id} className="p-3 bg-[#FAF8F3] rounded-lg border border-stone-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C1C1A] line-clamp-1">{p.name}</h4>
                    <span className="text-[11px] font-mono text-stone-500">{p.sku}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#B4763A] block">
                      {p.stock} left
                    </span>
                    <Link
                      to="/admin/products"
                      className="text-[10px] text-[#1F3B2C] underline font-semibold"
                    >
                      Restock
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Recent Orders Stream */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <h3 className="font-serif text-base font-semibold text-[#1C1C1A]">Recent Patron Orders</h3>
          <Link to="/admin/orders" className="text-xs text-[#1F3B2C] font-semibold underline flex items-center gap-1">
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-[#8B897D] uppercase tracking-wider border-b border-stone-100 pb-2">
                <th className="pb-3 font-semibold">Order</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.slice(0, 4).map((ord) => (
                <tr key={ord.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3 font-mono font-bold text-[#1C1C1A]">{ord.orderNumber}</td>
                  <td className="py-3 font-medium text-[#1C1C1A]">{ord.customerName}</td>
                  <td className="py-3 text-stone-500">{ord.date}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#2E6B47]/10 text-[#2E6B47] border border-[#2E6B47]/20">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-[#1F3B2C]">
                    ${ord.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
