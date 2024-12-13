import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const session = cookies().get("session")?.value;

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const {
            firstname,
            lastname,
            address_1,
            city,
            country_id,
            zone_id,
            shipping_address_id,
        } = await req.json();

        if (!firstname || !lastname || !address_1 || !city || !country_id || !zone_id) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const formData = new URLSearchParams();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("address_1", address_1);
        formData.append("city", city);
        formData.append("country_id", country_id);
        formData.append("zone_id", zone_id);
        formData.append("shipping_address_id", shipping_address_id);

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/shipping_address&api_token=${session}`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log("Set shipping address response:", response.data);
        return NextResponse.json(response.data, { status: 200 });

    } catch (error) {
        console.error("Set shipping address error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}