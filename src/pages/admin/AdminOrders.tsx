import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Order, OrderStatus } from '../../types';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ShoppingBag,
  X,
  Store,
  ChevronRight
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [inspectedOrder, setInspectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    if (statusFilter !== 'All' && ord.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1A]">Customer Orders &amp; Fulfillment</h1>
        <p className="text-xs text-stone-500 mt-1">
          Monitor inbound website checkouts and in-store curbside valet pickup requests.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search order number or patron name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Ready for Pickup'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-[#1F3B2C] text-white shadow-xs'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Order</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Items</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Total</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((ord) => (
                <tr
                  key={ord.id}
                  onClick={() => setInspectedOrder(ord)}
                  className="hover:bg-stone-50 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1C1C1A] group-hover:text-[#1F3B2C]">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">{ord.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#1C1C1A]">{ord.customerName}</div>
                    <div className="text-[11px] text-stone-400">{ord.customerEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : ord.status === 'Ready for Pickup'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1F3B2C] text-right">
                    ${ord.total}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-xs text-[#1F3B2C] font-semibold underline flex items-center justify-end gap-1">
                      <span>Timeline</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Drawer */}
      {inspectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setInspectedOrder(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-stone-200">
              {/* Header */}
              <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div>
                  <h3 className="font-serif text-lg text-[#1C1C1A]">Order Telemetry &bull; {inspectedOrder.orderNumber}</h3>
                  <div className="text-xs text-stone-500 font-mono">Recorded: {inspectedOrder.date}</div>
                </div>
                <button onClick={() => setInspectedOrder(null)} className="p-1 text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                {/* Status Stepper */}
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-stone-700 mb-3">
                    Fulfillment Progress Stepper
                  </h4>
                  <div className="space-y-3 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                    {inspectedOrder.timeline.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                          step.completed ? 'bg-[#2E6B47] border-[#2E6B47] text-white' : 'bg-white border-stone-300'
                        }`}>
                          {step.completed && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <div className="font-semibold text-stone-900">{step.title}</div>
                        <div className="text-stone-400 text-[11px]">{step.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div className="pt-4 border-t border-stone-100">
                  <h4 className="font-semibold uppercase tracking-wider text-stone-700 mb-3">
                    Line Items
                  </h4>
                  <div className="space-y-2">
                    {inspectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2.5 bg-stone-50 rounded border border-stone-200">
                        <div className="flex items-center gap-2.5">
                          <img src={item.image} alt={item.productName} className="w-10 h-12 object-cover rounded bg-white" />
                          <div>
                            <div className="font-semibold text-stone-900">{item.productName}</div>
                            <div className="text-[11px] text-stone-500">
                              Qty: {item.quantity} &bull; Size: {item.size} &bull; Color: {item.color}
                            </div>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-stone-900">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Address */}
                <div className="pt-4 border-t border-stone-100 space-y-1">
                  <h4 className="font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Customer Information
                  </h4>
                  <p className="text-stone-700 font-medium">{inspectedOrder.customerName} ({inspectedOrder.customerEmail})</p>
                  <p className="text-stone-500">
                    {inspectedOrder.shippingAddress.street}, {inspectedOrder.shippingAddress.city}, {inspectedOrder.shippingAddress.state} {inspectedOrder.shippingAddress.zip}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-xs">
                <span className="text-stone-600">Total Settled</span>
                <span className="font-mono font-bold text-base text-[#1F3B2C]">${inspectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
