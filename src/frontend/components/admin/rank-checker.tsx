"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, CheckCircle, AlertTriangle, XCircle, Trophy } from "lucide-react";

interface AuditResult {
    rank: number | null;
    score: number;
    issues: {
        type: 'error' | 'warning' | 'success';
        message: string;
    }[];
}

export function RankChecker() {
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);

    const handleCheck = async () => {
        if (!keyword) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch('/api/admin/rank-check', {
                method: 'POST',
                body: JSON.stringify({ keyword }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error("Rank check failed:", error);
        } finally {
            setLoading(false);
        }
    };

    // Helper for Score Color
    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-500 border-green-500";
        if (score >= 70) return "text-yellow-500 border-yellow-500";
        return "text-red-500 border-red-500";
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Input Section */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Live Rank & Audit</CardTitle>
                    <CardDescription>Check your current Google position and get optimization tips.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Input
                            placeholder="Enter keyword (e.g., 'best web dev agency')"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                        />
                        <Button onClick={handleCheck} disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Check Now
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <>
                    {/* Score & Rank */}
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Health</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-around items-center">
                            {/* Circular Score */}
                            <div className="relative flex items-center justify-center">
                                <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center ${getScoreColor(result.score)}`}>
                                    <span className="text-4xl font-bold">{result.score}</span>
                                </div>
                                <div className="absolute -bottom-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Score</div>
                            </div>

                            {/* Rank Display */}
                            <div className="text-center">
                                <div className="flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mx-auto mb-2">
                                    <Trophy className="h-8 w-8" />
                                </div>
                                <div className="text-3xl font-bold">
                                    {result.rank ? `#${result.rank}` : 'N/A'}
                                </div>
                                <div className="text-xs text-muted-foreground">Current Google Rank</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Suggestions List */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Optimization Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                                {result.issues.map((issue, i) => (
                                    <div key={i} className="flex gap-3 items-start border-b pb-3 last:border-0">
                                        {issue.type === 'error' && <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
                                        {issue.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />}
                                        {issue.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />}

                                        <div>
                                            <p className={`text-sm font-medium ${issue.type === 'error' ? 'text-red-600' :
                                                issue.type === 'warning' ? 'text-yellow-600' : 'text-gray-700'
                                                }`}>
                                                {issue.message}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
