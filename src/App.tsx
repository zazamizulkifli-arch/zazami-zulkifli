/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Voucher, Order } from './types';
import { INITIAL_PRODUCTS, AVAILABLE_VOUCHERS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FlashDeals } from './components/FlashDeals';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { VouchersModal } from './components/VouchersModal';
import { WishlistModal } from './components/WishlistModal';
import { TrustBadges } from './components/TrustBadges';
import { Footer } from './components/Footer';
import { AdminCMSModal } from './components/admin/AdminCMSModal';
import {
  MapPin,
  CheckCircle,
  PackageSearch,
  ArrowUpDown,
  Store,
  Sparkles
} from 'lucide-react';

export default function App() {
  // State for products, cart, wishlist, orders, and vouchers with local persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('zazami_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [vouchers, setVouchers] = useState<Voucher[]>(() => {
    try {
      const saved = localStorage.getItem('zazami_vouchers');
      return saved ? JSON.parse(saved) : AVAILABLE_VOUCHERS;
    } catch {
      return AVAILABLE_VOUCHERS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zazami_cart');
      return saved ? JSON.parse(saved) : [
        // Seed 1 default item to immediately feel the active cart
        { product: INITIAL_PRODUCTS[0], quantity: 1 }
      ];
    } catch {
      return [{ product: INITIAL_PRODUCTS[0], quantity: 1 }];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('zazami_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zazami_orders');
      if (saved) return JSON.parse(saved);

      // Seed 1 initial confirmed order so the user can immediately test order tracking and CMS order management
      const sampleOrder: Order = {
        id: 'ord-sample-1',
        orderNumber: 'ZZM-948210',
        date: 'Hari ini, 10:15 AM',
        items: [{ product: INITIAL_PRODUCTS[1], quantity: 1 }],
        subtotal: 89.00,
        shippingFee: 0,
        discount: 10.00,
        total: 79.00,
        voucherCodeApplied: 'ZAZAMIBARU',
        shippingAddress: {
          fullName: 'Zazami Zulkifli',
          phone: '019-3829102',
          addressLine1: 'No 45, Jalan Warisan Tempatan 3',
          postcode: '47000',
          city: 'Sungai Buloh',
          state: 'Selangor',
        },
        courierName: 'Pos Laju Malaysia (Pantas & Selamat)',
        paymentMethod: 'fpx',
        paymentMethodTitle: 'FPX (Maybank2u)',
        paymentReference: 'PAY-89234101',
        status: 'paid',
        trackingNumber: 'MYPOS-88492019',
        estimatedDelivery: 'Esok (Dalam Penghantaran)',
      };
      return [sampleOrder];
    } catch {
      return [];
    }
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc' | 'popular' | 'rating'>('default');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isVouchersOpen, setIsVouchersOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Voucher state
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(() => vouchers[0] || AVAILABLE_VOUCHERS[0]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zazami_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('zazami_vouchers', JSON.stringify(vouchers));
    } catch (e) {
      console.error(e);
    }
  }, [vouchers]);

  useEffect(() => {
    try {
      localStorage.setItem('zazami_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('zazami_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('zazami_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Reset to default data
  const handleResetDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setVouchers(AVAILABLE_VOUCHERS);
    localStorage.removeItem('zazami_products');
    localStorage.removeItem('zazami_vouchers');
    showToast('Data kedai diset semula ke tetapan asal.');
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name.slice(0, 28)}..." ditambah ke troli!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Dikeluarkan dari senarai keinginan');
        return prev.filter((p) => p.id !== product.id);
      }
      showToast('Disimpan ke senarai keinginan!');
      return [...prev, product];
    });
  };

  // Order created callback
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  // Distinct states for filter
  const availableStates = useMemo(() => {
    const states = Array.from(new Set(products.map((p) => p.state)));
    return states.sort();
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchMalay = p.malayName.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchLoc = p.location.toLowerCase().includes(q);
          if (!matchName && !matchMalay && !matchDesc && !matchLoc) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // State filter
        if (selectedState !== 'all' && p.state !== selectedState) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'popular') return b.soldCount - a.soldCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, selectedState, sortBy]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-stone-800 animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Quick CMS Access Button at bottom-left */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsCMSOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-amber-300 font-bold text-xs rounded-xl shadow-xl border border-stone-700 transition-all cursor-pointer group"
          title="Buka Pusat Pengurusan & CMS Peniaga"
        >
          <div className="w-5 h-5 rounded-md bg-amber-500 text-stone-950 flex items-center justify-center font-black text-[11px] group-hover:scale-105 transition-transform">
            <Store className="w-3 h-3" />
          </div>
          <span className="hidden sm:inline">Pusat Peniaga &amp; CMS</span>
          <span className="text-[10px] bg-stone-800 text-stone-300 px-1.5 py-0.5 rounded border border-stone-700">
            Admin
          </span>
        </button>
      </div>

      {/* Main Navbar complying with Top Bar Contract */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenVouchers={() => setIsVouchersOpen(true)}
        onOpenCMS={() => setIsCMSOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Showcase Banner */}
        <HeroBanner
          onExploreClick={() => {
            const el = document.getElementById('katalog-produk');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onFlashDealsClick={() => {
            const el = document.getElementById('tawaran-kilat');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Flash Deals / Tawaran Kilat */}
        <div id="tawaran-kilat">
          <FlashDeals
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        </div>

        {/* Main Product Catalog Section */}
        <section id="katalog-produk" className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
          {/* Section Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <span>Koleksi Terpilih</span>
                <span aria-hidden="true">·</span>
                <span>Buatan Malaysia Tulen</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                Pelbagai Barangan Tempatan ({filteredProducts.length} Produk)
              </h2>
            </div>

            {/* Filter and Sorting Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Negeri origin dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-500 font-medium">Negeri:</span>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  aria-label="Pilih Negeri Asal"
                  className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="all">Semua Negeri</option>
                  {availableStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting selector */}
              <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-500 font-medium">Susun:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Susunan Produk"
                  className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="default">Pilihan Editor</option>
                  <option value="popular">Paling Laris</option>
                  <option value="rating">Penilaian Tertinggi</option>
                  <option value="price_asc">Harga: Rendah ke Tinggi</option>
                  <option value="price_desc">Harga: Tinggi ke Rendah</option>
                </select>
              </div>

              {/* Clear filters button if active */}
              {(selectedCategory !== 'all' || selectedState !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedState('all');
                    setSearchQuery('');
                  }}
                  className="px-2.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Set Semula
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 mt-6 p-8">
              <PackageSearch className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-bold text-stone-800 text-base mb-1">
                Tiada Produk Dijumpai
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                Tiada barangan yang sepadan dengan carian &ldquo;{searchQuery}&rdquo;. Cuba tukar kata kunci atau pilih kategori lain.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedState('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Lihat Semua Produk
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelect={(p) => setSelectedProduct(p)}
                  onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
                  isWishlisted={wishlist.some((w) => w.id === prod.id)}
                  onToggleWishlist={(p, e) => handleToggleWishlist(p, e)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Trust Badges & Secure Payment Explanation */}
        <TrustBadges />
      </main>

      {/* Footer */}
      <Footer onOpenCMS={() => setIsCMSOpen(true)} />

      {/* Product Detail Modal (PDP) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onBuyNow={(p, qty) => handleBuyNow(p, qty)}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        onToggleWishlist={(p) => handleToggleWishlist(p)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        vouchers={vouchers}
        appliedVoucher={appliedVoucher}
        onApplyVoucher={setAppliedVoucher}
      />

      {/* Multi-Channel Secure Payment Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        voucher={appliedVoucher}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orders={orders}
      />

      {/* Vouchers Dialog */}
      <VouchersModal
        isOpen={isVouchersOpen}
        onClose={() => setIsVouchersOpen(false)}
        vouchers={vouchers}
        appliedVoucher={appliedVoucher}
        onSelectVoucher={(v) => {
          setAppliedVoucher(v);
          showToast(`Baucar ${v.code} berjaya digunakan!`);
        }}
      />

      {/* Wishlist Dialog */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Admin CMS Portal Modal */}
      <AdminCMSModal
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        products={products}
        onUpdateProducts={setProducts}
        orders={orders}
        onUpdateOrders={setOrders}
        vouchers={vouchers}
        onUpdateVouchers={setVouchers}
        onResetDefaultData={handleResetDefaultData}
      />
    </div>
  );
}
