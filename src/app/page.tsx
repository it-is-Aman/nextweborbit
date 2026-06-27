import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Header from "@/components/layout/header";
import Hero from "@/components/features/home/hero";
import Footer from "@/components/layout/footer";
import FloatingButtons from "@/components/layout/floating-buttons";
import HomeInteractiveSegments from "@/components/features/home/home-interactive-segments";

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
