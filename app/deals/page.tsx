import { DealsSection } from "@/components/DealsSection";
import { dealsConfig } from "@/config/dealsConfig";
import { EpicGames } from "@/lib/games";
import { Suspense } from "react";
// import { fetchAndProcessAppData } from "@/lib/steamIdFetcher";
// import { splitIntoBatches, saveToFile } from "@/lib/utils";


// async function SteamGames() {

//   const appMap = await fetchAndProcessAppData(
//   "http://api.steampowered.com/ISteamApps/GetAppList/v0001/"
// );

//  const steamIDsList = Object.keys(appMap).map(Number).slice(0, 10); // limit for demo

//   // Fetch details for each app ID in parallel
//   const results = await Promise.all(
//     steamIDsList.map(async (id) => {
//       const res = await fetch(`http://store.steampowered.com/api/appdetails?cc=de&appids=${id}`);
//       const json = await res.json();
//       return json;
//     })
//   );

//   console.log(results[3]['10']['data']['name'])
//   console.log(results[3]['10']['data']['price_overview']['final_formatted'])

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// async function fetchAppDetails(appId: number): Promise<any | null> {
//   const url = `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=en`;

//   try {
//     const res = await fetch(url, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
//         'Accept': 'application/json',
//         'Referer': 'https://store.steampowered.com/',
//       },
//     });

//     if (!res.ok) {
//       console.warn(`Blocked or error on appId ${appId}: ${res.status}`);
//       return null;
//     }

//     const data = await res.json();
//     return data[appId]?.data ?? null;
//   } catch (err) {
//     console.error(`Fetch failed for ${appId}:`, err);
//     return null;
//   }
// }

// // sequential or light parallel
// const fetchAll = async (appIds: number[]) => {
//   const results: any[] = [];

//   for (let i = 0; i < appIds.length; i++) {
//     const id = appIds[i];
//     console.log(`Fetching ${i + 1}/${appIds.length}: ${id}`);

//     const data = await fetchAppDetails(id);
//     if (data?.price_overview) {
//       results.push({
//         appId: id,
//         name: data.name,
//         price: data.price_overview.final / 100,
//         currency: data.price_overview.currency,
//       });
//     }

//     await sleep(600); // ~1.5/sec
//   }

//   return results;
// };




// const runAllBatches = async (allAppIds: number[]) => {
//   const batchSize = 500;
//   const batches = splitIntoBatches(allAppIds, batchSize);

//   for (let i = 0; i < batches.length; i++) {
//     console.log(`Starting batch ${i + 1}/${batches.length}`);
//     const batchResults = await fetchAll(batches[i]);

//     await saveToFile(batchResults, `steam-prices-batch-${i}.json`);

//     // Save or process your batchResults here (e.g., write to file/db)

//     // Sleep before the next batch starts
//     console.log(`Sleeping before next batch...`);
//     await sleep(30000); // wait 30 seconds between batches
//   }
// };









  // const data = await epicFreeGames.getGames();
  // const currency = getCurrencySymbol(
  //   data.currentGames[0]?.price?.totalPrice?.currencyCode ?? "USD"
  // );

  // const currentDeals: Game[] = data.currentGames.map((game: OfferGame) => {
  //   const promotionalOffers =
  //     game.promotions.promotionalOffers?.[0]?.promotionalOffers;
  //   const endDate = promotionalOffers?.[0]?.endDate;
  //   return {
  //     id: game.id,
  //     imageUrl: game.keyImages[2]?.url,
  //     title: game.title,
  //     price: game.price.totalPrice.fmtPrice.originalPrice,
  //     platform: "Epic Games",
  //     freeUntil: endDate ? (
  //       <>
  //         <b>Free</b> until{" "}
  //         <span className={dealsConfig.epic.colorConfig.sectionTitle}>
  //           {formatDateLong(endDate)}
  //         </span>
  //       </>
  //     ) : (
  //       ""
  //     ),
  //     urlSlug: game.offerMappings?.[0]?.pageSlug || game.urlSlug || "",
  //   };
  // });

  // const nextDeals: Game[] = data.nextGames.map((game: OfferGame) => {
  //   const upcomingOffers =
  //     game.promotions.upcomingPromotionalOffers?.[0]?.promotionalOffers;
  //   const startDate = upcomingOffers?.[0]?.startDate;
  //   return {
  //     id: game.id,
  //     imageUrl: game.keyImages[2]?.url,
  //     title: game.title,
  //     price: game.price.totalPrice.fmtPrice.originalPrice,
  //     platform: "Epic Games",
  //     freeUntil: startDate ? (
  //       <>
  //         <b>Free</b> from{" "}
  //         <span className={dealsConfig.epic.colorConfig.sectionTitle}>
  //           {formatDateLong(startDate)}
  //         </span>
  //       </>
  //     ) : (
  //       ""
  //     ),
  //     urlSlug: game.offerMappings?.[0]?.pageSlug || game.urlSlug || "",
  //   };
  // });

  // const epicGamesDeals: Game[] = [...currentDeals, ...nextDeals];

  // return (
  //   <>
  //     <CurrencySetter currency={currency} />
  //     <DealsSection
  //       title={epicGamesDeals[0]?.platform ?? "Epic Games"}
  //       games={epicGamesDeals}
  //       colorConfig={dealsConfig.epic.colorConfig}
  //     />
  //   </>
  // );
// }


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
