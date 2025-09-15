// stores/useClaimStore.ts

import { create } from "zustand";
import { toast } from "sonner";
import { DealCategory } from "@/config/dealsConfig";

type ClaimStats = Record<DealCategory, number>;

interface ClaimStore {
  stats: ClaimStats;
  moneySaved: number;
  currency: string;
  currencyCode: string;
  currencyTitle: string;
  claimGame: (platform: string, gameTitle: string) => void;
  totalClaims: () => number;
  addGameMoney: (money: number) => void;
  setCurrency: (currency: string) => void;
  setCurrencyCode: (currencyCode: string) => void;
  setCurrencyTitle: (currencyTitle: string) => void;
}

const platformToCategoryMap: { [key: string]: DealCategory } = {
  // "Prime gaming": "prime",
  Steam: "steam",
  "Epic Games": "epic",
  GOG: "gog",
};

const categoryToDisplayNameMap: { [key in DealCategory]: string } = {
  // prime: "Prime Gaming",
  steam: "Steam",
  epic: "Epic Games",
  gog: "GOG",
};

export const useClaimStore = create<ClaimStore>((set, get) => ({
  stats: {
    // prime: 0,
    steam: 0,
    epic: 0,
    gog: 0,
  },

  currency: "€",

  currencyCode: "USD",
  currencyTitle: "Deals Under €10",
  moneySaved: 0,

  claimGame: (platform: string, gameTitle: string) => {
    const category = platformToCategoryMap[platform];
    if (category) {
      const prevStats = get().stats;
      const updatedStats = {
        ...prevStats,
        [category]: prevStats[category] + 1,
      };

      set({ stats: updatedStats });

      toast.success(`${gameTitle} claimed!`, {
        description: `Added to your ${categoryToDisplayNameMap[category]} stats.`,
      });
    } else {
      toast.error(`Could not process claim for ${gameTitle}.`);
    }
  },

  totalClaims: () => {
    const stats = get().stats;
    return Object.values(stats).reduce((sum, count) => sum + count, 0);
  },

  addGameMoney: (money) => {
    const moneySavedSoFar = get().moneySaved;
    const newTotal = parseFloat((moneySavedSoFar + money).toFixed(2));
    set({ moneySaved: newTotal });
  },

  setCurrency: (currency) => {
    set({ currency: currency });
  },

  setCurrencyCode: (currencyCode) => {
    set({ currencyCode: currencyCode });
  },

  setCurrencyTitle: (currencyTitle) => {
    set({ currencyTitle: currencyTitle });
  }
}));
