import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { Product } from '../../types';
import {
  Search,
  Filter,
  Edit2,
  X,
  Check,
  Save,
  AlertTriangle,
  ExternalLink,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProducts: React.FC = () => {
  const { products, updateProductStock } = useInventory();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editStock, setEditStock] = useState<number>(0);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const filtered = products.filter((p) => {
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setEditStock(p.stock);
    setEditPrice(p.price);
    setSavedSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProductStock(editingProduct.sku, editStock);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setEditingProduct(null);
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1A]">Catalog &amp; Inventory Management</h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time stock ledger synchronized across Online Store and Square In-Store POS.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search SKU or product title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-xs font-medium text-[#1C1C1A] focus:outline-none focus:border-[#1F3B2C]"
          >
            <option value="All">All Categories</option>
            <option value="Apparel">Apparel</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Gift Cards">Gift Cards</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Product</th>
                <th className="py-3.5 px-4 font-semibold">SKU</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">Online Stock</th>
                <th className="py-3.5 px-4 font-semibold">Square POS Stock</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((prod) => (
                <tr
                  key={prod.id}
                  onClick={() => handleOpenEdit(prod)}
                  className="hover:bg-stone-50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-10 h-12 object-cover rounded bg-stone-100 shrink-0 border border-stone-200"
                      />
                      <div>
                        <div className="font-semibold text-[#1C1C1A] group-hover:text-[#1F3B2C]">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-stone-400">{prod.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-600 font-medium">{prod.sku}</td>
                  <td className="py-3 px-4 text-stone-600">{prod.category}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#1C1C1A]">${prod.price}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#1C1C1A]">{prod.stock}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#2E6B47]">{prod.posStock}</td>
                  <td className="py-3 px-4">
                    {prod.stock === 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                        Sold Out
                      </span>
                    ) : prod.stock <= 3 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                        Low Stock ({prod.stock})
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Synchronized
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdit(prod);
                      }}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-[#1F3B2C] hover:text-white rounded text-stone-700 font-semibold transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Drawer */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setEditingProduct(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 border-l border-stone-200">
              
              {/* Header */}
              <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div>
                  <h3 className="font-serif text-lg text-[#1C1C1A]">Edit Inventory &amp; Pricing</h3>
                  <div className="text-xs text-stone-500 font-mono">{editingProduct.sku}</div>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div className="flex gap-4 p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <img
                    src={editingProduct.images[0]}
                    alt={editingProduct.name}
                    className="w-16 h-20 object-cover rounded bg-white"
                  />
                  <div>
                    <h4 className="font-semibold text-[#1C1C1A] text-xs">{editingProduct.name}</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">{editingProduct.subtitle}</p>
                    <Link
                      to={`/product/${editingProduct.slug}`}
                      target="_blank"
                      className="text-[11px] text-[#1F3B2C] font-semibold underline flex items-center gap-1 mt-2"
                    >
                      <span>View Live PDP</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Current Stock Quantity (Omni-Channel Sync)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editStock}
                      onChange={(e) => setEditStock(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-sm font-mono font-bold text-[#1C1C1A] focus:outline-none focus:border-[#1F3B2C]"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      Decreasing this to &le; 3 triggers the "Only X left" badge on the storefront.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Retail Price ($ USD)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={editPrice}
                      onChange={(e) => setEditPrice(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-sm font-mono font-bold text-[#1C1C1A] focus:outline-none focus:border-[#1F3B2C]"
                    />
                  </div>

                  <div className="p-3 bg-[#2E6B47]/10 border border-[#2E6B47]/30 rounded-lg text-xs text-[#2E6B47]">
                    <span className="font-semibold">Square POS Sync:</span> Saving here will immediately broadcast an inventory update event to the local POS register terminal.
                  </div>
                </div>

                {savedSuccess && (
                  <div className="p-3 bg-[#2E6B47] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>Inventory Synchronized Successfully!</span>
                  </div>
                )}

                <div className="pt-4 border-t border-stone-200 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="w-1/3 py-2.5 border border-stone-200 rounded text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 btn-primary py-2.5 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Broadcast Stock Change</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
