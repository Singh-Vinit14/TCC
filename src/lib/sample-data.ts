import { BallUpdate, GalleryItem, LiveMatchState, Match, NewsItem, Player } from "@/types/cricket";

const images = [
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1625401586060-f12be3d7cc57?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?auto=format&fit=crop&w=900&q=80"
];

export const players: Player[] = [
  {
    id: "vinit",
    name: "Vinit",
    role: "All-rounder",
    battingStyle: "Right hand bat",
    bowlingStyle: "Right arm medium",
    bio: "Aggressive middle order player who bats like Kohli and bowls like bumrah. ",
    image: "/players/Vinittt.jpg",
    awards: ["Club MVP 2025", "Fastest Fifty", "fastest hundred"],
    stats: { matches: 38, runs: 1240, wickets: 42, strikeRate: 148.8, battingAverage: 38.7, bowlingAverage: 18.4, economy: 6.7, highestScore: "94*", bestBowling: "4/18", fours: 112, sixes: 58, catches: 24 }
  },

  {
    id: "rishi",
    name: "Rishi",
    role: "Batter",
    battingStyle: "Left hand bat",
    bowlingStyle: "Off spin",
    bio: "Considered the most lalchat and most dishonest player, has been ban for more than 15 times for cheating in games.Cheating includes match fixing,ball tampering.",
    image: "/players/Rishiii.jpg",
    awards: ["Orange Cap 2025"],
    stats: { matches: 34, runs: 1395, wickets: 8, strikeRate: 135.4, battingAverage: 44.1, bowlingAverage: 29.2, economy: 7.4, highestScore: "108", bestBowling: "2/21", fours: 146, sixes: 36, catches: 19 }
  },

  {
    id: "raishy",
    name: "Raishy",
    role: "Wicket Keeper",
    battingStyle: "Right hand bat",
    bowlingStyle: "Right arm medium",
    bio: "Sharp keeper, loud organizer and fearless finisher who changes games in the last four overs.He is compared with pollard and holder because of his six hitting ability",
    image: "/players/Aman2.jpg",
    awards: ["Best Keeper", "Finisher Award"],
    stats: { matches: 31, runs: 815, wickets: 3, strikeRate: 152.1, battingAverage: 29.6, bowlingAverage: 31.3, economy: 8.1, highestScore: "72*", bestBowling: "1/14", fours: 66, sixes: 45, catches: 41 }
  },
  {
    id: "saswat",
    name: "Saswat",
    role: "Bowler",
    battingStyle: "left hand bat",
    bowlingStyle: "Left arm orthodox",
    bio: "Disciplined fast bowler who controls the middle overs with drift, angle and relentless accuracy.I serve for indian Navy and known for long hittinh sixes. He is compared with Hetmeyer because of his long hitting sixes",
    image: "/players/Saswat.jpg",
    awards: ["Purple Cap 2025"],
    stats: { matches: 36, runs: 286, wickets: 61, strikeRate: 108.7, battingAverage: 15.8, bowlingAverage: 14.9, economy: 5.9, highestScore: "36", bestBowling: "5/12", fours: 22, sixes: 11, catches: 17 }
  },
  {
    id: "jaishy",
    name: "Jaishy",
    role: "All-rounder",
    battingStyle: "Right hand bat",
    bowlingStyle: "Right arm off break",
    bio: "Emerged as the most consistent player in the recent years at TCC.",
    image: "/players/Jaishyyy.jpg",
    awards: ["Impact Player"],
    stats: { matches: 29, runs: 674, wickets: 29, strikeRate: 129.9, battingAverage: 27.0, bowlingAverage: 20.6, economy: 6.4, highestScore: "68", bestBowling: "3/16", fours: 54, sixes: 27, catches: 21 }
  },
  {
    id: "krish",
    name: "Krish",
    role: "Bowler",
    battingStyle: "Right hand bat",
    bowlingStyle: "Right arm fast",
    bio: "New ball enforcer who attacks the stumps and brings genuine pace to the TCC attack.",
    image: "/players/Krish.jpg",
    awards: ["Best New Ball Spell"],
    stats: { matches: 27, runs: 204, wickets: 47, strikeRate: 101.5, battingAverage: 12.0, bowlingAverage: 16.2, economy: 6.2, highestScore: "29*", bestBowling: "4/10", fours: 16, sixes: 9, catches: 12 }
  },
  {
    id: "siddharth",
    name: "Siddharth",
    role: "Batter",
    battingStyle: "Right hand bat",
    bowlingStyle: "Right arm medium",
    bio: "Elegant lauda who gives TCC quick starts and anchors chases with smart risk management.",
    image: "/players/Karu.jpg",
    awards: ["Best Opener"],
    stats: { matches: 33, runs: 1188, wickets: 12, strikeRate: 141.6, battingAverage: 36.0, bowlingAverage: 25.4, economy: 7.1, highestScore: "101*", bestBowling: "2/17", fours: 132, sixes: 31, catches: 18 }
  },
  {
    id: "amrit-raj-kashyap",
    name: "Amrit Raj Kashyap",
    role: "All-rounder",
    battingStyle: "Right hand bat",
    bowlingStyle: "Right arm medium",
    bio: "Big match competitor who blends power hitting with smart cutters on slower pitches.",
    image: "/players/Gungun.jpg",
    awards: ["Final Player of the Match"],
    stats: { matches: 35, runs: 996, wickets: 36, strikeRate: 144.3, battingAverage: 33.2, bowlingAverage: 19.8, economy: 6.8, highestScore: "87", bestBowling: "4/22", fours: 84, sixes: 52, catches: 20 }
  }
];

export const matches: Match[] = [
  { id: "m1", title: "TCC Premier Night", teamA: "Taad Cricket Club", teamB: "Rising Stars XI", venue: "Taad Stadium", date: "2026-07-20", status: "upcoming" },
  { id: "m2", title: "Monsoon Cup", teamA: "Taad Cricket Club", teamB: "Green Warriors", venue: "City Sports Arena", date: "2026-07-13", status: "live", toss: "TCC won the toss and chose to bat" },
  { id: "m3", title: "Summer Trophy Final", teamA: "Taad Cricket Club", teamB: "Falcon CC", venue: "Taad Stadium", date: "2026-07-05", status: "completed", teamAScore: "182/6", teamBScore: "164/9", result: "TCC won by 18 runs", playerOfMatch: "Vinit" }
];

export const balls: BallUpdate[] = [
  { over: "14.1", batter: "Vinit", bowler: "Arjun", runs: 4, commentary: "Width outside off and Vinit cuts hard through point." },
  { over: "14.2", batter: "Vinit", bowler: "Arjun", runs: 1, commentary: "Slower ball worked into the leg side." },
  { over: "14.3", batter: "Rishi", bowler: "Arjun", runs: 6, commentary: "Clean swing over long-on. TCC bench loved that one." },
  { over: "14.4", batter: "Rishi", bowler: "Arjun", runs: 0, commentary: "Beaten by a sharp cutter." },
  { over: "14.5", batter: "Rishi", bowler: "Arjun", runs: 2, commentary: "Soft hands into the gap, two more." },
  { over: "14.6", batter: "Rishi", bowler: "Arjun", runs: 1, extras: "wd", commentary: "Wide called as it slides down leg." }
];

export const liveMatch: LiveMatchState = {
  id: "live-1",
  matchId: "m2",
  battingTeam: "Taad Cricket Club",
  bowlingTeam: "Green Warriors",
  score: 142,
  wickets: 4,
  overs: "15.0",
  target: 178,
  currentRunRate: 9.46,
  requiredRunRate: 7.2,
  extras: 11,
  partnership: "Vinit/Rishi 52(31)",
  fallOfWickets: ["28/1 Siddharth", "64/2 Raishy", "89/3 Jaishy", "112/4 Krish"],
  overSummary: ["1", "4", "W", "0", "6", "2"],
  balls
};

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Night Match Lights", image: images[0], tag: "matchday" },
  { id: "g2", title: "Team Huddle", image: images[1], tag: "team" },
  { id: "g3", title: "Training Nets", image: images[2], tag: "training" },
  { id: "g4", title: "Trophy Moment", image: images[3], tag: "achievement" }
];

export const news: NewsItem[] = [
  { id: "n1", title: "TCC announces new season squad", excerpt: "Eight core players confirmed for the new campaign.", publishedAt: "2026-07-10" },
  { id: "n2", title: "Live scoring system goes digital", excerpt: "Fans can now follow ball-by-ball updates and full scorecards.", publishedAt: "2026-07-12" }
];
