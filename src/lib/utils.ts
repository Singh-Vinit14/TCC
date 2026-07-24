import { players } from "@/lib/sample-data";

export function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function toSlug(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

export function slugToPlayer(slug: string) {
  const normalizedSlug = toSlug(slug);
  return players.find((player) => toSlug(player.id) === normalizedSlug || toSlug(player.name) === normalizedSlug);
}

export function topBy<T>(items: T[], selector: (item: T) => number, count = 5) {
  return [...items].sort((a, b) => selector(b) - selector(a)).slice(0, count);
}
