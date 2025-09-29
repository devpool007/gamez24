import { Game } from "../data/mock-games";
import { JSDOM } from "jsdom";
//to get  freeUntil date hit the page url with special cookie to avoid age pop up and fetch the date through html
export async function fetchSteamGames(url: string): Promise<Game[]> {
  try {
    const response = await fetch(url, {
      next: {revalidate : 3600},
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Referer: "https://store.steampowered.com/",
        Connection: "keep-alive",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  // try {
  //   const response = await fetch("https://api.brightdata.com/request", {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + process.env.BRIGHTDATA_API_KEY,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       zone: "steam_unocker",
  //       url: url,
  //       format: "json",
  //     }),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Bright Data fetch failed: ${response.status}`);
  //   }
  //   const data = await response.json();
    // const htmlString = data.body;
    const htmlString = await response.text();
    const gameInfoList = await extractGameInfoFromHTML(htmlString);

    // Helper to generate a random 6-character string with special chars
    function generateRandomId(): string {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
      let result = "";
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    const gameArray: Game[] = gameInfoList.map((game) => ({
      id:
        game.gameid && game.gameid !== ""
          ? game.gameid + generateRandomId()
          : generateRandomId(),
      title: game.title,
      platform: "STEAM",
      price: game.originalPrice?.replace(",", ".") ?? "",
      secondPrice: game.finalPrice?.replace(",", ".") ?? "",
      imageUrl: game.imageUrl ?? "",
      freeUntil: game.freeUntil ?? "",
      urlSlug: game.gameurl ?? "",
    }));

    // console.log(gameArray);

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
    finalPrice: string | null;
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
  // Some pages use `search_name` without a surrounding `col` class — accept both
  const titleElement = gameDiv.querySelector(".search_name .title") || gameDiv.querySelector(".title");
      // console.log("TITLE ELEMENT STEAM:", titleElement);
      // Similarly, release date is often `search_released responsive_secondrow` (no `col`)
      const releaseDateElement =
        gameDiv.querySelector(".search_released.responsive_secondrow") ||
        gameDiv.querySelector(".responsive_secondrow");
      const originalPriceElement = gameDiv.querySelector(
        ".discount_original_price"
      );
      const finalPriceElement = gameDiv.querySelector(".discount_final_price");

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

      let finalPrice: string | null = null;
      if (finalPriceElement) {
        finalPrice = finalPriceElement.textContent?.trim() || null;
      }

      // Fetch imageUrl and freeUntil for this game
      const { imageUrl, freeUntil } = await fetchGameDetails(gameurl);

      return {
        title,
        releaseDate,
        originalPrice,
        finalPrice,
        gameurl,
        gameid,
        imageUrl,
        freeUntil,
      };
    }
  );

  return Promise.all(gameInfoPromises);
}

// // Fetch and extract real Steam games data
// async function main() {
//   console.log("Fetching Steam games...");
//   const steamGames = await fetchSteamGames();
//   console.log("Extracted Steam games:", steamGames);
//   console.log(`Found ${steamGames.length} games`);
//   if (steamGames.length > 0) {
//     console.log("Sample game:", steamGames[0]);
//   }
// }

// // Run the main function
// main().catch(console.error);
