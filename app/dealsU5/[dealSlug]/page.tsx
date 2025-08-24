// import { SteamGamesUnder5ViewAll } from "@/lib/games";
import { SteamGamesWithServerActions } from "@/components/SteamGamesUnder5All";
import GOGGamesUnder5All from "@/components/GOGGamesUnder5All";
import { Suspense } from "react";
import { getCountry } from "@/lib/actions/country-action";
import { getCurrencyRates } from "@/lib/actions/currency-action";
import { cookies } from "next/headers";
import { getDealsThreshold } from "@/lib/utils";

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
  const currData = await getCurrencyRates();
  const rates = currData.rates;
  const cookieStore = await cookies();
  const currencyCode = cookieStore.get("currencyCode")?.value || "USD";
  const threshold = getDealsThreshold(currencyCode, rates);
  const { dealSlug } = await params;
  const { country } = await getCountry();

  let viewAllComponent;
  if (dealSlug === "steam") {
    viewAllComponent = (
      <SteamGamesWithServerActions country={country} rates={rates} />
    );
  } else if (dealSlug === "gog") {
    viewAllComponent = (
      <GOGGamesUnder5All rates={rates} threshold={threshold} />
    );
  } else {
    viewAllComponent = <></>;
  }

  return (
    <Suspense
      fallback={
        <p className="text-purple-500 animate-pulse text-xl mt-10 items-center">
          🚀 Loading all deals...
        </p>
      }
    >
      {viewAllComponent}
    </Suspense>
  );
}
