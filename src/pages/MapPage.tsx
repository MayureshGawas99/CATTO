import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";

import { LocateFixed, Navigation, LoaderCircle } from "lucide-react";

import { spawnCats } from "../utils/catSpawner";

import CatMarker from "../components/CatMarker";
import CatDetailsCard from "../components/CatDetailsCard";
import type { Cat } from "../types/cat";

const DEFAULT_LOCATION: [number, number] = [19.186604, 72.972137];

type Coordinates = [number, number];

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const earthRadius = 6371000;

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(earthRadius * c);
}

function LocationController({
  onLocationFound,
  onLocationError,
}: {
  onLocationFound: (location: Coordinates) => void;
  onLocationError: () => void;
}) {
  const map = useMap();

  const [loading, setLoading] = useState(true);

  const locateUser = useCallback(() => {
    setLoading(true);

    map.locate({
      setView: false,
      enableHighAccuracy: true,
      maxZoom: 17,
    });
  }, [map]);

  useEffect(() => {
    const handleLocationFound = (event: any) => {
      const location: Coordinates = [event.latlng.lat, event.latlng.lng];

      onLocationFound(location);

      map.flyTo(location, 17, {
        animate: true,
        duration: 1.5,
      });

      setLoading(false);
    };

    const handleLocationError = () => {
      onLocationError();
      setLoading(false);
    };

    map.on("locationfound", handleLocationFound);

    map.on("locationerror", handleLocationError);

    // Get location automatically on first load
    locateUser();

    return () => {
      map.off("locationfound", handleLocationFound);

      map.off("locationerror", handleLocationError);
    };
  }, [map, locateUser, onLocationFound, onLocationError]);

  return (
    <button
      onClick={locateUser}
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

  const [nearbyCats, setNearbyCats] = useState<Cat[]>([]);

  const [locationError, setLocationError] = useState(false);

  const navigate = useNavigate();

  const handleLocationFound = useCallback((location: Coordinates) => {
    setUserLocation(location);
    setLocationError(false);

    const spawnedCats = spawnCats(location, 8);

    setNearbyCats(spawnedCats);
  }, []);

  const handleLocationError = useCallback(() => {
    setLocationError(true);
  }, []);

  return (
    <main className="relative h-screen w-full">
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
      <div className="absolute left-4 top-4 z-[1000] rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-xl">
        <p className="text-xs font-medium text-zinc-500">Around you</p>

        <p className="mt-0.5 font-bold text-zinc-900">
          {nearbyCats.length} {nearbyCats.length === 1 ? "cat" : "cats"} nearby
          🐾
        </p>
      </div>

      {/* GPS error */}
      {locationError && (
        <div className="absolute left-1/2 top-20 z-[1000] -translate-x-1/2 rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
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
