'use client';

import { useActionState } from 'react';
import { authenticate } from '@/backend/actions';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginForm() {
    const [errorMessage, dispatch, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form action={dispatch} className="space-y-6">
            {/* Email Field */}
            <div>
                <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="email"
                >
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="admin@example.com"
                        required
                        disabled={isPending}
                    />
                </div>
            </div>

            {/* Password Field */}
            <div>
                <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        disabled={isPending}
                    />
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    'Sign In'
                )}
            </button>
        </form>
    );
}
