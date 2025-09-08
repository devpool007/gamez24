"use client";

import { useState, useEffect } from "react";
import { getLocalGameMatches } from "@/lib/utils";
import { EpicGamesResponse, GameElement } from "@/types/epic_games";
import { DealsGrid2 } from "./DealsGrid2";
import { dealsConfig } from "@/config/dealsConfig";
import { Game } from "@/data/mock-games";
import { GogProduct } from "@/types/gog_api";
import { AppDetailsResponse } from "@/types/steam";
import { GOGPriceResponse } from "@/types/got_price";
type GameSearchProps = {
  getSteamIDforGame: (name: string) => Promise<number[] | undefined>;
};

function parsePrice(priceStr: string): number {
  // remove currency and whitespace
  const numericPart = priceStr.replace(/[^\d]/g, "");

  if (numericPart.length < 3) {
    // if it's like "99" -> 0.99
    return parseFloat("0." + numericPart.padStart(2, "0"));
  }

  const integerPart = numericPart.slice(0, -2); // all except last 2
  const decimalPart = numericPart.slice(-2);   // last 2 digits

  return parseFloat(`${integerPart}.${decimalPart}`);
}

export default function GameSearch({ getSteamIDforGame }: GameSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [epicGames, setEpicGames] = useState<GameElement[] | null>(null);
  const [epicDeals, setEpicDeals] = useState<Game[]>([]);
  const [gogDeals, setGogDeals] = useState<Game[]>([]);
  const [GOGIds, setGOGIds] = useState<string[] | null>([]);
  const [steamIds, setSteamIds] = useState<number[] | null>([]);
  const [steamDeals, setSteamDeals] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);
    setSteamIds([]);
    setGOGIds([]);
    setEpicGames([]);

    try {
      const res = await fetch(`http://127.0.0.1:8000/games?name=${searchTerm}`);
      if (!res.ok) throw new Error(`HTTP error for Epic ${res.status}`);
      const data = (await res.json()) as EpicGamesResponse;
      console.log(data);
      setEpicGames(data.data.Catalog.searchStore.elements);
    } catch (err) {
      setError("Error fetching Epic Games while searching...");
      console.error(err);
    } finally {
      setLoading(false);
    }

    try {
      const id = await getSteamIDforGame(searchTerm);
      if (id) {
        setSteamIds(id);
      } else {
        setError("Game not found.");
      }

      // Local JSON search
      const local = getLocalGameMatches(searchTerm);
      if (local.length > 0) setGOGIds(local);
      console.log("gog matches", local);
      if (local.length === 0) setGOGIds([]);
    } catch (err) {
      setError("Error fetching game ID.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //Epic Games fecthed when the search changes
  useEffect(() => {
    const tempDeals = (epicGames ?? []).map((game: GameElement) => {
      const url = game.productSlug;
      const resultUrl = url?.split("/")[0];
      return {
        id: game.id,
        imageUrl: game.keyImages[0]?.url,
        title: game.title,
        price: game.price.totalPrice.fmtPrice.originalPrice,
        secondPrice: game.price.totalPrice.fmtPrice.discountPrice,
        platform: "Epic Games",
        freeUntil: "",
        urlSlug: resultUrl || "",
      };
    });
    setEpicDeals(tempDeals);

    // time to call GOG ;)

    async function fetchGames() {
      const gogIDs = "";

      if (GOGIds?.length !== 0) {
        for (let i = 0; i < GOGIds!.length; ++i) {
          if (i === GOGIds!.length - 1) {
            gogIDs.concat(GOGIds![i]);
          }
          gogIDs.concat(`${GOGIds![i]},`);
        }
        console.log(GOGIds);
      }

      const res = await fetch(`http://127.0.0.1:8000/gog?ids=${GOGIds}`);
      if (!res.ok) throw new Error(`HTTP error for GOG ${res.status}`);
      const data: GogProduct[] = await res.json();

      const tempDealsPromises = (data ?? []).map(async (game: GogProduct) => {
        const img = game.images.logo2x;

        // You can fetch price here if needed, currently not used
        const res = await fetch(`https://embed.gog.com/products/${game.id}/prices?countryCode=DE`);
        if (!res.ok) throw new Error(`HTTP error for GOG ${res.status}`);
        const data: GOGPriceResponse = await res.json();
        
        const firstPrice = parsePrice(data._embedded.prices[0].basePrice);
        const secondPrice = parsePrice(data._embedded.prices[0].finalPrice);

        return {
          id: String(game.id),
          imageUrl: img?.startsWith("//") ? `https:${img}` : img ?? "",
          title: game.title,
          price: String(firstPrice),
          secondPrice: String(secondPrice),
          platform: "GOG",
          freeUntil: "",
          urlSlug: game.links.product_card || "",
        };
      });
      const tempDeals = await Promise.all(tempDealsPromises);
      setGogDeals(tempDeals);
    }
    if (GOGIds!.length > 0) {
      fetchGames();
    } else {
      setGogDeals([]);
    }

    //Time to get Steam Games now from Ids
    async function fetchGames2() {
      const steamTempDeals: Game[] = [];

      for (let i = 0; i < steamIds!.length; ++i) {
        setLoading(true);
        const id = steamIds![i];
        const res = await fetch(`http://127.0.0.1:8000/steam?id=${id}&cc=DE`);
        if (!res.ok) throw new Error(`HTTP error for Steam ${res.status}`);
        const data: AppDetailsResponse = await res.json();

        // if(data[id].data.price_overview === undefined){
        //   continue;
        // }

        const tempDeal = {
          id: String(id),
          imageUrl: data[id].data?.header_image,
          title: data[id].data?.name,
          price:
            data[id].data?.price_overview?.initial_formatted === ""
              ? data[id].data?.price_overview?.final_formatted
              : data[id].data?.price_overview?.initial_formatted,
          secondPrice:
            data[id].data?.price_overview?.initial_formatted === ""
              ? data[id].data?.price_overview?.final_formatted
              : data[id].data?.price_overview?.final_formatted,
          platform: "Steam",
          freeUntil: "",
          urlSlug: `https://store.steampowered.com/app/${id}`,
        };

        if (
          tempDeal.price === undefined ||
          tempDeal.secondPrice === undefined
        ) {
          continue;
        }

        steamTempDeals.push(tempDeal);
      }
      console.log("Steam Deals", steamTempDeals);

      setSteamDeals(steamTempDeals);
      setLoading(false);
    }
    if (steamIds!.length > 0) {
      fetchGames2();
    } else {
      setSteamDeals([]);
    }
  }, [epicGames, GOGIds, steamIds]);

  return (
    <>
      <div className="flex flex-col items-center mt-20 text-l sm:text-xl md:text-2xl text-foreground">
        <h1 className="mb-6 text-5xl font-modern font-bold">Game Search</h1>

        {/* Search Input */}
        <div className="flex">
          <input
            type="text"
            placeholder="Enter game name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72 sm:w-96 px-4 py-2 text-lg border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={handleSearch}
            className="ml-3 px-5 py-2 bg-violet-600 text-lg text-white rounded-2xl hover:bg-violet-700 transition"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading games...</p>
            </div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {/* Results */}
        <div className="mt-6">
          {/* {steamIds && (
            <div className="mt-4">
              <p className="text-green-500 font-semibold mb-2">
                Found Steam IDs:
              </p>
              <div className="flex flex-wrap gap-2">
                {steamIds.map((id) => (
                  <span
                    key={id}
                    className="bg-violet-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
          )} */}
          {/* {GOGIds && (
            <div className="mt-4">
              <p className="text-blue-500 font-semibold mb-2">GOG JSON IDs:</p>
              <div className="flex flex-col gap-1">
                {GOGIds.map(({ id }) => (
                  <span
                    key={id}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {name} — {id}
                  </span>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
      {!loading && (
        <DealsGrid2
          games={steamDeals}
          title="Steam"
          rates={{}}
          colorConfig={dealsConfig.steam.colorConfig}
          viewAll={false}
        />
      )}
      {!loading && (
        <DealsGrid2
          games={gogDeals}
          title="GOG"
          rates={{}}
          colorConfig={dealsConfig.gog.colorConfig}
          viewAll={false}
        />
      )}
      {!loading && (
        <DealsGrid2
          games={epicDeals}
          rates={{}}
          colorConfig={dealsConfig.epic.colorConfig}
          viewAll={false}
        />
      )}
    </>
  );
}
