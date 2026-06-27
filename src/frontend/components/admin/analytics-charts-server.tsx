import { prisma } from '@/backend/lib/prisma';
import { env } from '@/config/env';
import { TrafficChart } from '@/components/admin/charts-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { subDays, format } from 'date-fns';

export async function AnalyticsCharts() {
    // 1. Fetch data for the last 7 days
    const sevenDaysAgo = subDays(new Date(), 7);

    const recentViews = await prisma.pageView.findMany({
        where: {
            createdAt: { gte: sevenDaysAgo }
        },
        select: {
            createdAt: true,
            ipHash: true,
            referrer: true
        }
    });

    // Process for Chart 1: Visitors vs Views
    const chartDataMap = new Map();
    // Initialize last 7 days keys
    for (let i = 6; i >= 0; i--) {
        const d = subDays(new Date(), i);
        const key = format(d, 'EEE'); // Mon, Tue...
        chartDataMap.set(key, { name: key, visits: new Set(), views: 0 });
    }

    // Process for Chart 2: Top Sources (SEO) - Count Unique Visitors (ipHash) per source
    const sourcesMap = new Map<string, Set<string>>();

    recentViews.forEach(view => {
        // Chart 1: Views vs Visitors
        const key = format(new Date(view.createdAt), 'EEE');
        if (chartDataMap.has(key)) {
            const entry = chartDataMap.get(key);
            entry.views += 1;
            if (view.ipHash) entry.visits.add(view.ipHash);
        }

        // Chart 2: Sources logic
        let source = 'Direct / Unknown';
        if (view.referrer) {
            try {
                const url = new URL(view.referrer);
                const hostname = url.hostname.replace('www.', '');

                // Ignore internal navigation (don't count our own domain as a source)
                const isInternal = hostname === 'localhost' ||
                    hostname === env.appUrl.replace('https://', '').replace('http://', '').split('/')[0];

                if (!isInternal) {
                    if (hostname.includes('google')) source = 'Google';
                    else if (hostname.includes('bing')) source = 'Bing';
                    else if (hostname.includes('yahoo')) source = 'Yahoo';
                    else if (hostname.includes('facebook') || hostname.includes('t.co') || hostname.includes('linkedin')) source = 'Social Media';
                    else source = hostname;
                }
            } catch {
                source = 'Other';
            }
        }

        if (!sourcesMap.has(source)) {
            sourcesMap.set(source, new Set());
        }
        if (view.ipHash) {
            sourcesMap.get(source)!.add(view.ipHash);
        }
    });

    const visitData = Array.from(chartDataMap.values()).map(entry => ({
        name: entry.name,
        views: entry.views,
        visits: entry.visits.size
    }));

    const totalUniqueVisitors = new Set(recentViews.map(v => v.ipHash)).size;

    const sourceData = Array.from(sourcesMap.entries())
        .map(([name, visits]) => ({ name, value: visits.size }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 rounded-xl shadow-sm">
                <CardHeader>
                    <CardTitle>Website Traffic</CardTitle>
                    <CardDescription>Daily visitors vs page views (Last 7 Days)</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[350px] w-full">
                        <TrafficChart data={visitData} />
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-3 rounded-xl shadow-sm">
                <CardHeader>
                    <CardTitle>Top Traffic Sources</CardTitle>
                    <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {sourceData.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-10">No data available yet</p>
                        ) : (
                            sourceData.map((source) => (
                                <div key={source.name} className="flex items-center">
                                    <div className="w-full flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">{source.name}</span>
                                            <span className="text-sm text-muted-foreground">{source.value}</span>
                                        </div>
                                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${(source.value / totalUniqueVisitors) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
