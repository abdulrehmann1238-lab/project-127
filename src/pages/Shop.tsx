import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { ProductCategory } from '../types';
import { ProductCard } from '../components/product/ProductCard';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { FilterSheet } from '../components/shop/FilterSheet';

const ALL_CATEGORIES: (ProductCategory | 'All')[] = [
  'All',
  'Apparel',
  'Footwear',
  'Accessories',
  'Gift Cards'
];

interface ShopFilterState {
  category: ProductCategory | 'All';
  priceRange: string;
  size: string;
  inStockOnly: boolean;
}

export const Shop: React.FC = () => {
  const { products } = useInventory();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category: routeCategory } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  // Read category from search params or route params
  const categoryParam = searchParams.get('category') || routeCategory;
  const initialCategory: ProductCategory | 'All' =
    categoryParam && ALL_CATEGORIES.includes(categoryParam as any)
      ? (categoryParam as ProductCategory)
      : 'All';

  const searchQuery = searchParams.get('search') || '';

  const [filters, setFilters] = useState<ShopFilterState>({
    category: initialCategory,
    priceRange: 'all',
    size: 'all',
    inStockOnly: false
  });

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Sync category state when URL searchParams or route param changes (navbar clicks)
  useEffect(() => {
    const validCategory: ProductCategory | 'All' =
      categoryParam && ALL_CATEGORIES.includes(categoryParam as any)
        ? (categoryParam as ProductCategory)
        : 'All';

    setFilters((prev) => {
      if (prev.category !== validCategory) {
        return { ...prev, category: validCategory };
      }
      return prev;
    });
  }, [categoryParam]);

  // Derive unique sizes across all products
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => sizeSet.add(s)));
    return Array.from(sizeSet).filter((s) => !s.includes('Size Fits All')).slice(0, 8);
  }, [products]);

  // Instant reactive filter and sort
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (filters.category !== 'All' && p.category !== filters.category) {
        return false;
      }
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      // Price range
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (p.price < min || p.price > max) return false;
      }
      // Size
      if (filters.size !== 'all' && !p.sizes.includes(filters.size)) {
        return false;
      }
      // In stock only
      if (filters.inStockOnly && p.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, filters, searchQuery, sortBy]);

  // When clicking category tabs, update both filters and URL for bookmarking/navigation
  const handleCategoryTabClick = (cat: ProductCategory | 'All') => {
    setFilters((prev) => ({ ...prev, category: cat }));
    if (cat === 'All') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('category');
      setSearchParams(nextParams);
    } else {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('category', cat);
      setSearchParams(nextParams);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      priceRange: 'all',
      size: 'all',
      inStockOnly: false
    });
    setSearchParams({});
  };

  return (
    <div className="bg-[#FAF8F3] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="border-b border-[#E4E0D6] pb-6 mb-6">
          <div className="text-xs uppercase tracking-[0.15em] text-[#8A7A5C] mb-2 font-medium">
            The Elevated Green &bull; Course Wardrobe
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A]">
                {filters.category === 'All' ? 'Complete Golf & Lifestyle Collection' : filters.category}
              </h1>
              <p className="text-xs sm:text-sm text-[#57564E] mt-1.5 max-w-xl">
                From the first tee to the nineteenth hole — apparel and handcrafted footwear built for how you actually play.
              </p>
            </div>

            {/* Instant Category Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {ALL_CATEGORIES.map((cat) => {
                const isSelected = filters.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryTabClick(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                      isSelected
                        ? 'bg-[#1F3B2C] text-[#FAF8F3] shadow-sm scale-105'
                        : 'bg-white text-[#57564E] border border-[#E4E0D6] hover:border-[#1F3B2C] hover:text-[#1F3B2C]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controls Bar: Mobile Filter Button, Result Count, Sort */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4E0D6] mb-6 gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterSheetOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E4E0D6] rounded-md text-xs font-medium text-[#1C1C1A] hover:bg-gray-50 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1F3B2C]" />
              <span>Filter &amp; Refine</span>
            </button>

            <span className="text-xs text-[#8B897D]">
              Showing <span className="font-semibold text-[#1C1C1A]">{filteredProducts.length}</span> pieces
              {filters.category !== 'All' && <span> in <strong className="text-[#1F3B2C]">{filters.category}</strong></span>}
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-[#8B897D]">Sort:</span>
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-[#E4E0D6] rounded-md px-3 py-1.5 pr-8 text-xs font-medium text-[#1C1C1A] focus:outline-none focus:border-[#1F3B2C] cursor-pointer shadow-sm"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-[#8A7A5C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-xl border border-[#E4E0D6] shadow-sm">
              <FilterSidebar
                filters={filters}
                onFilterChange={(newFilters) => {
                  setFilters(newFilters);
                  if (newFilters.category !== filters.category) {
                    handleCategoryTabClick(newFilters.category);
                  }
                }}
                onReset={handleResetFilters}
                categories={ALL_CATEGORIES}
                availableSizes={availableSizes}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E4E0D6] p-12 text-center space-y-4">
                <h3 className="font-serif text-xl text-[#1C1C1A]">No pieces found matching your criteria</h3>
                <p className="text-xs text-[#8B897D] max-w-sm mx-auto">
                  Try clearing your filters or selecting a different category to view available garments.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn-primary px-6 py-2.5 text-xs uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Bottom Sheet Modal */}
      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={filters}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          if (newFilters.category !== filters.category) {
            handleCategoryTabClick(newFilters.category);
          }
        }}
        onReset={handleResetFilters}
        categories={ALL_CATEGORIES}
        availableSizes={availableSizes}
        totalResults={filteredProducts.length}
      />
    </div>
  );
};
