"use client";

import { useState } from "react";
import { getLocalGameMatches } from "@/lib/utils";
import { EpicGamesResponse, GameElement } from "@/types/epic_games";

type GameSearchProps = {
  getSteamIDforGame: (name: string) => Promise<number[] | undefined>;
};

export default function GameSearch({ getSteamIDforGame }: GameSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [epicGames, setEpicGames] = useState<GameElement[] | null>(null);
  const [steamId, setSteamId] = useState<number[] | null>(null);
  const [GOGIds, setGOGIds] = useState<{ name: string; id: string }[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);
    setSteamId(null);
    setGOGIds([]);
    setEpicGames([]);

    try {
      const res = await fetch(`http://127.0.0.1:8000/games?name=${searchTerm}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = (await res.json()) as EpicGamesResponse;
      console.log(data);
      setEpicGames(data.data.Catalog.searchStore.elements); // depends on your FastAPI JSON shape
    } catch (err) {
      setError("Error fetching Epic Games while searching...");
      console.error(err);
    } finally {
      setLoading(false);
    }

    try {
      const id = await getSteamIDforGame(searchTerm);
      if (id) {
        setSteamId(id);
      } else {
        setError("Game not found.");
      }

      // Local JSON search
      const local = getLocalGameMatches(searchTerm);
      if (local.length > 0) setGOGIds(local);
    } catch (err) {
      setError("Error fetching game ID.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 text-l sm:text-xl md:text-2xl text-foreground">
      <h1 className="mb-6">Game Search</h1>

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
          className="ml-3 px-5 py-2 bg-violet-600 text-white rounded-2xl hover:bg-violet-700 transition"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="mt-6">
        {loading && <p className="text-gray-500">Searching...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {steamId && (
          <div className="mt-4">
            <p className="text-green-500 font-semibold mb-2">
              Found Steam IDs:
            </p>
            <div className="flex flex-wrap gap-2">
              {steamId.map((id) => (
                <span
                  key={id}
                  className="bg-violet-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
        )}
        {GOGIds && (
          <div className="mt-4">
            <p className="text-blue-500 font-semibold mb-2">GOG JSON IDs:</p>
            <div className="flex flex-col gap-1">
              {GOGIds.map(({ name, id }) => (
                <span
                  key={id}
                  className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                >
                  {name} — {id}
                </span>
              ))}
            </div>
          </div>
        )}
        {epicGames && (
          <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Epic Store Games</h1>
            <ul className="space-y-2">
              {epicGames.map((game, idx) => (
                <li
                  key={idx}
                  className="border p-3 rounded-lg shadow-sm bg-white text-black"
                >
                  {game.title ?? "Unknown Title"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
