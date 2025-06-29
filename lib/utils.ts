import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import fs from 'fs/promises';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencySymbol(currencyCode: string, locale: string = 'en-US'): string {
  return (0).toLocaleString(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).replace(/\d/g, '').trim();
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = String(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const splitIntoBatches = <T>(arr: T[], size: number): T[][] => {
  const batches: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    batches.push(arr.slice(i, i + size));
  }

  return batches;
};



export const saveToFile = async (data: any[], fileName: string) => {
  await fs.writeFile(fileName, JSON.stringify(data, null, 2));
};


// utils.ts
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));



async function fetchAppDetails(appId: number) {
  try {
    const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://store.steampowered.com/',
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json[appId]?.data ?? null;
  } catch (e) {
    console.warn(`Fetch failed for app ${appId}:`, e);
    return null;
  }
}

function isFreeGame(data: any): boolean {
  return data?.price_overview?.final === 0;
}

async function fetchBatch(appIds: number[]) {
  const results: any[] = [];

  await Promise.all(
    appIds.map(async (id) => {
      const data = await fetchAppDetails(id);
      if (isFreeGame(data)) {
        results.push({
          appId: id,
          name: data.name,
          price: 0,
          currency: data.price_overview.currency,
        });
      }
      await sleep(200); // small delay to reduce rate limit risk
    })
  );

  return results;
}

async function fetchAll(appIds: number[], concurrency = 5) {
  const allResults: any[] = [];

  for (let i = 0; i < appIds.length; i += concurrency) {
    const batch = appIds.slice(i, i + concurrency);
    console.log(`Fetching batch ${i / concurrency + 1} / ${Math.ceil(appIds.length / concurrency)}`);
    const batchResults = await fetchBatch(batch);
    allResults.push(...batchResults);
  }

  return allResults;
}

// // Example usage:
// async function main() {
//   const appIds = Array.from({ length: 250000 }, (_, i) => i + 1);
//   const freeGames = await fetchAll(appIds, 5);
//   console.log(`Found ${freeGames.length} free games.`);
//   // Here, upload freeGames to S3 or save locally
// }

// main();
