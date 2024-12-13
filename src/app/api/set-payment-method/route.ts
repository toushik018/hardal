import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const session = cookies().get("session")?.value;

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { payment_method } = await req.json();

        if (!payment_method) {
            return NextResponse.json({ error: "Payment method is required" }, { status: 400 });
        }

        const formData = new URLSearchParams();
        formData.append("payment_method", payment_method);

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/payment_method.save&api_token=${session}`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log("Set payment method response:", response.data);
        return NextResponse.json(response.data, { status: 200 });

    } catch (error) {
        console.error("Set payment method error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
