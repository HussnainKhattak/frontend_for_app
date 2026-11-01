export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  partNumber: string;
  sku: string;
  oemNumber: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  salePrice?: number;
  costPrice: number;
  stock: number;
  lowStockThreshold: number;
  condition: 'Brand New' | 'OEM' | 'Refurbished' | 'Aftermarket';
  warranty: string;
  status: 'Published' | 'Draft' | 'Out of Stock';
  featured: boolean;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  fitment: string[];
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  subCategories: string[];
}

export interface AdminBrand {
  id: string;
  name: string;
  origin: string;
  itemCount: number;
  website?: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Ready for Pickup'
  | 'Dispatched'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled'
  | 'Refund / Return Requested';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  fulfillmentStatus: OrderStatus;
  items: {
    name: string;
    partNumber: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: string;
  deliveryMethod: 'Delivery' | 'Workshop Pickup';
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpend: number;
  lastOrderDate: string;
  status: 'Active' | 'Inactive';
}

export interface AdminService {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  status: 'Active' | 'Paused';
  description: string;
  symptoms: string[];
  steps: string[];
  warranty: string;
}

export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  date: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Closed';
  notes: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountType: 'Percentage' | 'Fixed';
  value: number;
  minSpend: number;
  usageCount: number;
  usageLimit: number;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Disabled';
}

export interface AdminMessage {
  id: string;
  sender: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface AdminReview {
  id: string;
  customerName: string;
  serviceOrProduct: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Hidden';
}

export interface AdminGalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  dateAdded: string;
}

// Initial state data without dummy/mock entries (ready for FastAPI backend data)
export const INITIAL_PRODUCTS: AdminProduct[] = [];
export const INITIAL_ORDERS: AdminOrder[] = [];
export const INITIAL_CATEGORIES: AdminCategory[] = [];
export const INITIAL_BRANDS: AdminBrand[] = [];
export const INITIAL_SERVICES: AdminService[] = [];
export const INITIAL_INQUIRIES: AdminInquiry[] = [];
export const INITIAL_CUSTOMERS: AdminCustomer[] = [];
export const INITIAL_COUPONS: AdminCoupon[] = [];
export const INITIAL_MESSAGES: AdminMessage[] = [];
export const INITIAL_REVIEWS: AdminReview[] = [];
export const INITIAL_GALLERY: AdminGalleryItem[] = [];
