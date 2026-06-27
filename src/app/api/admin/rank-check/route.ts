
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { keyword } = await req.json();

    // -------------------------------------------------------------
    // REAL DATA ONLY
    // -------------------------------------------------------------
    const SERP_API_KEY = process.env.SERP_API_KEY;

    if (SERP_API_KEY) {
        try {
            // Check Live Google Rank using SerpApi
            const url = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&hl=en&gl=us&api_key=${SERP_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            // 1. Define your domain (You can also fetch this from env or config)
            const MY_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "nextweborbit.in";

            // 2. Find rank in organic results
            let rank = null;
            if (data.organic_results) {
                const foundItem = data.organic_results.find((item: { link?: string; position?: number }) =>
                    item.link && item.link.includes(MY_DOMAIN)
                );
                if (foundItem) {
                    rank = foundItem.position;
                }
            }

            return NextResponse.json({
                rank: rank,
                score: rank ? 85 : 40, // Simple logic: Good if ranked, bad if not
                issues: [
                    { type: rank ? 'success' : 'warning', message: rank ? `Ranked #${rank} on Google` : 'Not found in top 100 organic results.' }
                ]
            });

        } catch (e) {
            console.error("SerpApi Error:", e);
            return NextResponse.json({
                rank: null,
                score: 0,
                issues: [{ type: 'error', message: 'Error connecting to Rank API.' }]
            });
        }
    }

    // -------------------------------------------------------------
    // STRICT MODE: NO MOCK DATA
    // -------------------------------------------------------------
    return NextResponse.json({
        rank: null,
        score: 0,
        issues: [
            { type: 'error', message: 'Live data only. Please configure SERP_API_KEY in .env.' }
        ]
    });
}
