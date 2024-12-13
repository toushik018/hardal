import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const cookieStore = cookies();
        const session = cookieStore.get('session')?.value;

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/view`,
            {},
            {
                headers: { "Content-Type": "multipart/form-data" },
                params: { api_token: session },
            }
        );

        // Ensure we're returning the full cart data
        return NextResponse.json(response.data, { status: 200 });
    } catch (error: unknown) {
        console.error("Get Cart Error:", error);
        return NextResponse.json(
            {
                expired: true,
                message: error instanceof Error ? error.message : "An unknown error occurred",
            },
            { status: 500 }
        );
    }
}
