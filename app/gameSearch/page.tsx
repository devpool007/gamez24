import GameSearch from "@/components/GameSearch";
import { getSteamIDforGameServer } from "@/lib/actions/getSteamID-action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Search",
  description: "Search Games and deals across major gaming stores and compare prices",
};

export default async function GameSearchPage(){

  return (
    <GameSearch getSteamIDforGame={getSteamIDforGameServer}/>
  );

}