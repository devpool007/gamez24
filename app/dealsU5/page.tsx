import { SteamGamesUnder5, GOGGamesUnder5 } from "@/lib/games";
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
      <SteamGamesUnder5 />
      <GOGGamesUnder5 />
    </Suspense>
  );
}
