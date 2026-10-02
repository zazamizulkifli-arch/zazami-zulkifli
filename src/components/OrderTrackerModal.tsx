import React, { useState } from 'react';
import { Order } from '../types';
import { X, Search, Package, CheckCircle2, Clock, Truck, Home, MapPin } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [searchCode, setSearchCode] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  if (!isOpen) return null;

  const currentDisplay = selectedOrder || orders[0] || null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    const clean = searchCode.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase().includes(clean) ||
        o.trackingNumber.toLowerCase().includes(clean)
    );
    if (found) {
      setSelectedOrder(found);
    }
  };

  const steps = [
    { title: 'Pesanan Diterima', desc: 'Bayaran selamat FPX / DuitNow telah disahkan', icon: CheckCircle2, active: true },
    { title: 'Sedang Dibungkus', desc: 'Penjual sedang membungkus produk dengan kemas', icon: Package, active: true },
    { title: 'Diserah ke Kurier', desc: 'Pakej telah diimbas di pusat pengagihan Pos Laju / J&T', icon: Truck, active: true },
    { title: 'Dalam Penghantaran', desc: 'Pemandu kurier dalam perjalanan ke alamat anda', icon: Clock, active: false },
    { title: 'Diterima & Selesai', desc: 'Barangan selamat sampai ke pintu rumah anda', icon: Home, active: false },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-700" />
            <h3 className="font-bold text-base text-stone-900 font-display">
              Jejak Pesanan &amp; Penghantaran Zazami
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

        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Search bar for tracking */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Masukkan No. Pesanan (ZZM-...) atau No. Tracking (MYPOS-...)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-amber-600"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Cari
            </button>
          </form>

          {/* Orders selector tabs if multiple orders exist */}
          {orders.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {orders.map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                    currentDisplay?.id === ord.id
                      ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {ord.orderNumber}
                </button>
              ))}
            </div>
          )}

          {/* Tracking Details View */}
          {currentDisplay ? (
            <div className="space-y-6">
              {/* Order Meta Header */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-amber-800 uppercase font-semibold">Nombor Pesanan:</span>
                  <p className="font-mono text-base font-black text-amber-900">{currentDisplay.orderNumber}</p>
                  <p className="text-stone-500 text-[11px] mt-0.5">Dipesan pada: {currentDisplay.date}</p>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold">No. Tracking Kurier:</span>
                  <p className="font-mono font-bold text-stone-900 text-sm">{currentDisplay.trackingNumber}</p>
                  <p className="text-emerald-700 font-semibold text-[11px] mt-0.5">
                    Kurier: {currentDisplay.courierName}
                  </p>
                </div>
              </div>

              {/* Progress Milestones */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4">
                  Status Penghantaran Semasa:
                </h4>

                <div className="relative pl-6 space-y-6 border-l-2 border-amber-500/40 ml-3">
                  {steps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="relative group">
                        <div
                          className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                            step.active ? 'bg-amber-600 ring-4 ring-amber-100' : 'bg-stone-300'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5
                              className={`text-xs font-bold ${
                                step.active ? 'text-stone-900' : 'text-stone-400'
                              }`}
                            >
                              {step.title}
                            </h5>
                            {step.active && idx === 2 && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                                Semasa
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Address & Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-stone-200">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-1.5 font-bold text-stone-800 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Alamat Dihantar:</span>
                  </div>
                  <p className="font-semibold text-stone-900">{currentDisplay.shippingAddress.fullName}</p>
                  <p className="text-stone-500">{currentDisplay.shippingAddress.phone}</p>
                  <p className="text-stone-600 mt-1">
                    {currentDisplay.shippingAddress.addressLine1}, {currentDisplay.shippingAddress.postcode} {currentDisplay.shippingAddress.city}, {currentDisplay.shippingAddress.state}
                  </p>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-800 mb-1">Ringkasan Pembayaran Selamat:</div>
                  <p className="text-stone-600">Kaedah: <strong>{currentDisplay.paymentMethodTitle}</strong></p>
                  <p className="text-stone-600">Rujukan: <span className="font-mono">{currentDisplay.paymentReference}</span></p>
                  <p className="text-stone-900 font-bold mt-2">
                    Jumlah Dibayar: <span className="text-amber-700">RM{currentDisplay.total.toFixed(2)}</span>
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="border border-stone-200 rounded-xl p-3 text-xs">
                <p className="font-bold text-stone-800 mb-2">Item Dalam Pakej:</p>
                <div className="space-y-2">
                  {currentDisplay.items.map((it) => (
                    <div key={it.product.id} className="flex items-center justify-between text-stone-700">
                      <div className="flex items-center gap-2">
                        <img
                          src={it.product.image}
                          alt={it.product.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <span className="line-clamp-1">{it.quantity}x {it.product.name}</span>
                      </div>
                      <span className="font-semibold tabular-nums shrink-0">
                        RM{(it.product.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-stone-500 text-xs">
              <Package className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="font-medium text-stone-700">Tiada Pesanan Aktif Ditemui</p>
              <p className="mt-1">Buat pesanan pertama anda di Zazami Online Store untuk menjejak penghantaran di sini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
