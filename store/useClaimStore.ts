// stores/useClaimStore.ts

import { create } from "zustand";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";
// import { DealCategory } from "@/config/dealsConfig";
import { UserGamesStats } from "@/types/user_games_stats";
import { ClaimGameResponse } from "@/types/claim_game";
import { FetchUserGamesResponse, Games } from "@/types/fetch_user_games";
import { Game } from "@/data/mock-games";

type GameStats = {
  totalGames: number;
  steamGames: number;
  steamValue?: number;
  epicGames: number;
  epicValue?: number;
  gogGames: number;
  gogValue?: number;
  totalSaved: number;
};

type ClaimStats2 = Record<keyof GameStats, number>;
// type ClaimStats = Record<DealCategory, number>;

interface ClaimStore {
  user: { stats: ClaimStats2 } | null;
  claimedGames: Games[];
  claimedGameNames?: string[];
  error: string | null;
  isLoading: boolean;
  // stats: ClaimStats;
  // moneySaved: number;
  currency: string;
  currencyCode: string;
  currencyTitle: string;
  // claimGame: (platform: string, gameTitle: string) => void;
  // totalClaims: () => number;
  // addGameMoney: (money: number) => void;
  initializeUserStats: () => Promise<void>;
  claimGame: (gameData: Game) => Promise<ClaimGameResponse | void>;
  loadClaimedGames: (
    page?: number,
    store?: string | null
  ) => Promise<FetchUserGamesResponse | void>;
  clearGameData: () => void;
  hasClaimedGame: (gameName: string, store: string) => boolean;
  getStoreStats: (store: string) => number;
  clearError: () => void;
  // moneySaved: number;
  setCurrency: (currency: string) => void;
  setCurrencyCode: (currencyCode: string) => void;
  setCurrencyTitle: (currencyTitle: string) => void;
}

// const platformToCategoryMap: { [key: string]: DealCategory } = {
//   // "Prime gaming": "prime",
//   Steam: "steam",
//   "Epic Games": "epic",
//   GOG: "gog",
// };

// const categoryToDisplayNameMap: { [key in DealCategory]: string } = {
//   // prime: "Prime Gaming",
//   steam: "Steam",
//   epic: "Epic Games",
//   gog: "GOG",
// };

export const useClaimStore = create<ClaimStore>((set, get) => ({
  // State
  user: {
    stats: {
      totalGames: 0,
      steamGames: 0,
      steamValue: 0,
      epicGames: 0,
      epicValue: 0,
      gogGames: 0,
      gogValue: 0,
      totalSaved: 0.0,
    },
  },
  claimedGames: [],
  isLoading: false,
  error: null,

  // Actions

  // 1. Initialize user stats when they login
  initializeUserStats: async () => {
    set({ isLoading: true, error: null });

    try {
      console.log("🔄 Fetching initial user stats...");
      const stats = (await apiRequest(
        "/users/me/claims/stats"
      )) as UserGamesStats;

      set({
        user: {
          stats: {
            totalGames: stats.total_games_claimed,
            steamGames: stats.store_breakdown.steam.games,
            epicGames: stats.store_breakdown.epic_games.games,
            gogGames: stats.store_breakdown.gog.games,
            totalSaved: stats.total_money_saved,
            steamValue: stats.store_breakdown.steam.money_saved,
            epicValue: stats.store_breakdown.epic_games.money_saved,
            gogValue: stats.store_breakdown.gog.money_saved,
          },
        },
        isLoading: false,
        
      });

      console.log("✅ User stats loaded:", get().user?.stats);
    } catch (error) {
      console.error("❌ Failed to load user stats:", error);
      set({
        error: "Failed to load user statistics",
        isLoading: false,
      });
    }
  },

  // 2. Claim a game and update stats in real-time
  claimGame: async (gameData: Game) => {
    set({ isLoading: true, error: null });

    try {
      console.log("🎮 Claiming game:", gameData.title);
      if (gameData.platform === "EPIC_GAMES") {
        gameData.price = gameData.price.slice(1);
      }
      // Prepare claim request
      const claimRequest = {
        game_name: gameData.title,
        store: gameData.platform, // 'STEAM', 'EPIC_GAMES', 'GOG'
        original_price: parseFloat(gameData.price),
        discounted_price: parseFloat(gameData.secondPrice || "0"),
        game_image_url: gameData.imageUrl,
        external_game_id: gameData.urlSlug, // URL or unique ID
      };
      console.log(gameData.price);
      console.log("📤 Claim request payload:", claimRequest);

      // Call backend
      const response = (await apiRequest(
        "/users/me/claims",
        "POST",
        claimRequest
      )) as ClaimGameResponse;

      // Update stats immediately with response data
      set({
        user: {
          stats: {
            totalGames: response.updated_stats.total_games,
            steamGames: response.updated_stats.steam_games,
            epicGames: response.updated_stats.epic_games,
            gogGames: response.updated_stats.gog_games,
            totalSaved: response.updated_stats.total_saved,
            steamValue: get().user?.stats.steamValue || 0,
            epicValue: get().user?.stats.epicValue || 0,
            gogValue: get().user?.stats.gogValue || 0,
          },
        },
        claimedGameNames: [...(get().claimedGameNames || []), gameData.title],
        isLoading: false,
      });

      toast.success(`${gameData.title} claimed!`, {
        description: `Added to your ${gameData.platform} stats.`,
      });

      console.log("✅ Game claimed successfully!", {
        game: gameData.title,
        moneySaved: response.money_saved,
        newStats: get().user?.stats,
      });

      return response;
    } catch (error) {
      toast.error(`Could not process claim for ${gameData.title}.`);
      console.error("❌ Failed to claim game:", error);

      let errorMessage = "Failed to claim game";
      if ((error as { message: string }).message?.includes("already claimed")) {
        errorMessage = "You have already claimed this game";
      } else if ((error as { message: string }).message?.includes("401")) {
        errorMessage = "Please login to claim games";
      }

      set({
        error: errorMessage,
        isLoading: false,
      });

      throw error;
    }
  },

  // 3. Load claimed games list (for profile page)
  loadClaimedGames: async (page = 0, store = null) => {
    set({ isLoading: true, error: null });

    try {
      console.log("📋 Loading claimed games...", { page, store });

      let url = `/users/me/games?page=${page}&limit=20`;
      if (store) {
        url += `&store=${store}`;
      }

      const response = (await apiRequest(url)) as FetchUserGamesResponse;

      set({
        claimedGames: response.games,
        user: {
          stats: {
            totalGames: response.stats.total_games,
            steamGames: response.stats.store_counts.steam,
            epicGames: response.stats.store_counts.epic_games,
            gogGames: response.stats.store_counts.gog,
            totalSaved: response.stats.total_saved,
            steamValue: get().user?.stats.steamValue || 0,
            epicValue: get().user?.stats.epicValue || 0,
            gogValue: get().user?.stats.gogValue || 0,
          },
        },
        isLoading: false,
      });

      console.log("✅ Claimed games loaded:", response.games.length);
      return response;
    } catch (error) {
      console.error("❌ Failed to load claimed games:", error);
      set({
        error: "Failed to load claimed games",
        isLoading: false,
      });
    }
  },

  // 4. Clear state on logout
  clearGameData: () => {
    console.log("🧹 Clearing game data...");
    set({
      user: {
        stats: {
          totalGames: 0,
          steamGames: 0,
          epicGames: 0,
          gogGames: 0,
          totalSaved: 0.0,
          steamValue: 0,
          epicValue: 0,
          gogValue: 0,
        },
      },
      claimedGames: [],
      isLoading: false,
      error: null,
    });
  },

  // 5. Utility functions
  hasClaimedGame: (gameName: string, store: string) => {
    const { claimedGames } = get();
    return claimedGames.some(
      (game) => game.game_name === gameName && game.store.name === store
    );
  },

  getStoreStats: (store: string) => {
    const { user } = get();
    const storeKey = (store.toLowerCase() + "Games") as keyof ClaimStats2;
    return user?.stats[storeKey] || 0;
  },

  clearError: () => set({ error: null }),

  // stats: {
  //   // prime: 0,
  //   steam: 0,
  //   epic: 0,
  //   gog: 0,
  // },

  currency: "€",

  currencyCode: "USD",
  currencyTitle: "Deals Under €10",
  // moneySaved: 0,

  // claimGame: (platform: string, gameTitle: string) => {
  //   const category = platformToCategoryMap[platform];
  //   if (category) {
  //     const prevStats = get().stats;
  //     const updatedStats = {
  //       ...prevStats,
  //       [category]: prevStats[category] + 1,
  //     };

  //     set({ stats: updatedStats });

  //     toast.success(`${gameTitle} claimed!`, {
  //       description: `Added to your ${categoryToDisplayNameMap[category]} stats.`,
  //     });
  //   } else {
  //     toast.error(`Could not process claim for ${gameTitle}.`);
  //   }
  // },

  // totalClaims: () => {
  //   const stats = get().stats;
  //   return Object.values(stats).reduce((sum, count) => sum + count, 0);
  // },

  // addGameMoney: (money) => {
  //   const moneySavedSoFar = get().moneySaved;
  //   const newTotal = parseFloat((moneySavedSoFar + money).toFixed(2));
  //   set({ moneySaved: newTotal });
  // },

  setCurrency: (currency) => {
    set({ currency: currency });
  },

  setCurrencyCode: (currencyCode) => {
    set({ currencyCode: currencyCode });
  },

  setCurrencyTitle: (currencyTitle) => {
    set({ currencyTitle: currencyTitle });
  },
}));
