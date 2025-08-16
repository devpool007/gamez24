// import { SteamGamesUnder5ViewAll } from "@/lib/games";
import { SteamGamesWithServerActions } from "@/components/SteamGamesUnder5All";
import { Suspense } from "react";

export default function DealsPage() {
  return (
    <Suspense
      fallback={
        <p className="text-purple-500 animate-pulse text-xl mt-10 items-center">
          🚀 Loading all deals...
        </p>
      }
    >
      <SteamGamesWithServerActions />
    </Suspense>
  );
}