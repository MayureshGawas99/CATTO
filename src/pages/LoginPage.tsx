import type { FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

export default function LoginPage() {
  const navigate = useNavigate();

  function enterApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8f1] px-5 py-5 text-zinc-900">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-amber-200/50 blur-3xl" />

      <section className="relative w-full max-w-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/20">
            <img
              src={logo}
              alt="CATTO logo"
              className="h-12 w-12 object-contain"
            />
          </div>
          <span className="text-xl font-black tracking-tight">CATTO</span>
        </div>

        <div className="rounded-[28px] border border-orange-100 bg-white/90 p-7 shadow-[0_24px_70px_rgba(154,82,20,0.12)] backdrop-blur-xl sm:p-9">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-500">
            Welcome back
          </p>
          <h1 className="text-4xl font-black tracking-tight text-zinc-950">
            Find your next favorite cat.
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Sign in to keep your discoveries, quests, and collection together.
          </p>

          <form onSubmit={enterApp} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-700">
                Email
              </span>
              <div className="flex items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-4 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">
                <Mail size={18} className="text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="min-w-0 grow bg-transparent px-3 py-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 active:scale-[0.99]"
            >
              Continue
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs font-semibold text-zinc-400">
            <span className="h-px grow bg-zinc-200" />
            OR
            <span className="h-px grow bg-zinc-200" />
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white py-3.5 text-sm font-bold text-zinc-800 transition hover:bg-zinc-50 active:scale-[0.99]"
          >
            <span className="text-lg font-black leading-none text-[#4285F4]">
              G
            </span>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 flex w-full items-center justify-center text-sm font-bold text-orange-600 transition hover:text-orange-700"
          >
            Enter the app for now
          </button>
        </div>

        <p className="mt-6 text-center text-xs font-medium text-zinc-400">
          Your account will be connected when backend sign-in is available.
        </p>
      </section>
    </main>
  );
}
