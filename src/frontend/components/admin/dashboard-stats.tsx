import { prisma } from '@/backend/lib/prisma';
import { Users, Briefcase, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardStats() {
    const [
        jobsCount,
        subscriberCount,
        contactCount,
        totalVisitsCount
    ] = await Promise.all([
        prisma.job.count(),
        prisma.newsletterSubscriber.count(),
        prisma.contactSubmission.count(),
        prisma.pageView.count(),
    ]);

    const cards = [
        {
            title: 'Total Visits',
            value: totalVisitsCount.toLocaleString(),
            label: 'Visits',
            subtext: 'Total page views',
            icon: Users,
        },
        {
            title: 'Active Jobs',
            value: jobsCount,
            label: 'Positions',
            subtext: 'Open positions',
            icon: Briefcase,
        },
        {
            title: 'Subscribers',
            value: subscriberCount,
            label: 'Users',
            subtext: 'Active subscribers',
            icon: Mail,
        },
        {
            title: 'Consultations',
            value: contactCount,
            label: 'Leads',
            subtext: 'Messages received',
            icon: MessageSquare,
        },
    ];

    return (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Card key={card.title} className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between space-y-0 pb-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                    {card.title}
                                </p>
                                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Icon className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="flex items-baseline space-x-3">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                    {card.value}
                                </h2>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                {card.subtext}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
