import type { Cat } from "../types/cat";

export const cats: Cat[] = [
  {
    id: "cat-001",
    name: "Mochi",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
    latitude: 19.18735,
    longitude: 72.97165,
    rarity: "common",
    distance: 110,
    captures: 4,
  },

  {
    id: "cat-002",
    name: "Shadow",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    latitude: 19.18575,
    longitude: 72.97325,
    rarity: "rare",
    distance: 180,
    captures: 12,
  },

  {
    id: "cat-003",
    name: "Snow",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce",
    latitude: 19.18815,
    longitude: 72.97275,
    rarity: "uncommon",
    distance: 260,
    captures: 7,
  },

  {
    id: "cat-004",
    name: "Tiger",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    latitude: 19.18495,
    longitude: 72.97155,
    rarity: "epic",
    distance: 390,
    captures: 3,
  },

  {
    id: "cat-005",
    name: "Luna",
    image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d",
    latitude: 19.18865,
    longitude: 72.97095,
    rarity: "legendary",
    distance: 470,
    captures: 1,
  },
];
