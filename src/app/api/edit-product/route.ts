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

        if (!id || quantity === undefined) {
            return NextResponse.json({ error: "Product ID and quantity are required" }, { status: 400 });
        }

        const formData = new URLSearchParams();
        formData.append("key", id);
        formData.append("quantity", quantity.toString());

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/cart.edit&api_token=${session}`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log("Edit product response:", response.data);
        return NextResponse.json(response.data, { status: 200 });

    } catch (error) {
        console.error("Edit product error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
