import { DealsSection } from "@/components/DealsSection";
import { dealsConfig } from "@/config/dealsConfig";
import { EpicGames } from "@/lib/games";
import { Suspense } from "react";

export default function DealsPage() {
  return (
    <Suspense
      fallback={
        <p className="text-purple-500 animate-pulse text-xl mt-10 items-center">
          🚀 Deals loading soon... Stay tuned!
        </p>
      }
    >
      <EpicGames />
      <DealsSection
        title={dealsConfig.steam.title}
        games={dealsConfig.steam.games}
        colorConfig={dealsConfig.steam.colorConfig}
      />
    </Suspense>
  );
}
