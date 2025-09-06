// app/actions/getSteamID.ts
"use server"
import { getSteamIDsforGame } from "steamgames";

export async function getSteamIDforGameServer(gameName: string) {
  const ids = await getSteamIDsforGame(gameName);
  return ids;
}
