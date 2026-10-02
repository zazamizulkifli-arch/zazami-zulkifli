import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShieldCheck, Truck, RotateCcw, MapPin, Store, Check, Heart, ShoppingBag } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Media Gallery */}
          <div className="bg-stone-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-xs border border-stone-200">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.discountPercent && (
                <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-black px-2.5 py-1 rounded shadow-xs">
                  DISKAUN {product.discountPercent}%
                </div>
              )}
            </div>

            {/* Malaysian Heritage Trust Banner */}
            <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <span>🇲🇾 100% Barangan Buatan Malaysia</span>
              </div>
              <p className="text-[11px] text-amber-800/90 leading-tight">
                Dihasilkan oleh pengusaha tempatan berdaftar dengan standard kualiti tulen dan kebersihan terjamin.
              </p>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Unboxed Metadata (Zero-Pill Rule) */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="font-semibold text-amber-700">{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{product.location}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">Stok Tersedia ({product.stock})</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight font-display mb-3">
                {product.name}
              </h2>

              {/* Ratings and Sales Stats */}
              <div className="flex items-center gap-3 text-sm pb-4 border-b border-stone-100">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-900 tabular-nums">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-stone-300">|</span>
                <span className="text-stone-600 tabular-nums font-medium">{product.reviewCount} Penilaian</span>
                <span className="text-stone-300">|</span>
                <span className="text-stone-600 tabular-nums font-medium">{product.soldCount} Terjual</span>
              </div>

              {/* Price Banner */}
              <div className="my-4 p-4 bg-stone-50 rounded-xl flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-stone-500 block mb-0.5">Harga Promosi</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-amber-700 font-bold">RM</span>
                    <span className="text-3xl font-black text-amber-700 tabular-nums">
                      {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-stone-400 line-through tabular-nums">
                        RM{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    Penghantaran Percuma RM30+
                  </span>
                </div>
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between p-3 border border-stone-200 rounded-xl mb-4 bg-white text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">{product.sellerName}</p>
                    <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{product.location}</span>
                    </div>
                  </div>
                </div>
                <span className="text-amber-700 font-semibold">{product.sellerRating} ★ Penjual Sah</span>
              </div>

              {/* Tabs: Details vs Reviews */}
              <div className="flex items-center gap-4 border-b border-stone-200 text-xs font-semibold mb-3">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-amber-600 text-amber-700'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Maklumat &amp; Spesifikasi
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'border-amber-600 text-amber-700'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Penilaian Pembeli ({product.reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'details' ? (
                <div className="text-xs text-stone-600 space-y-3 pr-1">
                  <p className="leading-relaxed">{product.description}</p>
                  <div>
                    <h4 className="font-semibold text-stone-800 mb-1.5">Kelebihan &amp; Ramuan:</h4>
                    <ul className="space-y-1">
                      {product.ingredientsOrDetails.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-stone-600">
                          <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 text-stone-500">
                    <span>Berat Bersih / Saiz: <strong>{product.weight}</strong></span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-2.5 bg-stone-50 rounded-lg text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-stone-800">{rev.userName}</span>
                          <span className="text-stone-400 text-[10px]">· {rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-stone-700 leading-snug">{rev.comment}</p>
                      {rev.variant && (
                        <p className="text-[10px] text-stone-400 mt-1">Pilihan: {rev.variant}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Purchase Bar */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              {/* Quantity Stepper */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-stone-700">Kuantiti Pesanan:</span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded-l-lg transition-colors cursor-pointer text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded-r-lg transition-colors cursor-pointer text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-stone-300 text-stone-600 hover:bg-stone-100'
                  }`}
                  title="Simpan Keinginan"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? 'Ditambah ke Troli!' : 'Tambah ke Troli'}</span>
                </button>

                <button
                  onClick={handleBuy}
                  className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Beli Sekarang</span>
                </button>
              </div>

              {/* Micro-guarantee */}
              <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pembayaran Selamat SSL 256-bit</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>15 Hari Pulangan Percuma</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
