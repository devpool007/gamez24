"use server";
import { headers } from "next/headers";

// Define response type
interface CountryResponse {
  country: string;
}

export async function getCountry(): Promise<CountryResponse> {
  const headersList = headers();
  const country: string =
    (await headersList).get("x-user-country") ||
    (await headersList).get("x-vercel-ip-country") ||
    (await headersList).get("cf-ipcountry") ||
    "DE";

  return { country };
}
