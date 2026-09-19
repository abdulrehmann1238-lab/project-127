import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventory } from '../../context/InventoryContext';
import {
  RefreshCw,
  Store,
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap,
  Radio,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  History,
  Activity
} from 'lucide-react';

export const InventorySync: React.FC = () => {
  const {
    products,
    lastSyncTime,
    secondsSinceLastSync,
    isSyncing,
    syncEvents,
    simulateInStoreSale,
    triggerManualSync
  } = useInventory();

  // Selected product for simulation
  const [selectedSku, setSelectedSku] = useState<string>(products[2]?.sku || 'EG-GL-TAN-03'); // default to glove (low stock)
  const [saleQty, setSaleQty] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [lastSoldProduct, setLastSoldProduct] = useState<string>('');
  const [flashOnlineSku, setFlashOnlineSku] = useState<string | null>(null);

  // Focus sample set of 6 representative products per PRD §10
  const syncProducts = products.slice(0, 6);

  const handleSimulateSale = async () => {
    const targetProduct = products.find((p) => p.sku === selectedSku);
    if (!targetProduct || targetProduct.posStock <= 0) return;

    setIsSimulating(true);
    setLastSoldProduct(targetProduct.name);

    // Trigger simulation via context (POS decrements -> 650ms pulse -> online syncs)
    await simulateInStoreSale(selectedSku, saleQty);

    setFlashOnlineSku(selectedSku);
    setTimeout(() => {
      setFlashOnlineSku(null);
      setIsSimulating(false);
    }, 1200);
  };

  const currentSelected = products.find((p) => p.sku === selectedSku);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header & Pitch Banner */}
      <div className="bg-[#14211A] text-white p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2E6B47]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E6B47]/20 border border-[#2E6B47]/40 text-[#2E6B47] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#2E6B47] animate-ping" />
              <span>Client Bid Highlight &bull; Feature #8</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              Live Square POS Inventory Conduit
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
              Demonstrates real-time bi-directional stock reconciliation between the physical clubhouse register terminal and the online eCommerce storefront. An in-store purchase instantly decrements website inventory to prevent double-selling.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => triggerManualSync()}
              disabled={isSyncing}
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Force Ledger Audit</span>
            </button>
            <Link
              to="/shop"
              target="_blank"
              className="w-full sm:w-auto px-4 py-3 bg-[#FAF8F3] hover:bg-white text-[#14211A] rounded-lg text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Verify on Live Shop</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* INTERACTIVE SIMULATOR ACTION CONTROLLER (THE WOW TRIGGER) */}
      <div className="bg-white p-6 rounded-2xl border-2 border-[#1F3B2C] shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1F3B2C] text-white flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#B8916A]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#1C1C1A]">
                Interactive In-Store Sale Simulator
              </h2>
              <p className="text-xs text-stone-500">
                Pick a SKU and trigger a simulated physical POS transaction to watch the live conduit transmit the stock update.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#2E6B47] bg-[#2E6B47]/10 px-3 py-1.5 rounded-full self-start sm:self-auto">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Conduit Latency: ~60ms &bull; Synced {lastSyncTime}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-2">
          
          {/* Select Product */}
          <div className="md:col-span-6">
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Select Product to Sell In-Store (Carmel Register):
            </label>
            <select
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-3 text-xs font-medium text-[#1C1C1A] focus:outline-none focus:border-[#1F3B2C]"
            >
              {syncProducts.map((p) => (
                <option key={p.sku} value={p.sku}>
                  {p.name} ({p.sku}) &bull; Stock: {p.posStock} units &bull; ${p.price}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Quantity Sold:
            </label>
            <select
              value={saleQty}
              onChange={(e) => setSaleQty(parseInt(e.target.value, 10))}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-3 text-xs font-medium text-[#1C1C1A] focus:outline-none focus:border-[#1F3B2C]"
            >
              <option value={1}>1 unit</option>
              <option value={2}>2 units</option>
              <option value={3}>3 units</option>
            </select>
          </div>

          {/* Execute Button */}
          <div className="md:col-span-4">
            <button
              type="button"
              onClick={handleSimulateSale}
              disabled={isSimulating || !currentSelected || currentSelected.posStock <= 0}
              className="w-full py-3 px-4 btn-primary text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Webhook Packet...</span>
                </>
              ) : (
                <>
                  <Store className="w-4 h-4" />
                  <span>Register POS Sale &bull; Simulate Tap</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Live Status Output Message */}
        {lastSoldProduct && (
          <div className="p-3 bg-[#2E6B47]/10 border border-[#2E6B47]/30 rounded-lg text-xs text-[#2E6B47] flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                <strong>In-Store Sale Registered:</strong> Deducted {saleQty} unit(s) of <em>{lastSoldProduct}</em>. Cloud webhook synchronized successfully.
              </span>
            </div>
            <span className="font-mono text-[11px] text-stone-500">Status 200 OK</span>
          </div>
        )}
      </div>

      {/* TWO-PANEL SYNCHRONIZED COMPARISON VIEW (§10) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
        
        {/* PANEL 1: IN-STORE SQUARE POS TERMINAL (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-xs">
                  <Store className="w-5 h-5 text-[#B8916A]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900">
                    Square POS Terminal #4
                  </h3>
                  <div className="text-[11px] text-stone-500">
                    Carmel-by-the-Sea Flagship Pro Shop
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2E6B47]/10 text-[#2E6B47] border border-[#2E6B47]/20">
                Connected
              </span>
            </div>

            {/* List of 6 Products on POS */}
            <div className="space-y-3">
              {syncProducts.map((p) => {
                const isSelected = p.sku === selectedSku;
                return (
                  <div
                    key={p.sku}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#1F3B2C] bg-[#1F3B2C]/5'
                        : 'border-stone-100 bg-stone-50/70 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-12 object-cover rounded bg-white border border-stone-200 shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-[#1C1C1A] text-xs line-clamp-1">{p.name}</div>
                        <div className="text-[11px] font-mono text-stone-400">{p.sku}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-stone-500 font-mono">Register Stock</div>
                      <div className="text-sm font-bold font-mono text-stone-900">
                        {p.posStock} units
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-400 font-mono flex items-center justify-between">
            <span>DEVICE ID: SQ-REG-CARMEL-04</span>
            <span>PORT 443 SSL</span>
          </div>
        </div>

        {/* CONNECTING CONDUIT PULSE (2 cols desktop, visual bridge) */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center p-4">
          <div className="w-full flex lg:flex-col items-center justify-center gap-3 text-center">
            
            <div className="hidden lg:block text-[11px] font-mono font-semibold uppercase text-stone-400 tracking-wider">
              Cloud Relay
            </div>

            {/* Visual Animated Conduit Wire */}
            <div className="relative w-full lg:w-0.5 h-1 lg:h-44 bg-stone-200 rounded-full overflow-hidden flex items-center justify-center">
              {/* Traveling Pulse Bead */}
              <div
                className={`absolute w-4 h-4 rounded-full bg-[#2E6B47] shadow-lg transition-all ${
                  isSimulating
                    ? 'translate-x-12 lg:translate-y-16 scale-150 bg-[#B8916A] shadow-amber-300'
                    : 'translate-x-0 lg:translate-y-0 scale-100'
                }`}
                style={{
                  transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </div>

            <div className="p-2.5 rounded-full bg-stone-100 border border-stone-200 text-[#1F3B2C]">
              <Activity className={`w-5 h-5 ${isSimulating ? 'text-[#B8916A] animate-spin' : ''}`} />
            </div>

            <div className="text-[10px] font-mono text-stone-500">
              {isSimulating ? 'PAYLOAD IN FLIGHT...' : 'SUB-SECOND SYNC'}
            </div>
          </div>
        </div>

        {/* PANEL 2: ONLINE STOREFRONT INVENTORY LEDGER (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1F3B2C] text-white flex items-center justify-center shadow-xs">
                  <Globe className="w-5 h-5 text-[#FAF8F3]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900">
                    Online Storefront Ledger
                  </h3>
                  <div className="text-[11px] text-stone-500">
                    eCommerce Cloud Database &bull; Global CDN
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                Live Public
              </span>
            </div>

            {/* List of 6 Products on Online Store */}
            <div className="space-y-3">
              {syncProducts.map((p) => {
                const isFlashing = flashOnlineSku === p.sku;
                const isLowStock = p.stock > 0 && p.stock <= 3;
                return (
                  <div
                    key={p.sku}
                    className={`p-3 rounded-xl border transition-all duration-500 flex items-center justify-between ${
                      isFlashing
                        ? 'border-[#2E6B47] bg-[#2E6B47]/15 scale-[1.02] ring-2 ring-[#2E6B47]/30'
                        : 'border-stone-100 bg-stone-50/70 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-12 object-cover rounded bg-white border border-stone-200 shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-[#1C1C1A] text-xs line-clamp-1">{p.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {isLowStock && (
                            <span className="bg-[#B4763A] text-white text-[9px] font-bold px-1.5 py-0.2 rounded animate-pulse">
                              Only {p.stock} left
                            </span>
                          )}
                          <Link
                            to={`/product/${p.slug}`}
                            target="_blank"
                            className="text-[11px] text-[#1F3B2C] underline flex items-center gap-0.5 font-medium"
                          >
                            <span>Live PDP</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-stone-500 font-mono">Storefront Stock</div>
                      <div
                        className={`text-sm font-bold font-mono transition-colors ${
                          isFlashing
                            ? 'text-[#2E6B47] text-base scale-110'
                            : isLowStock
                            ? 'text-[#B4763A]'
                            : 'text-[#1F3B2C]'
                        }`}
                      >
                        {p.stock} units
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-400 font-mono flex items-center justify-between">
            <span>PUBLIC STOREFRONT CLOUD</span>
            <span>SYNCHRONIZED</span>
          </div>
        </div>

      </div>

      {/* WEBHOOK EVENT AUDIT LOG STREAM (§10) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#1F3B2C]" />
            <h3 className="font-serif text-base font-semibold text-[#1C1C1A]">
              Live Webhook &amp; POS Event Telemetry Log
            </h3>
          </div>
          <span className="text-xs text-stone-400 font-mono">Channel: webhooks.square.elevatedgreen</span>
        </div>

        <div className="divide-y divide-stone-100 font-mono text-xs">
          {syncEvents.map((evt) => (
            <div key={evt.id} className="py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#2E6B47]" />
                <span className="text-stone-700 font-semibold">{evt.timestamp}</span>
                <span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px]">
                  {evt.type === 'in_store_sale' ? 'POS_SALE_TRIGGER' : 'CATALOG_AUDIT'}
                </span>
                <span className="text-stone-900">{evt.productName} ({evt.sku})</span>
              </div>
              <div className="text-stone-500 text-[11px] font-medium">
                Deducted {evt.quantity} unit(s) &bull; 200 OK (58ms)
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
