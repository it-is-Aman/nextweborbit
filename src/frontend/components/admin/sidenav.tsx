'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    BarChart3,
    LogOut,
    Menu,
    X,
    FolderKanban
} from 'lucide-react';
import { handleSignOut } from '@/backend/actions';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

const links = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Statistics', href: '/admin/statistics', icon: BarChart3 },
    { name: 'Portfolio', href: '/admin/portfolio', icon: FolderKanban },
    { name: 'Team', href: '/admin/team', icon: Users },
    { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Header & Toggle */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-gray-800 flex items-center justify-between px-4 z-50">
                <span className="text-white font-bold text-lg tracking-wide">ADMIN</span>
                <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-gray-800">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={closeMenu}
                />
            )}

            {/* Sidebar Container */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transition-transform duration-300 ease-in-out md:translate-x-0 border-r border-gray-800 flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo Area (Desktop) */}
                <div className="hidden md:flex h-16 items-center px-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold tracking-wide text-white">ADMIN</h1>
                </div>

                {/* Mobile Logo Area (Drawer Header) */}
                <div className="md:hidden h-16 flex items-center justify-between px-6 border-b border-gray-800">
                    <span className="text-lg font-bold">Menu</span>
                    <Button variant="ghost" size="icon" onClick={closeMenu} className="text-gray-400 hover:text-white">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                    {links.map((link) => {
                        const LinkIcon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={closeMenu}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                        : "text-gray-400 hover:bg-gray-900 hover:text-white"
                                )}
                            >
                                <LinkIcon className="w-5 h-5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer / Sign Out */}
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={() => handleSignOut()}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                    <div className="mt-4 px-3 text-xs text-center text-gray-600">
                        &copy; 2025 Next Web Orbit
                    </div>
                </div>
            </div>
        </>
    );
}
