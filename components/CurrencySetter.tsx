"use client";
import { useEffect } from "react";
import { useClaimStore } from "@/store/useClaimStore";

export function CurrencySetter({ currency, currencyCode, currencyTitle }: { currency: string , currencyCode: string, currencyTitle : string  }) {
  const setCurrency = useClaimStore((state) => state.setCurrency);
  const setCurrencyCode = useClaimStore((state) => state.setCurrencyCode);
  const setCurrencyTitle = useClaimStore((state) => state.setCurrencyTitle);

  useEffect(() => {
    if (currency) setCurrency(currency);
    if (currencyCode) setCurrencyCode(currencyCode);
    if (currencyTitle) setCurrencyTitle(currencyTitle);
  }, [currency, setCurrency, currencyCode, setCurrencyCode, currencyTitle, setCurrencyTitle]);

  return null; // This component does not render anything
}