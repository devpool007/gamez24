// app/actions/getSteamID.ts
"use server"
import { getSteamIDsForGame } from "steamgames";

export async function getSteamIDforGameServer(gameName: string) {
  const ids = await getSteamIDsForGame(gameName);
  return ids;
}
