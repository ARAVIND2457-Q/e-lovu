# Elovu
A front-end demo clone of a maternal-care (pregnancy) platform, built with React 19, TypeScript and Vite. It walks through the full patient journey — landing page, sign-in/sign-up, a pregnancy tracking dashboard, remote patient monitoring, an OBGYN clinician cohort view, a curated services marketplace, birth planning and a peer community feed.

> **Disclaimer:** This is a demo for learning purposes only. It is not affiliated with e-Lovu Health and is not a medical device. It is never a substitute for professional medical advice.

## Features
- **Landing page** — marketing site with feature highlights and entry points into auth.
- **Auth (demo)** — sign in / sign up flow, persisted to `localStorage` (`elovu.session.v1`). There is **no backend**: any valid-looking email with a 6+ character password works.
- **Patient dashboard** — gestational progress with week-by-week milestone data, kick counter, contraction timer, and vitals logging (blood pressure, glucose, weight) with automatic BP risk classification (normal / elevated / high-risk) and MAP calculation.
- **Clinician portal** — cohort dashboard of patient summaries showing risk status, latest vitals, RPM billing readiness and recent alerts.
- **Marketplace** — curated doula, lactation, mental-health, pelvic-floor and device services with pricing and insurance coverage notes.
- **Birth planning** — selectable birth-plan preferences and a hospital bag checklist.
- **Community** — peer discussion feed with topics, likes and replies.
- **Emergency modal** — global emergency contact / red-flag guidance accessible from the navbar.

## Tech stack
| Area | Tooling |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Icons | `lucide-react` |
| Charts | `recharts` |
| Utilities | `clsx`, `tailwind-merge`, `canvas-confetti` |
| Linting | Oxlint |

## Getting started
Requires Node.js 20+ and npm.

```bash
cd elovu-app
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

### Demo credentials
```
Email:    sarah@elovu.com
Password: lovu1234
```

These map to the seeded patient **Sarah Mitchell**. Any other valid-looking credentials also sign you in, seeded onto the same demo patient data with the name derived from the email.

## Scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project structure
```
elovu-app/
├─ index.html
├─ vite.config.ts          # React + Tailwind plugins
└─ src/
   ├─ App.tsx              # Routing between views (no router lib)
   ├─ main.tsx             # Entry point
   ├─ App.css / index.css  # Global styles
   ├─ context/
   │  └─ AuthContext.tsx   # Demo auth provider (localStorage-backed)
   ├─ components/
   │  ├─ LandingPage.tsx
   │  ├─ AuthScreen.tsx
   │  ├─ Navbar.tsx
   │  ├─ PatientDashboard.tsx
   │  ├─ HeroBanner.tsx
   │  ├─ WeekNavigator.tsx
   │  ├─ ClinicianPortal.tsx
   │  ├─ Marketplace.tsx
   │  ├─ BirthPlanning.tsx
   │  ├─ Community.tsx
   │  └─ EmergencyModal.tsx
   ├─ data/
   │  └─ mockData.ts       # Seed patient, vitals, milestones, marketplace, etc.
   └─ types/
      └─ index.ts          # Shared domain types
```

## How it works
Navigation is view state, not routes: `App.tsx` holds a `currentView` (`patient`, `clinician`, `marketplace`, `birth-plan`, `community`) and renders the matching component, gated behind `isAuthenticated` from `AuthContext`. Unauthenticated users see the landing page or the auth screen.

The signed-in account overlays the seeded demo patient so the dashboard reflects the name and due date you registered with. All clinical data comes from `src/data/mockData.ts` — nothing is fetched from a network.

## Notes & limitations
- No backend, database or real authentication — credentials are validated client-side only.
- All patient, clinician, marketplace and community data is mocked and static.
- The React Compiler is not enabled in this template.
