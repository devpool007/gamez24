export interface GogProduct {
  id: number;
  title: string;
  purchase_link: string;
  slug: string;
  content_system_compatibility: {
    windows: boolean;
    osx: boolean;
    linux: boolean;
  };
  languages: Record<string, string>; // dynamic keys like "en", "de", "fr"
  links: {
    purchase_link: string;
    product_card: string;
    support: string;
    forum: string;
  };
  in_development: {
    active: boolean;
    until: string | null;
  };
  is_secret: boolean;
  is_installable: boolean;
  game_type: string;
  is_pre_order: boolean;
  release_date: string | null;
  images: {
    background: string | null;
    logo: string | null;
    logo2x: string | null;
    sidebarIcon: string | null;
    sidebarIcon2x: string | null;
    menuNotificationAv: string | null;
    menuNotificationAv2: string | null;
  };
  dlcs: 
    | [] // in case of empty array like your first entry
    | {
        products: {
          id: number;
          link: string;
          expanded_link: string;
        }[];
        all_products_url: string;
        expanded_all_products_url: string;
      };
}
