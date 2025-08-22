'use server';

import { fetchSteamGames } from '@/lib/steamGames';

// Server Action for getting Steam games
export async function getSteamGames(start: number = 0, country: string) {
  const baseUrl = `https://store.steampowered.com/search/?maxprice=5&supportedlang=english&specials=1&ndl=1&cc=${country}`;
  const url = `${baseUrl}&start=${start}`;

  try {
    console.log(`Server Action: Fetching games starting at ${start}`);
    const games = await fetchSteamGames(url);
    
    return { 
      success: true, 
      games,
      hasMore: games.length > 0,
      count: games.length
    };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch games',
      games: [],
      hasMore: false,
      count: 0
    };
  }
}

// Server Action for batch loading (loading multiple pages at once)
export async function getSteamGamesBatch(startPage: number = 0, pageCount: number = 2, country: string) {
  const gamesPerPage = 50;
  const allGames = [];
  
  try {
    for (let page = startPage; page < startPage + pageCount; page++) {
      const start = page * gamesPerPage;
      const result = await getSteamGames(start, country);
      
      if (!result.success || result.games.length === 0) {
        break;
      }
      
      allGames.push(...result.games);
      
    //   // Small delay to avoid rate limiting
    //   if (page < startPage + pageCount - 1) {
    //     await new Promise(resolve => setTimeout(resolve, 500));
    //   }
    }
    
    return {
      success: true,
      games: allGames,
      hasMore: allGames.length === pageCount * gamesPerPage,
      nextPage: startPage + pageCount
    };
  } catch (error) {
    console.error('Batch Server Action Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch games',
      games: [],
      hasMore: false,
      nextPage: startPage
    };
  }
}