import { EpicFreeGames, OfferGame } from "epic-free-games";
import { Game } from "@/data/mock-games";
import { CurrencySetter } from "@/components/CurrencySetter";
import { getCurrencySymbol, formatDateLong } from "@/lib/utils";
import { dealsConfig } from "@/config/dealsConfig";
import { DealsSection } from "@/components/DealsSection";
import { fetchSteamGames } from "./steamGames";

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
      platform: "Epic Games",
      freeUntil: endDate ? (
        <>
          <b>Free</b> until{" "}
          <span className={dealsConfig.epic.colorConfig.sectionTitle}>
            {formatDateLong(endDate)}
          </span>
        </>
      ) : (
        ""
      ),
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
      platform: "Epic Games",
      freeUntil: startDate ? (
        <>
          <b>Free</b> from{" "}
          <span className={dealsConfig.epic.colorConfig.sectionTitle}>
            {formatDateLong(startDate)}
          </span>
        </>
      ) : (
        ""
      ),
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
      />
    </>
  );
}


export async function SteamGames() {
  const url = "https://store.steampowered.com/search/?maxprice=free&specials=1&ndl=1";
  const steamGames = await fetchSteamGames(url);
   return (
    <>
      <DealsSection
        title={steamGames[0]?.platform ?? "Epic Games"}
        games={steamGames}
        colorConfig={dealsConfig.epic.colorConfig}
      />
    </>
  );

}

export async function SteamGamesUnder5() {
  const url = "https://store.steampowered.com/search/?maxprice=5&supportedlang=english&specials=1&ndl=1";
  const steamGames = await fetchSteamGames(url);
   return (
    <>
      <DealsSection
        title={steamGames[0]?.platform ?? "Epic Games"}
        games={steamGames}
        colorConfig={dealsConfig.epic.colorConfig}
      />
    </>
  );

}