'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const SmoothScroll = dynamic(() => import("@/frontend/animations").then(mod => mod.SmoothScroll), { ssr: false });
const MouseEffect = dynamic(() => import("@/frontend/animations").then(mod => mod.MouseEffect), { ssr: false });

export function ClientWrapper({ children }: { children: ReactNode }) {
    return (
        <>
            <SmoothScroll />
            <MouseEffect />
            {children}
        </>
    )
}
