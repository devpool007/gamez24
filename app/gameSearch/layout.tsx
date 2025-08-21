import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import HorizontalNavTabs from "@/components/HorizontalNavTab";

export const metadata: Metadata = {
  title: "Free Games",
  description: "Free Games and deals across major gaming stores",
};

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    { label: "Free Game Deals", path: "/deals" },
    { label: "Deals Under €5", path: "/dealsU5" },
    { label: "Coming Soon", path: "/gameSearch" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="fixed top-15 left-0 right-0 z-10">
        <HorizontalNavTabs tabs={tabs} />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-25 pb-8">
        {children}
      </main>
      <Toaster />
      <Sonner richColors />
    </div>
  );
}
