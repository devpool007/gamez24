import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Free Games",
  description: "Free Games and deals across major gaming stores",
};

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-25 pb-8">
        {children}
      </main>
    </div>
  );
}
