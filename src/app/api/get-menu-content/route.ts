// src/app/api/get-menu-content/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const session = cookies().get("session")?.value;
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const menuId = body.menu;

    if (!menuId) {
        return NextResponse.json({ error: "Menu ID is required" }, { status: 400 });
    }
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/getMenuContent&api_token=${session}`,
            { menu: menuId },
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Get menu content error:", error);
        return NextResponse.json(
            { error: "Failed to fetch menu content" },
            { status: 500 }
        );
    }
}