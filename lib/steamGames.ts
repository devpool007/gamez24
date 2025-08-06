import { JSDOM } from 'jsdom';
//to get  freeUntil date hit the page url with special cookie to avoid age pop up and fetch the date through html 
async function fetchSteamGames(): Promise<{ title: string; releaseDate: string; originalPrice: string | null; gameurl: string | null; gameid: string | null }[]> {
    const url = 'https://store.steampowered.com/search/?maxprice=free&specials=1&ndl=1';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlString = await response.text();
        return extractGameInfoFromHTML(htmlString);
    } catch (error) {
        console.error('Error fetching Steam games:', error);
        return [];
    }
}

function extractGameInfoFromHTML(htmlString: string): { title: string; releaseDate: string; originalPrice: string | null; gameurl: string | null; gameid: string | null }[] {
    const dom = new JSDOM(htmlString);
    const doc = dom.window.document;

    const gameInfoList: { title: string; releaseDate: string; originalPrice: string | null; gameurl: string | null; gameid: string | null }[] = [];

    const gameDivs = doc.querySelectorAll('.responsive_search_name_combined');

    gameDivs.forEach((gameDiv: Element) => {
        const titleElement = gameDiv.querySelector('.col.search_name .title');
        const releaseDateElement = gameDiv.querySelector('.col.search_released.responsive_secondrow');
        const originalPriceElement = gameDiv.querySelector('.discount_original_price');

        // Find the closest anchor parent for the gameDiv
        let gameurl: string | null = null;
        let gameid: string | null = null;
        let parent: Element | null = gameDiv.parentElement;
        while (parent && parent.tagName !== 'A') {
            parent = parent.parentElement;
        }
        if (parent && parent.tagName === 'A') {
            gameurl = (parent as HTMLAnchorElement).href || null;
            if (gameurl) {
                // Extract the gameid from the URL
                const match = gameurl.match(/\/app\/(\d+)/);
                if (match && match[1]) {
                    gameid = match[1];
                }
            }
        }

        const title = titleElement ? titleElement.textContent?.trim() || '' : '';
        const releaseDate = releaseDateElement ? releaseDateElement.textContent?.trim() || '' : '';

        let originalPrice: string | null = null;
        if (originalPriceElement) {
            originalPrice = originalPriceElement.textContent?.trim() || null;
        }

        gameInfoList.push({
            title,
            releaseDate,
            originalPrice,
            gameurl,
            gameid
        });
    });

    return gameInfoList;
}

// Fetch and extract real Steam games data
async function main() {
    console.log('Fetching Steam games...');
    const steamGames = await fetchSteamGames();
    console.log('Extracted Steam games:', steamGames);
    console.log(`Found ${steamGames.length} games`);
    if (steamGames.length > 0) {
        console.log('Sample game:', steamGames[0]);
    }
}

// Run the main function
main().catch(console.error); 