'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // Use a ref to prevent double tracking in strict mode
    const trackedPath = useRef<string | null>(null);

    useEffect(() => {
        // Construct full URL path including query params if needed, or just path
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        // Simple deduplication for Strict Mode locally
        if (trackedPath.current === url) return;

        // We send the 'beacon'
        const trackView = async () => {
            try {
                await fetch('/api/analytics/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: pathname,
                        referrer: document.referrer || null,
                    }),
                    keepalive: true // Important for tracking even if user navigates away quickly
                });
                trackedPath.current = url;
            } catch (err) {
                // Silently fail for analytics
                console.error('[Analytics] Failed to track page view', err);
            }
        };

        trackView();

    }, [pathname, searchParams]);

    return null;
}
