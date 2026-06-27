'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Loader2, Link as LinkIcon, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminModal } from '@/components/admin/admin-modal';
import { useToast } from "@/components/ui/toast"
import { PortfolioItem } from '@/types/api';
import Image from 'next/image';


export function PortfolioManager() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { addToast } = useToast();

    const CATEGORIES = ['Our Product', 'Website', 'Application'] as const;

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        type: 'Our Product' as typeof CATEGORIES[number],
        description: '',
        // preview: '', // Legacy header removed
        imageUrl: '',
        projectLink: '',
        order: 0
    });

    const fetchItems = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/portfolio?showHidden=true', { cache: 'no-store' });
            const data = await response.json();
            if (data.success && data.data) {
                setItems(data.data.items);
            }
        } catch (error) {
            console.error('Failed to fetch portfolio:', error);
            addToast({ title: "Error", description: "Failed to load portfolio items", variant: "error" });
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleOpenModal = (item?: PortfolioItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                category: item.category,
                type: item.type,
                description: item.description,
                // preview: item.preview,
                imageUrl: item.imageUrl || '',
                projectLink: item.projectLink || '',
                order: item.order
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                category: '',
                type: 'Our Product',
                description: '',
                // preview: '',
                imageUrl: '',
                projectLink: '',
                order: items.length + 1
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const url = editingItem ? `/api/portfolio/${editingItem.id}` : '/api/portfolio';
            const method = editingItem ? 'PUT' : 'POST';

            // Remove preview from payload if it exists in type but we are managing without it
            const payload = { ...formData, preview: '' };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                addToast({
                    title: "Success",
                    description: editingItem ? "Portfolio item updated" : "Portfolio item created",
                    variant: "success"
                });
                fetchItems();
                setIsModalOpen(false);
            } else {
                const details = data.details ? `:\n${data.details.join('\n')}` : '';
                throw new Error((data.error || 'Failed to save') + details);
            }
        } catch (error) {
            console.error('Failed to save portfolio item:', error);
            const message = error instanceof Error ? error.message : "Failed to save portfolio item";
            addToast({ title: "Error", description: message, variant: "error", duration: 5000 });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this portfolio item?')) return;

        try {
            const response = await fetch(`/api/portfolio/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();

            if (data.success) {
                addToast({ title: "Success", description: "Portfolio item deleted", variant: "success" });
                fetchItems();
            }
        } catch (error) {
            console.error('Failed to delete portfolio item:', error);
            addToast({ title: "Error", description: "Failed to delete portfolio item", variant: "error" });
        }
    };

    const handleToggleActive = async (item: PortfolioItem) => {
        try {
            const response = await fetch(`/api/portfolio/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...item, isActive: !item.isActive })
            });
            const data = await response.json();

            if (data.success) {
                addToast({
                    title: "Success",
                    description: `Portfolio item ${!item.isActive ? 'activated' : 'deactivated'}`,
                    variant: "success"
                });
                fetchItems();
            }
        } catch (error) {
            console.error('Failed to toggle portfolio item:', error);
            addToast({ title: "Error", description: "Failed to update portfolio item", variant: "error" });
        }
    };

    const isVideo = (url: string) => {
        if (!url) return false;
        return url.match(/\.(mp4|webm|ogg)$/i);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Portfolio</h2>
                    <p className="text-muted-foreground">Manage your portfolio items.</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Portfolio Item
                </Button>
            </div>

            {isLoading ? (
                <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <div key={item.id} className={`group relative flex flex-col rounded-xl border bg-card shadow-sm transition-all hover:shadow-md ${!item.isActive ? 'opacity-75 grayscale' : ''}`}>
                            <div className="relative h-48 w-full overflow-hidden bg-gray-100 rounded-t-xl">
                                {item.imageUrl && isVideo(item.imageUrl) ? (
                                    <video
                                        src={item.imageUrl}
                                        className="h-full w-full object-cover"
                                        muted
                                        loop
                                        playsInline
                                        onMouseOver={e => e.currentTarget.play()}
                                        onMouseOut={e => e.currentTarget.pause()}
                                    />
                                ) : item.imageUrl ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105 z-1 bg-gray-100"
                                    />
                                ) : (
                                    <div className="flex z-0 h-full w-full items-center justify-center bg-gray-50 text-muted-foreground">
                                        <LinkIcon className="h-8 w-8 opacity-20" />
                                    </div>
                                )}

                                <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium z-10">
                                    {item.type}
                                </div>
                                <div className="absolute top-2 right-2 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 bg-black/20 backdrop-blur-sm rounded-lg z-10">
                                    <Button
                                        variant={item.isActive ? "secondary" : "default"}
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleToggleActive(item)}
                                        title={item.isActive ? 'Hide (Deactivate)' : 'Show (Activate)'}
                                    >
                                        {item.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                    <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => handleOpenModal(item)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex-1 p-4">
                                <div className="text-xs text-muted-foreground mb-1">{item.category}</div>
                                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
            >
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Project Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. E-commerce Platform"
                            required
                        />
                    </div>

                    {/* Category and Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Input
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g. Apps Business"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Type *</Label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as typeof CATEGORIES[number] })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                required
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Project Media */}
                    <div className="space-y-2">
                        <Label htmlFor="image-upload">Project Media (Image / Video / GIF)</Label>
                        <div className="flex flex-col gap-3">
                            <Input
                                id="image-upload"
                                type="file"
                                accept="image/*,video/mp4,video/webm"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        // Small client-side size check (e.g., 50MB) to "load na pade"
                                        if (file.size > 50 * 1024 * 1024) {
                                            addToast({ title: "Error", description: "File too large (max 50MB)", variant: "error" });
                                            return;
                                        }

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
                                                setFormData(prev => ({ ...prev, imageUrl: data.url }));
                                                addToast({ title: "Success", description: "Media uploaded successfully", variant: "success" });
                                            } else {
                                                throw new Error(data.error || 'Upload failed');
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            addToast({ title: "Error", description: "Failed to upload media", variant: "error" });
                                        }
                                    }
                                }}
                            />
                            <div className="relative">
                                <Label htmlFor="image-url" className="text-xs text-muted-foreground mb-1 block">Or use URL</Label>
                                <Input
                                    id="image-url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {formData.imageUrl && (
                            <div className="relative h-48 w-full overflow-hidden rounded-md border bg-gray-50 mt-4">
                                {isVideo(formData.imageUrl) ? (
                                    <video
                                        src={formData.imageUrl}
                                        className="h-full w-full object-contain bg-black"
                                        controls
                                    />
                                ) : (
                                    <Image
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        fill
                                        className="object-contain"
                                        unoptimized={formData.imageUrl.startsWith('/uploads')}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Project Link */}
                    <div className="space-y-2">
                        <Label htmlFor="projectLink">Project Link *</Label>
                        <Input
                            id="projectLink"
                            value={formData.projectLink}
                            onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })}
                            placeholder="https://example.com"
                            type="url"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the project..."
                            className="min-h-[100px] resize-none"
                            required
                        />
                    </div>

                    {/* Display Order */}
                    <div className="space-y-2">
                        <Label htmlFor="order">Display Order</Label>
                        <Input
                            id="order"
                            type="number"
                            min="0"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: Math.max(0, parseInt(e.target.value) || 0) })}
                            placeholder="0"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-background z-10 pb-2">
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
