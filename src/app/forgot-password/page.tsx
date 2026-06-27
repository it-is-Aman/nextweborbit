"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8"
            >
                <div className="relative">
                    <Link
                        href="/login"
                        className="absolute left-0 top-1 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Forgot</h1>
                    </div>
                </div>

                <div className="flex justify-center py-8">
                    {/* Placeholder for illustration */}
                    <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Illustration</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold">Forgot Password?</h2>
                        <p className="text-gray-500 text-sm px-8">
                            Don&apos;t worry! It happens. Please enter phone number associated with
                            your account
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            Enter your mobile number
                        </label>
                        <div className="relative">
                            <Input
                                type="tel"
                                placeholder="+91 458-465-6466"
                                className="pr-10"
                            />
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
