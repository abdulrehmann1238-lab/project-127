import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { useCart } from '../context/CartContext';
import {
  Star,
  Check,
  Truck,
  ShieldCheck,
  Store,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProductBySlug, products } = useInventory();
  const { addToCart } = useCart();

  const product = getProductBySlug(slug || '');

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || { name: 'Standard', hex: '#000' });
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [isReserveInStore, setIsReserveInStore] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl text-[#1C1C1A]">Product Not Found</h2>
        <p className="text-xs text-[#8B897D] mt-2 mb-6">The requested garment may be sold out or discontinued.</p>
        <Link to="/shop" className="btn-primary px-6 py-2.5 text-xs uppercase tracking-wider">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setSizeError('Please select a size to proceed');
      return;
    }
    setSizeError(null);
    setIsAdding(true);

    // Simulated 300ms action delay per §10
    await new Promise((r) => setTimeout(r, 300));
    addToCart(product, selectedColor, selectedSize, 1);
    setIsAdding(false);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Recommended products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="bg-[#FAF8F3] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#8B897D] mb-8">
          <Link to="/" className="hover:text-[#1F3B2C] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-[#1F3B2C] transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#1F3B2C] transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1C1C1A] font-medium truncate">{product.name}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image View */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white border border-[#E4E0D6] shadow-sm">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.stock > 0 && product.stock <= 3 && (
                  <span className="bg-[#B4763A] text-white text-xs font-semibold px-2.5 py-1 rounded shadow-md animate-pulse">
                    Only {product.stock} left in stock
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="bg-[#1F3B2C] text-white text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-md">
                    New Season
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      selectedImageIndex === idx
                        ? 'border-[#1F3B2C] ring-2 ring-[#1F3B2C]/20'
                        : 'border-[#E4E0D6] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details, Selectors, Add to Cart (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title, Subtitle, Price */}
            <div className="border-b border-[#E4E0D6] pb-6">
              <div className="flex items-center justify-between text-xs text-[#8A7A5C] mb-2 font-mono">
                <span>SKU: {product.sku}</span>
                <div className="flex items-center gap-1 text-[#B8916A]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold text-[#1C1C1A]">{product.rating}</span>
                  <span className="text-[#8B897D]">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A] font-medium leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-[#8A7A5C] font-medium mt-1">{product.subtitle}</p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-serif font-medium text-[#1F3B2C]">
                  ${product.price}
                </span>
                <span className="text-xs text-[#8B897D]">USD &bull; Duties &amp; Taxes Included</span>
              </div>
            </div>

            {/* Editorial Description */}
            <p className="text-sm text-[#57564E] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#1C1C1A]">
                  Selected Color: <span className="text-[#57564E] font-normal">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-offset-2 ring-[#1F3B2C] scale-110'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor.name === c.name && (
                      <Check className={`w-3 h-3 ${c.hex === '#F4F2EB' || c.hex === '#FAF8F3' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Inline Error validation per §10 */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#1C1C1A]">Select Size</span>
                <button
                  type="button"
                  onClick={() => alert('Fit Guidance: Designed with a modern athletic golf silhouette. Sizing true to standard US luxury tailor measurements.')}
                  className="text-[#8A7A5C] underline hover:text-[#1F3B2C]"
                >
                  Size &amp; Fit Guide
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => {
                      setSelectedSize(sz);
                      setSizeError(null);
                    }}
                    className={`py-2.5 text-xs font-semibold rounded-md border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#1F3B2C] text-[#FAF8F3] border-[#1F3B2C] shadow-sm'
                        : 'bg-white text-[#1C1C1A] border-[#E4E0D6] hover:border-[#1F3B2C]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Inline Error State per PRD §10 */}
              {sizeError && (
                <p className="text-xs text-[#A23B33] font-medium pt-1 animate-pulse">
                  {sizeError}
                </p>
              )}
            </div>

            {/* POS-Synced "Reserve for Pickup / In-Store Check" (§1 Enhancement 2) */}
            <div className="p-3.5 bg-white border border-[#E4E0D6] rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Store className="w-4 h-4 text-[#1F3B2C]" />
                  <div>
                    <div className="text-xs font-semibold text-[#1C1C1A]">Carmel &amp; Pebble Beach Flagship</div>
                    <div className="text-[11px] text-[#2E6B47] font-medium">
                      {product.posStock > 0
                        ? `In Stock (${product.posStock} units available for pickup today)`
                        : 'Currently reserved in-store'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReserveInStore(!isReserveInStore)}
                  className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
                    isReserveInStore
                      ? 'bg-[#1F3B2C] text-white'
                      : 'bg-[#FAF8F3] text-[#1F3B2C] border border-[#E4E0D6]'
                  }`}
                >
                  {isReserveInStore ? 'Pickup Selected ✓' : 'Reserve In-Store'}
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className="w-full btn-primary py-4 text-xs uppercase tracking-widest font-semibold shadow-md flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : product.stock === 0 ? (
                  <span>Sold Out &bull; Notify Restock</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag &bull; ${product.price}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3 text-center text-[11px] text-[#57564E] pt-2">
                <div className="flex items-center justify-center gap-1.5 p-2 bg-white rounded border border-[#E4E0D6]">
                  <Truck className="w-3.5 h-3.5 text-[#8A7A5C]" />
                  <span>Complimentary Shipping $150+</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 p-2 bg-white rounded border border-[#E4E0D6]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B47]" />
                  <span>30-Day Fairway Guarantee</span>
                </div>
              </div>
            </div>

            {/* Product Accordions */}
            <div className="border-t border-[#E4E0D6] divide-y divide-[#E4E0D6] pt-4">
              
              {/* Materials */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion('materials')}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]"
                >
                  <span>Materials &amp; Composition</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A7A5C] transition-transform duration-200 ${
                      openAccordion === 'materials' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'materials' && (
                  <div className="pt-2.5 text-xs text-[#57564E] space-y-2 animate-fadeIn">
                    <p>{product.materials}</p>
                    <ul className="list-disc list-inside space-y-1 text-[#8B897D]">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Care & Laundering */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]"
                >
                  <span>Care Instructions</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A7A5C] transition-transform duration-200 ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <div className="pt-2.5 text-xs text-[#57564E] animate-fadeIn">
                    <p>{product.care}</p>
                  </div>
                )}
              </div>

              {/* Fit */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion('fit')}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]"
                >
                  <span>Tailored Fit &amp; Silhouette</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A7A5C] transition-transform duration-200 ${
                      openAccordion === 'fit' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'fit' && (
                  <div className="pt-2.5 text-xs text-[#57564E] animate-fadeIn">
                    <p>{product.fit}</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Complete the Look Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#E4E0D6]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-semibold tracking-[0.15em] text-[#8A7A5C]">
                  Clubhouse Pairings
                </span>
                <h2 className="font-serif text-2xl text-[#1C1C1A]">Complete the Look</h2>
              </div>
              <Link to="/shop" className="text-xs font-semibold text-[#1F3B2C] underline flex items-center gap-1">
                <span>View Entire Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
