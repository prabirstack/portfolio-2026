# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site built with Next.js 16, React 19, and TypeScript. Early-stage project with styling infrastructure, auth, database, and API layers scaffolded but not yet implemented.

## Commands

```bash
bun run dev      # Start development server
bun run build    # Production build
bun run start    # Start production server
bun run lint     # Run ESLint
bunx drizzle-kit # Database migrations (drizzle-kit)
```

Package manager is **Bun** (not npm/yarn/pnpm).

## Architecture

- **Framework:** Next.js 16 App Router with React Server Components enabled
- **Styling:** Tailwind CSS v4 + shadcn/ui (Radix Nova style) + CVA for variants + tailwind-merge via `cn()` helper
- **API:** tRPC (client + server) for type-safe endpoints
- **Auth:** better-auth
- **Database:** Drizzle ORM (with drizzle-kit for migrations)
- **Animation:** Motion (Framer Motion successor)
- **Icons:** Lucide React

## Key Conventions

- **Path alias:** `@/*` maps to project root
- **Component styling:** Use `cn()` from `@/lib/utils` for merging Tailwind classes. Build variants with CVA.
- **UI components:** Add via `bunx shadcn@latest add <component>` — they go to `components/ui/`. Use Radix primitives + `asChild` pattern for polymorphism.
- **Color system:** OKLch color space with CSS custom properties defined in `app/globals.css`. Light/dark mode via `.dark` class.
- **TypeScript:** Strict mode enabled, target ES2017.
- **ESLint:** Flat config (v9) with `core-web-vitals` and `typescript` presets.

## Directory Structure

```
app/           # Pages, layouts, and route handlers (App Router)
components/ui/ # shadcn/ui components
lib/           # Shared utilities (cn, etc.)
public/        # Static assets
```
