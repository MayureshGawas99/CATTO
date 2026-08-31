export type CatRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

export interface Cat {
  id: string;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
  rarity: CatRarity;
  distance: number;
  captures: number;
}