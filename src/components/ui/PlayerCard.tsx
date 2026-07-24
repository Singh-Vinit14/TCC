import Image from "next/image";
import Link from "next/link";
import { Player } from "@/types/cricket";

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Link href={`/players/${player.id}`} className="group glass overflow-hidden rounded-lg transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative h-56">
        <Image src={player.image} alt={player.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-950 via-transparent" />
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{player.role}</p>
        <h3 className="mt-1 text-2xl font-black text-white">{player.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{player.bio}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
          <span>{player.battingStyle}</span>
          <span>{player.bowlingStyle}</span>
        </div>
      </div>
    </Link>
  );
}
