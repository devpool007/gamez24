import { EpicGames, SteamGames, GOGGames } from "@/lib/games";
import { Suspense } from "react";
import { getCountry } from "@/lib/actions/country-action";
import { Country } from "epic-free-games";

export default async function DealsPage() {

  const { country } = await getCountry();
  const theCountry = country as Country
  console.log(theCountry)


  return (
    <Suspense
      fallback={
        <p className="text-violet-500 animate-pulse text-xl mt-10 items-center">
          🚀 Deals loading soon... Stay tuned!
        </p>
      }
    >
      <EpicGames country = {theCountry} />
      <SteamGames />
      <GOGGames />
    </Suspense>
  );
}
