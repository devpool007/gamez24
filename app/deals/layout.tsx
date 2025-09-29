"use client";
import { Toaster } from "sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import HorizontalNavTabs from "@/components/HorizontalNavTab";
import { useClaimStore } from "@/store/useClaimStore";
import { useEffect } from "react";
import { setCurrency } from "@/lib/actions/cookie-action";

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currencyTitle = useClaimStore((state) => state.currencyTitle);
  const currencyCode = useClaimStore((state) => state.currencyCode);

  useEffect(() => {
    // call server action after mount
    setCurrency(currencyCode);
  }, [currencyCode]);

  const tabs = [
    { label: "Free Game Deals", path: "/deals" },
    { label: currencyTitle, path: "/dealsU5" },
    { label: "Game Search", path: "/gameSearch" },
    { label: "Posts", path: "/posts" },
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
