export interface FetchUserGamesResponse {
  games: Games[];
  stats: Stats;
  pagination: Pagination;
}

export interface Games {
  id: number;
  game_name: string;
  store: Store;
  claimed_at: Date;
  money_saved: number;
  original_price: number;
  discounted_price: number;
  game_image_url: string;
  external_game_id: string;
}

interface Store {
  id: number;
  name: string;
  url: string;
}

interface Stats {
  total_games: number;
  total_saved: number;
  store_counts: {
    steam: number;
    epic_games: number;
    gog: number;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  has_next: boolean;
  has_previous: boolean;
}
