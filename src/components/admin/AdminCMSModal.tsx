import React, { useState } from 'react';
import { Product, Order, Voucher } from '../../types';
import { AVAILABLE_VOUCHERS, MALAYSIAN_STATES } from '../../data/products';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TicketPercent,
  Settings,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  Truck,
  AlertTriangle,
  ArrowUpRight,
  Download,
  Upload,
  RefreshCw,
  Printer,
  X,
  ExternalLink,
  Flame,
  ShieldCheck,
  MapPin,
  Store
} from 'lucide-react';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  orders: Order[];
  onUpdateOrders: (newOrders: Order[]) => void;
  vouchers: Voucher[];
  onUpdateVouchers: (newVouchers: Voucher[]) => void;
  onResetDefaultData: () => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  orders,
  onUpdateOrders,
  vouchers,
  onUpdateVouchers,
  onResetDefaultData,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'vouchers' | 'settings'>('dashboard');

  // Product Form State (for Add / Edit)
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // Product Form Fields
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    malayName: '',
    category: 'makanan',
    categoryLabel: 'Makanan & Kudapan',
    price: 15.00,
    originalPrice: 20.00,
    stock: 50,
    location: 'Banting, Selangor',
    state: 'Selangor',
    weight: '250g',
    description: '',
    ingredientsOrDetails: ['Produk Tempatan Berkualiti', 'Tanpa Bahan Pengawet'],
    image: '/src/assets/images/product_sambal_bilis_1790908276264.jpg',
    sellerName: 'Zazami Peniaga Tempatan',
    sellerRating: 5.0,
    isFlashSale: false,
    isHalal: true,
    isLocalHeritage: true,
  });

  // Voucher Form State
  const [isVoucherFormOpen, setIsVoucherFormOpen] = useState(false);
  const [voucherData, setVoucherData] = useState<Partial<Voucher>>({
    code: '',
    title: '',
    description: '',
    discountType: 'fixed',
    value: 10,
    minSpend: 40,
    tag: 'PROMOSI CMS',
  });

  // Order Details Modal
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('all');

  // Feedback Toast
  const [cmsToast, setCmsToast] = useState<string | null>(null);
  const showCmsToast = (msg: string) => {
    setCmsToast(msg);
    setTimeout(() => setCmsToast(null), 2500);
  };

  if (!isOpen) return null;

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const lowStockCount = products.filter((p) => p.stock <= 30).length;

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.location.toLowerCase().includes(productSearch.toLowerCase());
    const matchCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    return matchSearch && matchCategory;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilterStatus === 'all') return true;
    return o.status === orderFilterStatus;
  });

  // Handle Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      malayName: '',
      category: 'makanan',
      categoryLabel: 'Makanan & Kudapan',
      price: 19.90,
      originalPrice: 25.00,
      stock: 50,
      location: 'Kuala Lumpur',
      state: 'Kuala Lumpur',
      weight: '300g',
      description: 'Dihasilkan secara tradisional dengan resepi warisan tempatan terpilih.',
      ingredientsOrDetails: ['100% Bahan Tempatan Asli', 'Tanpa Bahan Kimia Sintetik'],
      image: '/src/assets/images/hero_zazami_store_1790908262577.jpg',
      sellerName: 'Usahawan Zazami Store',
      sellerRating: 5.0,
      isFlashSale: false,
      isHalal: true,
      isLocalHeritage: true,
    });
    setIsProductFormOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormData({ ...prod });
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showCmsToast('Sila masukkan nama dan harga produk.');
      return;
    }

    const categoryLabels: Record<string, string> = {
      makanan: 'Makanan & Kudapan',
      pakaian: 'Pakaian & Batik',
      kesihatan: 'Kesihatan & Herba',
      kraftangan: 'Kraftangan & Seni',
      minuman: 'Minuman Tempatan',
    };

    if (editingProductId) {
      // Update existing
      const updated = products.map((p) => {
        if (p.id === editingProductId) {
          const discountPct =
            formData.originalPrice && formData.originalPrice > (formData.price || 0)
              ? Math.round((((formData.originalPrice || 0) - (formData.price || 0)) / formData.originalPrice) * 100)
              : undefined;

          return {
            ...p,
            ...formData,
            categoryLabel: categoryLabels[formData.category || 'makanan'] || 'Barangan Tempatan',
            discountPercent: discountPct,
          } as Product;
        }
        return p;
      });
      onUpdateProducts(updated);
      showCmsToast(`Produk "${formData.name}" berjaya dikemaskini!`);
    } else {
      // Add new
      const newId = `prod-${Date.now()}`;
      const discountPct =
        formData.originalPrice && formData.originalPrice > (formData.price || 0)
          ? Math.round((((formData.originalPrice || 0) - (formData.price || 0)) / formData.originalPrice) * 100)
          : undefined;

      const newProd: Product = {
        id: newId,
        name: formData.name || 'Produk Baru Zazami',
        malayName: formData.malayName || formData.name || 'Barangan Tempatan Asli',
        category: formData.category as any || 'makanan',
        categoryLabel: categoryLabels[formData.category || 'makanan'] || 'Barangan Tempatan',
        price: Number(formData.price) || 10,
        originalPrice: Number(formData.originalPrice) || Number(formData.price) || 10,
        discountPercent: discountPct,
        rating: 5.0,
        reviewCount: 1,
        soldCount: 0,
        location: formData.location || 'Kuala Lumpur',
        state: formData.state || 'Kuala Lumpur',
        description: formData.description || 'Penerangan produk baru.',
        ingredientsOrDetails: formData.ingredientsOrDetails || ['Bahan Tempatan Asli'],
        weight: formData.weight || '250g',
        stock: Number(formData.stock) || 30,
        image: formData.image || '/src/assets/images/hero_zazami_store_1790908262577.jpg',
        sellerName: formData.sellerName || 'Zazami Store',
        sellerRating: 5.0,
        isFlashSale: !!formData.isFlashSale,
        isHalal: !!formData.isHalal,
        isLocalHeritage: !!formData.isLocalHeritage,
        reviews: [
          {
            id: `rev-${Date.now()}`,
            userName: 'Pelanggan Zazami',
            rating: 5,
            date: 'Baru sahaja',
            comment: 'Produk tempatan bermutu tinggi, pembungkusan sangat rapi.',
          },
        ],
      };
      onUpdateProducts([newProd, ...products]);
      showCmsToast(`Produk baru "${newProd.name}" berjaya ditambah!`);
    }

    setIsProductFormOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Adakah anda pasti mahu memadam produk "${name}"?`)) {
      onUpdateProducts(products.filter((p) => p.id !== id));
      showCmsToast(`Produk "${name}" telah dipadam.`);
    }
  };

  const handleQuickStock = (id: string, delta: number) => {
    onUpdateProducts(
      products.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    );
  };

  // Handle Order Status Update
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    onUpdateOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showCmsToast(`Status pesanan dikemaskini kepada: ${newStatus.toUpperCase()}`);
  };

  // Handle Voucher CRUD
  const handleSaveVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherData.code || !voucherData.value) {
      showCmsToast('Sila masukkan kod dan nilai baucar.');
      return;
    }

    const cleanCode = voucherData.code.trim().toUpperCase();
    const newV: Voucher = {
      id: `vouch-${Date.now()}`,
      code: cleanCode,
      title: voucherData.title || `Baucar Diskaun ${cleanCode}`,
      description: voucherData.description || `Diskaun istimewa ${cleanCode}`,
      discountType: (voucherData.discountType as any) || 'fixed',
      value: Number(voucherData.value) || 5,
      minSpend: Number(voucherData.minSpend) || 30,
      tag: voucherData.tag || 'BAUCAR CMS',
    };

    onUpdateVouchers([...vouchers, newV]);
    setIsVoucherFormOpen(false);
    showCmsToast(`Baucar "${cleanCode}" berjaya ditambah!`);
  };

  const handleDeleteVoucher = (id: string, code: string) => {
    onUpdateVouchers(vouchers.filter((v) => v.id !== id));
    showCmsToast(`Baucar "${code}" dipadam.`);
  };

  // Data Export & Import
  const handleExportData = () => {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      storeName: 'Zazami Online Store',
      products,
      orders,
      vouchers,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zazami_store_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showCmsToast('Data berjaya dieksport ke fail JSON!');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.products && Array.isArray(parsed.products)) {
          onUpdateProducts(parsed.products);
        }
        if (parsed.orders && Array.isArray(parsed.orders)) {
          onUpdateOrders(parsed.orders);
        }
        if (parsed.vouchers && Array.isArray(parsed.vouchers)) {
          onUpdateVouchers(parsed.vouchers);
        }
        showCmsToast('Data kedai berjaya diimport daripada JSON!');
      } catch (err) {
        showCmsToast('Ralat: Fail JSON tidak sah.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-6xl w-full h-[92vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast inside CMS */}
        {cmsToast && (
          <div className="absolute top-4 right-16 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 border border-stone-700 animate-in slide-in-from-top duration-150">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{cmsToast}</span>
          </div>
        )}

        {/* CMS Top Header */}
        <header className="px-5 py-3.5 bg-stone-900 text-white border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center justify-center shadow-xs">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base tracking-tight font-display text-white">
                  Zazami Store · Pusat Peniaga &amp; CMS Admin
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Mod Langsung
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Urus produk tempatan, pesanan masuk, baucar diskaun &amp; analitik jualan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportData}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors cursor-pointer"
              title="Eksport data kedai ke fail JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Eksport Data</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>Kembali ke Kedai</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* CMS Main Body with Sidebar Tabs */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar Navigation */}
          <aside className="w-48 sm:w-56 bg-stone-100/80 border-r border-stone-200 p-3 flex flex-col justify-between shrink-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Papan Pemuka</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>Katalog Produk</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'products' ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-600'}`}>
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pesanan Masuk</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'orders' ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-600'}`}>
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('vouchers')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'vouchers'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TicketPercent className="w-4 h-4" />
                  <span>Baucar &amp; Promosi</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'vouchers' ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-600'}`}>
                  {vouchers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Tetapan &amp; Sandaran</span>
              </button>
            </nav>

            {/* Quick stats in sidebar */}
            <div className="p-3 bg-white border border-stone-200 rounded-xl text-[11px] space-y-1">
              <span className="text-stone-400 font-semibold block uppercase text-[9px]">Peringatan CMS</span>
              <p className="text-stone-700">
                Stok Rendah: <strong className="text-amber-700">{lowStockCount} item</strong>
              </p>
              <p className="text-stone-700">
                Jumlah Pesanan: <strong className="text-emerald-700">{orders.length}</strong>
              </p>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main className="flex-1 bg-stone-50/50 p-4 sm:p-6 overflow-y-auto">
            {/* TAB 1: Papan Pemuka / Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-stone-900 font-display">
                    Ringkasan Prestasi Zazami Online Store
                  </h3>
                  <p className="text-xs text-stone-500">
                    Statistik masa nyata barangan tempatan, jualan dan tempahan masuk
                  </p>
                </div>

                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-[11px] text-stone-500 font-medium">Jumlah Hasil Jualan</span>
                    <div className="text-2xl font-black text-stone-900 tabular-nums mt-1 text-amber-700">
                      RM{totalRevenue.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3" />
                      Semua pembayaran FPX &amp; Kad disahkan
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-[11px] text-stone-500 font-medium">Jumlah Pesanan Masuk</span>
                    <div className="text-2xl font-black text-stone-900 tabular-nums mt-1">
                      {orders.length}
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      {totalItemsSold} unit barangan terjual
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-[11px] text-stone-500 font-medium">Produk Dalam Katalog</span>
                    <div className="text-2xl font-black text-stone-900 tabular-nums mt-1">
                      {products.length}
                    </div>
                    <span className="text-[10px] text-amber-600 font-semibold mt-1 block">
                      {products.filter((p) => p.isFlashSale).length} dalam Tawaran Kilat
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-[11px] text-stone-500 font-medium">Produk Stok Rendah (&le;30)</span>
                    <div className="text-2xl font-black text-rose-600 tabular-nums mt-1">
                      {lowStockCount}
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      Perlu penambahan stok segera
                    </span>
                  </div>
                </div>

                {/* Recent Orders in Dashboard */}
                <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm text-stone-900">
                      Pesanan Masuk Terkini
                    </h4>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-800 cursor-pointer"
                    >
                      Lihat Semua Pesanan &rarr;
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <p className="text-xs text-stone-400 py-4 text-center">Tiada pesanan lagi.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-stone-100 text-stone-400 text-[11px]">
                            <th className="pb-2 font-medium">No Pesanan</th>
                            <th className="pb-2 font-medium">Pelanggan</th>
                            <th className="pb-2 font-medium">Kaedah Bayaran</th>
                            <th className="pb-2 font-medium">Jumlah</th>
                            <th className="pb-2 font-medium">Status</th>
                            <th className="pb-2 font-medium text-right">Tindakan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {orders.slice(0, 5).map((ord) => (
                            <tr key={ord.id} className="hover:bg-stone-50">
                              <td className="py-2.5 font-mono font-bold text-stone-900">
                                {ord.orderNumber}
                              </td>
                              <td className="py-2.5 text-stone-700">
                                {ord.shippingAddress.fullName}
                              </td>
                              <td className="py-2.5 text-stone-500">
                                {ord.paymentMethodTitle}
                              </td>
                              <td className="py-2.5 font-bold text-amber-800 tabular-nums">
                                RM{ord.total.toFixed(2)}
                              </td>
                              <td className="py-2.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  ord.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                                  ord.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                                  ord.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                  'bg-stone-100 text-stone-800'
                                }`}>
                                  {ord.status.toUpperCase()}
                                </span>
                              </td>
                              <td className="py-2.5 text-right">
                                <button
                                  onClick={() => setViewingOrder(ord)}
                                  className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold underline cursor-pointer"
                                >
                                  Perincian
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Pengurusan Produk / Product Catalog */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-stone-900 font-display">
                      Pengurusan Produk Tempatan ({products.length})
                    </h3>
                    <p className="text-xs text-stone-500">
                      Tambah produk baru, kemaskini harga, ubah stok dan kawal status jualan kilat
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddProduct}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Produk Baru</span>
                  </button>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-wrap items-center gap-2.5 bg-white p-3 rounded-xl border border-stone-200">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Cari mengikut nama produk atau lokasi..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-amber-600"
                    />
                  </div>

                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 cursor-pointer"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="makanan">Makanan &amp; Kudapan</option>
                    <option value="pakaian">Pakaian &amp; Batik</option>
                    <option value="kesihatan">Kesihatan &amp; Herba</option>
                    <option value="kraftangan">Kraftangan &amp; Seni</option>
                    <option value="minuman">Minuman Tempatan</option>
                  </select>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold text-[11px]">
                          <th className="py-3 px-4">Produk</th>
                          <th className="py-3 px-3">Kategori &amp; Negeri</th>
                          <th className="py-3 px-3">Harga (RM)</th>
                          <th className="py-3 px-3">Stok Semasa</th>
                          <th className="py-3 px-3">Tawaran Kilat</th>
                          <th className="py-3 px-4 text-right">Tindakan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredProducts.map((prod) => (
                          <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                                />
                                <div>
                                  <p className="font-bold text-stone-900 line-clamp-1 max-w-xs">
                                    {prod.name}
                                  </p>
                                  <p className="text-[11px] text-stone-500 line-clamp-1">
                                    {prod.sellerName} · {prod.soldCount} terjual
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-3 text-stone-600">
                              <span className="font-medium text-stone-800 block">{prod.categoryLabel}</span>
                              <span className="text-[11px] text-stone-500">{prod.location}</span>
                            </td>

                            <td className="py-3 px-3 tabular-nums font-bold text-amber-800">
                              RM{prod.price.toFixed(2)}
                              {prod.originalPrice > prod.price && (
                                <span className="text-[10px] text-stone-400 line-through block font-normal">
                                  RM{prod.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </td>

                            <td className="py-3 px-3">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleQuickStock(prod.id, -5)}
                                  className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs"
                                  title="Kurang 5"
                                >
                                  -
                                </button>
                                <span className={`font-mono font-bold tabular-nums min-w-[28px] text-center ${prod.stock <= 30 ? 'text-rose-600' : 'text-stone-800'}`}>
                                  {prod.stock}
                                </span>
                                <button
                                  onClick={() => handleQuickStock(prod.id, 5)}
                                  className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs"
                                  title="Tambah 5"
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            <td className="py-3 px-3">
                              <button
                                onClick={() => {
                                  onUpdateProducts(
                                    products.map((p) =>
                                      p.id === prod.id ? { ...p, isFlashSale: !p.isFlashSale } : p
                                    )
                                  );
                                  showCmsToast(`Status Flash Sale dikemaskini untuk ${prod.name}`);
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                                  prod.isFlashSale
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : 'bg-stone-100 text-stone-500'
                                }`}
                              >
                                <Flame className="w-3 h-3" />
                                <span>{prod.isFlashSale ? 'Aktif' : 'Nyahaktif'}</span>
                              </button>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditProduct(prod)}
                                  className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                                  title="Sunting Produk"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                                  title="Padam Produk"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Pesanan Masuk / Orders Management */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-stone-900 font-display">
                      Pengurusan Pesanan &amp; Logistik ({orders.length})
                    </h3>
                    <p className="text-xs text-stone-500">
                      Sahkan penghantaran kurier, kemaskini nombor tracking dan cetak invoice pelanggan
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={orderFilterStatus}
                      onChange={(e) => setOrderFilterStatus(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      <option value="all">Semua Status Pesanan</option>
                      <option value="paid">Dibayar (Disahkan)</option>
                      <option value="processing">Sedang Dibungkus</option>
                      <option value="shipped">Diserah ke Kurier</option>
                      <option value="delivered">Selesai / Dihantar</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold text-[11px]">
                        <th className="py-3 px-4">No. Pesanan</th>
                        <th className="py-3 px-3">Tarikh &amp; Pelanggan</th>
                        <th className="py-3 px-3">Item Dipesan</th>
                        <th className="py-3 px-3">Jumlah (RM)</th>
                        <th className="py-3 px-3">Status Semasa</th>
                        <th className="py-3 px-4 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-50/70">
                          <td className="py-3 px-4">
                            <span className="font-mono font-bold text-stone-900 block">
                              {ord.orderNumber}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {ord.trackingNumber}
                            </span>
                          </td>

                          <td className="py-3 px-3">
                            <span className="font-semibold text-stone-800 block">
                              {ord.shippingAddress.fullName}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {ord.shippingAddress.phone} · {ord.shippingAddress.city}, {ord.shippingAddress.state}
                            </span>
                          </td>

                          <td className="py-3 px-3 text-stone-700">
                            <span className="font-medium">
                              {ord.items.reduce((s, i) => s + i.quantity, 0)} unit
                            </span>
                            <p className="text-[11px] text-stone-500 line-clamp-1">
                              {ord.items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ')}
                            </p>
                          </td>

                          <td className="py-3 px-3 font-bold text-amber-800 tabular-nums">
                            RM{ord.total.toFixed(2)}
                            <span className="text-[10px] text-stone-400 block font-normal">
                              {ord.paymentMethodTitle}
                            </span>
                          </td>

                          <td className="py-3 px-3">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                              className="px-2 py-1 bg-stone-50 border border-stone-200 rounded text-[11px] font-bold cursor-pointer"
                            >
                              <option value="paid">Dibayar</option>
                              <option value="processing">Sedang Dibungkus</option>
                              <option value="shipped">Diserah ke Kurier</option>
                              <option value="delivered">Diterima &amp; Selesai</option>
                            </select>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setViewingOrder(ord)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold text-[11px] transition-colors cursor-pointer"
                            >
                              Lihat Slip
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: Baucar & Promosi / Vouchers */}
            {activeTab === 'vouchers' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-stone-900 font-display">
                      Pengurusan Baucar &amp; Promosi ({vouchers.length})
                    </h3>
                    <p className="text-xs text-stone-500">
                      Cipta kod promosi baharu untuk memacu jualan barangan buatan Malaysia
                    </p>
                  </div>

                  <button
                    onClick={() => setIsVoucherFormOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cipta Baucar Baru</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {vouchers.map((vouch) => (
                    <div
                      key={vouch.id}
                      className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-xs border border-amber-200">
                            {vouch.code}
                          </span>
                          <button
                            onClick={() => handleDeleteVoucher(vouch.id, vouch.code)}
                            className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                            title="Padam Baucar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="font-bold text-stone-900 text-xs">{vouch.title}</h4>
                        <p className="text-[11px] text-stone-500 mt-1">{vouch.description}</p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 mt-3 flex items-baseline justify-between text-xs">
                        <span className="text-stone-500">Min: RM{vouch.minSpend}</span>
                        <span className="font-black text-amber-700 text-sm">
                          {vouch.discountType === 'free_shipping' && 'Percuma Pos (RM6)'}
                          {vouch.discountType === 'fixed' && `Diskaun RM${vouch.value}`}
                          {vouch.discountType === 'percentage' && `Diskaun ${vouch.value}%`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Tetapan Kedai & Sandaran / Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-black text-stone-900 font-display">
                    Tetapan Kedai &amp; Sandaran Data
                  </h3>
                  <p className="text-xs text-stone-500">
                    Kawal konfigurasi e-dagang Zazami dan sandaran JSON untuk GitHub
                  </p>
                </div>

                {/* Store Profile Settings */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Profil Kedai Zazami
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Nama Perniagaan</label>
                      <input
                        type="text"
                        readOnly
                        value="Zazami Online Store (M) Sdn Bhd"
                        className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-700 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Nombor Bantuan WhatsApp</label>
                      <input
                        type="text"
                        readOnly
                        value="+60 19-382 9102"
                        className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-700 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Gerbang Pembayaran Aktif</label>
                      <input
                        type="text"
                        readOnly
                        value="FPX Online Banking, DuitNow QR, Kad & E-Wallet"
                        className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-700 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Kelayakan Penghantaran Percuma</label>
                      <input
                        type="text"
                        readOnly
                        value="Pembelian RM30.00 ke atas (Semenanjung)"
                        className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-700 font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Backup & Restore */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Sandaran Data &amp; Pemulihan (JSON)
                  </h4>
                  <p className="text-xs text-stone-600">
                    Muat turun semua rekod produk, pesanan dan baucar anda untuk disimpan ke repositori GitHub atau dipulihkan pada bila-bila masa.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleExportData}
                      className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Muat Turun Fail Sandaran JSON</span>
                    </button>

                    <label className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-stone-200">
                      <Upload className="w-4 h-4" />
                      <span>Import Sandaran JSON</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={() => {
                        if (confirm('Adakah anda pasti ingin memulihkan semula kepada data asal contoh?')) {
                          onResetDefaultData();
                          showCmsToast('Data berjaya diset semula ke tetapan asal!');
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Set Semula Data Lalai</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Modal: Tambah / Sunting Produk */}
        {isProductFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3">
            <div className="bg-white rounded-2xl max-w-xl w-full p-5 shadow-2xl border border-stone-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <h3 className="font-bold text-sm text-stone-900 font-display">
                  {editingProductId ? 'Sunting Produk Tempatan' : 'Tambah Produk Tempatan Baharu'}
                </h3>
                <button
                  onClick={() => setIsProductFormOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs max-h-[75vh] overflow-y-auto pr-1">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Nama Produk Tempatan</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Sambal Tempoyak Petai Segar Warisan Perak"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Kategori</label>
                    <select
                      value={formData.category || 'makanan'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600 font-medium"
                    >
                      <option value="makanan">Makanan &amp; Kudapan</option>
                      <option value="pakaian">Pakaian &amp; Batik</option>
                      <option value="kesihatan">Kesihatan &amp; Herba</option>
                      <option value="kraftangan">Kraftangan &amp; Seni</option>
                      <option value="minuman">Minuman Tempatan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Negeri Asal Pengeluar</label>
                    <select
                      value={formData.state || 'Selangor'}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value, location: `${e.target.value}` })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600 font-medium"
                    >
                      {MALAYSIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Harga Jual (RM)</label>
                    <input
                      type="number"
                      step="0.10"
                      required
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono font-bold text-amber-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Harga Asal (RM)</label>
                    <input
                      type="number"
                      step="0.10"
                      value={formData.originalPrice || ''}
                      onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Kuantiti Stok</label>
                    <input
                      type="number"
                      required
                      value={formData.stock || ''}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Penerangan Produk</label>
                  <textarea
                    rows={3}
                    placeholder="Terangkan keunikan barangan tempatan ini..."
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Imej Produk (Pilih Imej Tempatan)</label>
                  <select
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-medium"
                  >
                    <option value="/src/assets/images/product_sambal_bilis_1790908276264.jpg">Sambal / Makanan Warisan Tempatan</option>
                    <option value="/src/assets/images/product_batik_malaysia_1790908290726.jpg">Batik Sutera &amp; Songket Tenun</option>
                    <option value="/src/assets/images/product_madu_kelulut_1790908302009.jpg">Madu Kelulut / Produk Herba Asli</option>
                    <option value="/src/assets/images/hero_zazami_store_1790908262577.jpg">Kraftangan &amp; Anyaman Tradisional</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFlashSale || false}
                      onChange={(e) => setFormData({ ...formData, isFlashSale: e.target.checked })}
                      className="accent-amber-600"
                    />
                    <span className="font-semibold text-stone-800">Tawaran Kilat (Flash Deal)</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isLocalHeritage || false}
                      onChange={(e) => setFormData({ ...formData, isLocalHeritage: e.target.checked })}
                      className="accent-amber-600"
                    />
                    <span className="font-semibold text-stone-800">Buatan Malaysia Asli</span>
                  </label>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsProductFormOpen(false)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 rounded-lg font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold shadow-xs cursor-pointer"
                  >
                    {editingProductId ? 'Simpan Perubahan' : 'Terbitkan Produk'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Tambah Baucar Baharu */}
        {isVoucherFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3">
            <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-stone-200 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <h3 className="font-bold text-sm text-stone-900 font-display">
                  Cipta Baucar Promosi Baharu
                </h3>
                <button
                  onClick={() => setIsVoucherFormOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveVoucher} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Kod Baucar (Huruf Besar)</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: RAYA2026, MERDEKA, DISKAUN10"
                    value={voucherData.code || ''}
                    onChange={(e) => setVoucherData({ ...voucherData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Tajuk Baucar</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Diskaun Hari Malaysia RM15"
                    value={voucherData.title || ''}
                    onChange={(e) => setVoucherData({ ...voucherData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Jenis Diskaun</label>
                    <select
                      value={voucherData.discountType || 'fixed'}
                      onChange={(e) => setVoucherData({ ...voucherData, discountType: e.target.value as any })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    >
                      <option value="fixed">Amaun Tetap (RM)</option>
                      <option value="percentage">Peratusan (%)</option>
                      <option value="free_shipping">Percuma Pos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Nilai Potongan</label>
                    <input
                      type="number"
                      required
                      value={voucherData.value || ''}
                      onChange={(e) => setVoucherData({ ...voucherData, value: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Perbelanjaan Minimum (RM)</label>
                  <input
                    type="number"
                    value={voucherData.minSpend || ''}
                    onChange={(e) => setVoucherData({ ...voucherData, minSpend: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono"
                  />
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsVoucherFormOpen(false)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 rounded-lg font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold shadow-xs cursor-pointer"
                  >
                    Aktifkan Baucar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Slip Pembungkusan / Order Invoice */}
        {viewingOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 text-xs animate-in zoom-in-95">
              <div className="flex justify-between items-start pb-4 border-b border-stone-200 mb-4">
                <div>
                  <h3 className="font-black text-lg text-stone-900 font-display">
                    Slip Pembungkusan Rasmi Zazami
                  </h3>
                  <p className="text-stone-500 font-mono text-[11px]">
                    No Pesanan: {viewingOrder.orderNumber}
                  </p>
                </div>
                <button
                  onClick={() => setViewingOrder(null)}
                  className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <div>
                    <span className="text-stone-400 block text-[10px]">PENERIMA:</span>
                    <p className="font-bold text-stone-900">{viewingOrder.shippingAddress.fullName}</p>
                    <p className="text-stone-600">{viewingOrder.shippingAddress.phone}</p>
                    <p className="text-stone-600 mt-1">
                      {viewingOrder.shippingAddress.addressLine1}, {viewingOrder.shippingAddress.postcode} {viewingOrder.shippingAddress.city}, {viewingOrder.shippingAddress.state}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">LOGISTIK &amp; BAYARAN:</span>
                    <p className="font-semibold text-stone-800">{viewingOrder.courierName}</p>
                    <p className="font-mono text-amber-700 font-bold">{viewingOrder.trackingNumber}</p>
                    <p className="text-emerald-700 font-bold mt-2">
                      {viewingOrder.paymentMethodTitle} (RM{viewingOrder.total.toFixed(2)})
                    </p>
                  </div>
                </div>

                <div className="border border-stone-200 rounded-xl p-3">
                  <span className="font-bold text-stone-800 block mb-2">Item Diperiksa &amp; Dibungkus:</span>
                  <div className="space-y-2">
                    {viewingOrder.items.map((it) => (
                      <div key={it.product.id} className="flex justify-between text-stone-700">
                        <span>{it.quantity}x {it.product.name} ({it.product.weight})</span>
                        <span className="font-bold tabular-nums">RM{(it.product.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Slip Kurier</span>
                  </button>
                  <button
                    onClick={() => setViewingOrder(null)}
                    className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-semibold cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
