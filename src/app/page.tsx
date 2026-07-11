import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Hero from "@/components/features/home/hero";
import Footer from "@/components/layout/footer";
import FloatingButtons from "@/components/layout/floating-buttons";
import HomeInteractiveSegments from "@/components/features/home/home-interactive-segments";

export const metadata: Metadata = {
  verification: {
    google: 'CLCoQWQsQH-gTBzDPT9vG_kdaU6a1H85ZU84uCoV3C4',
  },
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HomeInteractiveSegments />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

