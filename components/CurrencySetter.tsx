"use client";
import { useEffect } from "react";
import { useClaimStore } from "@/store/useClaimStore";

export function CurrencySetter({ currency }: { currency: string }) {
  const setCurrency = useClaimStore((state) => state.setCurrency);

  useEffect(() => {
    if (currency) setCurrency(currency);
  }, [currency, setCurrency]);

  return null; // This component does not render anything
}