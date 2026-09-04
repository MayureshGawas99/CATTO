import { useCallback, useEffect, useState, useRef } from "react";

import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";

import { LocateFixed, LoaderCircle } from "lucide-react";

import CatMarker from "../components/CatMarker";
import CatDetailsCard from "../components/CatDetailsCard";
import type { Cat } from "../types/cat";

const DEFAULT_LOCATION: [number, number] = [19.186604, 72.972137];

type Coordinates = [number, number];

function LocationController({
  onLocationFound,
  onLocationError,
}: {
  onLocationFound: (location: Coordinates) => void;
  onLocationError: () => void;
}) {
  const map = useMap();

  const [loading, setLoading] = useState(true);
  const watchIdRef = useRef<number | null>(null);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const startWatching = useCallback(() => {
    setLoading(true);
    stopWatching();

    if (!navigator.geolocation) {
      onLocationError();
      setLoading(false);
      return;
    }

    // Start watching position for real-time updates
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const location: Coordinates = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        onLocationFound(location);

        map.setView(location, map.getZoom(), { animate: false });

        setLoading(false);
      },
      () => {
        onLocationError();
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 20000,
      },
    );
  }, [map, onLocationFound, onLocationError, stopWatching]);

  useEffect(() => {
    // Start watching on component mount
    startWatching();

    return () => {
      stopWatching();
    };
  }, [startWatching, stopWatching]);

  return (
    <button
      onClick={startWatching}
      className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg transition hover:bg-zinc-50"
    >
      {loading ? (
        <LoaderCircle size={19} className="animate-spin" />
      ) : (
        <LocateFixed size={19} />
      )}
    </button>
  );
}

export default function MapPage() {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  const [nearbyCats] = useState<Cat[]>([]);

  const [locationError, setLocationError] = useState(false);

  const handleLocationFound = useCallback((location: Coordinates) => {
    setUserLocation(location);
    setLocationError(false);
  }, []);

  const handleLocationError = useCallback(() => {
    setLocationError(true);
  }, []);

  return (
    <main className="relative h-full w-full">
      <MapContainer
        center={DEFAULT_LOCATION}
        zoom={16}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationController
          onLocationFound={handleLocationFound}
          onLocationError={handleLocationError}
        />

        {/* User location */}
        {userLocation && (
          <>
            <CircleMarker
              center={userLocation}
              radius={25}
              pathOptions={{
                color: "#3b82f6",
                weight: 1,
                fillColor: "#3b82f6",
                fillOpacity: 0.08,
              }}
            />

            <CircleMarker
              center={userLocation}
              radius={9}
              pathOptions={{
                color: "white",
                weight: 4,
                fillColor: "#3b82f6",
                fillOpacity: 1,
              }}
            />
          </>
        )}

        {/* Nearby cats */}
        {nearbyCats.map((cat) => (
          <CatMarker key={cat.id} cat={cat} onClick={setSelectedCat} />
        ))}
      </MapContainer>

      {/* Nearby counter */}
      <div className="absolute left-4 top-4 z-1000 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-xl">
        <p className="text-xs font-medium text-zinc-500">Around you</p>

        <p className="mt-0.5 font-bold text-zinc-900">
          {nearbyCats.length} {nearbyCats.length === 1 ? "cat" : "cats"} nearby
          🐾
        </p>

        <p className="mt-1 text-[11px] font-medium tabular-nums text-zinc-500">
          {userLocation
            ? `${userLocation[0].toFixed(6)}, ${userLocation[1].toFixed(6)}`
            : "Locating..."}
        </p>
      </div>

      {/* GPS error */}
      {locationError && (
        <div className="absolute left-1/2 top-20 z-1000 -translate-x-1/2 rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
          Unable to get your location
        </div>
      )}

      {/* Cat details */}
      {selectedCat && (
        <CatDetailsCard
          cat={selectedCat}
          onClose={() => setSelectedCat(null)}
        />
      )}
    </main>
  );
}
