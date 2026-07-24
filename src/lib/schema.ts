export const firestoreSchema = {
  players: {
    id: "string",
    name: "string",
    role: "Batter | Bowler | All-rounder | Wicket Keeper",
    battingStyle: "string",
    bowlingStyle: "string",
    bio: "string",
    image: "Firebase Storage URL",
    awards: "string[]",
    stats: "CareerStats"
  },
  matches: {
    id: "string",
    title: "string",
    teamA: "string",
    teamB: "string",
    venue: "string",
    date: "ISO date",
    status: "upcoming | live | completed",
    toss: "string",
    result: "string",
    playerOfMatch: "string"
  },
  innings: {
    matchId: "string",
    teamId: "string",
    runs: "number",
    wickets: "number",
    overs: "string",
    extras: "number"
  },
  balls: {
    matchId: "string",
    inningsId: "string",
    over: "string",
    batter: "string",
    bowler: "string",
    runs: "number",
    extras: "string",
    wicket: "string",
    commentary: "string",
    createdAt: "Timestamp"
  },
  scorecards: {
    matchId: "string",
    batting: "ScorecardRow[]",
    bowling: "BowlingRow[]",
    fallOfWickets: "string[]"
  },
  users: {
    uid: "string",
    name: "string",
    email: "string",
    role: "admin | scorer | viewer"
  },
  gallery: {
    id: "string",
    title: "string",
    image: "Firebase Storage URL",
    tag: "string",
    createdAt: "Timestamp"
  },
  news: {
    id: "string",
    title: "string",
    excerpt: "string",
    body: "string",
    publishedAt: "ISO date"
  }
};
