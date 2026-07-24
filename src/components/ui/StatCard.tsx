export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-lg p-5">
      <p className="text-sm font-semibold text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </div>
  );
}
