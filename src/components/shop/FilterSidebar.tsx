import React from 'react';
import { ProductCategory } from '../../types';

interface FilterState {
  category: ProductCategory | 'All';
  priceRange: string;
  size: string;
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  categories: (ProductCategory | 'All')[];
  availableSizes: string[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  categories,
  availableSizes
}) => {
  return (
    <aside className="space-y-8 text-sm">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E4E0D6]">
        <h3 className="font-serif text-base font-medium text-[#1F3B2C]">Refine By</h3>
        <button
          onClick={onReset}
          className="text-xs text-[#8B897D] hover:text-[#1F3B2C] underline transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]">Category</h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 text-xs text-[#57564E] hover:text-[#1C1C1A] cursor-pointer py-0.5"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => onFilterChange({ ...filters, category: cat })}
                className="w-3.5 h-3.5 text-[#1F3B2C] focus:ring-[#1F3B2C] accent-[#1F3B2C]"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]">Price</h4>
        <div className="space-y-1.5">
          {[
            { label: 'All Prices', val: 'all' },
            { label: 'Under $75', val: '0-75' },
            { label: '$75 to $150', val: '75-150' },
            { label: '$150 to $225', val: '150-225' },
            { label: 'Over $225', val: '225-1000' },
          ].map((option) => (
            <label
              key={option.val}
              className="flex items-center gap-2.5 text-xs text-[#57564E] hover:text-[#1C1C1A] cursor-pointer py-0.5"
            >
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === option.val}
                onChange={() => onFilterChange({ ...filters, priceRange: option.val })}
                className="w-3.5 h-3.5 text-[#1F3B2C] focus:ring-[#1F3B2C] accent-[#1F3B2C]"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]">Size</h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, size: 'all' })}
            className={`px-2.5 py-1 text-xs rounded border transition-all ${
              filters.size === 'all'
                ? 'bg-[#1F3B2C] text-white border-[#1F3B2C]'
                : 'bg-white text-[#57564E] border-[#E4E0D6] hover:border-[#1F3B2C]'
            }`}
          >
            All
          </button>
          {availableSizes.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => onFilterChange({ ...filters, size: sz })}
              className={`px-2.5 py-1 text-xs rounded border transition-all ${
                filters.size === sz
                  ? 'bg-[#1F3B2C] text-white border-[#1F3B2C]'
                  : 'bg-white text-[#57564E] border-[#E4E0D6] hover:border-[#1F3B2C]'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* In-Stock Filter */}
      <div className="pt-2 border-t border-[#E4E0D6]">
        <label className="flex items-center gap-2.5 text-xs font-medium text-[#1C1C1A] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#1F3B2C] focus:ring-[#1F3B2C] accent-[#1F3B2C]"
          />
          <span>In-Stock Ready to Ship</span>
        </label>
      </div>
    </aside>
  );
};
