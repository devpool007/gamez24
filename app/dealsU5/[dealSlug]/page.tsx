// import { SteamGamesUnder5ViewAll } from "@/lib/games";
import { SteamGamesWithServerActions } from "@/components/SteamGamesUnder5All";
import { Suspense } from "react";
import { getCountry } from "@/lib/actions/country-action";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ dealSlug: string }>;
}) {
  const { dealSlug } = await params;

  if (dealSlug === "steam") {
    return {
      title: "Steam Games",
      description: "Cheap Game deals under 5 on Steam",
    };
  } else if (dealSlug === "gog") {
    return {
      title: "GOG.com Games",
      description: "Cheap Game deals under 5 on GOG.com",
    };
  }
}

export default async function DealsPage({
  params,
}: {
  params: Promise<{ dealSlug: string }>;
}) {
  const { dealSlug } = await params;
  const { country } = await getCountry();
  return (
    <Suspense
      fallback={
        <p className="text-purple-500 animate-pulse text-xl mt-10 items-center">
          🚀 Loading all deals...
        </p>
      }
    >
      {dealSlug === "steam" ? (
        <SteamGamesWithServerActions country={country} />
      ) : (
        <></>
      )}
    </Suspense>
  );
}
