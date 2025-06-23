import { DealsSection } from "@/components/DealsSection";
import { dealsConfig } from "@/config/dealsConfig";
import { EpicFreeGames } from "epic-free-games";
import { Game } from "@/data/mock-games";
import { Suspense } from "react";
const epicFreeGames = new EpicFreeGames({
  country: "DE",
  locale: "de",
  includeAll: true,
});

// const epicGamesDeals: Game[] = [];
function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

async function EpicGames() {
  const data = await epicFreeGames.getGames();
  const id = data.currentGames[0]["id"];
  const imageUrl = data.currentGames[0]["keyImages"][2]["url"];
  const title = data.currentGames[0]["title"];
  const endDate =
    data.currentGames[0]["promotions"]["promotionalOffers"][0][
      "promotionalOffers"
    ][0]["startDate"];

    const formatteDate = formatDateLong(endDate);
    // console.log(data.currentGames[0]["offerMappings"][0]['pageSlug'])
    console.log(data.nextGames[0]['promotions']['upcomingPromotionalOffers'][0]['promotionalOffers'][0]['endDate'])
    console.log(data.nextGames[0]["keyImages"][2]['url'])
  // move this to page.tsx and maybe loop over the data and fill into an array of type Games[]
  // then move it into data/epicgames.ts when everything seems to work

  const epicGamesDeals: Game[] = [
    {
      id: id,
      imageUrl: imageUrl,
      title: title,
      platform: "Epic Games",
      freeUntil: formatteDate,
    },
    {
      id: data.nextGames[0]["id"],
      imageUrl: data.nextGames[0]["keyImages"][2]['url'] ,
      title: data.nextGames[0]["title"],
      platform: "Epic Games",
      freeUntil: formatteDate,
    }
  ];

  return (
    <DealsSection
      title={epicGamesDeals[0].platform}
      games={epicGamesDeals}
      colorConfig={dealsConfig.epic.colorConfig}
    />
  );
}

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
      <DealsSection title={dealsConfig.steam.title}
      games={dealsConfig.steam.games}
      colorConfig={dealsConfig.steam.colorConfig}/>
    </Suspense>
  );
}
