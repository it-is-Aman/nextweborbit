import { prisma } from '@/backend/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { subDays, format } from 'date-fns';
import { TrafficChart } from './charts-client';

export async function AnalyticsCharts() {
    // 1. Fetch data for the last 7 days
    const sevenDaysAgo = subDays(new Date(), 7);

    const recentViews = await prisma.pageView.findMany({
        where: {
            createdAt: { gte: sevenDaysAgo }
        },
        select: {
            createdAt: true,
            ipHash: true
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

    recentViews.forEach(view => {
        const key = format(new Date(view.createdAt), 'EEE');
        if (chartDataMap.has(key)) {
            const entry = chartDataMap.get(key);
            entry.views += 1;
            if (view.ipHash) entry.visits.add(view.ipHash);
        }
    });

    const visitData = Array.from(chartDataMap.values()).map(entry => ({
        name: entry.name,
        views: entry.views,
        visits: entry.visits.size
    }));

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-full lg:col-span-4 rounded-xl shadow-sm">
                <CardHeader>
                    <CardTitle>Website Traffic (Last 7 Days)</CardTitle>
                    <CardDescription>
                        Live data showing page views and unique visitors.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[350px] w-full">
                        <TrafficChart data={visitData} />
                    </div>
                </CardContent>
            </Card>

            {/* Future expansion: SEO/Sources card */}
            <Card className="col-span-full lg:col-span-3 rounded-xl shadow-sm">
                <CardHeader>
                    <CardTitle>SEO & Sources</CardTitle>
                    <CardDescription>Traffic analysis coming soon.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                        Collecting data...
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
