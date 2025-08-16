// import { SteamGamesUnder5ViewAll } from "@/lib/games";
import { SteamGamesWithServerActions } from "@/components/SteamGamesUnder5All";
import { Suspense } from "react";

export default async function DealsPage({ params }: { params: Promise<{ dealSlug: string }> }) {
  const { dealSlug } = await params;
  return (
    <Suspense
      fallback={
        <p className="text-purple-500 animate-pulse text-xl mt-10 items-center">
          🚀 Loading all deals...
        </p>
      }
    >
      {dealSlug === "steam" ? <SteamGamesWithServerActions /> : <></>}
    </Suspense>
  );
}
