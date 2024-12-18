import { NextResponse } from 'next/server';
import { generateOrderPDF } from '@/services/pdfGenerator';
import { sendOrderEmail } from '@/services/emailService';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { customerInfo, cartData } = data;

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    // Format cart data for PDF
    const packages = Array.isArray(cartData.cart.order)
      ? cartData.cart.order
      : Object.values(cartData.cart.order);

    const orderData = {
      packages,
      totalPrice: cartData.totals[cartData.totals.length - 1].text,
      menu: cartData.cart.menu 
    };

    // console.log('Formatted order data:', orderData); 


    const doc = await generateOrderPDF({
      orderData,
      customerInfo,
      orderNumber
    });

    const pdfBuffer = Buffer.from(await doc.output('arraybuffer'));

    // Send emails
    await sendOrderEmail({
      pdfBuffer,
      customerInfo,
      orderNumber
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Order processed successfully',
      orderNumber 
    });
  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing order', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 