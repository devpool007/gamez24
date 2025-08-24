import { DealsGrid } from "./DealsGrid";
import { dealsConfig } from "@/config/dealsConfig";
import { fetchGOGGamesServerAction } from "@/lib/actions/gog-action";

interface GOGProps {
  rates: Record<string, number>;
  threshold: number;
}

export default async function GOGGamesUnder5All({
  rates,
  threshold,
}: GOGProps) {
  const url = "https://embed.gog.com/games/ajax/filtered?mediaType=game";
  // Create array of page numbers and fetch all pages in parallel
  const pagePromises = Array.from({ length: 100 }, (_, i) =>
    fetchGOGGamesServerAction(url, i + 1, threshold)
  );

  try {
    const results = await Promise.all(pagePromises);
    const finalGOG = results.flatMap((result) => result.games);

    console.log(finalGOG.length);
    return (
      <>
        <DealsGrid
          title={finalGOG[0]?.platform ?? "GOG"}
          games={finalGOG}
          colorConfig={dealsConfig.gog.colorConfig}
          viewAll={false}
          rates={rates}
        />
      </>
    );
  } catch (error) {
    console.error("Failed to fetch GOG games:", error);
    return <div>Failed to load GOG games</div>;
  }
}
