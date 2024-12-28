import { NextResponse } from 'next/server';
import { generateOrderPDF } from '@/services/pdfGenerator';
import { sendOrderEmail } from '@/services/emailService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerInfo, cartData, packageGuestCounts } = body;

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    // Format cart data for PDF
    const packages = Array.isArray(cartData.cart.order)
      ? cartData.cart.order
      : Object.values(cartData.cart.order);

    // Add guest counts to packages
    const packagesWithGuestCounts = packages.map((pkg: any) => ({
      ...pkg,
      guestCount: packageGuestCounts?.[pkg.id] || null
    }));

    const orderData = {
      packages: packagesWithGuestCounts,
      totalPrice: cartData.totals[cartData.totals.length - 1].text,
      menu: cartData.cart.menu
    };

    // Generate PDF
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