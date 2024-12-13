import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function GET(req: NextRequest) {
    const session = cookies().get('session')?.value;
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const url = new URL(`${API_ENDPOINT}/sale/getCategories`);
        url.searchParams.set('api_token', session);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API request error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}