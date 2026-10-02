import React, { useState } from 'react';
import { Search, ShoppingBag, ShieldCheck, Truck, Package, Heart, Sparkles, Store } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracker: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenVouchers: () => void;
  onOpenCMS: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracker,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenVouchers,
  onOpenCMS,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Produk' },
    { id: 'makanan', label: 'Makanan & Kudapan' },
    { id: 'pakaian', label: 'Pakaian & Batik' },
    { id: 'kesihatan', label: 'Kesihatan & Herba' },
    { id: 'kraftangan', label: 'Kraftangan' },
    { id: 'minuman', label: 'Minuman' },
  ];

  const popularKeywords = ['Sambal Bilis', 'Batik Terengganu', 'Madu Kelulut', 'Dodol Melaka', 'Songket', 'Kerepek Ubi'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-amber-600 text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-semibold">🇲🇾 Kempen Barangan Tempatan Malaysia</span>
            <span className="hidden md:inline opacity-80">·</span>
            <span className="hidden md:inline">Penghantaran Percuma dengan Kod <strong>BEBASPOS</strong></span>
            <span className="hidden lg:inline opacity-80">·</span>
            <span className="hidden lg:inline text-amber-100">Jaminan Pembayaran Selamat & Wang Dikembalikan 15 Hari</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium shrink-0">
            <button
              onClick={onOpenTracker}
              className="flex items-center gap-1.5 hover:text-amber-100 transition-colors cursor-pointer"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Jejak Pesanan</span>
            </button>
            <button
              onClick={onOpenVouchers}
              className="flex items-center gap-1 hover:text-amber-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Baucar Diskaun</span>
            </button>
            <button
              onClick={onOpenCMS}
              className="flex items-center gap-1 bg-amber-700 hover:bg-amber-800 text-white px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer border border-amber-500/50 shadow-2xs"
            >
              <Store className="w-3 h-3 text-amber-300" />
              <span>Pusat Peniaga &amp; CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Strictly Complying with Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              onSearchChange('');
            }}
            className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight text-amber-700 hover:text-amber-800 transition-colors shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-xs">
              <span className="text-lg font-extrabold leading-none">Z</span>
            </div>
            <span className="font-display">Zazami Online Store</span>
          </a>

          {/* Search bar inside header for instant product lookup */}
          <div className="flex-1 max-w-xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Cari sambal garing, batik sutera, madu kelulut, kerepek..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-10 pr-24 py-2 bg-stone-100 hover:bg-stone-100/80 focus:bg-white text-sm text-stone-900 placeholder:text-stone-400 rounded-lg border border-transparent focus:border-amber-500 focus:outline-none transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-20 text-xs text-stone-400 hover:text-stone-600 px-1 py-0.5"
                >
                  Padam
                </button>
              )}
              <button
                type="button"
                className="absolute right-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
              >
                Cari
              </button>
            </div>

            {/* Quick search keywords hint */}
            {isSearchFocused && !searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1.5 p-3 bg-white border border-stone-200 rounded-lg shadow-lg z-50 text-xs">
                <p className="text-stone-400 font-medium mb-2">Carian Popular Barangan Tempatan:</p>
                <div className="flex flex-wrap gap-1.5">
                  {popularKeywords.map((kw) => (
                    <button
                      key={kw}
                      onMouseDown={() => onSearchChange(kw)}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-amber-50 hover:text-amber-800 text-stone-700 rounded-md transition-colors cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Zone 3: Primary Actions (CMS, Wishlist & Shopping Bag) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={onOpenCMS}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors cursor-pointer"
              title="Buka Pusat Pengurusan & CMS Peniaga"
            >
              <Store className="w-3.5 h-3.5 text-amber-700" />
              <span>CMS Peniaga</span>
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-600 hover:text-amber-700 rounded-lg hover:bg-stone-100 transition-colors"
              title="Disukai"
              aria-label="Senarai Keinginan"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-xs cursor-pointer group"
              aria-label="Troli Beli-Belah"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-white text-amber-700 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Troli</span>
            </button>
          </div>
        </div>

        {/* Secondary Category Navigation Strip */}
        <div className="flex items-center gap-1 sm:gap-2 mt-3 overflow-x-auto no-scrollbar border-t border-stone-100 pt-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
