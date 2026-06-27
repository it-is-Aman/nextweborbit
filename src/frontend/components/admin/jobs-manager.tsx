'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Loader2, MapPin, Clock } from 'lucide-react';
import { api } from '@/frontend/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminModal } from '@/components/admin/admin-modal';
import { useToast } from "@/components/ui/toast"
import { JobData, JobsResponse } from '@/types/api';

export function JobsManager() {
    const [jobs, setJobs] = useState<JobData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<JobData | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { addToast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        employmentTypes: [] as string[],
        googleFormUrl: ''
    });

    const fetchJobs = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await api.get<{ success: boolean; data: JobsResponse }>('/api/jobs');
            if (response.success && response.data) {
                setJobs(response.data.jobs);
            }
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            addToast({ title: "Error", description: "Failed to load jobs", variant: "error" });
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const handleOpenModal = (job?: JobData) => {
        if (job) {
            setEditingJob(job);
            setFormData({
                title: job.title,
                description: job.description,
                location: job.location || '',
                employmentTypes: job.employmentTypes ? job.employmentTypes.split(',').map(t => t.trim()) : [],
                googleFormUrl: job.googleFormUrl || ''
            });
        } else {
            setEditingJob(null);
            setFormData({
                title: '',
                description: '',
                location: '',
                employmentTypes: [],
                googleFormUrl: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const dataToSend = {
                ...formData,
                employmentTypes: formData.employmentTypes.join(', ')
            };
            if (editingJob) {
                // Update
                const response = await api.put<{ success: boolean }>(`/api/jobs/${editingJob.id}`, dataToSend);
                if (response.success) {
                    addToast({ title: "Success", description: "Job updated successfully", variant: "success" });
                    fetchJobs();
                    setIsModalOpen(false);
                }
            } else {
                // Create
                const response = await api.post<{ success: boolean }>('/api/jobs', dataToSend);
                if (response.success) {
                    addToast({ title: "Success", description: "Job created successfully", variant: "success" });
                    fetchJobs();
                    setIsModalOpen(false);
                }
            }
        } catch (error) {
            console.error('Failed to save job:', error);
            const message = error instanceof Error ? error.message : "Failed to save job";
            addToast({ title: "Error", description: message, variant: "error", duration: 5000 });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this job?')) return;

        try {
            const response = await api.delete<{ success: boolean }>(`/api/jobs/${id}`);
            if (response.success) {
                addToast({ title: "Success", description: "Job deleted successfully", variant: "success" });
                fetchJobs();
            }
        } catch (error) {
            console.error('Failed to delete job:', error);
            addToast({ title: "Error", description: "Failed to delete job", variant: "error" });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Job Listings</h2>
                    <p className="text-muted-foreground">Manage your open positions.</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Job
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <div key={job.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold">{job.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {job.location || 'Location not specified'}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <div className="flex flex-wrap gap-1">
                                            {job.employmentTypes.split(',').map((type, idx) => (
                                                <span key={idx} className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-primary/20 bg-primary/10 text-primary">
                                                    {type.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenModal(job)}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(job.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingJob ? 'Edit Job' : 'Add Job'}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Senior Developer"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Employment Type (Select all that apply)</Label>
                        <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg">
                            {['Full-time', 'Part-time', 'Internship', 'Remote', 'On-site', 'Hybrid'].map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={type}
                                        checked={formData.employmentTypes.includes(type)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFormData({ ...formData, employmentTypes: [...formData.employmentTypes, type] });
                                            } else {
                                                setFormData({ ...formData, employmentTypes: formData.employmentTypes.filter(t => t !== type) });
                                            }
                                        }}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <Label htmlFor={type} className="font-normal cursor-pointer">{type}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. New York, NY"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="url">Google Form URL</Label>
                        <Input
                            id="url"
                            value={formData.googleFormUrl}
                            onChange={(e) => setFormData({ ...formData, googleFormUrl: e.target.value })}
                            placeholder="e.g. https://forms.gle/..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Job description..."
                            className="min-h-[150px]"
                            required
                        />
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
