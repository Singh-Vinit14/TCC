"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PlayerCard } from "@/components/ui/PlayerCard";
import { Section } from "@/components/ui/Section";
import { players } from "@/lib/sample-data";

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () => players.filter((player) => `${player.name} ${player.role}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <Section eyebrow="Squad" title="Taad Cricket Club players">
      <div className="mb-7 flex max-w-xl items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <Search size={20} className="text-slate-400" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search player" className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((player) => <PlayerCard key={player.id} player={player} />)}
      </div>
    </Section>
  );
}
