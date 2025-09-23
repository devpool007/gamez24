export interface ClaimGameResponse {
  success: boolean;
  message: string;
  claim_id: number;
  money_saved: number;
  updated_stats: {
    total_games: number;
    steam_games: number;
    epic_games: number;
    gog_games: number;
    total_saved: number;
  };
}
