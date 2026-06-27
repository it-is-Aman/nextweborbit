
import { NextResponse } from 'next/server';
import { auth } from '@/auth';



export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ------------------------------------------------------------------
    // AUTO-SWITCH: REAL DATA ONLY
    // ------------------------------------------------------------------

    const hasCredentials = process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY;

    if (hasCredentials) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const { google } = require('googleapis');

            // Auth with Service Account
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
            });

            const searchconsole = google.webmasters({ version: 'v3', auth });

            // Fetch Data
            // Note: siteUrl must match exactly what is in GSC (sc-domain:yourdomain.com or https://...)
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextweborbit.in';

            const res = await searchconsole.searchanalytics.query({
                siteUrl: siteUrl,
                requestBody: {
                    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
                    endDate: new Date().toISOString().split('T')[0],
                    dimensions: ['query'],
                    rowLimit: 10,
                },
            });

            return NextResponse.json(res.data);

        } catch (error) {
            console.error("Google API Error:", error);
            // In strict mode, we return the error to the frontend
            return NextResponse.json({ error: "Failed to fetch real Google data. Check server logs." }, { status: 500 });
        }
    }

    // Default: Return Error (Strict Mode)
    return NextResponse.json(
        { error: 'No SEO Data Available. Live data requires GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY.' },
        { status: 404 }
    );
}
