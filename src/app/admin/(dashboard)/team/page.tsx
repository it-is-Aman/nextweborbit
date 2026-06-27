import { TeamManager } from '@/components/admin/team-manager';

export const metadata = {
    title: 'Team Manager | Admin',
    description: 'Manage your team members.',
};

export default function TeamPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <TeamManager />
            </div>
        </div>
    );
}
