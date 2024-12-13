import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const session = cookies().get("session")?.value;

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/addPackage&api_token=${session}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log("Add package response:", response.data);
        return NextResponse.json(response.data, { status: 200 });

    } catch (error) {
        console.error("Add package error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
} 