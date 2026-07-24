import { Section } from "@/components/ui/Section";
import { matches } from "@/lib/sample-data";

export const metadata = { title: "Match History" };

export default function MatchHistoryPage() {
  return (
    <Section eyebrow="Archive" title="Previous matches">
      <div className="space-y-5">
        {matches.filter((match) => match.status === "completed").map((match) => (
          <article key={match.id} className="glass rounded-lg p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">{match.title}</p>
                <h3 className="mt-2 text-2xl font-black">{match.teamA} vs {match.teamB}</h3>
                <p className="mt-2 text-slate-300">{match.venue} - {match.date}</p>
              </div>
              <p className="rounded-full bg-turf px-4 py-2 font-black text-pitch-950">{match.result}</p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Box label={match.teamA} value={match.teamAScore ?? "-"} />
              <Box label={match.teamB} value={match.teamBScore ?? "-"} />
              <Box label="Player of the Match" value={match.playerOfMatch ?? "-"} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-black text-white">{value}</p>
    </div>
  );
}
