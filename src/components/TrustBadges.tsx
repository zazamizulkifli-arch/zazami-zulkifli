import React from 'react';
import { ShieldCheck, HeartHandshake, Truck, RotateCcw, Lock, Award } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-12">
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl">
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Komitmen Keselamatan &amp; Kualiti
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Kenapa Memilih <span className="text-amber-400">Zazami Online Store</span>?
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
            Kami menghubungkan anda secara langsung dengan pengrajin, petani dan pengusaha mikro tempatan Malaysia dengan jaminan pembayaran selamat dan kualiti berperingkat tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stone-800/60 border border-stone-700/70 rounded-xl p-4.5 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Sistem Pembayaran Selamat</h3>
            <p className="text-xs text-stone-400 leading-snug">
              FPX Perbankan Dalam Talian, DuitNow QR &amp; Kad Kredit dilindungi pensijilan SSL 256-bit dan gerbang sah PayNet.
            </p>
          </div>

          <div className="bg-stone-800/60 border border-stone-700/70 rounded-xl p-4.5 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">100% Produk Tempatan</h3>
            <p className="text-xs text-stone-400 leading-snug">
              Semua barangan disahkan asli buatan Malaysia, daripada sambal tradisi hingga songket tenun tangan Terengganu.
            </p>
          </div>

          <div className="bg-stone-800/60 border border-stone-700/70 rounded-xl p-4.5 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Jaminan Zazami 15 Hari</h3>
            <p className="text-xs text-stone-400 leading-snug">
              Wang anda disimpan dalam akaun amanah (Escrow) sehingga anda menerima barangan dalam keadaan sempurna.
            </p>
          </div>

          <div className="bg-stone-800/60 border border-stone-700/70 rounded-xl p-4.5 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Sokong Usahawan PKS</h3>
            <p className="text-xs text-stone-400 leading-snug">
              Setiap sen pembelian anda menyokong ekonomi sara hidup keluarga pengusaha kampung dan perniagaan kecil di Malaysia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
