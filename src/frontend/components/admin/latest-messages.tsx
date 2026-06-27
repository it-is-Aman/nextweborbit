import { prisma } from '@/backend/lib/prisma';
import { MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default async function LatestMessages() {
    const latestMessages = await prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { submittedAt: 'desc' },
    });

    return (
        <Card className="col-span-full rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recent Consultations</CardTitle>
                    <CardDescription>
                        Latest messages from potential clients.
                    </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/messages">
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {latestMessages.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No messages yet.
                        </div>
                    ) : (
                        latestMessages.map((message) => (
                            <div
                                key={message.id}
                                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {message.firstName} {message.lastName}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {message.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {new Date(message.submittedAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
