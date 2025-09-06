// --- Types for your Epic Games API response ---

export type EpicGamesResponse = {
  data: {
    Catalog: {
      searchStore: {
        elements: GameElement[];
      };
    };
  };
};

export type GameElement = {
  title: string;
  id: string;
  namespace: string;
  description: string;
  effectiveDate: string; // ISO datetime string
  keyImages: KeyImage[];
  seller: {
    id: string;
    name: string;
  };
  productSlug: string | null;
  urlSlug: string;
  url: string | null;
  tags: Tag[];
  items: Item[];
  customAttributes: CustomAttribute[];
  categories: Category[];
  price: PriceInfo;
};

export type KeyImage = {
  type: string;
  url: string;
};

export type Tag = {
  id: string;
};

export type Item = {
  id: string;
  namespace: string;
};

export type CustomAttribute = {
  key: string;
  value: string;
};

export type Category = {
  path: string;
};

export type PriceInfo = {
  totalPrice: {
    discountPrice: number;
    originalPrice: number;
    voucherDiscount: number;
    discount: number;
    currencyCode: string;
    currencyInfo: {
      decimals: number;
    };
    fmtPrice: {
      originalPrice: string;
      discountPrice: string;
      intermediatePrice: string;
    };
  };
  lineOffers: {
    appliedRules: LineOffer[]; 
  }[];
};

export type LineOffer = {
  appliedRules: AppliedRule[];
};

export type AppliedRule = {
  id: string;
  endDate: string; // ISO datetime
  discountSetting: {
    discountType: "PERCENTAGE" | "FIXED_AMOUNT" | string; // extend as needed
  };
};