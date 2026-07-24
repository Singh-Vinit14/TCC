import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import { players } from "@/lib/sample-data";
import { slugToPlayer } from "@/lib/utils";

export function generateStaticParams() {
  return players.map((player) => ({ id: player.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = slugToPlayer(id);
  return { title: player ? player.name : "Player" };
}

export default async function PlayerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = slugToPlayer(id);
  if (!player) notFound();

  const stats = player.stats;

  return (
    <>
      <section className="stadium-lights px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[420px_1fr]">
          <div className="relative h-[520px] overflow-hidden rounded-lg">
            <Image src={player.image} alt={player.name} fill className="object-cover" priority />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">{player.role}</p>
            <h1 className="mt-3 text-5xl font-black text-white md:text-7xl">{player.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{player.bio}</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <StatCard label="Batting Style" value={player.battingStyle} />
              <StatCard label="Bowling Style" value={player.bowlingStyle} />
            </div>
          </div>
        </div>
      </section>
      <Section eyebrow="Career" title="Player statistics">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          <StatCard label="Matches" value={stats.matches} />
          <StatCard label="Runs" value={stats.runs} />
          <StatCard label="Wickets" value={stats.wickets} />
          <StatCard label="Strike Rate" value={stats.strikeRate} />
          <StatCard label="Batting Avg" value={stats.battingAverage} />
          <StatCard label="Bowling Avg" value={stats.bowlingAverage} />
          <StatCard label="Economy" value={stats.economy} />
          <StatCard label="Highest Score" value={stats.highestScore} />
          <StatCard label="Best Bowling" value={stats.bestBowling} />
          <StatCard label="Catches" value={stats.catches} />
        </div>
      </Section>
      <Section eyebrow="Awards" title="Honours">
        <div className="flex flex-wrap gap-3">
          {player.awards.map((award) => <span key={award} className="rounded-full border border-gold/40 px-5 py-3 font-bold text-gold">{award}</span>)}
        </div>
      </Section>
    </>
  );
}
