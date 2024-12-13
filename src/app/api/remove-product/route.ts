import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const session = cookies().get("session")?.value;

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, quantity } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        const formData = new URLSearchParams();
        formData.append("key", id);
        formData.append("quantity", quantity ? quantity.toString() : "0");

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/cart.remove&api_token=${session}`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log("Remove product response:", response.data);
        return NextResponse.json(response.data, { status: 200 });

    } catch (error) {
        console.error("Remove product error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
