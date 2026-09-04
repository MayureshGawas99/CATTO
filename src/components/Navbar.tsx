import { User } from "lucide-react";

import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl  border-orange-500 text-white">
            <img
              src={logo}
              alt="CATTO logo"
              className="h-9 w-9 object-contain"
            />
          </div>

          <div>
            <div className="text-lg font-black tracking-tight text-zinc-900">
              CATTO
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-zinc-900">Narayan</p>
            <p className="text-xs text-zinc-500">Level 12 · 820 XP</p>
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
