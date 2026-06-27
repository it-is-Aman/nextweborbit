import LoginForm from '@/components/admin/login-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const session = await auth();
    if (session) {
        redirect('/admin');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <LoginForm />
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    &copy; 2025 Next Web Orbit. All rights reserved.
                </p>
            </div>
        </div>
    );
}
