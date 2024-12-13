import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const session = cookies().get('session')?.value;
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id, quantity } = await req.json();

        const url = new URL(process.env.NEXT_PUBLIC_API_ENDPOINT || '');
        url.searchParams.set('route', 'api/sale/cart.add');
        url.searchParams.set('api_token', session);

        const formData = new URLSearchParams();
        formData.append('product_id', id);
        formData.append('quantity', quantity.toString());

        const response = await fetch(url.toString(), {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Add main product error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
