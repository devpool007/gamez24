import { Game } from "../data/mock-games";
import { JSDOM } from "jsdom";
//to get  freeUntil date hit the page url with special cookie to avoid age pop up and fetch the date through html
export async function fetchSteamGames(): Promise<Game[]> {
  const url =
    "https://store.steampowered.com/search/?maxprice=free&specials=1&ndl=1";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const htmlString = await response.text();
    const gameInfoList = await extractGameInfoFromHTML(htmlString);

    const gameArray: Game[] = gameInfoList.map((game) => ({
      id: game.gameid ?? "", 
      title: game.title,
      platform: "Steam",
      price: game.originalPrice ?? "",
      imageUrl: game.imageUrl ?? "",
      freeUntil: game.freeUntil ?? "",
      urlSlug: game.gameurl ?? "", 
    }));

    return gameArray;
  } catch (error) {
    console.error("Error fetching Steam games:", error);
    return [];
  }
}

async function extractGameInfoFromHTML(htmlString: string): Promise<
  {
    title: string;
    releaseDate: string;
    originalPrice: string | null;
    gameurl: string | null;
    gameid: string | null;
    imageUrl: string | null;
    freeUntil: string | null;
  }[]
> {
  const dom = new JSDOM(htmlString);
  const doc = dom.window.document;

  const gameDivs = doc.querySelectorAll(".responsive_search_name_combined");

  // Helper to fetch imageUrl for a game
  async function fetchGameDetails(
    gameurl: string | null
  ): Promise<{ imageUrl: string | null; freeUntil: string | null }> {
    if (!gameurl) return { imageUrl: null, freeUntil: null };
    try {
      const response = await fetch(gameurl, {
        headers: {
          cookie:
            "birthtime=788914801; lastagecheckage=1-January-1995; wants_mature_content=1",
        },
      });
      if (!response.ok) return { imageUrl: null, freeUntil: null };
      const html = await response.text();
      const dom = new JSDOM(html);
      const img = dom.window.document.querySelector(
        "#gameHeaderImageCtn .game_header_image_full"
      );
      const imageUrl = img ? img.getAttribute("src") : null;

      // Extract freeUntil date
      let freeUntil: string | null = null;
      const freeUntilP = dom.window.document.querySelector(
        "p.game_purchase_discount_quantity"
      );
      if (freeUntilP) {
        const text = freeUntilP.textContent || "";
        // Look for date like 'before 8 Aug' or 'before 8 Aug @'
        const match = text.match(/before (\d{1,2}) ([A-Za-z]{3,})/);
        if (match) {
          const day = match[1];
          const monthStr = match[2];
          // Map month string to number
          const months = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12",
          };
          const month = months[monthStr.slice(0, 3) as keyof typeof months];
          if (month) {
            // Use current year
            const now = new Date();
            const year = now.getFullYear();
            // Format as DD/MM/YYYY
            freeUntil = `${day.padStart(2, "0")}/${month}/${year}`;
          }
        }
      }
      return { imageUrl, freeUntil };
    } catch {
      return { imageUrl: null, freeUntil: null };
    }
  }

  // Collect all game info objects first
  const gameInfoPromises = Array.from(gameDivs).map(
    async (gameDiv: Element) => {
      const titleElement = gameDiv.querySelector(".col.search_name .title");
      const releaseDateElement = gameDiv.querySelector(
        ".col.search_released.responsive_secondrow"
      );
      const originalPriceElement = gameDiv.querySelector(
        ".discount_original_price"
      );

      // Find the closest anchor parent for the gameDiv
      let gameurl: string | null = null;
      let gameid: string | null = null;
      let parent: Element | null = gameDiv.parentElement;
      while (parent && parent.tagName !== "A") {
        parent = parent.parentElement;
      }
      if (parent && parent.tagName === "A") {
        gameurl = (parent as HTMLAnchorElement).href || null;
        if (gameurl) {
          // Extract the gameid from the URL
          const match = gameurl.match(/\/app\/(\d+)/);
          if (match && match[1]) {
            gameid = match[1];
          }
        }
      }

      const title = titleElement ? titleElement.textContent?.trim() || "" : "";
      const releaseDate = releaseDateElement
        ? releaseDateElement.textContent?.trim() || ""
        : "";

      let originalPrice: string | null = null;
      if (originalPriceElement) {
        originalPrice = originalPriceElement.textContent?.trim() || null;
      }

      // Fetch imageUrl and freeUntil for this game
      const { imageUrl, freeUntil } = await fetchGameDetails(gameurl);

      return {
        title,
        releaseDate,
        originalPrice,
        gameurl,
        gameid,
        imageUrl,
        freeUntil,
      };
    }
  );

  return Promise.all(gameInfoPromises);
}

// Fetch and extract real Steam games data
async function main() {
  console.log("Fetching Steam games...");
  const steamGames = await fetchSteamGames();
  console.log("Extracted Steam games:", steamGames);
  console.log(`Found ${steamGames.length} games`);
  if (steamGames.length > 0) {
    console.log("Sample game:", steamGames[0]);
  }
}

// Run the main function
main().catch(console.error);
