"use client";

import { Plus, Radio, RotateCcw, Target, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { players } from "@/lib/sample-data";

type BatterStats = {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  out: boolean;
};

type Commentary = {
  over: string;
  text: string;
  tag: string;
};

type MatchState = {
  created: boolean;
  teamA: string;
  teamB: string;
  battingTeam: string;
  bowlingTeam: string;
  venue: string;
  toss: string;
  maxOvers: number;
  striker: string;
  nonStriker: string;
  bowler: string;
  score: number;
  wickets: number;
  legalBalls: number;
  extras: number;
  wides: number;
  noBalls: number;
  overSummary: string[];
  fallOfWickets: string[];
  commentary: Commentary[];
  batters: Record<string, BatterStats>;
};

const initialMatch: MatchState = {
  created: false,
  teamA: "Taad Cricket Club",
  teamB: "Rising Stars XI",
  battingTeam: "Taad Cricket Club",
  bowlingTeam: "Rising Stars XI",
  venue: "Taad Stadium",
  toss: "TCC won the toss and chose to bat",
  maxOvers: 20,
  striker: "Vinit",
  nonStriker: "Rishi",
  bowler: "Arjun",
  score: 0,
  wickets: 0,
  legalBalls: 0,
  extras: 0,
  wides: 0,
  noBalls: 0,
  overSummary: [],
  fallOfWickets: [],
  commentary: [],
  batters: {}
};

export default function LiveScoringPage() {
  const [match, setMatch] = useState<MatchState>(initialMatch);
  const [newBatter, setNewBatter] = useState("");
  const [nextBowler, setNextBowler] = useState("");

  const overText = useMemo(() => `${Math.floor(match.legalBalls / 6)}.${match.legalBalls % 6}`, [match.legalBalls]);
  const currentRunRate = match.legalBalls ? ((match.score / match.legalBalls) * 6).toFixed(2) : "0.00";
  const strikerStats = match.batters[match.striker] ?? createBatter(match.striker);
  const nonStrikerStats = match.batters[match.nonStriker] ?? createBatter(match.nonStriker);

  function createMatch() {
    setMatch((current) => ({
      ...current,
      created: true,
      score: 0,
      wickets: 0,
      legalBalls: 0,
      extras: 0,
      wides: 0,
      noBalls: 0,
      overSummary: [],
      fallOfWickets: [],
      commentary: [],
      batters: {
        [current.striker]: createBatter(current.striker),
        [current.nonStriker]: createBatter(current.nonStriker)
      }
    }));
  }

  function prepareMatch(current: MatchState) {
    if (current.created) return current;

    return {
      ...current,
      created: true,
      batters: {
        [current.striker]: createBatter(current.striker),
        [current.nonStriker]: createBatter(current.nonStriker)
      }
    };
  }

  function addRuns(runs: number) {
    setMatch((current) => {
      const active = prepareMatch(current);
      const striker = active.batters[active.striker] ?? createBatter(active.striker);
      const updatedStriker = {
        ...striker,
        runs: striker.runs + runs,
        balls: striker.balls + 1,
        fours: striker.fours + (runs === 4 ? 1 : 0),
        sixes: striker.sixes + (runs === 6 ? 1 : 0)
      };
      const legalBalls = active.legalBalls + 1;
      const overDone = legalBalls % 6 === 0;
      const rotateStrike = runs % 2 === 1;
      const shouldSwap = overDone ? !rotateStrike : rotateStrike;
      const next = shouldSwap
        ? { striker: active.nonStriker, nonStriker: active.striker }
        : { striker: active.striker, nonStriker: active.nonStriker };

      return {
        ...active,
        ...next,
        score: active.score + runs,
        legalBalls,
        overSummary: overDone ? [] : [...active.overSummary, String(runs)],
        batters: { ...active.batters, [active.striker]: updatedStriker },
        commentary: [
          createCommentary(active, `${active.striker} scores ${runs} run${runs === 1 ? "" : "s"} off ${active.bowler}.`, String(runs)),
          ...active.commentary
        ]
      };
    });
  }

  function addExtra(type: "Wide" | "No Ball", completedRuns: number) {
    setMatch((current) => {
      const active = prepareMatch(current);
      const extraRun = 1;
      const totalRuns = extraRun + completedRuns;
      const tag = `${type === "Wide" ? "Wd" : "Nb"}${completedRuns ? `+${completedRuns}` : ""}`;
      const shouldSwap = completedRuns % 2 === 1;
      const noBallBatter = active.batters[active.striker] ?? createBatter(active.striker);

      return {
        ...active,
        striker: shouldSwap ? active.nonStriker : active.striker,
        nonStriker: shouldSwap ? active.striker : active.nonStriker,
        score: active.score + totalRuns,
        extras: active.extras + extraRun,
        wides: active.wides + (type === "Wide" ? extraRun : 0),
        noBalls: active.noBalls + (type === "No Ball" ? extraRun : 0),
        overSummary: [...active.overSummary, tag],
        batters:
          type === "No Ball" && completedRuns > 0
            ? {
                ...active.batters,
                [active.striker]: {
                  ...noBallBatter,
                  runs: noBallBatter.runs + completedRuns,
                  fours: noBallBatter.fours + (completedRuns === 4 ? 1 : 0),
                  sixes: noBallBatter.sixes + (completedRuns === 6 ? 1 : 0)
                }
              }
            : active.batters,
        commentary: [
          createCommentary(
            active,
            `${type} from ${active.bowler}. ${totalRuns} run${totalRuns === 1 ? "" : "s"} added.`,
            tag
          ),
          ...active.commentary
        ]
      };
    });
  }

  function addWicket() {
    if (match.wickets >= 10) return;

    let replacement = newBatter.trim();
    if (!replacement && match.wickets < 9) {
      replacement = window.prompt("New batsman ka naam likho")?.trim() ?? "";
    }

    if (!replacement && match.wickets < 9) {
      window.alert("New batsman ka naam required hai.");
      return;
    }

    setMatch((current) => {
      const active = prepareMatch(current);
      const striker = active.batters[active.striker] ?? createBatter(active.striker);
      const legalBalls = active.legalBalls + 1;
      const overDone = legalBalls % 6 === 0;
      const wicketAt = `${active.score}/${active.wickets + 1} ${active.striker} (${overText})`;

      return {
        ...active,
        wickets: active.wickets + 1,
        legalBalls,
        striker: replacement || "Innings Over",
        overSummary: overDone ? [] : [...active.overSummary, "W"],
        fallOfWickets: [...active.fallOfWickets, wicketAt],
        batters: {
          ...active.batters,
          [active.striker]: { ...striker, balls: striker.balls + 1, out: true },
          ...(replacement ? { [replacement]: createBatter(replacement) } : {})
        },
        commentary: [createCommentary(active, `Wicket. ${active.striker} is out.`, "W"), ...active.commentary]
      };
    });
    setNewBatter("");
  }

  function swapStrike() {
    setMatch((current) => ({ ...current, striker: current.nonStriker, nonStriker: current.striker }));
  }

  function setBowlerForNextOver() {
    if (!nextBowler.trim()) return;
    setMatch((current) => ({ ...current, bowler: nextBowler.trim(), overSummary: [] }));
    setNextBowler("");
  }

  function resetMatch() {
    setMatch(initialMatch);
    setNewBatter("");
    setNextBowler("");
  }

  return (
    <>
      <Section eyebrow="Scoring desk" title="CricHeroes style live scoring">
        <div className="grid gap-5 xl:grid-cols-[1fr_390px]">
          <div className="space-y-5">
            <div className="glass rounded-lg p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-turf">{match.created ? "Live Match" : "Create a match to start scoring"}</p>
                  <h3 className="mt-1 text-2xl font-black">{match.teamA} vs {match.teamB}</h3>
                  <p className="mt-2 text-sm text-slate-400">{match.venue} - {match.toss}</p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-black text-gold">{match.score}/{match.wickets}</p>
                  <p className="text-slate-400">Overs {overText} / {match.maxOvers}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-4">
                <Mini label="Striker" value={`${match.striker} ${strikerStats.runs}(${strikerStats.balls})`} />
                <Mini label="Non-striker" value={`${match.nonStriker} ${nonStrikerStats.runs}(${nonStrikerStats.balls})`} />
                <Mini label="Bowler" value={match.bowler} />
                <Mini label="CRR" value={currentRunRate} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {(match.overSummary.length ? match.overSummary : ["Over summary"]).map((ball, index) => (
                  <span key={`${ball}-${index}`} className="grid h-10 min-w-10 place-items-center rounded-full bg-white/10 px-3 font-black text-white">{ball}</span>
                ))}
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="mb-5 flex items-center gap-2 text-2xl font-black"><Target className="text-gold" /> Score controls</h3>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
                {[0, 1, 2, 3, 4, 5, 6].map((run) => (
                  <button key={run} onClick={() => addRuns(run)} className="h-14 rounded-lg bg-turf text-xl font-black text-pitch-950 shadow-glow transition hover:scale-105">
                    {run}
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <ExtraPanel title="Wide" short="Wd" onAdd={(runs) => addExtra("Wide", runs)} />
                <ExtraPanel title="No Ball" short="Nb" onAdd={(runs) => addExtra("No Ball", runs)} />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button onClick={swapStrike} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 font-black hover:bg-white/10"><RotateCcw size={18} /> Swap</button>
                <button onClick={addWicket} className="rounded-lg bg-red-500 px-4 py-3 font-black text-white hover:bg-red-400">Wicket</button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <input value={newBatter} onChange={(event) => setNewBatter(event.target.value)} placeholder="New batsman after wicket" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                <div className="flex gap-2">
                  <input value={nextBowler} onChange={(event) => setNextBowler(event.target.value)} placeholder="Next over bowler" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                  <button onClick={setBowlerForNextOver} className="rounded-lg bg-white/10 px-4 py-3 font-black hover:bg-white/15">Set</button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <Panel title="Fall of wickets" items={match.fallOfWickets} empty="No wicket yet" />
              <div className="glass rounded-lg p-6">
                <h3 className="text-xl font-black">Wagon wheel</h3>
                <div className="mt-4 grid aspect-square place-items-center rounded-full border border-dashed border-turf/50 bg-turf/5 text-center text-slate-400">
                  Wagon wheel placeholder
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="mb-4 flex items-center gap-2 text-2xl font-black"><Radio className="text-turf" /> Ball by ball commentary</h3>
              <div className="space-y-3">
                {(match.commentary.length ? match.commentary : [{ over: "0.0", tag: "Start", text: "Create match and use score controls to begin commentary." }]).map((item, index) => (
                  <div key={`${item.over}-${index}`} className="rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-gold">{item.over}</p>
                      <p className="font-black text-white">{item.tag}</p>
                    </div>
                    <p className="mt-2 text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="glass rounded-lg p-6">
              <h3 className="flex items-center gap-2 text-xl font-black"><Plus className="text-gold" /> Create Match</h3>
              <div className="mt-5 grid gap-3">
                <input value={match.teamA} onChange={(event) => setMatch((current) => ({ ...current, teamA: event.target.value, battingTeam: event.target.value }))} placeholder="Team A" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                <input value={match.teamB} onChange={(event) => setMatch((current) => ({ ...current, teamB: event.target.value, bowlingTeam: event.target.value }))} placeholder="Team B" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                <input value={match.toss} onChange={(event) => setMatch((current) => ({ ...current, toss: event.target.value }))} placeholder="Toss" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                <input value={match.venue} onChange={(event) => setMatch((current) => ({ ...current, venue: event.target.value }))} placeholder="Venue" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                <input value={match.maxOvers} onChange={(event) => setMatch((current) => ({ ...current, maxOvers: Number(event.target.value) || 1 }))} placeholder="Overs" type="number" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                <input value={match.striker} onChange={(event) => setMatch((current) => ({ ...current, striker: event.target.value }))} placeholder="Opening batsman" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                <input value={match.nonStriker} onChange={(event) => setMatch((current) => ({ ...current, nonStriker: event.target.value }))} placeholder="Non-striker batsman" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                <input value={match.bowler} onChange={(event) => setMatch((current) => ({ ...current, bowler: event.target.value }))} placeholder="Bowler" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
                <button onClick={createMatch} className="rounded-lg bg-turf px-4 py-3 font-black text-pitch-950">{match.created ? "Restart Match" : "Create Match"}</button>
                <button onClick={resetMatch} className="rounded-lg border border-white/10 px-4 py-3 font-black text-white">Reset All</button>
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="text-xl font-black">Playing XI</h3>
              <div className="mt-4 grid gap-2">
                {players.slice(0, 11).map((player) => <p key={player.id} className="rounded-lg bg-white/5 px-3 py-2 text-sm">{player.name} - {player.role}</p>)}
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="flex items-center gap-2 text-xl font-black"><Trophy className="text-gold" /> Match summary</h3>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <p>Batting: {match.battingTeam}</p>
                <p>Bowling: {match.bowlingTeam}</p>
                <p>Extras: {match.extras} (Wd {match.wides}, Nb {match.noBalls})</p>
                <p>Partnership: {match.striker} and {match.nonStriker}</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section eyebrow="Scorecard" title="Current scorecard">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-white/10 text-sm uppercase tracking-[0.18em] text-slate-300">
              <tr><th className="p-4">Batter</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th><th>Status</th></tr>
            </thead>
            <tbody>
              {Object.values(match.batters).length ? Object.values(match.batters).map((batter) => (
                <tr key={batter.name} className="border-t border-white/10">
                  <td className="p-4 font-bold">{batter.name}</td>
                  <td>{batter.runs}</td>
                  <td>{batter.balls}</td>
                  <td>{batter.fours}</td>
                  <td>{batter.sixes}</td>
                  <td>{batter.balls ? ((batter.runs / batter.balls) * 100).toFixed(1) : "0.0"}</td>
                  <td>{batter.out ? "Out" : batter.name === match.striker ? "Batting *" : "Batting"}</td>
                </tr>
              )) : (
                <tr className="border-t border-white/10"><td className="p-4 text-slate-400" colSpan={7}>Create match to generate scorecard.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

function createBatter(name: string): BatterStats {
  return { name, runs: 0, balls: 0, fours: 0, sixes: 0, out: false };
}

function createCommentary(match: MatchState, text: string, tag: string): Commentary {
  return {
    over: `${Math.floor(match.legalBalls / 6)}.${match.legalBalls % 6}`,
    text,
    tag
  };
}

function Mini({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/10 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}

function ExtraPanel({ title, short, onAdd }: { title: string; short: string; onAdd: (runs: number) => void }) {
  return (
    <div className="rounded-lg border border-gold/20 bg-gold/5 p-4">
      <p className="mb-3 text-sm font-black text-gold">{title}</p>
      <div className="grid grid-cols-5 gap-2">
        {[0, 1, 2, 3, 4].map((runs) => (
          <button
            key={`${short}-${runs}`}
            onClick={() => onAdd(runs)}
            className="h-11 rounded-lg border border-gold/40 text-sm font-black text-gold transition hover:bg-gold/10"
          >
            {short} {runs}
          </button>
        ))}
      </div>
    </div>
  );
}

function Panel({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <div className="glass rounded-lg p-6">
      <h3 className="text-xl font-black">{title}</h3>
      <div className="mt-4 space-y-2">
        {(items.length ? items : [empty]).map((item) => <p key={item} className="rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-300">{item}</p>)}
      </div>
    </div>
  );
}
