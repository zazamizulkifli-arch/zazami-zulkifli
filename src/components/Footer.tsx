import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCMS?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCMS }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center justify-center">
                Z
              </div>
              <span className="text-base font-extrabold text-white font-display">
                Zazami Online Store
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Platform e-dagang barangan tempatan Malaysia terunggul. Menghubungkan anda terus dengan pengusaha dan pengrajin tradisi Malaysia dengan sistem pembayaran selamat terjamin.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Sistem Pembayaran Disahkan SSL 256-bit</span>
            </div>
            {onOpenCMS && (
              <button
                onClick={onOpenCMS}
                className="mt-2 text-xs text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <span>Log Masuk CMS Peniaga &amp; Admin</span>
              </button>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              Kategori Barangan
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Makanan &amp; Sambal Tradisi</span></li>
              <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Batik &amp; Songket Asli</span></li>
              <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Madu Kelulut &amp; Herba Sihat</span></li>
              <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Kraftangan &amp; Anyaman Mengkuang</span></li>
              <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Kopi Kampung &amp; Minuman Asli</span></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              Khidmat Pelanggan
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+60 19-382 9102 (Bantuan WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>bantuan@zazamistore.my</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Kuala Lumpur, Malaysia</span>
              </li>
              <li className="pt-1 text-[11px] text-stone-500">
                Waktu Operasi: 8:30 Pagi - 10:00 Malam (Isnin - Ahad)
              </li>
            </ul>
          </div>

          {/* Secure Payment & Courier Logos */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              Rakan Pembayaran &amp; Kurier
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-stone-400 block mb-1.5 font-medium">Pembayaran Sah:</span>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono font-bold text-stone-800">
                  <span className="bg-white px-2 py-0.5 rounded">FPX</span>
                  <span className="bg-white px-2 py-0.5 rounded text-rose-600">DuitNow</span>
                  <span className="bg-white px-2 py-0.5 rounded text-blue-600">VISA</span>
                  <span className="bg-white px-2 py-0.5 rounded text-orange-600">Mastercard</span>
                  <span className="bg-white px-2 py-0.5 rounded text-blue-500">TNG eWallet</span>
                  <span className="bg-white px-2 py-0.5 rounded text-emerald-600">GrabPay</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-stone-400 block mb-1.5 font-medium">Rakan Penghantaran:</span>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-stone-800">
                  <span className="bg-stone-200 px-2 py-0.5 rounded">Pos Laju Malaysia</span>
                  <span className="bg-stone-200 px-2 py-0.5 rounded">J&amp;T Express</span>
                  <span className="bg-stone-200 px-2 py-0.5 rounded">Ninja Van</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} Zazami Online Store. Hak Cipta Terpelihara. Sokong Produk Tempatan Malaysia.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Dibuat dengan rasa bangga untuk Malaysia</span>
            <span className="text-rose-500">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
