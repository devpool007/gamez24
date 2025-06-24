import { JSX } from "react/jsx-dev-runtime";

function randomSlug() {
  return Math.random().toString(36).substring(2, 10);
}

export interface Game {
  id: string;
  title: string;
  platform: string;
  price?: string;
  imageUrl: string;
  freeUntil: string | JSX.Element;
  urlSlug: string;
}

export const primeGames: Game[] = [
  {
    id: '1',
    title: 'Star Wars: Knights of the Old Republic',
    platform: 'PC',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x8f.jpg',
    freeUntil: 'July 15, 2025',
    urlSlug: randomSlug(),
  },
  {
    id: '2',
    title: "Baldur's Gate II: Enhanced Edition",
    platform: 'PC',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcv.jpg',
    freeUntil: 'August 5, 2025',
    urlSlug: randomSlug(),
  },
  {
    id: '3',
    title: 'Fallout 3: Game of the Year Edition',
    platform: 'PC',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1w1z.jpg',
    freeUntil: 'August 12, 2025',
    urlSlug: randomSlug(),
  },
  {
    id: '12',
    title: 'Dishonored',
    platform: 'PC',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vxt.jpg',
    freeUntil: 'August 19, 2025',
    urlSlug: randomSlug(),
  },
];

export const steamDeals: Game[] = [
  {
    id: '5',
    title: 'Cyberpunk 2077',
    platform: 'Steam',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg',
    freeUntil: 'Weekend Deal',
    urlSlug: randomSlug(),
  },
  {
    id: '6',
    title: "Sid Meier's Civilization VI",
    platform: 'Steam',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vce.jpg',
    freeUntil: 'Weekend Deal',
    urlSlug: randomSlug(),
  },
   {
    id: '7',
    title: 'Hades',
    platform: 'Steam',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co263g.jpg',
    freeUntil: 'Weekend Deal',
    urlSlug: randomSlug(),
  },
  {
    id: '8',
    title: 'Stardew Valley',
    platform: 'Steam',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg',
    freeUntil: 'Weekend Deal',
    urlSlug: randomSlug(),
  },
  {
    id: '13',
    title: 'Terraria',
    platform: 'Steam',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vct.jpg',
    freeUntil: 'Weekend Deal',
    urlSlug: randomSlug(),
  },
  {
    id: '14',
    title: 'The Binding of Isaac: Rebirth',
    platform: 'Steam',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcr.jpg',
    freeUntil: 'Weekend Deal',
    urlSlug: randomSlug(),
  },
];

export const epicGamesDeals: Game[] = [
  {
    id:'1',
    title: 'Control Ultimate Edition',
    platform: 'Epic Games',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2961.jpg',
    freeUntil: 'July 29, 2025',
    urlSlug: randomSlug(),
  },
  {
    id: '2',
    title: 'Alan Wake 2',
    platform: 'Epic Games',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co78fp.jpg',
    freeUntil: 'Permanent',
    urlSlug: randomSlug(),
  },
  {
    id: '3',
    title: 'Rise of the Tomb Raider',
    platform: 'Epic Games',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x3k.jpg',
    freeUntil: 'July 22, 2025',
    urlSlug: randomSlug(),
  },
  {
    id: '4',
    title: 'Among Us',
    platform: 'Epic Games',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co263e.jpg',
    freeUntil: 'Permanent',
    urlSlug: randomSlug(),
  },
];

export const gogDeals: Game[] = [
    {
    id: '2',
    title: 'The Elder Scrolls IV: Oblivion - GOTY Edition',
    platform: 'GOG',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2g2i.jpg',
    freeUntil: 'July 22, 2025',
    urlSlug: randomSlug(),
  },
  {
    id: '10',
    title: 'The Witcher 3: Wild Hunt',
    platform: 'GOG',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
    freeUntil: 'Permanent',
    urlSlug: randomSlug(),
  },
  {
    id: '17',
    title: 'Disco Elysium - The Final Cut',
    platform: 'GOG',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2724.jpg',
    freeUntil: 'Permanent',
    urlSlug: randomSlug(),
  },
  {
    id: '18',
    title: 'Hollow Knight',
    platform: 'GOG',
    imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg',
    freeUntil: 'Permanent',
    urlSlug: randomSlug(),
  },
];
