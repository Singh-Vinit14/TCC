"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Section } from "@/components/ui/Section";
import { players } from "@/lib/sample-data";
import { topBy } from "@/lib/utils";

const leaderboards = [
  ["Most Runs", (p: typeof players[number]) => p.stats.runs],
  ["Most Wickets", (p: typeof players[number]) => p.stats.wickets],
  ["Most Sixes", (p: typeof players[number]) => p.stats.sixes],
  ["Most Fours", (p: typeof players[number]) => p.stats.fours],
  ["Best Strike Rate", (p: typeof players[number]) => p.stats.strikeRate],
  ["Best Economy", (p: typeof players[number]) => -p.stats.economy],
  ["Most Catches", (p: typeof players[number]) => p.stats.catches]
] as const;

export default function StatisticsPage() {
  const chartData = players.map((player) => ({ name: player.name.split(" ")[0], runs: player.stats.runs, wickets: player.stats.wickets }));

  return (
    <>
      <Section eyebrow="Numbers" title="Club statistics">
        <div className="h-[360px] rounded-lg border border-white/10 bg-white/5 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#07130d", border: "1px solid rgba(255,255,255,.12)" }} />
              <Bar dataKey="runs" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="wickets" fill="#f6c85f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>
      <Section eyebrow="Leaderboard" title="Top rankings">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {leaderboards.map(([title, selector]) => (
            <div key={title} className="glass rounded-lg p-5">
              <h3 className="text-xl font-black text-gold">{title}</h3>
              <div className="mt-4 space-y-3">
                {topBy(players, selector, 5).map((player, index) => (
                  <div key={player.id} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                    <span>{index + 1}. {player.name}</span>
                    <span className="font-black">{Math.abs(selector(player))}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
