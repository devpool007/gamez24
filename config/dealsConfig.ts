import { steamDeals, epicGamesDeals, gogDeals } from '@/data/mock-games';

export const dealsConfig = {
  // prime: {
  //   title: 'Prime Gaming Freebies',
  //   games: primeGames,
  //   colorConfig: {
  //     sectionTitle: 'text-primary border-primary',
  //     gameCardIcon: 'text-primary',
  //     gameCardShadow: 'hover:shadow-primary/50',
  //   },
  // },
  steam: {
    title: 'Steam Deals',
    games: steamDeals,
    colorConfig: {
      sectionTitle: 'text-steam border-steam',
      gameCardIcon: 'text-steam',
      gameCardShadow: 'hover:shadow-steam/50',
    },
  },
  epic: {
    title: 'Epic Games Deals',
    games: epicGamesDeals,
    colorConfig: {
      sectionTitle: 'text-foreground border-foreground',
      gameCardIcon: 'text-foreground',
      gameCardShadow: 'hover:shadow-epic-shadow/50',
    },
  },
  gog: {
    title: 'GOG Deals',
    games: gogDeals,
    colorConfig: {
      sectionTitle: 'text-gog border-gog',
      gameCardIcon: 'text-gog',
      gameCardShadow: 'hover:shadow-gog/50',
    },
  },
};

export type DealCategory = keyof typeof dealsConfig;
