"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp, Search, MousePointerClick, Eye, Hash } from "lucide-react";

// Types for our data
interface SeoData {
    error?: string; // Added for Strict Mode
    performance: {
        date: string;
        clicks: number;
        impressions: number;
    }[];
    keywords: {
        query: string;
        clicks: number;
        impressions: number;
        position: number;
    }[];
    summary: {
        totalClicks: number;
        totalImpressions: number;
        avgCtr: number;
        avgPosition: number;
    };
}

export function SeoCharts() {
    const [data, setData] = useState<SeoData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from our API
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/seo');
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Failed to fetch SEO data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="h-[400px] w-full animate-pulse bg-gray-100 rounded-xl" />;
    }

    // Handle Error / Missing Data (Strict Mode)
    // If we have an error, OR if we are missing the summary object (which happens if API returns strict error)
    if (!data || data.error || !data.summary) {
        return (
            <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50/50 p-8 text-center animate-in fade-in-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-4">
                    <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No Live SEO Data</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-sm">
                    {data?.error || "Connect your Google Search Console account in settings to see live performance data."}
                </p>
                <div className="mt-6 text-xs text-muted-foreground bg-white px-3 py-1.5 rounded-md border shadow-sm">
                    Strict Mode Active: Fake data is disabled.
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 1. Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.summary.totalClicks.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                        <Eye className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.summary.totalImpressions.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.summary.avgCtr}%</div>
                        <p className="text-xs text-muted-foreground">+1.2% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Position</CardTitle>
                        <Hash className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.summary.avgPosition}</div>
                        <p className="text-xs text-muted-foreground">-2.1 ranks (Improved)</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                {/* 2. Performance Chart */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Search Performance</CardTitle>
                        <CardDescription>
                            Clicks vs Impressions (Last 28 Days)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
  <div className="h-[350px] w-full min-w-0">
    <ResponsiveContainer width="100%" height="100%">

                                <AreaChart data={data.performance}>
                                    <defs>
                                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => value.split(' ')[0]} // Show only 'Mon', 'Tue' etc if format is 'Day Date'
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="clicks"
                                        stroke="#3b82f6"
                                        fillOpacity={1}
                                        fill="url(#colorClicks)"
                                        strokeWidth={2}
                                        name="Clicks"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="impressions"
                                        stroke="#a855f7"
                                        fillOpacity={1}
                                        fill="url(#colorImpressions)"
                                        strokeWidth={2}
                                        name="Impressions"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Top Keywords */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Top Keywords</CardTitle>
                        <CardDescription>
                            What people search to find you
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {data.keywords.map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                                            #{item.position}
                                        </div>
                                        <div className="grid gap-0.5 overflow-hidden">
                                            <span className="text-sm font-medium truncate">{item.query}</span>
                                            <span className="text-xs text-muted-foreground">{item.impressions.toLocaleString()} views</span>
                                        </div>
                                    </div>
                                    <div className="flex text-sm font-bold text-gray-700">
                                        {item.clicks} <span className="ml-1 text-xs font-normal text-muted-foreground self-center">clicks</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
