import { liveMatch } from "@/lib/sample-data";

export function LiveScorePanel() {
  return (
    <div className="glass rounded-lg p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-turf">Live</p>
          <h3 className="mt-1 text-2xl font-black">{liveMatch.battingTeam} vs {liveMatch.bowlingTeam}</h3>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black text-gold">{liveMatch.score}/{liveMatch.wickets}</p>
          <p className="text-slate-400">Overs {liveMatch.overs}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <Mini label="CRR" value={liveMatch.currentRunRate} />
        <Mini label="RRR" value={liveMatch.requiredRunRate ?? "-"} />
        <Mini label="Extras" value={liveMatch.extras} />
        <Mini label="Partnership" value={liveMatch.partnership} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {liveMatch.overSummary.map((ball, index) => (
          <span key={`${ball}-${index}`} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 font-black text-white">{ball}</span>
        ))}
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/10 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}
