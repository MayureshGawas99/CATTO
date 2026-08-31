import { divIcon } from "leaflet";
import { Marker } from "react-leaflet";

import type { Cat } from "../types/cat";

interface Props {
  cat: Cat;
  onClick: (cat: Cat) => void;
}

const rarityColors = {
  common: "#fb923c",
  uncommon: "#22c55e",
  rare: "#3b82f6",
  epic: "#a855f7",
  legendary: "#eab308",
};

export default function CatMarker({ cat, onClick }: Props) {
  const color = rarityColors[cat.rarity];

  const icon = divIcon({
    className: "",
    html: `
      <div
        style="
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${color};
          border: 4px solid white;
          box-shadow: 0 4px 14px rgba(0,0,0,.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          cursor: pointer;
          transition: transform .15s;
        "
      >
        🐈
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

  return (
    <Marker
      position={[cat.latitude, cat.longitude]}
      icon={icon}
      eventHandlers={{
        click: () => onClick(cat),
      }}
    />
  );
}