// Types based on the API response structure
interface Price {
  currency: string;
  amount: string;
  baseAmount: string;
  finalAmount: string;
  isDiscounted: boolean;
  discountPercentage: number;
  discountDifference: string;
  symbol: string;
  isFree: boolean;
  discount: number;
  isBonusStoreCreditIncluded: boolean;
  bonusStoreCreditAmount: string;
  promoId: string | null;
}

interface Product {
  id: number;
  title: string;
  image: string;
  url: string;
  price: Price;
  developer: string;
  publisher: string;
  genres: string[];
  isDiscounted: boolean;
  boxImage: string;
  // ... other properties you might need
}

export interface APIResponse {
  products: Product[];
  ts: string | null; // Could be a timestamp string or null
  page: number;
  totalPages: number;
  totalResults: number;
  totalGamesFound: number;
  totalMoviesFound: number;
}
