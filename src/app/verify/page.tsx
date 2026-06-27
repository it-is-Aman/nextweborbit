"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyPage() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(12);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

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
                        href="/forgot-password"
                        className="absolute left-0 top-1 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Verify</h1>
                    </div>
                </div>

                <div className="flex justify-center py-8">
                    {/* Placeholder for illustration */}
                    <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Illustration</span>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold">Enter OTP</h2>
                        <p className="text-gray-500 text-sm px-8">
                            An 4 digit OTP has been sent to
                            <br />
                            <span className="font-medium text-black dark:text-white">
                                458-465-6466
                            </span>
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-14 h-14 rounded-xl border border-gray-200 text-center text-xl font-bold focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 dark:bg-gray-900"
                            />
                        ))}
                    </div>

                    <Button className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-xl text-md font-medium">
                        Verify
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                        Resend OTP ({`00:${timer.toString().padStart(2, "0")}`})
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
