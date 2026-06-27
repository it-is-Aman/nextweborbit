'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { api } from '@/frontend/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminModal } from '@/components/admin/admin-modal';
import { useToast } from "@/components/ui/toast"
import { TeamMember, TeamResponse } from '@/types/api';
import Image from 'next/image';

export function TeamManager() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { addToast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        image: '',
        order: 0
    });

    const fetchMembers = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await api.get<{ success: boolean; data: TeamResponse }>('/api/team');
            if (response.success && response.data) {
                setMembers(response.data.members);
            }
        } catch (error) {
            console.error('Failed to fetch team:', error);
            addToast({ title: "Error", description: "Failed to load team members", variant: "error" });
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    const handleOpenModal = (member?: TeamMember) => {
        if (member) {
            setEditingMember(member);
            setFormData({
                name: member.name,
                role: member.role,
                bio: member.bio,
                image: member.image,
                order: 0
            });
        } else {
            setEditingMember(null);
            setFormData({
                name: '',
                role: '',
                bio: '',
                image: '',
                order: members.length + 1
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (editingMember) {
                // Update
                const response = await api.put<{ success: boolean }>(`/api/team/${editingMember.id}`, formData);
                if (response.success) {
                    addToast({ title: "Success", description: "Team member updated successfully", variant: "success" });
                    fetchMembers();
                    setIsModalOpen(false);
                }
            } else {
                // Create
                const response = await api.post<{ success: boolean }>('/api/team', formData);
                if (response.success) {
                    addToast({ title: "Success", description: "Team member created successfully", variant: "success" });
                    fetchMembers();
                    setIsModalOpen(false);
                }
            }
        } catch (error) {
            console.error('Failed to save team member:', error);
            const message = error instanceof Error ? error.message : "Failed to save team member";
            addToast({ title: "Error", description: message, variant: "error", duration: 5000 });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this member?')) return;

        try {
            const response = await api.delete<{ success: boolean }>(`/api/team/${id}`);
            if (response.success) {
                addToast({ title: "Success", description: "Team member deleted successfully", variant: "success" });
                fetchMembers();
            }
        } catch (error) {
            console.error('Failed to delete team member:', error);
            addToast({ title: "Error", description: "Failed to delete team member", variant: "error" });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">The Squad</h2>
                    <p className="text-muted-foreground">Manage your team members.</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {members.map((member) => (
                        <div key={member.id} className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 bg-black/20 backdrop-blur-sm rounded-lg">
                                    <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => handleOpenModal(member)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(member.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex-1 p-6">
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
                                <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. John Doe"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                            id="role"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="e.g. Senior Developer"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image">Profile Image</Label>
                        <div className="flex gap-2 mb-2">
                            <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        addToast({ title: "Uploading...", description: "Please wait", duration: 10000 });

                                        try {
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: formData
                                            });
                                            const data = await res.json();
                                            if (data.success && data.url) {
                                                setFormData(prev => ({ ...prev, image: data.url }));
                                                addToast({ title: "Success", description: "Image uploaded successfully", variant: "success" });
                                            } else {
                                                throw new Error(data.error || 'Upload failed');
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            addToast({ title: "Error", description: "Failed to upload image", variant: "error" });
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className="relative">
                            <Label htmlFor="image-url" className="text-xs text-muted-foreground">Or use URL</Label>
                            <Input
                                id="image-url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                                required
                            />
                        </div>
                        {formData.image && (
                            <div className="relative h-20 w-20 overflow-hidden rounded-md border mt-2">
                                <Image
                                    src={formData.image}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                    unoptimized={formData.image.startsWith('/uploads')} // Local uploads might need unoptimized if next/image config is strict
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder="Short bio..."
                            className="min-h-[100px]"
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
