export type PaymentRequest = { orderId: string; amount: number; currency: 'COP' };
export interface PaymentProvider { create(request: PaymentRequest): Promise<{ reference: string; status: 'PAYMENT_INITIATED'; checkoutUrl?: string }>; verify(reference: string): Promise<{ status: string }> }
export class MockEpaycoProvider implements PaymentProvider {
  async create(request: PaymentRequest) { return { reference:`MOCK-${request.orderId}-${Date.now()}`, status:'PAYMENT_INITIATED' as const, checkoutUrl:'/pago/pendiente' }; }
  async verify(reference:string){ return {status:reference.startsWith('MOCK-')?'PENDING':'UNKNOWN'}; }
}
export const paymentProvider:PaymentProvider=new MockEpaycoProvider();
