export const FREE_SHIPPING_FROM = 400000;
export function calculateShipping(subtotal: number) { return subtotal >= FREE_SHIPPING_FROM ? 0 : 25000; }
export function calculateLineTotal(price: number, quantity: number) { if(price < 0 || quantity < 1) throw new Error('Valores inválidos'); return price * quantity; }
