import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest): Promise<NextResponse> {
    const cookieStore = cookies();
    const session = cookieStore.get('session')?.value;
    const ip = req.headers.get('x-real-ip') || '127.0.0.1';
    const oldIP = cookieStore.get('ClientIP')?.value;

    // Set the ClientIP cookie
    const res = new NextResponse();
    res.cookies.set('ClientIP', ip, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
    });

    // If we have a session and IP matches, verify token validity
    if (session && oldIP && oldIP === ip) {
        try {
            // Test the token with a simple API call
            const testResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sale/view`,
                {},
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    params: { api_token: session },
                }
            );
            // Valid response will have totals array and other cart properties
            if (testResponse.data && testResponse.data.totals) {
                return NextResponse.json({
                    sessionData: { success: true, api_token: session },
                    clientIP: ip,
                });
            }

            // If we don't get expected cart data structure, token is likely invalid
            res.cookies.delete('session');
            res.cookies.delete('ClientIP');
        } catch (error) {
            // If verification fails, delete cookies
            res.cookies.delete('session');
            res.cookies.delete('ClientIP');
        }
    }

    // Get new session if no session exists or if it was invalid
    try {
        const formData = new URLSearchParams();
        formData.append('username', process.env.NEXT_PUBLIC_API_USERNAME || '');
        formData.append('key', process.env.NEXT_PUBLIC_API_KEY || '');

        const response: AxiosResponse<{ api_token: string }> = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/account/login`,
            formData,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        const newRes = NextResponse.json({
            sessionData: response.data,
            clientIP: ip,
        });

        // Set both session and IP cookies
        newRes.cookies.set({
            name: 'session',
            value: response.data.api_token,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
        });

        newRes.cookies.set({
            name: 'ClientIP',
            value: ip,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
        });

        return newRes;
    } catch (error: any) {
        const errorRes = NextResponse.json(
            { expired: true, error: error.message },
            { status: 403 }
        );
        errorRes.cookies.delete('session');
        errorRes.cookies.delete('ClientIP');
        return errorRes;
    }
}