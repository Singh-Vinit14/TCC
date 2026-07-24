import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { LiveScorePanel } from "@/components/sections/LiveScorePanel";
import { PlayerCard } from "@/components/ui/PlayerCard";
import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import { gallery, matches, players } from "@/lib/sample-data";
import { topBy } from "@/lib/utils";

export default function HomePage() {
  const upcoming = matches.find((match) => match.status === "upcoming");
  const latest = matches.find((match) => match.status === "completed");
  const performers = topBy(players, (player) => player.stats.runs + player.stats.wickets * 18, 3);

  return (
    <>
      <Hero />
      <Section eyebrow="Welcome" title="Built for players, fans and scorers">
        <div className="grid gap-5 lg:grid-cols-3">
          <StatCard label="Squad Players" value={players.length} />
          <StatCard label="Club Runs" value={players.reduce((sum, player) => sum + player.stats.runs, 0)} />
          <StatCard label="Club Wickets" value={players.reduce((sum, player) => sum + player.stats.wickets, 0)} />
        </div>
      </Section>
      <Section eyebrow="Match center" title="Upcoming and latest result">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="glass rounded-lg p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">Upcoming Match</p>
            <h3 className="mt-3 text-2xl font-black">{upcoming?.teamA} vs {upcoming?.teamB}</h3>
            <p className="mt-2 text-slate-300">{upcoming?.title} at {upcoming?.venue}</p>
            <p className="mt-4 text-turf">{upcoming?.date}</p>
          </div>
          <div className="glass rounded-lg p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">Latest Result</p>
            <h3 className="mt-3 text-2xl font-black">{latest?.result}</h3>
            <p className="mt-2 text-slate-300">{latest?.teamAScore} vs {latest?.teamBScore}</p>
            <p className="mt-4 text-turf">Player of the Match: {latest?.playerOfMatch}</p>
          </div>
        </div>
      </Section>
      <Section eyebrow="Live" title="Cricbuzz style live scoring">
        <LiveScorePanel />
      </Section>
      <Section eyebrow="Top performers" title="Impact players">
        <div className="grid gap-5 md:grid-cols-3">
          {performers.map((player) => <PlayerCard key={player.id} player={player} />)}
        </div>
      </Section>
      <Section eyebrow="Achievements" title="Club achievements">
        <div className="grid gap-4 md:grid-cols-3">
          {["Summer Trophy Champions", "8 match winning streak", "Best community cricket club"].map((item) => (
            <div key={item} className="glass rounded-lg p-6 text-xl font-black text-gold">{item}</div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Gallery" title="Latest photos">
        <div className="grid gap-4 md:grid-cols-4">
          {gallery.map((item) => (
            <Link key={item.id} href="/gallery" className="relative h-56 overflow-hidden rounded-lg">
              <Image src={item.image} alt={item.title} fill className="object-cover transition hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <p className="absolute bottom-4 left-4 font-black">{item.title}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
