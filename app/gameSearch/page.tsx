import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Games",
  description: "Free Games and deals across major gaming stores",
};

export default function GameSearch() {
  return (
    <div className="flex justify-center mt-40 text-xl sm:text-3xl md:text-4xl text-primary-foreground">
     Game Search feature <span className="text-violet-500 font-semibold ml-2">coming soon...</span>
    </div>
  );
}
