export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  variant?: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  malayName: string;
  category: 'makanan' | 'pakaian' | 'kesihatan' | 'kraftangan' | 'minuman';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  location: string;
  state: string;
  description: string;
  ingredientsOrDetails: string[];
  weight: string;
  stock: number;
  image: string;
  sellerName: string;
  sellerRating: number;
  isFlashSale?: boolean;
  isHalal?: boolean;
  isLocalHeritage?: boolean;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  value: number; // percentage (e.g. 15 for 15%) or fixed RM amount (e.g. 10 for RM10)
  minSpend: number;
  maxDiscount?: number;
  tag: string;
}

export type PaymentMethodType = 'fpx' | 'duitnow' | 'card' | 'ewallet' | 'cod';

export interface BankOption {
  id: string;
  name: string;
  shortName: string;
  logoColor: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  postcode: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  voucherCodeApplied?: string;
  shippingAddress: ShippingAddress;
  courierName: string;
  paymentMethod: PaymentMethodType;
  paymentMethodTitle: string;
  paymentReference: string;
  status: 'paid' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}
