import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const { product_id } = await req.json();
        const session = cookies().get('session')?.value;

        if (!session) {
            return NextResponse.json(
                { error: "Session expired" },
                { status: 401 }
            );
        }

        const formData = new URLSearchParams();
        formData.append('product_id', product_id.toString());

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/addExtra&api_token=${session}`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error in addExtra:', error.response || error);
        return NextResponse.json(
            { 
                error: error.response?.data?.message || error.message || "An unknown error occurred",
                details: error.response?.data || error.message
            },
            { status: error.response?.status || 500 }
        );
    }
} 