"use client";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Upload, UserPlus, Newspaper, Trophy } from "lucide-react";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { players } from "@/lib/sample-data";
import { Section } from "@/components/ui/Section";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Login with a Firebase admin user to publish real data.");

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Logged in. Admin actions can now write to Firebase.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    }
  }

  async function logout() {
    await signOut(auth);
    setMessage("Logged out.");
  }

  return (
    <Section eyebrow="Admin" title="Club control panel">
      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <div className="glass rounded-lg p-6">
          <h3 className="text-xl font-black">Secure Login</h3>
          <p className="mt-2 text-sm text-slate-400">{message}</p>
          <div className="mt-5 grid gap-3">
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />
            <button onClick={login} className="rounded-lg bg-turf px-4 py-3 font-black text-pitch-950">Login</button>
            <button onClick={logout} className="rounded-lg border border-white/10 px-4 py-3 font-black text-white">Logout</button>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <AdminCard icon={<UserPlus />} title="Add players" fields={["Name", "Role", "Batting style", "Bowling style", "Short bio"]} />
          <AdminCard icon={<Upload />} title="Upload photos" fields={["Photo title", "Tag", "Firebase Storage path"]} />
          <AdminCard icon={<Trophy />} title="Create matches" fields={["Team A", "Team B", "Venue", "Date", "Toss"]} />
          <AdminCard icon={<Newspaper />} title="Publish news" fields={["Title", "Excerpt", "Body"]} />
        </div>
      </div>
      <div className="mt-8 glass rounded-lg p-6">
        <h3 className="text-xl font-black">Edit statistics</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="text-sm uppercase tracking-[0.18em] text-slate-400">
              <tr><th className="p-3">Player</th><th>Runs</th><th>Wickets</th><th>SR</th><th>Economy</th><th>Action</th></tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-t border-white/10">
                  <td className="p-3 font-bold">{player.name}</td><td>{player.stats.runs}</td><td>{player.stats.wickets}</td><td>{player.stats.strikeRate}</td><td>{player.stats.economy}</td>
                  <td><button className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

function AdminCard({ icon, title, fields }: { icon: React.ReactNode; title: string; fields: string[] }) {
  return (
    <div className="glass rounded-lg p-6">
      <h3 className="flex items-center gap-2 text-xl font-black text-gold">{icon}{title}</h3>
      <div className="mt-5 grid gap-3">
        {fields.map((field) => <input key={field} placeholder={field} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-turf" />)}
        <button className="rounded-lg bg-gold px-4 py-3 font-black text-pitch-950">Save</button>
      </div>
    </div>
  );
}
