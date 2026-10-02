import React from 'react';
import { HERO_IMAGE } from '../data/products';
import { ShieldCheck, Truck, Award, CreditCard, ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onFlashDealsClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onFlashDealsClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-white rounded-2xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl mt-4 shadow-xl border border-stone-800">
      {/* Background Image with High-Fidelity Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Barangan Tempatan Malaysia Zazami Online Store"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-950/40" />
      </div>

      <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-16 max-w-3xl">
        {/* Subtle kicker without pill badge */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
          <span>🇲🇾 Platform Barangan Asli Malaysia</span>
          <span aria-hidden="true">·</span>
          <span>Sokong Pengrajin & PKS Tempatan</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight font-display mb-4 text-balance">
          Beli Pelbagai Produk Tempatan Berkualiti di <span className="text-amber-400">Zazami Online Store</span>.
        </h1>

        <p className="text-sm sm:text-base text-stone-300 mb-8 max-w-xl leading-relaxed">
          Dari sambal tradisi warisan, batik tenun Terengganu, madu kelulut asli hingga ke kraftangan istimewa. Nikmati sistem pembayaran selamat bersepadu FPX, DuitNow QR, Kad &amp; E-Wallet dengan Jaminan Zazami.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onExploreClick}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-bold rounded-lg transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
          >
            <span>Beli Barangan Tempatan</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onFlashDealsClick}
            className="px-5 py-3 bg-stone-800/80 hover:bg-stone-700 text-white text-sm font-semibold rounded-lg border border-stone-700 transition-all backdrop-blur-sm cursor-pointer"
          >
            Tawaran Kilat Menjimatkan
          </button>
        </div>

        {/* Trust Badges Strip inside Hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-stone-800/80 text-xs text-stone-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Pembayaran Selamat</p>
              <p className="text-stone-400 text-[11px]">FPX, DuitNow &amp; Kad</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">100% Produk Tulen</p>
              <p className="text-stone-400 text-[11px]">Terus dari Pengusaha</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Pos Seluruh Malaysia</p>
              <p className="text-stone-400 text-[11px]">Semenanjung, Sabah &amp; Sarawak</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Jaminan Zazami</p>
              <p className="text-stone-400 text-[11px]">Wang Dikembalikan 15 Hari</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
