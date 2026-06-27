import { StatisticsManager } from '@/components/admin/statistics-manager';

export const metadata = {
    title: 'Statistics Manager | Admin',
    description: 'Manage statistics for the landing page.',
};

export default function StatisticsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Statistics Management</h2>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <StatisticsManager />
            </div>
        </div>
    );
}
