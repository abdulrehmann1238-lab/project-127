import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Check, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Quick add default size
    const defaultSize = product.sizes[0] || 'Standard';
    addToCart(product, selectedColor, defaultSize, 1);

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-white rounded-lg border border-[#E4E0D6] overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#8A7A5C]/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Crossfade on Hover */}
      <Link to={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#FAF8F3] block">
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered && secondaryImage !== primaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          style={{ transition: 'opacity 250ms ease, transform 400ms ease' }}
        />
        {secondaryImage && secondaryImage !== primaryImage && isHovered && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 scale-105"
            style={{ transition: 'opacity 250ms ease, transform 400ms ease' }}
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-[#FAF8F3] text-[#1F3B2C] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-sm border border-[#E4E0D6]">
              New
            </span>
          )}

          {/* POS-Synced Low Stock Alert Badge (§1, #9 & §10) */}
          {product.stock > 0 && product.stock <= 3 && (
            <span className="bg-[#B4763A] text-white text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded shadow-sm flex items-center gap-1 animate-pulse">
              Only {product.stock} left
            </span>
          )}

          {product.stock === 0 && (
            <span className="bg-[#A23B33] text-white text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded shadow-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick Add Button Slide-Up on Desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className={`w-full py-2.5 px-3 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
              isAdded
                ? 'bg-[#2E6B47] text-white'
                : 'bg-[#1F3B2C] text-[#FAF8F3] hover:bg-[#16291F]'
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added ✓</span>
              </>
            ) : product.stock === 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add ({product.sizes[0] || 'M'})</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#8A7A5C] mb-1">
            <span className="uppercase tracking-wider font-semibold">{product.category}</span>
            <div className="flex items-center gap-1 text-[#B8916A]">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[#57564E] font-medium">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif text-sm font-medium text-[#1C1C1A] hover:text-[#1F3B2C] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#8B897D] mt-0.5 line-clamp-1">{product.subtitle}</p>
        </div>

        {/* Color Swatches & Price */}
        <div className="pt-3 mt-2 border-t border-[#E4E0D6]/60 flex items-center justify-between">
          {/* Color Dots */}
          <div className="flex items-center space-x-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'ring-1 ring-offset-1 ring-[#1F3B2C] scale-110'
                    : 'border-black/20'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select color ${color.name}`}
              />
            ))}
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="text-sm font-semibold text-[#1F3B2C] font-mono">
              ${product.price}
            </span>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="mt-3 sm:hidden">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className="w-full py-1.5 px-3 bg-[#FAF8F3] hover:bg-[#1F3B2C] hover:text-white border border-[#E4E0D6] rounded text-xs font-medium text-[#1F3B2C] transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>{isAdded ? 'Added ✓' : 'Quick Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
