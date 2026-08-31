import type { Cat } from "../types/cat";

type Coordinates = [number, number];

const CAT_NAMES = [
  "Mochi",
  "Shadow",
  "Snow",
  "Tiger",
  "Luna",
  "Simba",
  "Milo",
  "Oreo",
  "Coco",
  "Leo",
];

const RARITIES = [
  "common",
  "common",
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
] as const;

const CAT_IMAGES = [
  "https://images.unsplash.com/photo-1574158622682-e40e69881006",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
  "https://images.unsplash.com/photo-1533738363-b7f9aef128ce",
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d",
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generatePoint(
  center: Coordinates,
  radiusInMeters: number,
): Coordinates {
  const [lat, lng] = center;

  // Random angle
  const angle = Math.random() * Math.PI * 2;

  // Random distance
  const distance = Math.sqrt(Math.random()) * radiusInMeters;

  // Approximate meters -> degrees
  const latOffset = (distance * Math.cos(angle)) / 111320;

  const lngOffset =
    (distance * Math.sin(angle)) / (111320 * Math.cos((lat * Math.PI) / 180));

  return [lat + latOffset, lng + lngOffset];
}

export function spawnCats(userLocation: Coordinates, count = 8): Cat[] {
  return Array.from({ length: count }, (_, index) => {
    const spawnRadius = randomBetween(100, 900);

    const [latitude, longitude] = generatePoint(userLocation, spawnRadius);

    const rarity = RARITIES[Math.floor(Math.random() * RARITIES.length)];

    const name = CAT_NAMES[Math.floor(Math.random() * CAT_NAMES.length)];

    const image = CAT_IMAGES[Math.floor(Math.random() * CAT_IMAGES.length)];

    return {
      id: `spawned-cat-${Date.now()}-${index}`,
      name,
      image,
      latitude,
      longitude,
      rarity,
      distance: Math.round(spawnRadius),
      captures: Math.floor(Math.random() * 20),
    };
  });
}
