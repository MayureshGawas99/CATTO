import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

import MapPage from "./pages/MapPage";
import DiscoverPage from "./pages/DiscoverPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

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
      <AppLayout />
    </BrowserRouter>
  );
}

function AppLayout() {
  const location = useLocation();
  const isStandalonePage = ["/login", "/verify-email"].includes(
    location.pathname,
  );

  return (
    <div className="flex h-screen flex-col">
      {!isStandalonePage && <Navbar />}
      <div className="min-h-0 grow overflow-hidden">
        <Routes>
          <Route path="/" element={<MapPage />} />

          <Route path="/discover" element={<DiscoverPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          <Route
            path="/collection"
            element={<Placeholder title="My Cats 🐾" />}
          />

          <Route path="/quests" element={<Placeholder title="Quests 🏆" />} />

          <Route path="/profile" element={<Placeholder title="Profile 👤" />} />
        </Routes>
      </div>

      {!isStandalonePage && <BottomNav />}
    </div>
  );
}
