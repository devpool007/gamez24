// app/actions/getSteamID.ts
"use server"
import { getSteamGameDetails } from "steamgames";

export async function getSteamGameDetail(appid: number) {
  const game = await getSteamGameDetails(appid);
  return game;
}
