import { JobsManager } from '@/components/admin/jobs-manager';

export const metadata = {
    title: 'Jobs Manager | Admin',
    description: 'Manage current job openings.',
};

export default function JobsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Jobs Management</h2>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <JobsManager />
            </div>
        </div>
    );
}
