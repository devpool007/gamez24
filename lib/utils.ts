import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import localGames from "../data/gog_app_list.json";
// import fs from 'fs/promises';

export function getLocalGameMatches(gameName: string): string[] {
  return Object.entries(localGames)
    .filter(([name]) => name.toLowerCase().includes(gameName.toLowerCase()))
    .map(([, id]) => id); // only return the id
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrencySymbol(
  currencyCode: string,
  locale: string = "en-US"
): string {
  return (0)
    .toLocaleString(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = String(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function roundToPricePoint(value: number): number {
  if (value < 10) {
    return Math.ceil(value / 5) * 5;
  } else if (value < 100) {
    return Math.ceil(value / 5) * 5; // e.g., 73 → 75
  } else if (value < 1000) {
    return Math.ceil(value / 100) * 100; // e.g., 501 → 600
  } else if (value < 5000) {
    return Math.ceil(value / 500) * 500; // e.g., 1907 → 2000
  } else {
    return Math.ceil(value / 1000) * 1000; // e.g., 9100 → 10000
  }
}

type Rates = Record<string, number>;

function getDealThreshold(currency: string, rates: Rates): number {
  const baseValueEUR = 10;
  const rate = rates[currency];

  if (!rate) throw new Error(`Currency ${currency} not supported`);

  const converted = baseValueEUR * rate;
  return roundToPricePoint(converted);
}

export function getDealsTitle(
  currencySign: string,
  currencyCode: string,
  rates: Rates
): string {
  if (currencyCode === "EUR") {
    return "Deals under €10";
  }
  const threshold = getDealThreshold(currencyCode, rates);
  return `Deals under ${currencySign}${threshold}`;
}

export function getDealsThreshold(currencyCode: string, rates: Rates): number {
  if (currencyCode === "EUR") {
    return 10;
  }
  const threshold = getDealThreshold(currencyCode, rates);
  return threshold;
}

export function getExchangePrice(
  basePrice: number,
  currencyCode: string,
  rates: Rates
) {
  const rate = rates[currencyCode];
  const converted = basePrice * rate;

  return Number(converted.toFixed(2));
}
