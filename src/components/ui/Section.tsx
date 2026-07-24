import { ReactNode } from "react";

export function Section({ title, eyebrow, children }: { title: string; eyebrow?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-7">
        {eyebrow && <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>}
        <h2 className="text-3xl font-black text-white md:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
