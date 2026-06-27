'use client';

import { useState } from 'react';
import { MessageSquare, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminModal } from '@/components/admin/admin-modal';
import { api } from '@/frontend/lib/api-client';
import { useToast } from "@/components/ui/toast";


import { ContactFormRequest } from '@/types/api'

interface ContactMessage {
    id: string
    firstName: string
    lastName: string | null
    email: string
    phone: string | null
    company: string | null
    service: string | null
    message: string
    status: string
    submittedAt: string | Date
    readAt: string | Date | null
}

export default function LatestMessages({ initialMessages }: { initialMessages: ContactMessage[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState(
        initialMessages.map(m => ({
            ...m,
            submittedAt: new Date(m.submittedAt)
        }))
    );
    const { addToast } = useToast();

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this consultation?')) return;

        try {
            const response = await api.delete<{ success: boolean }>(`/api/contact/${id}`);
            if (response.success) {
                setMessages(messages.filter(m => m.id !== id));
                addToast({ title: "Success", description: "Consultation deleted", variant: "success" });
            }
        } catch {
            addToast({ title: "Error", description: "Failed to delete consultation", variant: "error" });
        }
    };

    // Show only 2 initially as requested
    const displayedMessages = messages.slice(0, 2);

    return (
        <>
            <Card className="col-span-full rounded-xl shadow-sm h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Recent Consultations</CardTitle>
                        <CardDescription>
                            Latest messages from clients.
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                        View All ({messages.length}) <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {displayedMessages.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No messages yet.
                            </div>
                        ) : (
                            displayedMessages.map((message) => (
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
                                        {message.submittedAt.toISOString().split('T')[0]}
                                    </div>
                                </div>
                            ))
                        )}
                        {messages.length > 2 && (
                            <div className="pt-2 text-center">
                                <Button variant="ghost" size="sm" className="text-muted-foreground text-xs" onClick={() => setIsModalOpen(true)}>
                                    + {messages.length - 2} more messages
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="All Consultations"
            >
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className="flex flex-col gap-2 border-b pb-4 last:border-0"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                        <MessageSquare className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {message.firstName} {message.lastName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {message.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                        {message.submittedAt.toISOString().replace('T', ' ').split('.')[0]}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDelete(message.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                                {message.message}
                            </div>
                        </div>
                    ))}
                </div>
            </AdminModal>
        </>
    );
}
