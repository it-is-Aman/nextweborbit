import AdminSidebar from '@/components/admin/sidenav';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className="flex min-h-screen flex-row bg-gray-50">
            {/* Sidebar is self-managing for mobile, but structurally present for desktop */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out pt-16 md:pt-0 md:ml-64">
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
