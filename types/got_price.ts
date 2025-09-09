export interface GOGPriceResponse {
  _links: {
    self: {
      href: string;
    };
    product: {
      href: string;
    };
  };
  _embedded: {
    prices: PriceEntry[];
  };
}

interface PriceEntry {
  currency: {
    code: string; // e.g. "EUR", "USD"
  };
  basePrice: string; // e.g. "2999 EUR"
  finalPrice: string; // e.g. "599 EUR"
  bonusWalletFunds: string; // e.g. "0 EUR"
}
