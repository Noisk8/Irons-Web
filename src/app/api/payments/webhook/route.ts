import { NextResponse } from 'next/server';
export async function POST(req:Request){const signature=req.headers.get('x-epayco-signature');if(process.env.EPAYCO_PRIVATE_KEY&&!signature)return NextResponse.json({error:'Firma requerida'},{status:401});return NextResponse.json({received:true,mock:!process.env.EPAYCO_PRIVATE_KEY});}
