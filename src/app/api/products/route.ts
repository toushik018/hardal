import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface ApiResponse {
    // Define your API response structure here
    data: any;
    success: boolean;
    message?: string;
}

export async function GET(): Promise<NextResponse> {
    const session = cookies().get('session')?.value;
    console.log(session);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(process.env.NEXT_PUBLIC_API_ENDPOINT || '');
    url.searchParams.set('route', 'api/sale/product');
    url.searchParams.set('api_token', session);

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API request error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}