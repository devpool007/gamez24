// app/actions/getCurrencyRates.ts
"use server";

import { CurrencyRatesResponse } from "@/types/frankfurterApi";

export async function getCurrencyRates(): Promise<CurrencyRatesResponse> {
  const res = await fetch("https://api.frankfurter.dev/v1/latest", {
    // Ensure caching is controlled (default = "force-cache")
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch currency rates: ${res.statusText}`);
  }

  const data: CurrencyRatesResponse = await res.json();
  return data;
}
