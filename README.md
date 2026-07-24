# Taad Cricket Club

Modern responsive cricket club website built with Next.js 15, React, TypeScript, Tailwind CSS, Firebase, Framer Motion and Recharts.

## Features

- Dark premium sports UI with green and gold accents
- Home, players, player profiles, live scoring, statistics, gallery, match history and admin panel
- Cricbuzz-style live score widgets, commentary, scorecard, extras, over summary and fall of wickets
- Player search, sample data for all requested players and responsive cards
- Firebase Authentication, Firestore, Storage helpers and security rules
- Real-time listener helpers for players, matches and live score state
- Recharts statistics dashboard
- PWA manifest and service worker
- SEO metadata through the Next.js App Router

## Setup

```bash
cd D:\Backened\Backened1\TCC
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Firebase Configuration

Create a Firebase web app, enable Authentication, Firestore and Storage, then fill `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Deploy Firestore rules from `firebase.rules` and Storage rules from `storage.rules`.

## Firestore Collections

The app is structured around these collections:

- `players`
- `matches`
- `innings`
- `balls`
- `scorecards`
- `users`
- `gallery`
- `news`
- `liveMatches`

The field-level schema is documented in `src/lib/schema.ts`.

## Sample Data

Sample data lives in `src/lib/sample-data.ts` for:

- Vinit
- Rishi
- Raishy
- Saswat
- Jaishy
- Krish
- Siddharth
- Amrit Raj Kashyap

Use this file as seed data for Firestore or keep it as a local fallback while building.

## Project Structure

```text
src/app              App Router pages
src/components       Layout, UI and section components
src/lib              Firebase, Firestore helpers, schema and sample data
src/types            TypeScript cricket interfaces
public               Manifest, icon and service worker
```

## Admin Notes

The admin page includes Firebase Auth login and UI forms for adding players, photos, matches, statistics and news. Hook the form submit handlers to the helper functions in `src/lib/firestore.ts` when your Firebase project is ready.
