import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-bold text-base text-stone-900 font-display">
              Senarai Keinginan ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-3">
          {wishlist.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs">
              <Heart className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="font-medium text-stone-700">Senarai Keinginan Kosong</p>
              <p className="mt-1">Klik ikon hati pada produk kegemaran anda untuk disimpan di sini.</p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3"
              >
                <div
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-white"
                  />
                  <div>
                    <h5 className="text-xs font-semibold text-stone-900 line-clamp-1 hover:text-amber-700">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-stone-500">{item.location}</p>
                    <p className="text-xs font-black text-amber-700 mt-0.5">
                      RM{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    title="Tambah ke troli"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Troli</span>
                  </button>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                    title="Buang"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
