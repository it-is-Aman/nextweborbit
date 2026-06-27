import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { metadata as siteMetadata } from "@/config/site";
// import { SmoothScroll } from "@/frontend/animations";
import JsonLd from "@/frontend/components/seo/json-ld";
// import { MouseEffect } from "@/frontend/animations";
import { ToastProvider } from "@/frontend/components/ui/toast";
// import { AnalyticsTracker } from "@/frontend/components/analytics/tracker";
import { ScrollToTop } from "@/frontend/components/ui/scroll-to-top";
import { Suspense } from "react";
import { ClientWrapper } from "./client-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="ext-error-filter" strategy="beforeInteractive">
          {`
            (function(){
              function shouldIgnoreError(e){
                var src = String(e && e.filename || '');
                var msg = String(e && e.message || '');
                return src.startsWith('chrome-extension://') || /MetaMask/i.test(msg);
              }
              window.addEventListener('error', function(e){
                if (shouldIgnoreError(e)) { e.preventDefault(); e.stopImmediatePropagation(); }
              }, true);
              window.addEventListener('unhandledrejection', function(e){
                var msg = '';
                try { msg = String(e && e.reason && (e.reason.message || e.reason) || ''); } catch(_){}
                if (/MetaMask/i.test(msg)) { e.preventDefault(); e.stopImmediatePropagation(); }
              }, true);
            })();
          `}
        </Script>
        <JsonLd />
        <ScrollToTop />
        <ToastProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          {/* <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense> */}
        </ToastProvider>
      </body>
    </html>
  );
}