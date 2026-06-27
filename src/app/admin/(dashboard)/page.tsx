import DashboardStats from '@/components/admin/dashboard-stats';
import LatestMessagesClient from '@/components/admin/latest-messages-client';
import { AnalyticsCharts } from '@/components/admin/analytics-charts-server';
import { SeoCharts } from '@/components/admin/seo-charts';
import { RankChecker } from '@/components/admin/rank-checker';
import { NewsletterManager } from '@/components/admin/newsletter-manager';
import { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from '@/backend/lib/prisma';

export default async function Page() {
    // Fetch messages here to pass to client component
    const messages = await prisma.contactSubmission.findMany({
        take: 20, // Limit to recent 20 for now
        orderBy: { submittedAt: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics (Pro)</TabsTrigger>
                    <TabsTrigger value="seo">SEO Performance</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-4">
                    <Suspense fallback={<div>Loading stats...</div>}>
                        <DashboardStats />
                    </Suspense>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <div className="col-span-4">
                            <Suspense fallback={<div>Loading charts...</div>}>
                                <AnalyticsCharts />
                            </Suspense>
                        </div>
                        <div className="col-span-3">
                            <Suspense fallback={<div>Loading messages...</div>}>
                                <LatestMessagesClient initialMessages={messages} />
                            </Suspense>
                        </div>
                    </div>
                </TabsContent>

                {/* ANALYTICS TAB */}
                <TabsContent value="analytics" className="space-y-4">
                    <Suspense fallback={<div>Loading charts...</div>}>
                        {/* Reusing Charts for now, can perform deeper analysis here later */}
                        <AnalyticsCharts />
                    </Suspense>
                </TabsContent>

                {/* SEO TAB */}
                <TabsContent value="seo" className="space-y-4">
                    <Suspense fallback={<div>Loading SEO data...</div>}>
                        <SeoCharts />
                        <div className="mt-8">
                            <RankChecker />
                        </div>
                    </Suspense>
                </TabsContent>

                {/* REPORTS TAB */}
                <TabsContent value="reports" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <NewsletterManager />
                        {/* Future report cards can go here */}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
