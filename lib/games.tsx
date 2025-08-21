import { EpicFreeGames, OfferGame } from "epic-free-games";
import { Game } from "@/data/mock-games";
import { CurrencySetter } from "@/components/CurrencySetter";
import { getCurrencySymbol, formatDateLong } from "@/lib/utils";
import { dealsConfig } from "@/config/dealsConfig";
import { DealsSection } from "@/components/DealsSection";
import { fetchSteamGames } from "./steamGames";
import { DealsGrid } from "@/components/DealsGrid";
import { Button } from "@/components/ui/button";
import { fetchGOGGamesServerAction } from "./actions/gog-action";

const epicFreeGames = new EpicFreeGames({
  country: "DE",
  locale: "en-US",
  includeAll: true,
});

export async function EpicGames() {
  const data = await epicFreeGames.getGames();
  const currency = getCurrencySymbol(
    data.currentGames[0]?.price?.totalPrice?.currencyCode ?? "USD"
  );

  const currentDeals: Game[] = data.currentGames.map((game: OfferGame) => {
    const promotionalOffers =
      game.promotions.promotionalOffers?.[0]?.promotionalOffers;
    const endDate = promotionalOffers?.[0]?.endDate;
    return {
      id: game.id,
      imageUrl: game.keyImages[0]?.url,
      title: game.title,
      price: game.price.totalPrice.fmtPrice.originalPrice,
      secondPrice: "0.00",
      platform: "Epic Games",
      freeUntil: endDate ? formatDateLong(endDate) : "",
      urlSlug: game.offerMappings?.[0]?.pageSlug || game.urlSlug || "",
    };
  });

  const nextDeals: Game[] = data.nextGames.map((game: OfferGame) => {
    const upcomingOffers =
      game.promotions.upcomingPromotionalOffers?.[0]?.promotionalOffers;
    const startDate = upcomingOffers?.[0]?.startDate;
    return {
      id: game.id,
      imageUrl: game.keyImages[2]?.url,
      title: game.title,
      next: true,
      price: game.price.totalPrice.fmtPrice.originalPrice,
      secondPrice: "0.00",
      platform: "Epic Games",
      freeUntil: startDate ? formatDateLong(startDate) : "",
      urlSlug: game.offerMappings?.[0]?.pageSlug || game.urlSlug || "",
    };
  });

  const epicGamesDeals: Game[] = [...currentDeals, ...nextDeals];

  return (
    <>
      <CurrencySetter currency={currency} />
      <DealsSection
        title={epicGamesDeals[0]?.platform ?? "Epic Games"}
        games={epicGamesDeals}
        colorConfig={dealsConfig.epic.colorConfig}
        viewAll={false}
      />
    </>
  );
}

export async function SteamGames() {
  const url =
    "https://store.steampowered.com/search/?maxprice=free&specials=1&ndl=1";
  const steamGames = await fetchSteamGames(url);
  return (
    <>
      <DealsSection
        title={steamGames[0]?.platform ?? "Steam"}
        games={steamGames}
        colorConfig={dealsConfig.steam.colorConfig}
        viewAll={false}
      />
    </>
  );
}

export async function SteamGamesUnder5() {
  const url =
    "https://store.steampowered.com/search/?maxprice=5&supportedlang=english&specials=1&ndl=1";
  const steamGames = await fetchSteamGames(url);
  return (
    <>
      <DealsSection
        title={steamGames[0]?.platform ?? "Steam"}
        games={steamGames}
        colorConfig={dealsConfig.steam.colorConfig}
        viewAll={true}
      />
    </>
  );
}

export async function SteamGamesUnder5ViewAll() {
  const steamGames = [];
  const baseUrl =
    "https://store.steampowered.com/search/?maxprice=5&supportedlang=english&specials=1&ndl=1";
  const maxGames = 100;
  const gamesPerPage = 50; // Steam's default
  const pages = Math.ceil(maxGames / gamesPerPage);

  for (let page = 0; page < pages; page++) {
    const start = page * gamesPerPage;
    const url = `${baseUrl}&start=${start}`;

    try {
      console.log(`Fetching page ${page + 1}, starting at game ${start}...`);

      const games = await fetchSteamGames(url);

      if (games.length === 0) {
        console.log("No more games found, stopping pagination");
        break;
      }

      steamGames.push(...games);

      // Add delay to avoid rate limiting
      // await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error fetching page ${page + 1}:`, error);
      break;
    }
  }

  return (
    <>
      <DealsGrid
        title={steamGames[0]?.platform ?? "Steam"}
        games={steamGames}
        colorConfig={dealsConfig.epic.colorConfig}
        viewAll={false}
      />
      <div className="flex justify-center">
        <Button>Load More</Button>
      </div>
    </>
  );
}


export async function GOGGames() {
  const url = "https://embed.gog.com/games/ajax/filtered?mediaType=game";
  const gogGames = await fetchGOGGamesServerAction(url);
  return (
    <>
      <DealsSection
        title={gogGames.games[0]?.platform ?? "GOG"}
        games={gogGames.games}
        colorConfig={dealsConfig.gog .colorConfig}
        viewAll={false}
      />
    </>
  );
}