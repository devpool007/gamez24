import { DealsSection } from "@/components/DealsSection";
import { dealsConfig } from "@/config/dealsConfig";
import { EpicFreeGames, OfferGame } from "epic-free-games";
import { Game } from "@/data/mock-games";
import { Suspense } from "react";
import { CurrencySetter } from "@/components/CurrencySetter";
import { getCurrencySymbol } from "@/lib/utils";

const epicFreeGames = new EpicFreeGames({
  country: "DE",
  locale: "en-US",
  includeAll: true,
});

function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = String(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

async function EpicGames() {
  const data = await epicFreeGames.getGames();
  const currency = getCurrencySymbol(
    data.currentGames[0]?.price?.totalPrice?.currencyCode ?? "USD"
  );

  console.log(
    // data.nextGames[1].promotions.upcomingPromotionalOffers[0].promotionalOffers
  );

  const currentDeals: Game[] = data.currentGames.map((game: OfferGame) => {
    const promotionalOffers =
      game.promotions.promotionalOffers?.[0]?.promotionalOffers;
    const endDate = promotionalOffers?.[0]?.endDate;
    return {
      id: game.id,
      imageUrl: game.keyImages[2]?.url,
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
      urlSlug: game.offerMappings?.[0]?.pageSlug || game.urlSlug,
    };
  });

  const nextDeals: Game[] = data.nextGames.map((game: OfferGame) => {
    const upcomingOffers =
      game.promotions.upcomingPromotionalOffers?.[0]?.promotionalOffers;
    const startDate = upcomingOffers?.[0]?.startDate;
    return {
      id: game.id,
      next: true,
      imageUrl: game.keyImages[2]?.url,
      title: game.title,
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
      urlSlug: game.offerMappings?.[0]?.pageSlug || game.urlSlug,
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
