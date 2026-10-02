import React from 'react';
import { Voucher } from '../types';
import { AVAILABLE_VOUCHERS } from '../data/products';
import { X, Sparkles, Tag, Check, Copy } from 'lucide-react';

interface VouchersModalProps {
  isOpen: boolean;
  onClose: () => void;
  vouchers?: Voucher[];
  appliedVoucher: Voucher | null;
  onSelectVoucher: (voucher: Voucher) => void;
}

export const VouchersModal: React.FC<VouchersModalProps> = ({
  isOpen,
  onClose,
  vouchers = AVAILABLE_VOUCHERS,
  appliedVoucher,
  onSelectVoucher,
}) => {
  if (!isOpen) return null;

  const voucherList = vouchers.length > 0 ? vouchers : AVAILABLE_VOUCHERS;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base text-stone-900 font-display">
              Baucar &amp; Promosi Zazami Store
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

        <div className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto">
          <p className="text-xs text-stone-600">
            Tebus baucar diskaun istimewa di bawah untuk menjimatkan pesanan barangan tempatan anda hari ini:
          </p>

          <div className="space-y-3">
            {voucherList.map((v) => {
              const isApplied = appliedVoucher?.id === v.id;
              return (
                <div
                  key={v.id}
                  className={`p-4 rounded-xl border relative flex flex-col justify-between gap-3 transition-all ${
                    isApplied
                      ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600'
                      : 'border-stone-200 bg-white hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded tracking-wider">
                          {v.tag}
                        </span>
                        <span className="font-mono font-bold text-stone-900 text-xs">
                          {v.code}
                        </span>
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm mt-1.5">{v.title}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">{v.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg font-black text-amber-700">
                        {v.discountType === 'free_shipping' && 'FREE'}
                        {v.discountType === 'fixed' && `RM${v.value}`}
                        {v.discountType === 'percentage' && `${v.value}%`}
                      </span>
                      <span className="block text-[10px] text-stone-400">Min RM{v.minSpend}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">
                      Sah untuk semua pengguna Zazami
                    </span>

                    <button
                      onClick={() => {
                        onSelectVoucher(v);
                        onClose();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isApplied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 hover:bg-amber-700 text-white'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Digunakan</span>
                        </>
                      ) : (
                        <span>Gunakan Sekarang</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
