"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, Mail, Menu, Phone, Trophy, X } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [showCreator, setShowCreator] = useState(false);

  return (
    <section className="stadium-lights relative min-h-[calc(100vh-72px)] overflow-hidden px-4">
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-pitch-950 to-transparent" />
      <div className="absolute bottom-10 left-1/2 h-40 w-[90vw] -translate-x-1/2 rounded-[50%] border border-turf/20 bg-turf/10 blur-sm" />
      <div className="absolute right-4 top-5 z-20">
        <button
          aria-label="Who made this website"
          onClick={() => setShowCreator((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-pitch-950/70 text-gold shadow-gold backdrop-blur transition hover:bg-gold/10"
        >
          {showCreator ? <X size={20} /> : <Menu size={22} />}
        </button>
        {showCreator && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass absolute right-0 mt-3 w-[min(88vw,330px)] rounded-lg p-5 shadow-gold"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Who made this?</p>
            <h3 className="mt-2 text-2xl font-black text-white">Made by Vinit</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <a href="tel:6201430721" className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3 transition hover:bg-white/10">
                <Phone size={18} className="text-turf" />
                6201430721
              </a>
              <a href="mailto:Vinitpratapsingh1314@gmail.com" className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3 transition hover:bg-white/10">
                <Mail size={18} className="text-turf" />
                <span className="break-all">Vinitpratapsingh1314@gmail.com</span>
              </a>
            </div>
          </motion.div>
        )}
      </div>
      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 py-12 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.34em] text-gold">Official club website</p>
          <h1 className="max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">Taad Cricket Club</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            It's a State Premium League where the best players from different states of India come together to showcase their talent and compete for the ultimate glory.

          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/live-scoring" className="inline-flex items-center gap-2 rounded-full bg-turf px-6 py-3 font-black text-pitch-950 shadow-glow">
              <Activity size={19} /> Live Score
            </Link>
            <Link href="/players" className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 font-black text-gold hover:bg-gold/10">
              <Trophy size={19} /> Meet Players
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="glass rounded-lg p-6 shadow-gold">
          <div className="grid aspect-square place-items-center rounded-lg border border-gold/30 bg-pitch-900">
            <div className="text-center">
              <div className="mx-auto grid h-40 w-40 place-items-center rounded-full border-8 border-gold bg-turf/15 text-5xl font-black text-white shadow-glow">TCC</div>
              <p className="mt-6 text-xl font-black text-gold">Taad Stadium Energy</p>
              <p className="mt-2 text-slate-400">Green pitch. Gold standard.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
