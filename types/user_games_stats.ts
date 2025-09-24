export interface UserGamesStats {
  user_id: number;
  total_games_claimed: number;
  store_breakdown: {
    steam: { games: number; money_saved: number };
    epic_games: { games: number; money_saved: number };
    gog: { games: number; money_saved: number };
  };
  total_money_saved: number;
  last_claimed_game?: {
    name: string;
    store: string;
    claimedAt: Date;
    moneySaved: number;
  };
  lastUpdated: Date;
}
