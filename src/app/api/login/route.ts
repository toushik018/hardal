import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" }, 
                { status: 400 }
            );
        }

        const formData = new URLSearchParams();
        formData.append("email", email);
        formData.append("password", password);

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/login`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        // Set session cookie if login successful
        const res = NextResponse.json(response.data);
        
        if (response.data.success) {
            res.cookies.set({
                name: 'session',
                value: response.data.api_token,
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
            });
        }

        return res;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
} 