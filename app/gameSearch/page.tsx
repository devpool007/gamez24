"use server"
import GameSearch from "@/components/GameSearch";
import { getSteamIDforGameServer } from "@/lib/actions/getSteamID-action";

export default async function GameSearchPage(){

  return (
    <GameSearch getSteamIDforGame={getSteamIDforGameServer}/>
  );

}