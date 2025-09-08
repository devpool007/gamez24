/**
 * Represents the detailed response for a single Steam App ID.
 * The key is the App ID (e.g., '2050650'), which maps to a Success object.
 */
export interface AppDetailsResponse {
  [appId: string]: {
    success: boolean;
    data: GameData;
  };
}

/**
 * The primary data object for the game.
 */
export interface GameData {
  type: string;
  name: string;
  steam_appid: number;
  required_age: string;
  is_free: boolean;
  controller_support: string;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: Requirements;
  mac_requirements: Requirements;
  linux_requirements: Requirements;
  legal_notice: string;
  drm_notice: string;
  developers: string[];
  publishers: string[];
  demos: Demo[];
  price_overview: PriceOverview;
  packages: number[];
  package_groups: PackageGroup[];
  platforms: Platforms;
  metacritic: Metacritic;
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  movies: Movie[];
  recommendations: Recommendations;
  achievements: Achievements;
  release_date: ReleaseDate;
  support_info: SupportInfo;
  background: string;
  background_raw: string;
  content_descriptors: ContentDescriptors;
  ratings: Ratings;
}

/**
 * System requirements structure (Minimum/Recommended).
 */
interface Requirements {
  minimum: string;
  recommended: string;
}

/**
 * Information about a game demo.
 */
interface Demo {
  appid: number;
  description: string;
}

/**
 * Price information.
 */
interface PriceOverview {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
}

/**
 * Defines purchase options/packages.
 */
interface PackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: SubscriptionOption[];
}

interface SubscriptionOption {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
}

/**
 * Platform availability.
 */
interface Platforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

/**
 * Metacritic score.
 */
interface Metacritic {
  score: number;
  url: string;
}

/**
 * Game categories/features (e.g., Single-player, Achievements).
 */
interface Category {
  id: number;
  description: string;
}

/**
 * Game genres.
 */
interface Genre {
  id: string;
  description: string;
}

/**
 * Game screenshot details.
 */
interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

/**
 * Game movie/trailer details.
 */
interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  webm: {
    '480': string;
    max: string;
  };
  mp4: {
    '480': string;
    max: string;
  };
  highlight: boolean;
}

/**
 * User recommendations/rating count.
 */
interface Recommendations {
  total: number;
}

/**
 * Achievements section.
 */
interface Achievements {
  total: number;
  highlighted: HighlightedAchievement[];
}

interface HighlightedAchievement {
  name: string;
  path: string;
}

/**
 * Game release date.
 */
interface ReleaseDate {
  coming_soon: boolean;
  date: string;
}

/**
 * Developer/publisher support contact information.
 */
interface SupportInfo {
  url: string;
  email: string;
}

/**
 * Content descriptor notes.
 */
interface ContentDescriptors {
  ids: number[];
  notes: string;
}

/**
 * Regional content ratings.
 */
interface Ratings {
  esrb: RatingInfo;
  pegi: RatingInfo & { descriptors: string; rating: string };
  usk: RatingInfo & { descriptors: string; rating: string };
  oflc: RatingInfo & { descriptors: string; rating: string };
  cero: RatingInfo & { descriptors: string; rating: string };
  kgrb: RatingInfo & { descriptors: string; rating: string };
  dejus: RatingInfo & { descriptors: string; rating: string };
  csrr: RatingInfo & { descriptors: string; rating: string };
  crl: RatingInfo;
  nzoflc: RatingInfo & { descriptors: string; rating: string };
  steam_germany: RatingInfo & { descriptors: string; rating: string; rating_generated: string; banned: string };
}

interface RatingInfo {
  use_age_gate: string;
  required_age: string;
}