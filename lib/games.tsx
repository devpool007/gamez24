import { Country, EpicFreeGames, OfferGame } from "epic-free-games";
import { Game } from "@/data/mock-games";
import { CurrencySetter } from "@/components/CurrencySetter";
import { getCurrencySymbol, formatDateLong } from "@/lib/utils";
import { dealsConfig } from "@/config/dealsConfig";
import { DealsSection } from "@/components/DealsSection";
import { fetchSteamGames } from "./steamGames";
import { fetchGOGGamesServerAction } from "./actions/gog-action";

const epicFreeGames = new EpicFreeGames({
  country: "DE",
  locale: "en-US",
  includeAll: true,
});

interface EpicGamesProps {
  country: Country;
}

interface SteamGamesProps {
  country: string;
}

export async function EpicGames({ country }: EpicGamesProps) {
  const data = await epicFreeGames.getGames({ country: country });
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
      // @ts-expect-error chill bro
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
      // @ts-expect-error chill bro
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

export async function SteamGames({ country }: SteamGamesProps) {
  const url = `https://store.steampowered.com/search/?maxprice=free&specials=1&ndl=1&cc=${country}`;
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

export async function SteamGamesUnder5({ country }: SteamGamesProps) {
  const url = `https://store.steampowered.com/search/?maxprice=5&supportedlang=english&specials=1&ndl=1&cc=${country}`;
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

export async function GOGGames() {
  const url = "https://embed.gog.com/games/ajax/filtered?mediaType=game";

  // Create array of page numbers and fetch all pages in parallel
  const pagePromises = Array.from({ length: 150 }, (_, i) =>
    fetchGOGGamesServerAction(url, i + 1, 0)
  );

  try {
    const results = await Promise.all(pagePromises);
    const finalGOG = results.flatMap((result) => result.games);

    if (finalGOG.length === 0) {
      return (
        <>
          <DealsSection
            title={"GOG"}
            games={[]}
            colorConfig={dealsConfig.gog.colorConfig}
            viewAll={false}
          />
        </>
      );
    }
    return (
      <>
        <DealsSection
          title={finalGOG[0]?.platform ?? "GOG"}
          games={finalGOG}
          colorConfig={dealsConfig.gog.colorConfig}
          viewAll={false}
        />
      </>
    );
  } catch (error) {
    console.error("Failed to fetch GOG games:", error);
    return <div>Failed to load GOG games</div>;
  }
}

export async function GOGGamesUnder5() {
  const url = "https://embed.gog.com/games/ajax/filtered?mediaType=game";

  // Create array of page numbers and fetch all pages in parallel
  const pagePromises = Array.from({ length: 50 }, (_, i) =>
    fetchGOGGamesServerAction(url, i + 1, 5)
  );

  try {
    const results = await Promise.all(pagePromises);
    const finalGOG = results.flatMap((result) => result.games);

    console.log(finalGOG.length);
    return (
      <>
        <DealsSection
          title={finalGOG[0]?.platform ?? "GOG"}
          games={finalGOG}
          colorConfig={dealsConfig.gog.colorConfig}
          viewAll={true}
        />
      </>
    );
  } catch (error) {
    console.error("Failed to fetch GOG games:", error);
    return <div>Failed to load GOG games</div>;
  }
}
