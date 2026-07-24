"use client";

import { collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GalleryItem, LiveMatchState, Match, NewsItem, Player } from "@/types/cricket";

export const collections = {
  players: "players",
  matches: "matches",
  innings: "innings",
  balls: "balls",
  scorecards: "scorecards",
  users: "users",
  gallery: "gallery",
  news: "news"
} as const;

export function listenToPlayers(callback: (players: Player[]) => void) {
  if (!db) return () => undefined;
  return onSnapshot(collection(db, collections.players), (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Player));
  });
}

export function listenToLiveMatch(matchId: string, callback: (match: LiveMatchState | null) => void) {
  if (!db) return () => undefined;
  return onSnapshot(doc(db, "liveMatches", matchId), (snapshot) => {
    callback(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as LiveMatchState) : null);
  });
}

export function listenToMatches(callback: (matches: Match[]) => void) {
  if (!db) return () => undefined;
  return onSnapshot(query(collection(db, collections.matches), orderBy("date", "desc")), (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Match));
  });
}

export async function savePlayer(player: Player) {
  if (!db) throw new Error("Firebase is not configured.");
  await setDoc(doc(db, collections.players, player.id), player);
}

export async function saveMatch(match: Match) {
  if (!db) throw new Error("Firebase is not configured.");
  await setDoc(doc(db, collections.matches, match.id), { ...match, updatedAt: Timestamp.now() });
}

export async function saveGalleryItem(item: GalleryItem) {
  if (!db) throw new Error("Firebase is not configured.");
  await setDoc(doc(db, collections.gallery, item.id), item);
}

export async function saveNewsItem(item: NewsItem) {
  if (!db) throw new Error("Firebase is not configured.");
  await setDoc(doc(db, collections.news, item.id), item);
}
