"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
    id: string
    title?: string
    description?: string
    variant?: "default" | "success" | "error" | "warning"
    duration?: number
    onClose?: () => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ title, description, variant = "default", onClose }, ref) => {
        const variantStyles = {
            default: "bg-background border-border",
            success: "bg-green-50 border-green-200 text-green-900",
            error: "bg-red-50 border-red-200 text-red-900",
            warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all",
                    variantStyles[variant]
                )}
            >
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        {title && <div className="font-semibold">{title}</div>}
                        {description && (
                            <div className="mt-1 text-sm opacity-90">{description}</div>
                        )}
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="rounded-md p-1 hover:bg-black/5 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        )
    }
)
Toast.displayName = "Toast"

interface ToastContextValue {
    toasts: ToastProps[]
    addToast: (toast: Omit<ToastProps, "id">) => void
    removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<ToastProps[]>([])

    const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
        const id = Math.random().toString(36).substring(7)
        const newToast = { ...toast, id }

        setToasts((prev) => [...prev, newToast])

        // Auto remove after duration
        const duration = toast.duration || 5000
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration)
    }, [])

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 pointer-events-none">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = React.useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within ToastProvider")
    }
    return context
}
