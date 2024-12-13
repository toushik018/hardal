import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        // Get the session token from cookies
        const session = cookies().get("session")?.value;

        // If no session token, return an unauthorized response
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse the request body to get the productId
        const { productId } = await req.json();



        // If no productId provided, return a bad request response
        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        // Prepare form data for the POST request
        const formData = new URLSearchParams();
        formData.append("api_token", session);
        formData.append("product_id", String(productId));

        // Make the POST request to your external API
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/productById&api_token=${session}`,
            formData,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );


        // If the request is successful, return the data
        return NextResponse.json(response.data, { status: 200 });

    } catch (err: unknown) {
        // Log the error and return an internal server error response
        console.error("Product NOT FOUND !!", err);
        return NextResponse.json(
            {
                error: err instanceof Error ? err.message : "An unknown error occurred",
            },
            { status: 500 }
        );
    }
}
