<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SimpliParts (AutoPrice.pro UI)

React + Vite + Tailwind/Shadcn UI for the AutoPrice.pro experience (Tekmetric ↔ PartsTech financial intelligence layer).

## Key Flows (UI)
- Dashboard: performance KPIs, savings trend, vendor scorecard, RO pipeline, top savings candidates.
- Upload Files: drop PDFs to ingest/trigger RO extraction (Tekmetric-ready).
- RO Audit (Search/Audit): enter RO#, fetch Tekmetric line items, audit against PartsTech, line-level replace/apply actions, export.
- RO Detail: single RO summary, audit history, line outcomes.
- Ask AI: chat shell to query RO data via LLM (wire to Edge/AI endpoint).
- Shop Settings / Support: settings and help.
- Auth: login/signup/forgot/reset via Supabase.

## Tech Stack
- React (Vite), TypeScript, Tailwind, Shadcn UI, Framer Motion (light use).
- Supabase auth/storage/functions (see `supabase/` for functions).
- Icons: lucide-react.

## Getting Started
Prereqs: Node 18+, npm

1) Install deps  
```bash
npm install
```

2) Env vars — create `.env.local` in `simpliparts/`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# Optional: add your LLM keys if you wire Ask AI or extraction locally
# GEMINI_API_KEY=...
```

3) Run dev server  
```bash
npm run dev
```
Visit the printed localhost URL (Vite default: http://localhost:5173).

## Supabase functions
Edge functions live under `supabase/functions/` (e.g., `send-reset-email`, `update-password`). Deploy/run via Supabase CLI:
```bash
supabase functions serve
supabase functions deploy <name>
```

## Project Structure (frontend)
- `App.tsx`: view-state router; header + page shells.
- `components/`: feature pages (`Dashboard`, `ROAudit`, `RODetail`, `UploadFiles`, `AskAI`, auth, settings).
- `components/ui/`: shared UI primitives.
- `lib/supabase.ts`: Supabase client (expects VITE_SUPABASE_URL/ANON_KEY).

## Notes for wiring backend/LLM
- RO Audit: hook Tekmetric fetch + PartsTech audit calls into `ROAudit` actions.
- Ask AI: connect textarea/send to your LLM endpoint (Vercel AI SDK / Supabase Edge) and stream responses into the chat area.
- Upload Files: connect dropzone to Supabase storage and trigger your ingestion pipeline.
