import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Flame, Clock, ChevronRight } from 'lucide-react';

interface FlashDealsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const FlashDeals: React.FC<FlashDealsProps> = ({
  products,
  onSelectProduct,
}) => {
  // Live ticking countdown for flash deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (n: number) => n.toString().padStart(2, '0');

  const flashItems = products.filter((p) => p.isFlashSale).slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
      <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-6 shadow-xs">
        {/* Flash Sale Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-amber-600 font-extrabold text-lg sm:text-xl font-display">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>TAWARAN KILAT</span>
            </div>

            {/* Live Countdown Timer */}
            <div className="flex items-center gap-1 text-xs text-stone-500">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Tamat Dalam:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-stone-900 ml-1">
                <span className="bg-stone-900 text-white px-1.5 py-0.5 rounded text-xs tabular-nums">
                  {formatDigit(timeLeft.hours)}
                </span>
                <span>:</span>
                <span className="bg-stone-900 text-white px-1.5 py-0.5 rounded text-xs tabular-nums">
                  {formatDigit(timeLeft.minutes)}
                </span>
                <span>:</span>
                <span className="bg-stone-900 text-white px-1.5 py-0.5 rounded text-xs tabular-nums">
                  {formatDigit(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-stone-500 flex items-center gap-1">
            <span>Stok terhad untuk barangan tempatan terpilih</span>
          </div>
        </div>

        {/* Flash Sale Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mt-4">
          {flashItems.map((item) => {
            const soldRatio = Math.min(85, Math.floor((item.soldCount % 50) + 40));
            return (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="group p-2.5 rounded-xl border border-stone-100 hover:border-amber-400/80 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full rounded-lg bg-stone-100 overflow-hidden mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1 left-1 bg-amber-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                    -{item.discountPercent}%
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-stone-800 line-clamp-1 group-hover:text-amber-700">
                    {item.name}
                  </h4>

                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-sm font-black text-amber-700 tabular-nums">
                      RM{item.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-stone-400 line-through tabular-nums">
                      RM{item.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Stock progress indicator */}
                  <div className="mt-2">
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full"
                        style={{ width: `${soldRatio}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1 font-medium">
                      Sedang Laris · Cepat Habis
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
