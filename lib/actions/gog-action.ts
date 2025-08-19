'use server';
import { Game } from "@/data/mock-games";
import { fetchGOGGamesWithPagination } from "../gogGames";
export async function fetchGOGGamesServerAction(apiUrl: string): Promise<{
  success: boolean;
  games: Game[];
  error?: string;
}> {
  try {
    const games = await fetchGOGGamesWithPagination(apiUrl, 1);
    return {
      success: true,
      games: games.games
    };
  } catch (error) {
    return {
      success: false,
      games: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}