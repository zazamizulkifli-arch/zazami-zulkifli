import React, { useState } from 'react';
import { CartItem, Voucher, PaymentMethodType, ShippingAddress, Order } from '../types';
import { FPX_BANKS, EWALLETS, MALAYSIAN_STATES } from '../data/products';
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  Building2,
  QrCode,
  Wallet,
  Truck,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Clock,
  Printer,
  FileCheck
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  voucher: Voucher | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  voucher,
  onOrderSuccess,
}) => {
  // Step: 'details' -> 'bank_auth' (if FPX) or 'qr_wait' (if DuitNow) or 'card_otp' (if Card) -> 'success'
  const [currentStep, setCurrentStep] = useState<'checkout' | 'processing' | 'bank_tac' | 'success'>('checkout');

  // Customer Shipping details
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Zazami Zulkifli',
    phone: '019-3829102',
    addressLine1: 'No 45, Jalan Warisan Tempatan 3',
    addressLine2: 'Taman Saujana Utama',
    postcode: '47000',
    city: 'Sungai Buloh',
    state: 'Selangor',
  });

  const [courier, setCourier] = useState('Pos Laju Malaysia (Pantas & Selamat)');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('fpx');
  const [selectedBank, setSelectedBank] = useState('mb2u');
  const [selectedEwallet, setSelectedEwallet] = useState('tng');

  // Card form state
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8821',
    cardHolder: 'ZAZAMI ZULKIFLI',
    expiry: '08/28',
    cvv: '842',
  });

  // Simulated TAC / OTP for FPX / Card
  const [tacCode, setTacCode] = useState('');
  const [generatedTac, setGeneratedTac] = useState('628491');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Price calculations
  const subtotal = items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  let baseShipping = subtotal >= 30 ? 0 : 6.00;
  let discountAmount = 0;

  if (voucher && subtotal > 0) {
    if (voucher.discountType === 'free_shipping') {
      discountAmount = Math.min(baseShipping, voucher.value);
    } else if (voucher.discountType === 'fixed') {
      discountAmount = Math.min(subtotal, voucher.value);
    } else if (voucher.discountType === 'percentage') {
      const val = (subtotal * voucher.value) / 100;
      discountAmount = voucher.maxDiscount ? Math.min(val, voucher.maxDiscount) : val;
    }
  }

  const effectiveShipping = voucher?.discountType === 'free_shipping' ? 0 : baseShipping;
  const grandTotal = Math.max(0, subtotal - (voucher?.discountType === 'free_shipping' ? 0 : discountAmount) + effectiveShipping);

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.addressLine1 || !address.postcode || !address.city) {
      setFormError('Sila lengkapkan semua butiran alamat penghantaran.');
      return;
    }
    setFormError('');

    if (paymentMethod === 'fpx' || paymentMethod === 'card') {
      // Simulate 2FA bank authorization
      setGeneratedTac(Math.floor(100000 + Math.random() * 900000).toString());
      setCurrentStep('bank_tac');
    } else {
      // Direct processing for DuitNow QR, eWallet, COD
      setCurrentStep('processing');
      setTimeout(() => {
        completeOrder();
      }, 1800);
    }
  };

  const handleConfirmTac = () => {
    setCurrentStep('processing');
    setTimeout(() => {
      completeOrder();
    }, 1500);
  };

  const completeOrder = () => {
    const bankObj = FPX_BANKS.find((b) => b.id === selectedBank);
    const orderNum = `ZZM-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNo = `MYPOS-${Math.floor(10000000 + Math.random() * 90000000)}`;

    let methodTitle = 'FPX Perbankan Dalam Talian';
    if (paymentMethod === 'fpx') methodTitle = `FPX (${bankObj?.name || 'Maybank2u'})`;
    if (paymentMethod === 'duitnow') methodTitle = 'DuitNow QR Kebangsaan';
    if (paymentMethod === 'card') methodTitle = 'Kad Visa / Mastercard (Disulitkan)';
    if (paymentMethod === 'ewallet') methodTitle = `E-Dompet (${selectedEwallet.toUpperCase()})`;
    if (paymentMethod === 'cod') methodTitle = 'Bayar Waktu Terima (Tunai)';

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('ms-MY', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...items],
      subtotal,
      shippingFee: effectiveShipping,
      discount: discountAmount,
      total: grandTotal,
      voucherCodeApplied: voucher?.code,
      shippingAddress: { ...address },
      courierName: courier,
      paymentMethod,
      paymentMethodTitle: methodTitle,
      paymentReference: `PAY-${Date.now().toString().slice(-8)}`,
      status: 'paid',
      trackingNumber: trackingNo,
      estimatedDelivery: '2 - 3 Hari Bekerja',
    };

    setCreatedOrder(newOrder);
    setCurrentStep('success');
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Step 1: Main Checkout & Payment selection */}
        {currentStep === 'checkout' && (
          <div>
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 font-display">
                    Sistem Pembayaran Selamat Zazami
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Disulitkan dengan teknologi 256-bit SSL &amp; Kawal Selia Bank Negara Malaysia
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                aria-label="Batal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleStartPayment} className="p-5 max-h-[75vh] overflow-y-auto space-y-6">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Alamat Penghantaran */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>1. Alamat Penghantaran Pembeli</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Nama Penuh Penerima</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Nombor Telefon (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1 font-medium">Alamat Rumah / Premis</label>
                    <input
                      type="text"
                      required
                      placeholder="Nombor rumah, tingkat, nama jalan"
                      value={address.addressLine1}
                      onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Poskod</label>
                    <input
                      type="text"
                      required
                      value={address.postcode}
                      onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Bandar</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1 font-medium">Negeri</label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-amber-600"
                    >
                      {MALAYSIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Pilihan Kurier */}
              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  2. Pilihan Kurier Penghantaran
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {['Pos Laju Malaysia (Pantas & Selamat)', 'J&T Express Malaysia', 'Ninja Van Malaysia'].map((c) => (
                    <label
                      key={c}
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                        courier === c
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-medium'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="courier"
                          checked={courier === c}
                          onChange={() => setCourier(c)}
                          className="accent-amber-600"
                        />
                        <span>{c}</span>
                      </span>
                      <span className="text-[11px] text-stone-500">2-3 Hari</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Kaedah Pembayaran Selamat */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>3. Kaedah Pembayaran Selamat</span>
                  </h4>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    Gerbang Sah PayNet
                  </span>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('fpx')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'fpx'
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs ring-1 ring-amber-600'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-amber-700" />
                    <span className="font-bold">FPX Online</span>
                    <span className="text-[10px] text-stone-400">Maybank, CIMB etc</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('duitnow')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'duitnow'
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs ring-1 ring-amber-600'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-rose-600" />
                    <span className="font-bold">DuitNow QR</span>
                    <span className="text-[10px] text-stone-400">Imbas &amp; Bayar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs ring-1 ring-amber-600'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="font-bold">Kad Debit/Kredit</span>
                    <span className="text-[10px] text-stone-400">Visa &amp; Master</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ewallet')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'ewallet'
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs ring-1 ring-amber-600'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <Wallet className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">E-Dompet</span>
                    <span className="text-[10px] text-stone-400">TNG / GrabPay</span>
                  </button>
                </div>

                {/* Conditional Sub-panels per payment method */}
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs">
                  {/* FPX Bank selector */}
                  {paymentMethod === 'fpx' && (
                    <div>
                      <p className="font-semibold text-stone-800 mb-2">Pilih Bank Anda (FPX Perbankan Internet):</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {FPX_BANKS.map((bank) => (
                          <label
                            key={bank.id}
                            className={`p-2 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                              selectedBank === bank.id
                                ? 'border-amber-600 bg-white shadow-xs font-semibold'
                                : 'border-stone-200 bg-stone-100 hover:bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="bank"
                              checked={selectedBank === bank.id}
                              onChange={() => setSelectedBank(bank.id)}
                              className="accent-amber-600"
                            />
                            <span className="truncate">{bank.name}</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-2">
                        🔒 Anda akan disambungkan ke portal rasmi bank untuk pengesahan TAC yang selamat.
                      </p>
                    </div>
                  )}

                  {/* DuitNow QR Preview */}
                  {paymentMethod === 'duitnow' && (
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className="w-28 h-28 bg-white p-2 rounded-xl border border-stone-300 shadow-xs flex flex-col items-center justify-center shrink-0">
                        {/* Realistic DuitNow styled QR placeholder */}
                        <div className="w-full h-full bg-stone-900 rounded-lg p-1.5 flex flex-col items-center justify-between text-white font-mono text-[9px]">
                          <div className="flex justify-between w-full">
                            <span className="bg-rose-500 text-[8px] font-bold px-1 rounded">DuitNow</span>
                            <span>QR</span>
                          </div>
                          <QrCode className="w-12 h-12 text-white" />
                          <span className="text-[7px] text-stone-300">PayNet MY</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                          DuitNow QR Kebangsaan
                        </span>
                        <h5 className="font-bold text-stone-900 mt-1">Imbas dengan Mana-mana Aplikasi Perbankan</h5>
                        <p className="text-stone-500 text-[11px] mt-1 leading-snug">
                          Buka aplikasi Maybank MAE, CIMB OCTO, Bank Islam, Touch &apos;n Go atau GrabPay untuk mengimbas dan mengesahkan pembayaran serta-merta.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-2">
                      <p className="font-semibold text-stone-800">Butiran Kad Debit / Kredit (SSL Disulitkan):</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2">
                          <input
                            type="text"
                            placeholder="Nombor Kad (16-angka)"
                            value={cardData.cardNumber}
                            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Tamat (MM/YY)"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="CVV (3 angka)"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Disahkan oleh Visa Secure &amp; Mastercard Identity Check</span>
                      </div>
                    </div>
                  )}

                  {/* E-wallet selector */}
                  {paymentMethod === 'ewallet' && (
                    <div className="space-y-2">
                      <p className="font-semibold text-stone-800">Pilih E-Dompet:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {EWALLETS.map((ew) => (
                          <label
                            key={ew.id}
                            className={`p-2 rounded-lg border flex items-center gap-2 cursor-pointer ${
                              selectedEwallet === ew.id
                                ? 'border-amber-600 bg-white font-semibold'
                                : 'border-stone-200 bg-stone-100 hover:bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="ewallet"
                              checked={selectedEwallet === ew.id}
                              onChange={() => setSelectedEwallet(ew.id)}
                              className="accent-amber-600"
                            />
                            <span>{ew.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="p-4 bg-stone-100 rounded-xl space-y-1.5 text-xs text-stone-700">
                <div className="flex justify-between">
                  <span>Subjumlah ({items.reduce((s, i) => s + i.quantity, 0)} item):</span>
                  <span className="font-semibold tabular-nums">RM{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kos Pos ({courier.split(' ')[0]}):</span>
                  <span className="font-semibold tabular-nums">
                    {effectiveShipping === 0 ? <span className="text-emerald-700">PERCUMA</span> : `RM${effectiveShipping.toFixed(2)}`}
                  </span>
                </div>
                {voucher && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Baucar ({voucher.code}):</span>
                    <span className="tabular-nums">-RM{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>Jumlah Perlu Dibayar:</span>
                  <span className="text-amber-700 text-lg tabular-nums">
                    RM{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Bayar Sekarang (RM{grandTotal.toFixed(2)})</span>
              </button>

              <p className="text-center text-[11px] text-stone-400">
                Dengan mengklik bayar, pesanan anda dilindungi sepenuhnya di bawah <strong>Jaminan Zazami 15 Hari</strong>.
              </p>
            </form>
          </div>
        )}

        {/* Step 2: Simulated Bank TAC / 3D Secure Step (FPX / Card) */}
        {currentStep === 'bank_tac' && (
          <div className="p-6 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <div className="inline-block bg-stone-900 text-white font-mono text-xs px-2.5 py-1 rounded mb-2">
                FPX Secure PayNet Gateway
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-display">
                Pengesahan Kod Keselamatan TAC (2FA)
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto mt-1">
                Bank anda memerlukan kod pengesahan TAC untuk menyempurnakan pembayaran sebanyak{' '}
                <strong className="text-stone-900">RM{grandTotal.toFixed(2)}</strong> kepada{' '}
                <strong className="text-amber-700">Zazami Online Store</strong>.
              </p>
            </div>

            {/* Simulated SMS Box */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs max-w-sm mx-auto text-left">
              <div className="flex items-center justify-between text-[11px] text-amber-900 mb-1">
                <span className="font-semibold">Simulasi SMS Bank:</span>
                <span className="font-mono">{new Date().toLocaleTimeString()}</span>
              </div>
              <p className="text-stone-700">
                TAC anda ialah: <strong className="font-mono text-base text-amber-900">{generatedTac}</strong> untuk transaksi ZAZAMI STORE. Sah selama 5 minit.
              </p>
              <button
                type="button"
                onClick={() => setTacCode(generatedTac)}
                className="mt-2 text-[11px] text-amber-800 underline font-semibold hover:text-amber-900 cursor-pointer"
              >
                Isi kod automatik untuk ujian
              </button>
            </div>

            <div className="max-w-xs mx-auto space-y-3">
              <input
                type="text"
                maxLength={6}
                placeholder="Masukkan 6-angka TAC"
                value={tacCode}
                onChange={(e) => setTacCode(e.target.value)}
                className="w-full text-center tracking-widest font-mono text-lg py-2.5 bg-stone-100 border border-stone-300 rounded-xl focus:bg-white focus:outline-amber-600 font-bold"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep('checkout')}
                  className="flex-1 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={tacCode.length < 6}
                  onClick={handleConfirmTac}
                  className="flex-1 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
                >
                  Sahkan &amp; Bayar
                </button>
              </div>
            </div>

            <div className="text-[11px] text-stone-400 flex items-center justify-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Semua sambungan disulitkan mengikut piawaian keselamatan perbankan Malaysia</span>
            </div>
          </div>
        )}

        {/* Step 3: Loading Processing State */}
        {currentStep === 'processing' && (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-lg font-bold text-stone-900 font-display">
              Memproses Pembayaran Selamat...
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Sila tunggu sebentar sementara gerbang pembayaran menyahkan transaksi anda. Jangan tutup tetingkap ini.
            </p>
          </div>
        )}

        {/* Step 4: Success Receipt & Tracking Screen */}
        {currentStep === 'success' && createdOrder && (
          <div className="p-6 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-stone-900 font-display">
                Pembayaran Berjaya!
              </h3>
              <p className="text-xs text-stone-600">
                Terima kasih kerana membeli di <strong>Zazami Online Store</strong>. Pesanan anda telah disahkan dan sedang disediakan.
              </p>
            </div>

            {/* Official Order Receipt Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px]">Nombor Pesanan:</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">{createdOrder.orderNumber}</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block text-[10px]">Status:</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded text-[11px]">
                    Dibayar (Disahkan)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-stone-600 text-[11px]">
                <div>
                  <span className="text-stone-400 block">Tarikh Transaksi:</span>
                  <span className="font-medium text-stone-800">{createdOrder.date}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Kaedah Bayaran:</span>
                  <span className="font-medium text-stone-800">{createdOrder.paymentMethodTitle}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">No Rujukan Bayaran:</span>
                  <span className="font-mono font-medium text-stone-800">{createdOrder.paymentReference}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Nombor Penjejakan Pos:</span>
                  <span className="font-mono font-bold text-amber-700">{createdOrder.trackingNumber}</span>
                </div>
              </div>

              {/* Items Purchased List */}
              <div className="pt-2 border-t border-stone-200 space-y-2">
                <span className="font-semibold text-stone-700 block">Barangan Tempatan Dipesan:</span>
                {createdOrder.items.map((it) => (
                  <div key={it.product.id} className="flex justify-between text-stone-700">
                    <span className="line-clamp-1 flex-1 pr-2">
                      {it.quantity}x {it.product.name}
                    </span>
                    <span className="font-semibold tabular-nums shrink-0">
                      RM{(it.product.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Grand Total */}
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Jumlah Bayaran Bersih:</span>
                <span className="text-amber-700 tabular-nums">RM{createdOrder.total.toFixed(2)}</span>
              </div>

              {/* Shipping destination */}
              <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-600">
                <span className="font-semibold text-stone-800 block mb-0.5">Dihantar Kepada:</span>
                <p>{createdOrder.shippingAddress.fullName} ({createdOrder.shippingAddress.phone})</p>
                <p>{createdOrder.shippingAddress.addressLine1}, {createdOrder.shippingAddress.postcode} {createdOrder.shippingAddress.city}, {createdOrder.shippingAddress.state}</p>
                <p className="text-amber-800 font-medium mt-1">Kurier: {createdOrder.courierName} (Anggaran: {createdOrder.estimatedDelivery})</p>
              </div>
            </div>

            {/* Actions: Print & Close */}
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Resit Pembayaran</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Selesai &amp; Buka Kedai</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
