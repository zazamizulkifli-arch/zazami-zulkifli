import React, { useState } from 'react';
import { CartItem, Voucher } from '../types';
import { AVAILABLE_VOUCHERS } from '../data/products';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  vouchers?: Voucher[];
  appliedVoucher: Voucher | null;
  onApplyVoucher: (voucher: Voucher | null) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  vouchers = AVAILABLE_VOUCHERS,
  appliedVoucher,
  onApplyVoucher,
}) => {
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');

  if (!isOpen) return null;

  const voucherList = vouchers.length > 0 ? vouchers : AVAILABLE_VOUCHERS;

  const subtotal = items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  // Free shipping threshold RM30 or voucher
  let baseShipping = subtotal > 0 ? (subtotal >= 30 ? 0 : 6.00) : 0;
  let discountAmount = 0;

  if (appliedVoucher && subtotal > 0) {
    if (appliedVoucher.discountType === 'free_shipping') {
      discountAmount = Math.min(baseShipping, appliedVoucher.value);
    } else if (appliedVoucher.discountType === 'fixed') {
      discountAmount = Math.min(subtotal, appliedVoucher.value);
    } else if (appliedVoucher.discountType === 'percentage') {
      const calculated = (subtotal * appliedVoucher.value) / 100;
      discountAmount = appliedVoucher.maxDiscount ? Math.min(calculated, appliedVoucher.maxDiscount) : calculated;
    }
  }

  const effectiveShipping = appliedVoucher?.discountType === 'free_shipping' ? 0 : baseShipping;
  const grandTotal = Math.max(0, subtotal - (appliedVoucher?.discountType === 'free_shipping' ? 0 : discountAmount) + effectiveShipping);

  const handleApplyCustomVoucher = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = voucherList.find((v) => v.code === clean);
    if (!found) {
      setVoucherError('Kod baucar tidak sah atau telah tamat.');
      return;
    }
    if (subtotal < found.minSpend) {
      setVoucherError(`Perbelanjaan minimum RM${found.minSpend} diperlukan.`);
      return;
    }
    onApplyVoucher(found);
    setVoucherError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h3 className="font-bold text-lg text-stone-900 font-display">
              Troli Beli-Belah ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup Troli"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress alert */}
        <div className="bg-amber-50 px-4 py-2 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          {subtotal >= 30 ? (
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-600" />
              Anda layak mendapat Penghantaran Percuma Semenanjung!
            </span>
          ) : (
            <span>
              Tambah lagi <strong>RM{(30 - subtotal).toFixed(2)}</strong> untuk Penghantaran Percuma!
            </span>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-stone-800 text-base mb-1">Troli Anda Kosong</h4>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Terokai pelbagai produk tempatan Malaysia yang sedap dan berkualiti di Zazami Online Store.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Mula Membeli-belah
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover bg-white shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="text-xs font-semibold text-stone-900 line-clamp-1">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-stone-500">
                      RM{item.product.price.toFixed(2)} seunit
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-300 rounded bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-stone-800 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-amber-800 tabular-nums">
                        RM{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        title="Buang item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Available Vouchers section */}
          {items.length > 0 && (
            <div className="mt-4 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-2">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span>Gunakan Baucar Zazami:</span>
              </div>

              {/* Promo input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Masukkan kod (cth: BEBASPOS, ZAZAMIBARU)"
                  value={voucherInput}
                  onChange={(e) => {
                    setVoucherInput(e.target.value);
                    setVoucherError('');
                  }}
                  className="flex-1 px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-lg text-xs uppercase focus:bg-white focus:outline-amber-600"
                />
                <button
                  onClick={() => handleApplyCustomVoucher(voucherInput)}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Tebus
                </button>
              </div>

              {voucherError && (
                <p className="text-[11px] text-rose-600 mb-2 font-medium">{voucherError}</p>
              )}

              {/* Quick voucher clicks */}
              <div className="space-y-1.5">
                {voucherList.map((v) => {
                  const isSelected = appliedVoucher?.id === v.id;
                  const isEligible = subtotal >= v.minSpend;
                  return (
                    <div
                      key={v.id}
                      onClick={() => {
                        if (isSelected) {
                          onApplyVoucher(null);
                        } else if (isEligible) {
                          onApplyVoucher(v);
                          setVoucherError('');
                        }
                      }}
                      className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-medium'
                          : isEligible
                          ? 'border-stone-200 bg-white hover:border-amber-400'
                          : 'border-stone-200 bg-stone-50 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-700 text-[11px] bg-amber-100 px-1.5 py-0.5 rounded">
                            {v.code}
                          </span>
                          <span className="font-semibold text-stone-800">{v.title}</span>
                        </div>
                        <p className="text-[10px] text-stone-500 mt-0.5">{v.description}</p>
                      </div>

                      <span className="text-[11px] font-bold text-amber-700 shrink-0">
                        {isSelected ? 'Digunakan ✓' : isEligible ? 'Pilih' : `Min RM${v.minSpend}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Jumlah Harga Produk:</span>
                <span className="tabular-nums font-semibold">RM{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Kos Penghantaran (Semenanjung):</span>
                <span className="tabular-nums font-semibold">
                  {effectiveShipping === 0 ? (
                    <span className="text-emerald-600 font-bold">PERCUMA</span>
                  ) : (
                    `RM${effectiveShipping.toFixed(2)}`
                  )}
                </span>
              </div>

              {appliedVoucher && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Diskaun Baucar ({appliedVoucher.code}):</span>
                  <span className="tabular-nums">-RM{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Jumlah Keseluruhan:</span>
                <span className="text-base text-amber-700 font-black tabular-nums">
                  RM{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Teruskan ke Bayaran Selamat</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sistem Pembayaran Selamat Disulitkan SSL 256-bit</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
