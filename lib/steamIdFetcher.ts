// Type for a single app entry
interface SteamApp {
  appid: number;
  name: string;
}

export async function fetchAndProcessAppData(apiUrl: string): Promise<Record<number, string>> {
  console.log(`Fetching data from: ${apiUrl}`);
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    const appList: SteamApp[] = data?.applist?.apps?.app ?? [];

    if (!Array.isArray(appList) || appList.length === 0) {
      console.warn("Warning: 'app' list not found or is empty in the API response.");
      return {};
    }

    const appIdToNameMap: Record<number, string> = {};
    for (const app of appList) {
      const { appid, name } = app;
      if (appid !== undefined && name) {
        appIdToNameMap[appid] = name;
      } else {
        console.log(`Skipping malformed app entry: ${JSON.stringify(app)}`);
      }
    }

    console.log(`Successfully processed ${Object.keys(appIdToNameMap).length} applications.`);
    return appIdToNameMap;
  } catch (err) {
    console.error('Error fetching data:', err);
    return {};
  }
}



// async function main() {
//   const appMap = await fetchAndProcessAppData(API_URL);

//   if (!Object.keys(appMap).length) {
//     console.log('No data to process. Exiting.');
//     return;
//   }

//   const firstKey = parseInt(Object.keys(appMap)[0]);
//   console.log('First app entry:', firstKey, appMap[firstKey]);

//   const steamIDsList = Object.keys(appMap).map(Number);
//   console.log('First 50 app IDs:', steamIDsList.slice(0, 50));

//   saveAsJson(appMap, path.join(process.cwd(), JSON_OUTPUT_FILE));
//   saveAsCsv(appMap, path.join(process.cwd(), CSV_OUTPUT_FILE));

//   console.log('\nProcessing complete. Check the generated files.');
// }

// if (require.main === module) {
//   main();
// }
