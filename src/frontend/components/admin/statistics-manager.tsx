'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Loader2, Users, Briefcase, Clock, Award } from 'lucide-react';
import { api } from '@/frontend/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminModal } from '@/components/admin/admin-modal';
import { useToast } from "@/components/ui/toast"
import { StatisticData } from '@/types/api';

// Icon options for selection
const ICON_OPTIONS = ['Users', 'Briefcase', 'Clock', 'Award'];

export function StatisticsManager() {
    const [stats, setStats] = useState<StatisticData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState<StatisticData | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { addToast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        key: '',
        value: '',
        label: '',
        icon: 'Users',
        order: 0
    });

    const fetchStats = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await api.get<{ success: boolean; data: { statistics: StatisticData[] } }>('/api/statistics');
            if (response.success && response.data) {
                setStats(response.data.statistics);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            addToast({ title: "Error", description: "Failed to load statistics", variant: "error" });
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handleOpenModal = (stat?: StatisticData) => {
        if (stat) {
            setEditingStat(stat);
            setFormData({
                key: stat.id, // ID is key in this case
                value: stat.value,
                label: stat.label,
                icon: stat.icon,
                order: 0 // Order not exposed in type yet, defaulting
            });
        } else {
            setEditingStat(null);
            setFormData({
                key: '',
                value: '',
                label: '',
                icon: 'Users',
                order: stats.length + 1
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (editingStat) {
                // Update
                const response = await api.put<{ success: boolean }>(`/api/statistics/${editingStat.id}`, formData);
                if (response.success) {
                    addToast({ title: "Success", description: "Statistic updated successfully", variant: "success" });
                    fetchStats();
                    setIsModalOpen(false);
                }
            } else {
                // Create
                const response = await api.post<{ success: boolean }>('/api/statistics', formData);
                if (response.success) {
                    addToast({ title: "Success", description: "Statistic created successfully", variant: "success" });
                    fetchStats();
                    setIsModalOpen(false);
                }
            }
        } catch (error) {
            console.error('Failed to save statistic:', error);
            const message = error instanceof Error ? error.message : "Failed to save statistic";
            addToast({ title: "Error", description: message, variant: "error", duration: 5000 });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this statistic?')) return;

        try {
            const response = await api.delete<{ success: boolean }>(`/api/statistics/${id}`);
            if (response.success) {
                addToast({ title: "Success", description: "Statistic deleted successfully", variant: "success" });
                fetchStats();
            }
        } catch (error) {
            console.error('Failed to delete statistic:', error);
            addToast({ title: "Error", description: "Failed to delete statistic", variant: "error" });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Statistics</h2>
                    <p className="text-muted-foreground">Manage your impact numbers.</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Statistic
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.id} className="relative flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                    {/* Dynamic Icon Rendering */}
                                    {stat.icon === 'Users' && <Users className="h-6 w-6" />}
                                    {stat.icon === 'Briefcase' && <Briefcase className="h-6 w-6" />}
                                    {stat.icon === 'Clock' && <Clock className="h-6 w-6" />}
                                    {stat.icon === 'Award' && <Award className="h-6 w-6" />}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenModal(stat)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(stat.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold">{stat.value}</h3>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <p className="mt-2 text-xs text-muted-foreground font-mono">Key: {stat.id}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingStat ? 'Edit Statistic' : 'Add Statistic'}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="key">Unique Key (ID)</Label>
                        <Input
                            id="key"
                            value={formData.key}
                            onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                            placeholder="e.g. clients"
                            disabled={!!editingStat} // Cannot edit key after creation
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="value">Value</Label>
                        <Input
                            id="value"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                            placeholder="e.g. 100+"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="label">Label</Label>
                        <Input
                            id="label"
                            value={formData.label}
                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                            placeholder="e.g. Happy Clients"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="icon">Icon</Label>
                        <div className="flex gap-2">
                            {ICON_OPTIONS.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, icon })}
                                    className={`flex h-10 w-10 items-center justify-center rounded-md border ${formData.icon === icon ? 'border-primary bg-primary/10 text-primary' : 'border-input hover:bg-accent'
                                        }`}
                                >
                                    {icon === 'Users' && <Users className="h-5 w-5" />}
                                    {icon === 'Briefcase' && <Briefcase className="h-5 w-5" />}
                                    {icon === 'Clock' && <Clock className="h-5 w-5" />}
                                    {icon === 'Award' && <Award className="h-5 w-5" />}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                    </div>
                </form>
            </AdminModal>
        </div>
    );
}
