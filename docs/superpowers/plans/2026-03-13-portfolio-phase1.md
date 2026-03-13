# Portfolio Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Learning mode:** This plan is for a beginner programmer (Prabir) who will type all code himself. Each task starts with a concept lesson, then guided implementation, then code review. No code is written for him.

**Goal:** Build the foundation — database, auth, tRPC API, shared layout, Home, About, Work/Projects, Contact pages, blog scaffold, newsletter signup, and animation system.

**Architecture:** Next.js 16 App Router with RSC-first approach. PostgreSQL via Drizzle ORM. tRPC for type-safe API. better-auth for admin auth (email + Google + GitHub OAuth). Motion for animations. Proxy pattern for route protection.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Motion, tRPC, Drizzle ORM, PostgreSQL, better-auth, next-themes, react-hook-form, zod, uploadthing, Resend

**Spec:** `docs/superpowers/specs/2026-03-13-portfolio-design.md`

---

## File Structure (Phase 1)

```
.env.example                          ← Template for environment variables
.env.local                            ← Local environment (gitignored)
drizzle.config.ts                     ← Drizzle Kit configuration
next.config.ts                        ← Updated with standalone output
app/
  layout.tsx                          ← Root layout (fonts, themes, metadata)
  not-found.tsx                       ← Custom 404 page
  error.tsx                           ← Global error boundary (client component)
  loading.tsx                         ← Global loading state
  (marketing)/
    layout.tsx                        ← Shared nav + footer for public pages
    page.tsx                          ← Home page
    about/page.tsx                    ← About page
    contact/page.tsx                  ← Contact page
  (portfolio)/
    layout.tsx                        ← Shared nav + footer (reuses marketing layout components)
    work/page.tsx                     ← Projects grid
    work/[slug]/page.tsx              ← Individual case study
  (blog)/
    layout.tsx                        ← Shared nav + footer (reuses marketing layout components)
    blog/page.tsx                     ← Blog listing (scaffold only)
    blog/[slug]/page.tsx              ← Blog post (scaffold only)
  admin/
    layout.tsx                        ← Auth-guarded layout (proxy pattern)
    login/page.tsx                    ← Login page
    page.tsx                          ← Dashboard
    blog/page.tsx                     ← Blog management (scaffold)
    projects/page.tsx                 ← Projects management (scaffold)
    contacts/page.tsx                 ← Contact submissions viewer (scaffold)
  api/
    trpc/[trpc]/route.ts              ← tRPC HTTP handler
    auth/[...all]/route.ts            ← better-auth catch-all handler
components/
  ui/button.tsx                       ← Already exists
  shared/
    navbar.tsx                        ← Main navigation (client component)
    footer.tsx                        ← Footer (server component)
    theme-toggle.tsx                  ← Dark/light mode toggle (client component)
    mobile-nav.tsx                    ← Slide-out mobile menu (client component)
    newsletter-form.tsx               ← Newsletter signup (client component)
    availability-badge.tsx            ← "Available for work" indicator
  animations/
    scroll-reveal.tsx                 ← Scroll-triggered fade-in wrapper
    staggered-list.tsx                ← Staggered children animation
    text-reveal.tsx                   ← Hero text character animation
    page-transition.tsx               ← Page enter/exit animation
  admin/
    login-form.tsx                    ← Login form (client component)
    dashboard-stats.tsx               ← Stats cards
lib/
  utils.ts                            ← Already exists (cn helper)
  trpc/
    client.ts                         ← tRPC client setup
    server.ts                         ← tRPC server setup (context, router)
    react.tsx                         ← tRPC React provider (client component)
  db/
    schema.ts                         ← Drizzle schema (all tables)
    index.ts                          ← Database connection
    seed.ts                           ← Admin user seed script
  auth/
    index.ts                          ← better-auth server config
    client.ts                         ← better-auth client config
  seo/
    metadata.ts                       ← generateMetadata helpers
    json-ld.ts                        ← Structured data generators
server/
  trpc.ts                             ← tRPC init (context, procedure helpers)
  routers/
    index.ts                          ← Root router (merges all routers)
    projects.ts                       ← Projects public + admin procedures
    blog.ts                           ← Blog scaffold procedures (minimal for Phase 1)
    contacts.ts                       ← Contact form + admin procedures
    subscribers.ts                    ← Newsletter signup procedure
```

---

## Chunk 0: Git & GitHub Setup (Task 0)

### Task 0: GitHub Repository & Git Fundamentals

**Concept lesson:** How Git tracks changes, what commits are, what a remote is, and how GitHub fits into the workflow.

**Resources to study first:**
- Git official docs — "Getting Started": https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
- GitHub "Hello World" guide: https://docs.github.com/en/get-started/start-your-journey/hello-world

**Learning objectives:**
- Understand what a commit is (a snapshot of your project at a point in time)
- Understand local vs remote repositories
- Understand `.gitignore` — what it does and why it matters
- Understand `git push` and `git pull`

- [ ] **Step 1: Create a GitHub repository**

Go to https://github.com/new. Create a new repository:
- Name: `portfolio-2026` (or your preferred name)
- Visibility: Public (portfolios should be public — it's part of your brand)
- Do NOT initialize with README, .gitignore, or license (you already have a local repo)

Teaches: GitHub repository creation, public vs private repos

- [ ] **Step 2: Connect your local repo to GitHub**

Run: `git remote add origin https://github.com/YOUR_USERNAME/portfolio-2026.git`

Then verify with: `git remote -v`

Teaches: what a "remote" is — it's a bookmark pointing to your repo on GitHub

- [ ] **Step 3: Verify your `.gitignore`**

Open `.gitignore` and make sure `.env.local` and `.env*.local` are listed but `.env.example` is NOT ignored. If `.gitignore` has a broad `.env*` pattern, change it to:
```
.env.local
.env*.local
```

Teaches: `.gitignore` patterns — broad patterns can accidentally ignore files you want to commit

- [ ] **Step 4: Push your existing commits to GitHub**

Run: `git push -u origin main`

The `-u` flag sets up "tracking" so future `git push` commands know where to push.

Verify: visit your GitHub repo URL in the browser and see your code.

Teaches: pushing code, upstream tracking

- [ ] **Step 5: Explore your repo on GitHub**

Look at: commit history, file browser, the green code button. This is what recruiters and clients will see.

---

## Chunk 1: Foundation (Tasks 1-5)

### Task 1: Environment & Database Setup

**Concept lesson:** How PostgreSQL, Drizzle ORM, and environment variables work together in a Next.js project.

**Resources to study first:**
- Drizzle ORM docs — "Get Started with PostgreSQL": https://orm.drizzle.team/docs/get-started/postgresql-new
- PostgreSQL tutorial — "What is PostgreSQL?": https://www.postgresql.org/about/

**Files:**
- Create: `.env.example`
- Create: `.env.local` (gitignored)
- Create: `drizzle.config.ts`
- Create: `lib/db/index.ts`
- Create: `lib/db/schema.ts`
- Modify: `next.config.ts`
- Modify: `package.json` (add db scripts)
- Modify: `.gitignore`

**Learning objectives:**
- Understand connection strings and why secrets live in `.env.local`
- Understand Drizzle ORM: schema-as-code, type-safe queries, migration workflow
- Understand PostgreSQL: tables, columns, types, constraints, foreign keys
- Understand `output: 'standalone'` in Next.js config (needed for Docker later)

- [ ] **Step 1: Install Phase 1 dependencies**

Run: `bun add next-themes react-hook-form zod uploadthing resend postgres @t3-oss/env-nextjs @trpc/react-query @tanstack/react-query @hookform/resolvers`

Teaches: dependency management, why each package exists. Note: `@trpc/react-query` and `@tanstack/react-query` are needed for tRPC's React integration (Task 3). `@hookform/resolvers` connects zod to react-hook-form.

- [ ] **Step 2: Create `.env.example`**

Create the file with all required variables as empty placeholders with comments explaining each one. Reference the spec's Environment Variables section.

- [ ] **Step 3: Create `.env.local`**

Copy from `.env.example`, fill in local PostgreSQL connection string: `postgresql://postgres:password@localhost:5432/portfolio`

- [ ] **Step 4: Verify `.gitignore` handles env files correctly**

You already fixed this in Task 0 Step 3. Double-check that `.env.local` is ignored but `.env.example` is not.

- [ ] **Step 5: Update `next.config.ts`**

Add `output: 'standalone'` to the config object. This creates a self-contained build for Docker.

- [ ] **Step 6: Create `drizzle.config.ts`**

Configure Drizzle Kit with:
- `schema` pointing to `./lib/db/schema.ts`
- `out` pointing to `./lib/db/migrations`
- `dialect` set to `postgresql`
- `dbCredentials.url` reading from `process.env.DATABASE_URL`

Teaches: what a config file does, how Drizzle Kit uses it for migrations

- [ ] **Step 7: Create `lib/db/schema.ts`**

Define ALL tables from the spec using Drizzle's PostgreSQL schema builder:
- `posts` table with all columns (id as serial PK, title, slug with unique index, excerpt, content, cover_image, status with pgEnum, published_at, created_at with defaultNow, updated_at, meta_title, meta_description, meta_keywords, reading_time)
- `categories` table (id, name, slug with unique, description)
- `postCategories` join table (post_id FK, category_id FK, composite PK)
- `projects` table (id, title, slug unique, description, content, cover_image, live_url, github_url, tech_stack as jsonb, status pgEnum, featured boolean default false, sort_order integer, created_at, updated_at)
- `testimonials` table (id, client_name, client_role, client_company, client_image, quote, rating integer, project_id optional FK, featured boolean, status pgEnum)
- `contacts` table (id, name, email, subject, message, status pgEnum for unread/read/replied, created_at)
- `subscribers` table (id, email unique, status pgEnum for pending/confirmed/unsubscribed, confirmation_token, confirmed_at, created_at)

Export Drizzle relations for each table.

Teaches: relational database design, foreign keys, enums, indexes, default values, Drizzle's schema API

- [ ] **Step 8: Create `lib/db/index.ts`**

Set up the database connection using `postgres` driver + `drizzle()`. Export the `db` instance.

Teaches: connection pooling, why we create one shared instance

- [ ] **Step 9: Add db scripts to `package.json`**

Add scripts:
- `"db:generate"`: `drizzle-kit generate`
- `"db:migrate"`: `drizzle-kit migrate`
- `"db:push"`: `drizzle-kit push` (for dev — pushes schema directly)
- `"db:studio"`: `drizzle-kit studio` (visual DB browser)
- `"db:seed"`: `bun run lib/db/seed.ts`

- [ ] **Step 10: Start PostgreSQL locally and run first migration**

Run: `bun run db:generate` then `bun run db:push`
Verify tables exist using `bun run db:studio`

Teaches: migration workflow (generate SQL from schema changes, apply to database)

- [ ] **Step 11: Commit**

```bash
git add -A && git commit -m "feat: database setup with Drizzle ORM and PostgreSQL schema"
```

---

### Task 2: Authentication Setup (better-auth)

**Concept lesson:** How authentication works — sessions, cookies, OAuth flows, route protection via proxy pattern.

**Resources to study first:**
- better-auth docs — "Getting Started": https://www.better-auth.com/docs/introduction
- OAuth 2.0 simplified: https://aaronparecki.com/oauth-2-simplified/

**Files:**
- Create: `lib/auth/index.ts`
- Create: `lib/auth/client.ts`
- Create: `app/api/auth/[...all]/route.ts`
- Create: `lib/db/seed.ts`
- Create: `app/admin/login/page.tsx`
- Create: `components/admin/login-form.tsx`

**Learning objectives:**
- Understand session-based auth vs JWT (and why sessions are better here)
- Understand OAuth 2.0 flow (redirect → consent → callback → session)
- Understand the proxy pattern: checking auth in server components, not middleware
- Understand better-auth's API: `auth()` on server, `createAuthClient()` on client

- [ ] **Step 1: Create `lib/auth/index.ts`**

Configure better-auth server instance with:
- `database`: point to your Drizzle db instance using better-auth's Drizzle adapter
- `emailAndPassword`: enabled
- `socialProviders`: Google and GitHub with client IDs/secrets from env
- `session`: configure cookie settings

Teaches: auth server setup, how better-auth creates its own tables, OAuth provider config

- [ ] **Step 2: Create `lib/auth/client.ts`**

Create the client-side auth instance using `createAuthClient()`. Export `signIn`, `signOut`, `useSession` hooks.

Teaches: client vs server auth — why you need both

- [ ] **Step 3: Create `app/api/auth/[...all]/route.ts`**

Set up the catch-all API route that better-auth needs. Export GET and POST handlers from your auth instance.

Teaches: Next.js catch-all routes, how auth callbacks work

- [ ] **Step 4: Run better-auth migration**

Run: `bunx @better-auth/cli generate` then apply to your database.

Teaches: how better-auth manages its own tables alongside yours

- [ ] **Step 5: Create `lib/db/seed.ts`**

Write a seed script that creates the initial admin user with email and password using better-auth's admin API or direct DB insert.

Teaches: database seeding, why you need a seed script for admin-only apps

- [ ] **Step 6: Run the seed script**

Run: `bun run db:seed`
Verify the user exists in the database.

- [ ] **Step 7: Create `components/admin/login-form.tsx`**

Client component with email/password fields, Google OAuth button, GitHub OAuth button. Use `signIn` from auth client.

Teaches: client components, form handling, OAuth redirect flow

- [ ] **Step 8: Create `app/admin/login/page.tsx`**

Server component that renders the login form. If user is already authenticated, redirect to `/admin`.

Teaches: server-side auth checks, redirect patterns

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: authentication setup with better-auth (email + Google + GitHub)"
```

---

### Task 3: tRPC Setup

**Concept lesson:** How tRPC provides end-to-end type safety between your server and client without code generation.

**Resources to study first:**
- tRPC docs — "Quickstart": https://trpc.io/docs/quickstart
- tRPC with Next.js App Router: https://trpc.io/docs/client/nextjs/app-router

**Files:**
- Create: `server/trpc.ts`
- Create: `server/routers/index.ts`
- Create: `lib/trpc/server.ts`
- Create: `lib/trpc/client.ts`
- Create: `lib/trpc/react.tsx`
- Create: `app/api/trpc/[trpc]/route.ts`

**Learning objectives:**
- Understand RPC (Remote Procedure Call) vs REST vs GraphQL
- Understand tRPC's architecture: router → procedures → context
- Understand public vs protected procedures (auth gating)
- Understand server-side vs client-side tRPC callers

- [ ] **Step 1: Create `server/trpc.ts`**

Initialize tRPC with:
- Context creator that extracts session from better-auth
- `publicProcedure` (no auth required)
- `protectedProcedure` (auth required — throws if no session)
- Export `router`, `publicProcedure`, `protectedProcedure`

Teaches: tRPC initialization, context, procedure types, middleware

- [ ] **Step 2: Create `server/routers/index.ts`**

Create root router that will merge sub-routers. For now, export an empty app router.

Teaches: router composition pattern

- [ ] **Step 3: Create `lib/trpc/server.ts`**

Create server-side tRPC caller for use in React Server Components (direct calls, no HTTP).

Teaches: why RSC can call tRPC directly without HTTP overhead

- [ ] **Step 4: Create `lib/trpc/client.ts`**

Create client-side tRPC setup using `@trpc/client` with `httpBatchLink` pointing to `/api/trpc`.

Teaches: HTTP batching, why client components need HTTP but server components don't

- [ ] **Step 5: Create `lib/trpc/react.tsx`**

Create tRPC React provider (client component) that wraps the app with QueryClient and tRPC provider.

Teaches: React context providers, why client-side data fetching needs a provider

- [ ] **Step 6: Create `app/api/trpc/[trpc]/route.ts`**

Set up the tRPC HTTP handler route. Export GET and POST.

Teaches: how tRPC converts procedures into HTTP endpoints

- [ ] **Step 7: Add tRPC provider to root layout**

Wrap the app with the tRPC React provider in `app/layout.tsx`.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: tRPC setup with public and protected procedures"
```

---

### Task 4: Theme & Root Layout Setup

**Concept lesson:** How dark/light mode works with next-themes, CSS custom properties, and server-side rendering without flash of unstyled content.

**Resources to study first:**
- next-themes docs: https://github.com/pacocoursey/next-themes
- Next.js Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `components/shared/theme-toggle.tsx`

**Learning objectives:**
- Understand CSS custom properties for theming
- Understand why dark mode flashes without proper SSR handling
- Understand next-themes: ThemeProvider, useTheme hook, how it injects a script to prevent flash

- [ ] **Step 1: Install and configure next-themes**

Add `ThemeProvider` to root layout wrapping `{children}`. Set `attribute="class"`, `defaultTheme="system"`, `enableSystem`.

Teaches: why `attribute="class"` works with Tailwind's `dark:` variant

- [ ] **Step 2: Create `components/shared/theme-toggle.tsx`**

Client component using `useTheme()` hook. Button that cycles system → light → dark. Use a sun/moon icon from Lucide.

Teaches: client component pattern, useTheme hook, icon components

- [ ] **Step 3: Update root layout metadata**

Update the metadata export: title template (`%s | Prabir Singh`), default title, description, open graph defaults.

Teaches: Next.js metadata API, title templates, OG defaults

- [ ] **Step 4: Verify dark/light mode works**

Run `bun run dev`, toggle theme, verify no flash on page reload.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: dark/light mode with next-themes and root layout metadata"
```

---

### Task 5: Shared Layout — Navigation & Footer

**Concept lesson:** How Next.js route groups and nested layouts work. Server vs client components in navigation.

**Resources to study first:**
- Next.js docs — "Route Groups": https://nextjs.org/docs/app/building-your-application/routing/route-groups
- Next.js docs — "Layouts and Templates": https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates

**Files:**
- Create: `app/(marketing)/layout.tsx`
- Create: `components/shared/navbar.tsx`
- Create: `components/shared/mobile-nav.tsx`
- Create: `components/shared/footer.tsx`
- Create: `components/shared/availability-badge.tsx`

**Learning objectives:**
- Understand route groups `()` — shared layouts without URL segments
- Understand when nav MUST be a client component (interactivity, active states)
- Understand mobile-first responsive design with Tailwind
- Understand the sliding pill active indicator pattern

- [ ] **Step 1: Create `components/shared/navbar.tsx`**

Client component with:
- Logo/name linking to `/`
- Nav links: Work, Blog, About, Contact
- Active link indicator (sliding pill using Motion's `layoutId`)
- Theme toggle
- Mobile menu trigger (hamburger icon, hidden on desktop)
- Responsive: full nav on md+, hamburger on mobile

Teaches: `usePathname()` hook, Motion `layoutId` for shared layout animations, responsive hiding

- [ ] **Step 2: Create `components/shared/mobile-nav.tsx`**

Client component — slide-out sheet/drawer from the right:
- Same nav links as desktop
- Close button
- Overlay backdrop
- Motion animation for slide-in/out
- Touch target minimum 44x44px

Teaches: portal pattern, scroll locking, animation with Motion's `AnimatePresence`

- [ ] **Step 3: Create `components/shared/footer.tsx`**

Server component (no interactivity needed):
- Copyright with current year
- Social links (GitHub, LinkedIn, Twitter/X, email)
- "Available for work" badge
- Links to key pages

Teaches: why footer can be a server component (no hooks, no state)

- [ ] **Step 4: Create `components/shared/availability-badge.tsx`**

Small component with a pulsing green dot + "Available for projects" text.

Teaches: CSS pulse animation, semantic HTML

- [ ] **Step 5: Create `app/(marketing)/layout.tsx`**

Import and render Navbar + Footer wrapping `{children}`.

Teaches: how route group layouts work, component composition

- [ ] **Step 6: Verify layout renders on all marketing pages**

Run `bun run dev`, navigate between pages, verify nav and footer appear.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: shared marketing layout with navbar, mobile nav, and footer"
```

---

## Chunk 2: Animation System (Task 6)

### Task 6: Animation Components

**Concept lesson:** How Motion (Framer Motion) works — spring physics, viewport detection, GPU-accelerated transforms, `prefers-reduced-motion`, and the difference between mount animations, scroll-triggered animations, and layout animations.

**Resources to study first:**
- Motion docs — "Get Started": https://motion.dev/docs/react-quick-start
- Motion docs — "Scroll Animations": https://motion.dev/docs/react-scroll-animations

**Files:**
- Create: `components/animations/scroll-reveal.tsx`
- Create: `components/animations/staggered-list.tsx`
- Create: `components/animations/text-reveal.tsx`
- Create: `components/animations/page-transition.tsx`

**Learning objectives:**
- Understand Motion's `motion` component and animation props
- Understand `whileInView` for scroll-triggered animations
- Understand staggered children with `staggerChildren` in variants
- Understand `useReducedMotion()` hook for accessibility
- Understand `transform` and `opacity` as the only GPU-accelerated properties
- Understand `AnimatePresence` for exit animations

- [ ] **Step 1: Create `components/animations/scroll-reveal.tsx`**

Client component wrapper that:
- Fades in and translates up (y: 20 → 0, opacity: 0 → 1)
- Triggers `whileInView` with `once: true` (only animates once)
- Accepts `delay` prop for staggering when used manually
- Respects `prefers-reduced-motion` — renders children instantly if reduced motion preferred
- Animation duration: 500ms, spring ease

Teaches: `whileInView`, viewport detection, `useReducedMotion`, wrapper component pattern

- [ ] **Step 2: Create `components/animations/staggered-list.tsx`**

Client component that wraps a list of children and staggers their entrance:
- Parent uses `variants` with `staggerChildren: 0.08`
- Each child fades in + translates up
- Triggers on viewport entry
- Respects reduced motion

Teaches: Motion `variants`, parent-child animation orchestration, `staggerChildren`

- [ ] **Step 3: Create `components/animations/text-reveal.tsx`**

Client component for the hero headline:
- Splits text into words (or characters based on prop)
- Each word/character animates in with stagger
- Uses `clipPath` or `overflow: hidden` per word for a reveal effect
- Configurable delay and stagger timing

Teaches: text splitting technique, `clipPath` animation, per-element stagger

- [ ] **Step 4: Create `components/animations/page-transition.tsx`**

Client component that wraps page content:
- Fade in + slight upward slide on mount
- Uses `AnimatePresence` with `mode="wait"` for page transitions
- Keep it simple — no exit animation initially (can add later)

Teaches: `AnimatePresence`, mount/unmount animations, `mode="wait"` vs `mode="sync"`

- [ ] **Step 5: Test all animation components**

Create a temporary test page at `app/(marketing)/test-animations/page.tsx` with all four animation components. Verify:
- Scroll reveal triggers on scroll
- Staggered list staggers children
- Text reveal animates words
- Reduced motion setting disables animations (test in browser devtools)

- [ ] **Step 6: Delete the test page**

Remove `app/(marketing)/test-animations/` after verification.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: animation system with scroll-reveal, stagger, text-reveal, and page transition"
```

---

## Chunk 3: Public Pages (Tasks 7-10)

### Task 7: Home Page

**Concept lesson:** Hero section design, above-the-fold content strategy, CTA placement, and how RSC + client components coexist on one page.

**Files:**
- Create/Modify: `app/(marketing)/page.tsx`

**Learning objectives:**
- Understand "above the fold" — what users see without scrolling
- Understand mixing RSC and client components on one page
- Understand Next.js `Image` component for optimization
- Understand semantic HTML (main, section, h1, article)

- [ ] **Step 1: Build the Hero section**

Server component page that includes:
- `TextReveal` wrapping your name "Prabir Singh"
- `ScrollReveal` wrapping your positioning statement (one compelling line about what you do)
- Two CTAs: "View my work" (primary, links to /work) and "Get in touch" (secondary, links to /contact)
- Clean, minimal layout with generous whitespace

Teaches: semantic HTML, CTA hierarchy (primary vs secondary), composition with animation components

- [ ] **Step 2: Build the Selected Work section**

- Section heading "Selected Work"
- `StaggeredList` wrapping 3-4 project cards (hardcoded placeholder data for now)
- Each card: cover image placeholder, title, description, tech tags
- Cards link to `/work/[slug]`
- Hover: image subtle zoom, card lift with shadow

Teaches: grid layout with Tailwind, hover states, placeholder data pattern

- [ ] **Step 3: Build the Services Snapshot section**

- Brief section with 3 service cards (Design, Development, Mobile)
- Each card: icon, title, one-line description
- Link to `/services` (will be built in Phase 2 — will show your custom 404 page until then, which is fine)

- [ ] **Step 4: Build the Testimonials section (empty-state)**

- Section heading "What clients say"
- Design the empty state: subtle message like "Testimonials coming soon" with a tasteful placeholder layout
- Build the card structure (client name, role, company, quote) so it's ready when you have real data
- This section will be populated in Phase 3

Teaches: designing for empty states — how to make "no content yet" look intentional, not broken

- [ ] **Step 5: Build the Blog Highlights section**

- "Latest from the blog" heading
- 2-3 placeholder blog post cards (title, excerpt, date)
- Link to `/blog`

- [ ] **Step 6: Build the Newsletter CTA section**

- Import `NewsletterForm` component (will build in Task 13)
- For now, add a placeholder div

- [ ] **Step 7: Build the Final CTA section**

- "Let's work together" heading
- Brief compelling text
- CTA button to `/contact`

- [ ] **Step 8: Add page metadata**

Export `metadata` with title, description, and open graph for the home page.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: home page with hero, selected work, services, blog highlights, and CTAs"
```

---

### Task 8: About Page

**Concept lesson:** Personal branding for freelancers — storytelling, process presentation, and building trust.

**Files:**
- Create: `app/(marketing)/about/page.tsx`

**Learning objectives:**
- Understand personal narrative for freelancers
- Understand responsive image handling
- Understand icon grids with Lucide React
- Understand the process/timeline component pattern

- [ ] **Step 1: Build the Story section**

- H1: "About me" (or something more personal)
- First-person narrative (2-3 paragraphs placeholder)
- Profile photo using Next.js `Image` (use a placeholder for now)
- `ScrollReveal` wrapping paragraphs

- [ ] **Step 2: Build the Skills/Tools grid**

- Grid of technology/tool icons with labels
- Use Lucide icons or simple text badges for now
- Hover state: subtle scale + color change
- Categories: Design, Frontend, Backend, Mobile, Tools

Teaches: CSS grid, icon handling, hover micro-interactions

- [ ] **Step 3: Build the Process section**

- 4-step process: Discovery → Design → Develop → Deliver
- Each step: number, title, brief description
- Visual connector between steps (line or arrow)
- `StaggeredList` for entrance animation

Teaches: timeline/process UI pattern, visual connectors with CSS

- [ ] **Step 4: Add page metadata**

Export `metadata` for the About page.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: about page with story, skills grid, and process section"
```

---

### Task 9: Work/Projects Pages

**Concept lesson:** Portfolio case studies — how to present work to win clients. Also: dynamic routes with `[slug]` in Next.js.

**Resources to study first:**
- Next.js docs — "Dynamic Routes": https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- Next.js docs — "Data Fetching": https://nextjs.org/docs/app/building-your-application/data-fetching

**Files:**
- Create: `app/(portfolio)/work/page.tsx`
- Create: `app/(portfolio)/work/[slug]/page.tsx`
- Create: `server/routers/projects.ts`
- Modify: `server/routers/index.ts`

**Learning objectives:**
- Understand dynamic routes `[slug]` and `generateStaticParams`
- Understand case study structure (Problem → Approach → Solution → Results)
- Understand tRPC queries in server components
- Understand ISR with `revalidate`

- [ ] **Step 1: Create `server/routers/projects.ts`**

Define tRPC procedures:
- `list` (public): fetch all published projects ordered by sort_order
- `getBySlug` (public): fetch single project by slug, throw 404 if not found
- `featured` (public): fetch projects where featured = true, limit 4
- `listAll` (protected): fetch ALL projects including drafts (for admin panel)
- `create` (protected): insert new project
- `update` (protected): update project by id
- `delete` (protected): delete project by id

Teaches: tRPC procedure definitions, Drizzle select/insert/update/delete queries, input validation with zod

- [ ] **Step 2: Add projects router to root router**

Modify `server/routers/index.ts` to merge the projects router.

- [ ] **Step 3: Build `app/(portfolio)/work/page.tsx`**

- Page heading "My Work"
- Fetch all published projects via tRPC server caller
- `StaggeredList` of project cards
- Each card: cover image, title, excerpt, tech stack tags
- Category filter buttons (All, Web, Mobile, Design) — client component for interactivity
- Add `revalidate = 3600`

Teaches: server-side data fetching with tRPC, ISR configuration

- [ ] **Step 4: Build `app/(portfolio)/work/[slug]/page.tsx`**

- Fetch project by slug via tRPC server caller
- If not found, call `notFound()`
- Layout: cover image (full width), title, tech stack tags
- Case study body: rendered from content field
- Links to live site and GitHub if available
- `generateMetadata` for dynamic meta tags
- `generateStaticParams` for static generation of known slugs

Teaches: dynamic routes, `notFound()`, `generateMetadata`, `generateStaticParams`

- [ ] **Step 5: Create `app/(portfolio)/layout.tsx`**

Share the same nav/footer as marketing. Import from shared components.

Teaches: layout reuse across route groups

- [ ] **Step 6: Seed some test project data**

Add 2-3 test projects to the seed script and re-run it.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: work/projects pages with tRPC data fetching and dynamic routes"
```

---

### Task 10: Contact Page

**Concept lesson:** Form handling in Next.js — client-side validation, server-side processing, spam protection, and the honeypot pattern.

**Resources to study first:**
- react-hook-form docs — "Get Started": https://react-hook-form.com/get-started
- Zod docs: https://zod.dev/

**Files:**
- Create: `app/(marketing)/contact/page.tsx`
- Create: `server/routers/contacts.ts`
- Modify: `server/routers/index.ts`

**Learning objectives:**
- Understand react-hook-form + zod for type-safe validation
- Understand honeypot fields for spam prevention
- Understand form submission via tRPC mutation
- Understand server-side rate limiting concepts
- Understand success/error state handling in forms

- [ ] **Step 1: Create `server/routers/contacts.ts`**

Define tRPC procedures:
- `create` (public): validate with zod (name, email, subject, message), check honeypot field is empty, insert into contacts table with status "unread"
- `list` (protected): fetch all contacts ordered by created_at desc
- `updateStatus` (protected): update contact status by id

Teaches: zod input validation, honeypot check, Drizzle insert, server-side validation

- [ ] **Step 2: Add contacts router to root router**

- [ ] **Step 3: Build `app/(marketing)/contact/page.tsx`**

Server component page with:
- H1: "Get in touch"
- Brief copy about your availability
- `AvailabilityBadge` component
- Contact form as a client component island:
  - Fields: name, email, subject, message
  - Hidden honeypot field (labeled "website" or similar — bots fill it, humans don't see it)
  - Validation with zod schema + react-hook-form `useForm` with `zodResolver`
  - Submit via tRPC mutation
  - Loading state on submit button
  - Success message after submission
  - Error handling with toast/alert
- Alternative contact: email link, social links

Teaches: `useForm`, `zodResolver`, mutation handling, loading/success/error states, honeypot

- [ ] **Step 4: Add page metadata**

- [ ] **Step 5: Test the form end-to-end**

Submit a contact form, verify it appears in the database via Drizzle Studio.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: contact page with validated form and spam protection"
```

---

## Chunk 4: Admin & Blog Scaffold (Tasks 11-13)

### Task 11: Admin Layout & Dashboard

**Concept lesson:** The proxy pattern for route protection — checking authentication in server components instead of middleware.

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/page.tsx`
- Create: `components/admin/dashboard-stats.tsx`

**Learning objectives:**
- Understand proxy pattern: server-side session check in layout, redirect if unauthorized
- Understand how this differs from middleware (simpler, colocated, no Edge Runtime)
- Understand admin dashboard patterns

- [ ] **Step 1: Create `app/admin/layout.tsx`**

Server component that:
- Checks the session using better-auth server-side helper
- If no session → redirect to `/admin/login`
- If session exists → render children with a minimal admin nav (sidebar or top bar)
- Admin nav links: Dashboard, Blog, Projects, Contacts
- Sign out button

Teaches: server-side auth check (proxy pattern), `redirect()` from `next/navigation`

- [ ] **Step 2: Create `components/admin/dashboard-stats.tsx`**

Server component that fetches and displays:
- Total published posts count
- Total published projects count
- Unread contact submissions count
- Use Drizzle `count()` queries

Teaches: aggregate queries, dashboard pattern

- [ ] **Step 3: Create `app/admin/page.tsx`**

Import and render `DashboardStats`. Add recent activity section (latest contact, latest post).
Note: post count will show 0 until you add blog posts — that's expected.

- [ ] **Step 4: Create `app/admin/contacts/page.tsx` (scaffold)**

Basic list view of contact submissions:
- Fetch via tRPC `contacts.list`
- Display name, email, subject, date, status badge
- Click to expand and read full message
- Mark as read/replied buttons

This completes the admin nav links (Dashboard, Blog, Projects, Contacts all have pages).

- [ ] **Step 5: Test the auth flow**

1. Visit `/admin` while logged out → should redirect to `/admin/login`
2. Log in → should redirect to `/admin`
3. Verify dashboard stats render

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: admin layout with proxy auth protection and dashboard"
```

---

### Task 12: Admin Project Management

**Concept lesson:** CRUD operations — Create, Read, Update, Delete. Building admin forms that interact with your tRPC API.

**Files:**
- Create: `app/admin/projects/page.tsx`

**Learning objectives:**
- Understand CRUD UI patterns
- Understand form pre-filling for edit mode
- Understand optimistic updates vs refetching
- Understand the featured/draft/published workflow

- [ ] **Step 1: Build the projects list view**

Client component within the admin page:
- Table or card list of all projects (including drafts)
- Status badge (draft/published)
- Featured star toggle
- Edit and Delete buttons
- Fetch via tRPC

- [ ] **Step 2: Build the create/edit project form**

Modal or separate section with:
- Title, slug (auto-generated from title, editable), description, content textarea
- Cover image upload (placeholder for now — uploadthing integration later)
- Tech stack tags input
- Live URL, GitHub URL
- Status toggle (draft/published)
- Featured checkbox
- Save via tRPC mutation

Teaches: slug generation, controlled form inputs, tRPC mutations

- [ ] **Step 3: Wire up delete with confirmation**

Delete button shows confirmation dialog, then calls tRPC delete mutation.

Teaches: confirmation pattern, destructive action UX

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: admin project management CRUD"
```

---

### Task 13: Blog Scaffold & Newsletter Signup

**Concept lesson:** Scaffolding — building the structure now so you can fill in functionality later. Also: email double opt-in flow.

**Resources to study first:**
- Resend docs — "Send Email with Next.js": https://resend.com/docs/send-with-nextjs
- GDPR double opt-in explained: https://gdpr.eu/email-encryption/

**Files:**
- Create: `app/(blog)/blog/page.tsx`
- Create: `app/(blog)/blog/[slug]/page.tsx`
- Create: `app/(blog)/layout.tsx`
- Create: `app/admin/blog/page.tsx`
- Create: `server/routers/blog.ts`
- Create: `server/routers/subscribers.ts`
- Create: `components/shared/newsletter-form.tsx`
- Modify: `server/routers/index.ts`

**Learning objectives:**
- Understand scaffolding: building shells that will be filled in Phase 2
- Understand double opt-in: why it's required (GDPR), how the flow works
- Understand Resend for transactional email

- [ ] **Step 1: Create `server/routers/blog.ts` (scaffold)**

Define minimal tRPC procedures for now (full implementation in Phase 2):
- `list` (public): fetch all published posts ordered by published_at desc
- `getBySlug` (public): fetch single post by slug
- `listAll` (protected): fetch all posts including drafts (for admin)
- `create` (protected): insert new post
- `update` (protected): update post by id
- `delete` (protected): delete post by id

Add blog router to `server/routers/index.ts`.

Teaches: building a router scaffold — same pattern as projects but for posts

- [ ] **Step 2: Create blog listing scaffold `app/(blog)/blog/page.tsx`**

Server component with:
- H1: "Blog"
- Fetch posts via tRPC — if empty, show a tasteful "Coming soon" empty state
- Page metadata

- [ ] **Step 3: Create blog post scaffold `app/(blog)/blog/[slug]/page.tsx`**

Server component with:
- Fetch post by slug via tRPC blog router
- If not found, call `notFound()`
- Basic layout structure ready for Phase 2 (title, content, date)

- [ ] **Step 4: Create `app/(blog)/layout.tsx`**

Share the same nav/footer layout as marketing pages.

- [ ] **Step 5: Create blog admin scaffold `app/admin/blog/page.tsx`**

Similar to project admin but for posts. Basic CRUD list + create form shell.

- [ ] **Step 6: Create `server/routers/subscribers.ts`**

Define tRPC procedures:
- `subscribe` (public): validate email with zod, check if already subscribed, generate confirmation token, insert with status "pending", send confirmation email via Resend
- `confirm` (public): take token, find subscriber, update status to "confirmed", set confirmed_at

Teaches: token generation (`crypto.randomUUID()`), email sending, double opt-in flow

- [ ] **Step 7: Create `components/shared/newsletter-form.tsx`**

Client component:
- Email input + subscribe button
- Calls tRPC `subscribe` mutation
- Shows success message: "Check your email to confirm"
- Error handling for duplicate emails

Teaches: simple form without react-hook-form (it's just one field), mutation states

- [ ] **Step 8: Add newsletter form to Home page**

Replace the placeholder in the Home page with the actual `NewsletterForm` component.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: blog scaffold, newsletter signup with double opt-in"
```

---

## Chunk 5: Error States, SEO Foundation, & Polish (Tasks 14-16)

### Task 14: Error States

**Concept lesson:** Error boundaries, 404 pages, and loading states in Next.js App Router.

**Resources to study first:**
- Next.js docs — "Error Handling": https://nextjs.org/docs/app/building-your-application/routing/error-handling
- Next.js docs — "Loading UI": https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/error.tsx`
- Create: `app/loading.tsx`

**Learning objectives:**
- Understand `not-found.tsx` — triggered by `notFound()` function
- Understand `error.tsx` — React error boundary, MUST be a client component
- Understand `loading.tsx` — Suspense fallback for route segments

- [ ] **Step 1: Create `app/not-found.tsx`**

Server component:
- Clean 404 design consistent with your site aesthetic
- "Page not found" message
- Link back to home

- [ ] **Step 2: Create `app/error.tsx`**

Client component (required for error boundaries):
- Accepts `error` and `reset` props
- Shows error message
- "Try again" button calling `reset()`

Teaches: React error boundaries, why this must be `"use client"`

- [ ] **Step 3: Create `app/loading.tsx`**

Simple loading skeleton or spinner consistent with your design.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: custom 404, error boundary, and loading states"
```

---

### Task 15: SEO Foundation

**Concept lesson:** SEO metadata, structured data (JSON-LD), and why they matter for search engines and AI answer engines.

**Resources to study first:**
- Google — "Understand structured data": https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Schema.org — "Person": https://schema.org/Person

**Files:**
- Create: `lib/seo/metadata.ts`
- Create: `lib/seo/json-ld.ts`
- Modify: `app/layout.tsx`

**Learning objectives:**
- Understand `generateMetadata` and metadata conventions
- Understand JSON-LD structured data — what it is, how Google uses it
- Understand `Person` schema for your identity
- Understand `BreadcrumbList` for navigation context

- [ ] **Step 1: Create `lib/seo/metadata.ts`**

Helper functions:
- `createMetadata()`: takes title, description, optional OG image, returns a metadata object compatible with Next.js
- Handles title template, canonical URL, open graph, Twitter card

Teaches: metadata abstraction, DRY principle for SEO

- [ ] **Step 2: Create `lib/seo/json-ld.ts`**

Helper functions:
- `personJsonLd()`: returns Person structured data (your name, job title, URL, social profiles)
- `breadcrumbJsonLd()`: takes array of {name, url} and returns BreadcrumbList
- Returns JSON-LD as a script tag string

Teaches: JSON-LD format, Schema.org types, how to embed structured data

- [ ] **Step 3: Add Person JSON-LD to root layout**

Embed the Person structured data in the root layout so it appears on every page.

- [ ] **Step 4: Add breadcrumbs to key pages**

Add `breadcrumbJsonLd` to About, Work, Contact pages.

- [ ] **Step 5: Verify with Google's Rich Results Test**

Use the browser to test structured data renders correctly.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: SEO foundation with metadata helpers and JSON-LD structured data"
```

---

### Task 16: Final Polish & Responsive Audit

**Concept lesson:** Responsive design testing, accessibility basics, and performance awareness.

**Files:**
- Various existing files (modifications only)

**Learning objectives:**
- Understand mobile-first responsive design
- Understand basic accessibility: focus states, alt text, semantic HTML, skip-to-content
- Understand Lighthouse audits

- [ ] **Step 1: Responsive audit**

Test every page at 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop).
Fix any layout issues found.

- [ ] **Step 2: Accessibility pass**

- Add skip-to-content link in root layout
- Verify all images have alt text
- Verify all interactive elements are keyboard accessible
- Verify focus styles are visible
- Test with keyboard-only navigation

- [ ] **Step 3: Run Lighthouse audit**

Run `bun run build` then `bun run start`. Run Lighthouse in Chrome DevTools.
Target: Performance > 90, Accessibility > 90, SEO > 90.

- [ ] **Step 4: Fix any Lighthouse issues**

Address performance, accessibility, or SEO issues found.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: responsive design polish and accessibility improvements"
```

---

## Phase 1 Complete Checklist

At the end of Phase 1, verify:

- [ ] PostgreSQL running with all tables created
- [ ] Admin login works (email + Google + GitHub)
- [ ] tRPC API responds to public and protected calls
- [ ] Dark/light mode toggles without flash
- [ ] Home page renders with all sections and animations
- [ ] About page renders with story, skills, and process
- [ ] Work page lists projects from database
- [ ] Individual project pages render with dynamic routes
- [ ] Contact form submits and saves to database
- [ ] Newsletter signup sends confirmation email
- [ ] Admin dashboard shows stats
- [ ] Admin can CRUD projects
- [ ] Blog pages scaffolded (empty state)
- [ ] 404, error, and loading states work
- [ ] JSON-LD structured data on all pages
- [ ] All pages responsive (mobile → desktop)
- [ ] Lighthouse scores > 90 across the board
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Admin can view contact submissions
- [ ] All code pushed to GitHub repository
- [ ] Home page has testimonials empty state section
