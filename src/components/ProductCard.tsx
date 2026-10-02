import React from 'react';
import { Product } from '../types';
import { Star, Heart, Plus, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md hover:border-amber-400/60 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount Tag */}
        {product.discountPercent && (
          <div className="absolute top-2 left-2 bg-amber-600 text-white font-black text-[11px] px-2 py-0.5 rounded shadow-xs tracking-wider">
            -{product.discountPercent}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/80 hover:bg-white text-stone-600 hover:text-rose-500'
          }`}
          aria-label="Simpan ke Senarai Keinginan"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Seller Location Banner at bottom of image */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-stone-900/70 text-stone-200 text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
          <MapPin className="w-2.5 h-2.5 text-amber-400" />
          <span className="truncate max-w-[120px]">{product.location}</span>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1.5">
            <span className="text-amber-800 font-medium">{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.state}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-stone-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-3 pt-2.5 border-t border-stone-100">
          {/* Price & Sold Counter */}
          <div className="flex items-baseline justify-between gap-1 mb-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-amber-700 font-bold">RM</span>
                <span className="text-lg font-black text-amber-700 tabular-nums">
                  {product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-[11px] text-stone-400 line-through tabular-nums">
                    RM{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <span className="text-[11px] text-stone-500 tabular-nums">
              {product.soldCount > 1000 ? `${(product.soldCount / 1000).toFixed(1)}k` : product.soldCount} terjual
            </span>
          </div>

          {/* Rating & Quick Action */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-800 tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
            </div>

            <button
              onClick={(e) => onAddToCart(product, e)}
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-600 text-amber-800 hover:text-white rounded-md text-xs font-semibold transition-colors cursor-pointer border border-amber-200 hover:border-amber-600"
              title="Tambah ke troli"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Troli</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
