import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    const cookieStore = cookies();
    const session = cookieStore.get('session')?.value;
    if (session) {
        const formData = new FormData();
        formData.append("currency", "EUR");

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/localisation/currency`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    params: { api_token: session },
                }
            );
            return NextResponse.json(response.data);
        } catch (error: any) {
            return NextResponse.json({ expired: true, error: error.message }, { status: 403 });
        }
    } else {
        return NextResponse.json({ expired: true, error: "session expired" }, { status: 400 });
    }
}