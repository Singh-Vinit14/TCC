"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  ["Home", "/"],
  ["Players", "/players"],
  ["Live", "/live-scoring"],
  ["Stats", "/statistics"],
  ["Gallery", "/gallery"],
  ["History", "/match-history"],
  ["Admin", "/admin"]
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("light", light);
    document.documentElement.classList.toggle("dark", !light);
  }, [light]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-pitch-950/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/60 bg-turf/15 font-black text-gold">TCC</span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.24em] text-gold">Taad</span>
            <span className="block text-lg font-black leading-4">Cricket Club</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white",
                pathname === href && "bg-turf/20 text-turf"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={() => setLight((value) => !value)} className="rounded-full border border-white/10 p-2 text-slate-200 hover:bg-white/10">
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button aria-label="Open menu" onClick={() => setOpen((value) => !value)} className="rounded-full border border-white/10 p-2 text-slate-200 lg:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
      {open && (
        <div className="grid gap-1 border-t border-white/10 px-4 py-3 lg:hidden">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10">
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
