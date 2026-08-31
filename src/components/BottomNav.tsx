import { Camera, Map, PawPrint, Trophy, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Map", path: "/", icon: Map },
  { label: "Discover", path: "/discover", icon: Camera },
  { label: "Cats", path: "/collection", icon: PawPrint },
  { label: "Quests", path: "/quests", icon: Trophy },
  { label: "Profile", path: "/profile", icon: User },
];

export default function BottomNav() {
  return (
    <nav className="border-t border-zinc-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {items.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
                isActive ? "text-orange-500" : "text-zinc-400"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
