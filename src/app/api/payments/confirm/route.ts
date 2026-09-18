import { NextResponse } from 'next/server'; import { paymentProvider } from '@/lib/payments';
export async function POST(req:Request){const {reference}=await req.json();if(typeof reference!=='string')return NextResponse.json({error:'Referencia requerida'},{status:400});return NextResponse.json(await paymentProvider.verify(reference));}
