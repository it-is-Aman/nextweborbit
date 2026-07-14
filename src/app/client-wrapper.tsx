'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const SmoothScroll = dynamic(() => import("@/frontend/animations").then(mod => mod.SmoothScroll), { ssr: false });
const MouseEffect = dynamic(() => import("@/frontend/animations").then(mod => mod.MouseEffect), { ssr: false });
const LeadPopup = dynamic(() => import("@/frontend/components/layout/lead-popup"), { ssr: false });

export function ClientWrapper({ children }: { children: ReactNode }) {
    return (
        <>
            <SmoothScroll />
            <MouseEffect />
            <LeadPopup />
            {children}
        </>
    )
}
