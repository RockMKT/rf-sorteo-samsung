# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Promotional raffle website for Rock&Feller's (Argentine restaurant chain). Users register with a coupon code to enter a Samsung 98" Smart TV giveaway. Single-page Next.js app in Spanish (Argentina).

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npm start        # Start production server
```

No test framework is configured.

## Tech Stack

- **Framework:** Next.js 14.2.5 (App Router), React 18, TypeScript (strict)
- **Styling:** Tailwind CSS 3.4 with custom brand theme
- **Animation:** Framer Motion 12.x
- **Database:** PostgreSQL via `pg` (node-postgres)
- **Email:** SendGrid via `@sendgrid/mail` with dynamic templates
- **Output mode:** standalone (configured in next.config.js)

## Architecture

**Single-page app** — all content lives on the root `/` route (`app/page.tsx`). No multi-page routing.

**Key directories:**
- `app/` — Next.js App Router: root layout, page, global CSS, and API routes
- `app/api/sorteo/route.ts` — sole API endpoint (POST): validates form, validates coupon against `coupon_codes` table, inserts into `raffle_participants` table, sends confirmation email
- `lib/db.ts` — pg Pool singleton with hot-reload safety
- `lib/validation.ts` — shared validators (used by both client and server) + SUCURSALES constant
- `components/` — all UI components (client-side with `'use client'`)
- `supabase/schema.sql` — PostgreSQL schema for `coupon_codes` and `raffle_participants` tables
- `public/` — static assets (images, logos, Gotham font files)

**Data flow:** `FormSorteo` component → client-side validation → POST `/api/sorteo` → server-side validation → coupon lookup → DB insert → SendGrid email → `ModalConfirmacion` on success.

**State management:** React `useState` only — no external state libraries. Modals and form state are component-local, with callback props for parent communication.

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (required)
- `SENDGRID` — SendGrid API key (optional; email sending is skipped if unset)

## Brand Design System

**Colors** (Tailwind classes `rf-*`):
- `rf-carbon` (#111111), `rf-dorado` (#fab915), `rf-negro` (#050505), `rf-gris` (#1A1A1A), `rf-texto` (#F0F0F0)

**Fonts:** Gotham Bold (`font-display`) for headings, Gotham Book (`font-sans`) for body. Font files in `public/`.

**Path alias:** `@/*` maps to the project root.

## Database Schema

Two tables: `coupon_codes` (valid coupon codes) and `raffle_participants` (registered entries). Only `coupon_code` has a unique constraint in `raffle_participants`. Schema defined in `supabase/schema.sql`.

## Conventions

- All UI text is in Spanish. Error messages, labels, and copy must remain in Spanish.
- Components are one-per-file, PascalCase filenames matching the component name.
- Constants (arrays like `SUCURSALES`, `COMBOS`) are defined as UPPER_SNAKE_CASE at the top of component files.
- Modals support Escape key and click-outside dismissal.
