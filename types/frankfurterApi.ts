// types/currency.ts
export type CurrencyCode =
  | "AUD"
  | "BGN"
  | "BRL"
  | "CAD"
  | "CHF"
  | "CNY"
  | "CZK"
  | "DKK"
  | "GBP"
  | "HKD"
  | "HUF"
  | "IDR"
  | "ILS"
  | "INR"
  | "ISK"
  | "JPY"
  | "KRW"
  | "MXN"
  | "MYR"
  | "NOK"
  | "NZD"
  | "PHP"
  | "PLN"
  | "RON"
  | "SEK"
  | "SGD"
  | "THB"
  | "TRY"
  | "USD"
  | "ZAR";

// Response type from Frankfurter API
export interface CurrencyRatesResponse {
  amount: number;
  base: "EUR"; // Frankfurter always returns EUR as base unless otherwise specified
  date: string; // ISO date string (e.g., "2025-08-22")
  rates: Record<CurrencyCode, number>;
}
