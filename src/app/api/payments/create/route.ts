import { NextResponse } from 'next/server'; import { z } from 'zod'; import { paymentProvider } from '@/lib/payments';
const schema=z.object({orderId:z.string().min(1),amount:z.number().positive(),currency:z.literal('COP')});
export async function POST(req:Request){try{return NextResponse.json({...await paymentProvider.create(schema.parse(await req.json())),mock:true},{status:201});}catch{return NextResponse.json({error:'Solicitud de pago inválida'},{status:400});}}
