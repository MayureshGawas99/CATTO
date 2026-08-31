import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

import MapPage from "./pages/MapPage";
import DiscoverPage from "./pages/DiscoverPage";

function Placeholder({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-zinc-50 px-5 pb-24 pt-24">
      <h1 className="text-3xl font-black text-zinc-900">{title}</h1>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<MapPage />} />

          <Route path="/discover" element={<DiscoverPage />} />

          <Route
            path="/collection"
            element={<Placeholder title="My Cats 🐾" />}
          />

          <Route path="/quests" element={<Placeholder title="Quests 🏆" />} />

          <Route path="/profile" element={<Placeholder title="Profile 👤" />} />
        </Routes>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
