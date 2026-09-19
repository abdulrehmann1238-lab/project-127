export type ProductCategory = 'Apparel' | 'Accessories' | 'Footwear' | 'Gift Cards';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  sku: string;
  description: string;
  details: string[];
  materials: string;
  care: string;
  fit: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  posStock: number; // In-store Square POS count
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface OrderItem {
  id: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Ready for Pickup';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
  timeline: {
    title: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberTier: string;
  handicap?: string;
  homeClub?: string;
  ordersCount: number;
  totalSpent: number;
  defaultAddress: string;
}
