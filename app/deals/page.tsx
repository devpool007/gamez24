import { DealsSection } from "@/components/DealsSection";
import { dealsConfig } from "@/config/dealsConfig";
import { EpicFreeGames } from "epic-free-games";
import { Game } from "@/data/mock-games";
const epicFreeGames = new EpicFreeGames({
  country: "DE",
  locale: "en-US",
  includeAll: true,
});

// const epicGamesDeals: Game[] = [];



async function EpicGames() {
 const data = await epicFreeGames.getGames();
 const id = (data.currentGames[0]['id']);
 const imageUrl = (data.currentGames[0]['keyImages'][2]['url']);
const title = (data.currentGames[0]['title']);
const endDate = (data.currentGames[0]['promotions']['promotionalOffers'][0]['promotionalOffers'][0]['endDate']);

 // move this to page.tsx and maybe loop over the data and fill into an array of type Games[]
 // then move it into data/epicgames.ts when everything seems to work 

  const epicGamesDeals: Game[] = [{
    id: id,
    imageUrl : imageUrl,
    title : title,
    platform : 'Epic Gays',
    freeUntil : endDate
  }];

  return <DealsSection
          title={epicGamesDeals[0].platform}
          games={epicGamesDeals}
          colorConfig={dealsConfig.epic.colorConfig}
        />

 
}



export default function DealsPage() {
  // EpicGames();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="text-center px-4 py-6 bg-black text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Grab{" "}
          <span className="text-purple-500 drop-shadow-[0_0_5px_rgba(168,85,247,1)]">
            Free Game Deals
          </span>{" "}
          Before They&apos;re Gone!
        </h2>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        {/* Placeholder for dynamic list */}
        {/* Replace this with <Suspense> or your DealsList component later */}
        {/* <p className="text-purple-400 animate-pulse text-xl mt-10">
          🚀 Deals loading soon... Stay tuned!
        </p> */}
        <EpicGames/>
        
      </main>
    </div>
  );
}
