import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string, currency = 'COP'): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}

export function formatDate(date: Date | string, locale = 'es-CO'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `IRN-${year}${month}${day}-${random}`;
}

export function generateQuoteNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `COT-${year}${month}-${random}`;
}

export function getWhatsAppUrl(message?: string): string {
  const number = process.env.WHATSAPP_NUMBER || '573000000000';
  const text = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${number}${text ? `?text=${text}` : ''}`;
}

export function getProductStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    ACTIVE: 'Disponible',
    DRAFT: 'Borrador',
    ARCHIVED: 'Archivado',
    OUT_OF_STOCK: 'Agotado',
    MADE_TO_ORDER: 'Hecho bajo pedido',
    REQUIRES_QUOTE: 'Requiere cotización',
  };
  return labels[status] || status;
}

export function getProductStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    DRAFT: 'bg-gray-100 text-gray-800',
    ARCHIVED: 'bg-gray-100 text-gray-600',
    OUT_OF_STOCK: 'bg-red-100 text-red-800',
    MADE_TO_ORDER: 'bg-blue-100 text-blue-800',
    REQUIRES_QUOTE: 'bg-amber-100 text-amber-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: 'Pendiente',
    PAYMENT_INITIATED: 'Pago iniciado',
    APPROVED: 'Aprobado',
    REJECTED: 'Rechazado',
    CANCELLED: 'Cancelado',
    FAILED: 'Fallido',
    REFUNDED: 'Reembolsado',
    PROCESSING: 'En proceso',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregado',
    COMPLETED: 'Completado',
  };
  return labels[status] || status;
}

export function getQuoteStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: 'Pendiente',
    IN_REVIEW: 'En revisión',
    QUOTED: 'Cotizado',
    ACCEPTED: 'Aceptado',
    REJECTED: 'Rechazado',
    EXPIRED: 'Expirado',
    CONVERTED_TO_ORDER: 'Convertido a pedido',
  };
  return labels[status] || status;
}