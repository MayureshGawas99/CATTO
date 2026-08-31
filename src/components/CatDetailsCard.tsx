import { X, Camera, MapPin, Users } from "lucide-react";
import type { Cat } from "../types/cat";

interface Props {
  cat: Cat;
  onClose: () => void;
}

export default function CatDetailsCard({ cat, onClose }: Props) {
  return (
    <div className="absolute bottom-5 left-1/2 z-1000 w-[calc(100%-32px)] max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={cat.image}
          alt={cat.name}
          className="h-full w-full object-cover"
        />

        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
        >
          <X size={18} />
        </button>

        <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {cat.distance}m away
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-black text-zinc-900">{cat.name}</h2>

            <p className="mt-1 capitalize text-sm font-semibold text-orange-500">
              {cat.rarity} cat
            </p>
          </div>

          <div className="text-2xl">🐈</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-zinc-50 p-3">
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin size={15} />
              <span className="text-xs">Distance</span>
            </div>

            <p className="mt-1 font-bold">{cat.distance}m</p>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-3">
            <div className="flex items-center gap-2 text-zinc-400">
              <Users size={15} />
              <span className="text-xs">Captures</span>
            </div>

            <p className="mt-1 font-bold">{cat.captures}</p>
          </div>
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
          <Camera size={19} />
          Capture Cat
        </button>
      </div>
    </div>
  );
}
