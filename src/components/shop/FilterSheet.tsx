import React from 'react';
import { X, Check } from 'lucide-react';
import { ProductCategory } from '../../types';

interface FilterState {
  category: ProductCategory | 'All';
  priceRange: string;
  size: string;
  inStockOnly: boolean;
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  categories: (ProductCategory | 'All')[];
  availableSizes: string[];
  totalResults: number;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  categories,
  availableSizes,
  totalResults
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Bottom Sheet Modal */}
      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#FAF8F3] rounded-t-2xl shadow-2xl flex flex-col transform transition-transform duration-300 ease-out border-t border-[#E4E0D6]">
        {/* Handle Bar & Header */}
        <div className="pt-3 pb-4 px-6 border-b border-[#E4E0D6] flex flex-col items-center relative">
          <div className="w-12 h-1 bg-[#8B897D]/30 rounded-full mb-3" />
          <div className="w-full flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-[#1F3B2C]">Filters &amp; Refine</h3>
            <button
              onClick={onClose}
              className="p-1 text-[#57564E] hover:text-[#1C1C1A]"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Filter Options */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Category */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]">Category</h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onFilterChange({ ...filters, category: cat })}
                  className={`py-2 px-3 text-xs rounded-lg border text-left flex items-center justify-between transition-all ${
                    filters.category === cat
                      ? 'bg-[#1F3B2C] text-white border-[#1F3B2C] font-semibold'
                      : 'bg-white text-[#57564E] border-[#E4E0D6]'
                  }`}
                >
                  <span>{cat}</span>
                  {filters.category === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]">Price Range</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under $75', val: '0-75' },
                { label: '$75 to $150', val: '75-150' },
                { label: '$150 to $225', val: '150-225' },
                { label: 'Over $225', val: '225-1000' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => onFilterChange({ ...filters, priceRange: opt.val })}
                  className={`py-2 px-3 text-xs rounded-lg border text-left flex items-center justify-between transition-all ${
                    filters.priceRange === opt.val
                      ? 'bg-[#1F3B2C] text-white border-[#1F3B2C] font-semibold'
                      : 'bg-white text-[#57564E] border-[#E4E0D6]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {filters.priceRange === opt.val && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]">Size</h4>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, size: 'all' })}
                className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                  filters.size === 'all'
                    ? 'bg-[#1F3B2C] text-white border-[#1F3B2C] font-semibold'
                    : 'bg-white text-[#57564E] border-[#E4E0D6]'
                }`}
              >
                All Sizes
              </button>
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onFilterChange({ ...filters, size: sz })}
                  className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                    filters.size === sz
                      ? 'bg-[#1F3B2C] text-white border-[#1F3B2C] font-semibold'
                      : 'bg-white text-[#57564E] border-[#E4E0D6]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock */}
          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 bg-white border border-[#E4E0D6] rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
                className="w-4 h-4 text-[#1F3B2C] rounded focus:ring-[#1F3B2C] accent-[#1F3B2C]"
              />
              <span className="text-xs font-medium text-[#1C1C1A]">Show In-Stock Items Only</span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#E4E0D6] flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="w-1/3 py-3 border border-[#E4E0D6] rounded-lg text-xs font-semibold text-[#57564E] hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-2/3 btn-primary py-3 text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            Show {totalResults} Results
          </button>
        </div>
      </div>
    </div>
  );
};
