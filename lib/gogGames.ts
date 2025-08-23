// Function to fetch and extract game details
import { Game } from "@/data/mock-games";
import { APIResponse } from "@/types/gog";

// Function with pagination support (if the API supports it)
export async function fetchGOGGamesWithPagination(
  baseApiUrl: string,
  page: number = 1, 
  maxPrice : number
): Promise<{
  games: Game[];
  totalCount: number;
}> {
  try {
    // Construct URL with pagination parameters
    const url = new URL(baseApiUrl);
    url.searchParams.append('page', page.toString());

    const response = await fetch(url.toString(),  { next: { revalidate: 3600 } } );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: APIResponse = await response.json();
    
    const extractedGames: Game[] = data.products
    .filter((product) => Number(product.price.amount) <= maxPrice && 
    product.isDiscounted === true ) // Filter first
    .map((product) => ({
      id: product.id.toString(),
      price: product.price.baseAmount,
      secondPrice: product.price.amount,
      platform: "GOG",
      title: product.title.trim(),
      freeUntil: "",
      imageUrl: product.image.startsWith('//') ? `https:${product.image}.webp` : product.image,
      urlSlug: product.url.startsWith('/') ? `https://www.gog.com${product.url}` : product.url
    }));



    return {
      games: extractedGames,
      totalCount: extractedGames.length // This would ideally come from API response
    };

  } catch (error) {
    console.error('Error fetching paginated GOG games:', error);
    throw new Error(`Failed to fetch GOG games: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Usage examples:
export async function exampleUsage() {
  try {
    // Basic usage
    // With filtering
    // const discountedGames = await fetchGOGGamesWithFilter('https://api.gog.com/products', {
    //   maxPrice: 10,
    //   onlyDiscounted: true,
    //   genres: ['Strategy', 'Simulation']
    // });
    // console.log('Discounted games:', discountedGames);

    // With pagination
    const paginatedResult = await fetchGOGGamesWithPagination('https://embed.gog.com/games/ajax/filtered?mediaType=game', 1, 5);
    console.log(`Loaded ${paginatedResult.games.length} games`);

  } catch (error) {
    console.error('Example usage failed:', error);
  }
}

// // Server Action version (for Next.js)
// 'use server';

// export async function fetchGOGGamesServerAction(apiUrl: string): Promise<{
//   success: boolean;
//   games: Game[];
//   error?: string;
// }> {
//   try {
//     const games = await fetchGOGGames(apiUrl);
//     return {
//       success: true,
//       games
//     };
//   } catch (error) {
//     return {
//       success: false,
//       games: [],
//       error: error instanceof Error ? error.message : 'Unknown error occurred'
//     };
//   }
// }

// // Utility function to format the extracted data for your existing components
// export function formatGamesForComponent(games: Game[]): Array<{
//   id: string;
//   title: string;
//   price: string;
//   secondPrice?: string;
//   imageUrl: string;
//   platform: string;
//   freeUntil?: string;
//   next?: boolean;
// }> {
//   return games.map(game => ({
//     id: game.id.toString(),
//     title: game.title,
//     price: game.priceBaseAmount !== game.priceAmount ? `€${game.priceBaseAmount}` : `€${game.priceAmount}`,
//     secondPrice: game.priceBaseAmount !== game.priceAmount ? `€${game.priceAmount}` : undefined,
//     imageUrl: game.image,
//     platform: 'GOG',
//     url: game.url
//   }));
// }