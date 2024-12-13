import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface ApiResponse {
    products: Array<{
        product_id: string;
        thumb: string;
        name: string;
        description?: string;
        price: string;
        special?: boolean;
        tax?: string;
        minimum?: string;
        rating?: string;
        href: string;
    }>;
    success: boolean;
    message?: string;
}

export async function POST(req: Request): Promise<NextResponse> {
    const session = cookies().get('session')?.value;
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const categoryId = body.categoryId;
       

        const url = new URL(process.env.NEXT_PUBLIC_API_ENDPOINT || '');
        url.searchParams.set('route', 'api/sale/productsByCategory');
        url.searchParams.set('api_token', session);

        const formData = new URLSearchParams();
        formData.append('category_id', String(categoryId));

        const response = await fetch(url.toString(), {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('API request error:', errorMessage);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch products by category' },
            { status: 500 }
        );
    }
}
