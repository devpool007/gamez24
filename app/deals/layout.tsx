import { Toaster } from "sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Header } from "@/components/Header";

export default function DealsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {children}
      </main>
      <Toaster />
      <Sonner richColors />
    </div>
  );
}