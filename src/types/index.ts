export type ProductStatus =
  | 'ACTIVE'
  | 'DRAFT'
  | 'ARCHIVED'
  | 'OUT_OF_STOCK'
  | 'MADE_TO_ORDER'
  | 'REQUIRES_QUOTE';

export type OrderStatus =
  | 'PENDING'
  | 'PAYMENT_INITIATED'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'FAILED'
  | 'REFUNDED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED';

export type QuoteStatus =
  | 'PENDING'
  | 'IN_REVIEW'
  | 'QUOTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED'
  | 'CONVERTED_TO_ORDER';

export type PaymentMethod =
  | 'EPAYCO_PSE'
  | 'EPAYCO_CARD'
  | 'EPAYCO_DAVIPLATA'
  | 'EPAYCO_LINK'
  | 'MANUAL'
  | 'BANK_TRANSFER'
  | 'CASH_ON_DELIVERY';

export type PieceType =
  | 'SHELF'
  | 'LAMP'
  | 'DECORATIVE_PANEL'
  | 'FURNITURE'
  | 'SUPPORT'
  | 'SIGNAGE'
  | 'PLATE'
  | 'PERSONALIZED_GIFT'
  | 'ARCHITECTURAL_PIECE'
  | 'OTHER';

export type MaterialType =
  | 'STEEL'
  | 'STAINLESS_STEEL'
  | 'ALUMINUM'
  | 'BRASS'
  | 'COPPER'
  | 'CORTEN_STEEL'
  | 'IRON'
  | 'OTHER';

export type FinishType =
  | 'MATTE_BLACK'
  | 'GLOSSY_BLACK'
  | 'BRUSHED'
  | 'POLISHED'
  | 'POWDER_COATED'
  | 'RAW'
  | 'PATINA'
  | 'CUSTOM';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  categoryId: string;
  material: string | null;
  finish: string | null;
  color: string | null;
  dimensions: string | null;
  usage: string | null;
  productionTime: string | null;
  stock: number;
  lowStockThreshold: number;
  isCustomizable: boolean;
  requiresQuote: boolean;
  status: ProductStatus;
  featured: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  children?: Category[];
  products?: Product[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  isPrimary: boolean;
  createdAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  attributes: Record<string, unknown>;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
  isCustomizable: boolean;
  requiresQuote: boolean;
  metadata?: Record<string, unknown>;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string | null;
  email: string;
  phone: string | null;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: Record<string, unknown>;
  billingAddress: Record<string, unknown> | null;
  notes: string | null;
  paidAt: Date | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  payments: Payment[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  name: string;
  price: number;
  quantity: number;
  total: number;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface Payment {
  id: string;
  orderId: string;
  provider: string;
  providerId: string | null;
  method: PaymentMethod;
  amount: number;
  currency: string;
  status: string;
  reference: string | null;
  responseData: Record<string, unknown> | null;
  errorMessage: string | null;
  processedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  userId: string | null;
  email: string;
  phone: string | null;
  name: string;
  status: QuoteStatus;
  pieceType: PieceType;
  usage: string | null;
  dimensions: string | null;
  material: MaterialType | null;
  finish: FinishType | null;
  color: string | null;
  engravingText: string | null;
  logoUrl: string | null;
  spacePhotoUrl: string | null;
  referenceFileUrl: string | null;
  deliveryCity: string | null;
  estimatedBudget: number | null;
  description: string;
  adminNotes: string | null;
  quotedAmount: number | null;
  quotedAt: Date | null;
  expiresAt: Date | null;
  acceptedAt: Date | null;
  orderId: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: QuoteItem[];
}

export interface QuoteItem {
  id: string;
  quoteId: string;
  productId: string | null;
  name: string;
  description: string | null;
  quantity: number;
  unitPrice: number | null;
  totalPrice: number | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc: string | null;
  category: string;
  materials: string[];
  city: string | null;
  year: number;
  services: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  images: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  projectId: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  isCover: boolean;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  userId: string | null;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
  image: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  whatsappNumber: string;
  email: string;
  address: string | null;
  phone: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  maintenanceMode: boolean;
  maintenanceMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}