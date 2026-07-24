export type PlayerRole = "Batter" | "Bowler" | "All-rounder" | "Wicket Keeper";

export interface CareerStats {
  matches: number;
  runs: number;
  wickets: number;
  strikeRate: number;
  battingAverage: number;
  bowlingAverage: number;
  economy: number;
  highestScore: string;
  bestBowling: string;
  fours: number;
  sixes: number;
  catches: number;
}

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  battingStyle: string;
  bowlingStyle: string;
  bio: string;
  image: string;
  awards: string[];
  stats: CareerStats;
}

export interface Match {
  id: string;
  title: string;
  teamA: string;
  teamB: string;
  venue: string;
  date: string;
  status: "upcoming" | "live" | "completed";
  toss?: string;
  result?: string;
  playerOfMatch?: string;
  teamAScore?: string;
  teamBScore?: string;
}

export interface BallUpdate {
  over: string;
  batter: string;
  bowler: string;
  runs: number;
  extras?: string;
  wicket?: string;
  commentary: string;
}

export interface LiveMatchState {
  id: string;
  matchId: string;
  battingTeam: string;
  bowlingTeam: string;
  score: number;
  wickets: number;
  overs: string;
  target?: number;
  currentRunRate: number;
  requiredRunRate?: number;
  extras: number;
  partnership: string;
  fallOfWickets: string[];
  overSummary: string[];
  balls: BallUpdate[];
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  tag: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}
