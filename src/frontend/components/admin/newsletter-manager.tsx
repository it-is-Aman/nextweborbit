'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar, Trash2, Loader2 } from 'lucide-react';
import { api } from '@/frontend/lib/api-client';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Subscriber {
    id: string;
    email: string;
    subscribedAt: string;
    isActive: boolean;
}

export function NewsletterManager() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            setIsLoading(true);
            const response = await api.get<{ success: boolean; data: Subscriber[] }>('/api/newsletter/subscribers');
            if (response.success && response.data) {
                setSubscribers(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch subscribers:', error);
            // Silent error or toast?
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnsubscribe = async (id: string) => {
        if (!confirm('Are you sure you want to remove this subscriber?')) return;
        try {
            const response = await api.delete<{ success: boolean }>(`/api/newsletter/subscribers/${id}`);
            if (response.success) {
                addToast({ title: "Success", description: "Subscriber removed", variant: "success" });
                fetchSubscribers();
            }
        } catch {
            addToast({ title: "Error", description: "Failed to remove subscriber", variant: "error" });
        }
    }

    return (
        <Card className="rounded-xl shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" /> Newsletter Subscribers
                </CardTitle>
                <CardDescription>
                    Manage your email list ({subscribers.length} active subscribers)
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : subscribers.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground">
                        No subscribers yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {subscribers.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-gray-900">{sub.email}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(sub.subscribedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleUnsubscribe(sub.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
