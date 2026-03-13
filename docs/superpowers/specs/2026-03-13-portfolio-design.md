# Prabir Singh — Developer & Designer Portfolio

## Overview

A top-tier freelancer portfolio for Prabir Singh (full-stack developer, designer, mobile app developer) targeting small businesses and agencies. Minimal & clean aesthetic with subtle Awwwards-level micro-interactions. Includes a database-driven blog with SEO/AEO/GEO optimization and Google Analytics.

## Tech Stack

> **Note:** Next.js 16 is a recent release. If any App Router, RSC, or middleware APIs behave unexpectedly, consult the Next.js 16 release notes and migration guide. Fall back to the Next.js docs and GitHub issues for troubleshooting.

### Core
- Next.js 16 (App Router, React Server Components first)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4 + shadcn/ui (Radix Nova style)
- Motion (animation library, Framer Motion successor)
- tRPC (type-safe API layer)
- Drizzle ORM + PostgreSQL
- better-auth (admin authentication)

### Additional Libraries
| Library | Purpose |
|---|---|
| next-mdx-remote | Render MDX content from database |
| next-sitemap | Auto-generate sitemap.xml + robots.txt |
| satori / @vercel/og | Dynamic Open Graph image generation |
| next-themes | Dark/light mode (SSR-safe, no flash) |
| react-hook-form + zod | Type-safe form validation |
| uploadthing | Image uploads for blog/project images (hosted, no S3 config needed) |
| Resend | Transactional email (newsletter double opt-in confirmation) |

### Deployment
- Coolify on Hostinger VPS (self-hosted Docker-based deployment)
- Multi-stage Dockerfile: Node.js Alpine base → build stage (bun install + next build with `output: 'standalone'`) → production stage (non-root user, health check endpoint)
- Environment variables managed via Coolify UI

## Architecture

### Directory Structure

```
app/
  (marketing)/              ← Public pages grouped under shared layout
    layout.tsx              ← Shared nav + footer
    page.tsx                ← Home
    about/page.tsx
    services/page.tsx
    contact/page.tsx
  (portfolio)/              ← Work/Projects
    work/page.tsx           ← Projects grid
    work/[slug]/page.tsx    ← Individual case study
  (blog)/                     ← Blog (shares marketing layout)
    blog/
      page.tsx              ← Blog listing
      [slug]/page.tsx       ← Individual post
  admin/                    ← Protected admin panel
    layout.tsx              ← Auth-guarded layout
    login/page.tsx
    page.tsx                ← Dashboard
    blog/page.tsx           ← Manage posts
    projects/page.tsx       ← Manage projects
    testimonials/page.tsx   ← Manage testimonials
    contacts/page.tsx       ← View contact submissions
  not-found.tsx               ← Custom 404 page
  error.tsx                   ← Global error boundary
  loading.tsx                 ← Global loading state
  api/
    trpc/[trpc]/route.ts   ← tRPC handler
    auth/[...all]/route.ts  ← better-auth handler
components/
  ui/                       ← shadcn components
  shared/                   ← Nav, Footer, reusable components
  animations/               ← Motion wrapper components
  blog/                     ← Blog-specific components
  admin/                    ← Admin panel components
lib/
  utils.ts                  ← cn() and helpers
  trpc/                     ← tRPC client + server setup
  db/
    schema.ts               ← Drizzle schema (all tables)
    index.ts                ← DB connection
    migrations/             ← Drizzle migrations
  auth/                     ← better-auth config
  seo/                      ← SEO helpers (metadata generators, structured data)
server/
  routers/
    blog.ts                 ← Blog CRUD (admin) + list/getBySlug (public)
    projects.ts             ← Projects CRUD (admin) + list/getBySlug/featured (public)
    testimonials.ts         ← Testimonials CRUD (admin) + featured list (public)
    contacts.ts             ← Create (public form) + list/updateStatus (admin)
```

### Architecture Pattern
- React Server Components by default for all pages
- Client components only where interaction is required (animations, forms, toggles)
- tRPC with public procedures (no auth) and protected procedures (admin auth required)
- Route groups `(marketing)`, `(portfolio)`, and `(blog)` for layout sharing without affecting URLs
- Auth protection via server-side proxy pattern (check session in admin layout), not Next.js middleware
- Responsive: mobile-first design using Tailwind breakpoints (sm, md, lg, xl). Mobile nav uses slide-out menu. Touch targets minimum 44x44px.

### Caching Strategy
- Public portfolio pages (Home, About, Work, Services): ISR with `revalidate: 3600` (1 hour)
- Blog listing and posts: ISR with on-demand revalidation triggered from admin panel when content changes
- Admin pages: fully dynamic (no caching)
- Contact form: fully dynamic

## Database Schema

### posts
- id (PK), title, slug (unique), excerpt, content (MDX string), cover_image
- status (draft/published), published_at, created_at, updated_at
- meta_title, meta_description, meta_keywords
- reading_time (calculated on save)

### categories
- id (PK), name, slug, description

### post_categories (join table)
- post_id (FK → posts), category_id (FK → categories)

### projects
- id (PK), title, slug (unique), description, content (case study body)
- cover_image, live_url, github_url
- tech_stack (JSON array of strings — no filtering by tech needed, display-only)
- status (draft/published), featured (boolean), sort_order
- created_at, updated_at

### testimonials
- id (PK), client_name, client_role, client_company, client_image
- quote, rating (1-5)
- project_id (optional FK → projects)
- featured (boolean), status (draft/published)

### contacts
- id (PK), name, email, subject, message
- status (unread/read/replied), created_at

### subscribers
- id (PK), email (unique), status (pending/confirmed/unsubscribed)
- confirmation_token (for double opt-in), confirmed_at
- created_at

### Auth tables
- Managed by better-auth (users, sessions, etc.)

## Environment Variables

Required variables (documented in `.env.example`):
- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — Auth session secret
- `BETTER_AUTH_URL` — Base URL for auth (e.g., http://localhost:3000)
- `UPLOADTHING_TOKEN` — Uploadthing API token
- `RESEND_API_KEY` — Resend email API key
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4 measurement ID
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth credentials
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — GitHub OAuth credentials

## Pages & Content

### Home
- Hero: Name + positioning statement + text reveal animation
- Selected Work: 3-4 featured projects in grid/bento layout with hover interactions
- Services snapshot with links to Services page
- Testimonials carousel (featured, empty-state ready)
- Blog highlights: 2-3 latest posts
- Newsletter signup CTA
- Final CTA driving to Contact

### About
- Personal story (first person, conversational)
- Skills/tools icon grid with hover states
- Process: Discovery → Design → Develop → Deliver
- Personal touch: photo, human element

### Work/Projects
- Filter by category (Web, Mobile, Design)
- Project cards: cover image, title, tech stack tags, hover animation
- Case study page: Problem → Approach → Solution → Results

### Contact
- Form: name, email, subject, message (zod + react-hook-form validation)
- Honeypot field (hidden input) + server-side rate limiting for spam protection
- Alternative contact: email, social links
- Availability status indicator

### Blog
- Listing: cards with title, excerpt, date, reading time, category tags
- Post page: MDX rendering, table of contents, share buttons, related posts
- Per-post SEO: custom meta title, description, OG image, Article structured data

### Services (Phase 2)
- Service cards with description, inclusions, pricing/CTA
- FAQ section with FAQPage structured data

### Testimonials (Phase 3)
- Grid of client quotes with info and optional project link

### Resume/CV (Phase 3)
- Web version with PDF download option

## Animation & Micro-Interaction Strategy

### Principle
Every animation must have a purpose: guide attention, provide feedback, or create delight.

### Global
- Page transitions: fade + slight upward slide (Motion layout animations)
- Scroll reveal: fade in + translate up, staggered 50-100ms for lists/grids
- Native CSS smooth scroll for anchor links

### Micro-Interactions
- Nav: sliding pill indicator on active link
- Buttons: scale(0.97) on press, hover lift with shadow
- Cards: subtle image zoom on hover, border/shadow transition
- Links: underline animates left-to-right on hover
- Dark mode: smooth CSS transition on custom properties
- Form inputs: label float on focus, border color transition

### Hero (Signature)
- Text reveal: staggered character/word animation
- Subtle background: faint shifting gradient or minimal grain texture
- Scroll-linked: hero fades/scales as user scrolls

### Performance Rules
- Only `transform` and `opacity` for animations (GPU-accelerated)
- `will-change` used sparingly
- `prefers-reduced-motion` respected — animations disabled for users who request it
- No animation longer than 600ms
- Motion components lazy-loaded (no SSR blocking)

### Anti-Patterns (Avoid)
- No parallax on everything
- No long loading spinners
- No animations blocking content
- No distracting cursor followers

## SEO, AEO, GEO & Analytics

### SEO (Technical)
- Auto-generated sitemap.xml via next-sitemap
- robots.txt with crawl directives
- Canonical URLs on every page
- generateMetadata() on every route
- Clean URL slugs
- Next.js Image with alt tags, dimensions, lazy loading
- Core Web Vitals optimized via RSC-first approach

### SEO (On-Page)
- Meta title (< 60 chars) + description (< 155 chars) per page
- One H1 per page, logical heading hierarchy
- Internal linking between related posts
- Reading time on posts

### SEO (Content)
- Categories aligned with target keywords
- Long-form pillar content (1500+ words)
- Consistent publishing schedule

### AEO (Answer Engine Optimization)
- JSON-LD structured data on all page types:
  - Person (Home/About)
  - Article (blog posts)
  - Service (Services page)
  - FAQPage (Services FAQ)
  - BreadcrumbList (all pages)
- Question-answer format in blog H2s
- Clear, definitive statements (not vague language)

### GEO (Generative Engine Optimization)
- Cite authoritative sources in blog posts
- Include statistics and quantifiable claims
- Structured content: bullet points, numbered lists, tables
- Author authority signals: About page, social profiles, consistent byline

### Google Analytics 4
- Integrated via Next.js Script component
- Custom events: contact form submissions, project views, blog reads (scroll depth), CTA clicks, resume downloads
- Cookie consent banner (GDPR compliance) — analytics loads only after consent

## Authentication & Admin

### better-auth Configuration
- Single admin account (email + password + Google OAuth + GitHub OAuth)
- No public registration — OAuth restricted to your specific email
- Session-based authentication
- All `/admin/*` routes protected via proxy (server-side auth check in layout/page, not Next.js middleware) — this avoids middleware complexity and keeps auth logic colocated with routes
- Unauthenticated users redirected to `/admin/login`
- Initial admin user created via a one-time seed script (`lib/db/seed.ts`) run manually after first deployment

### Admin Dashboard
- `/admin` — Quick stats (posts, projects, unread contacts) + recent activity
- `/admin/blog` — CRUD posts, publish/draft toggle, SEO fields
- `/admin/projects` — CRUD projects, drag-to-reorder, featured toggle
- `/admin/testimonials` — CRUD testimonials, featured toggle
- `/admin/contacts` — View submissions, mark read/replied

## Phased Delivery

### Dependencies by Phase

**Phase 1:** `next-themes`, `react-hook-form`, `zod`, `uploadthing`, `resend`, `postgres` (pg driver)
**Phase 2:** `next-mdx-remote`, `next-sitemap`, `satori` / `@vercel/og`
**Phase 3:** (no new dependencies — GA4 loaded via Script tag)

### Phase 1 (Week 1-2)
- Project setup: PostgreSQL, Drizzle schema + migrations, tRPC, better-auth, admin seed script
- Shared layout: Nav + Footer with dark/light mode toggle
- Home page with hero animation, selected work, CTAs
- About page
- Work/Projects listing + case study pages
- Contact page with form
- Blog scaffold: DB schema, routes, admin CRUD (not public-facing yet)
- Newsletter email signup (homepage + blog) — subscribers table, double opt-in via Resend confirmation email
- Animation system: scroll reveal, page transitions, hover interactions

### Phase 2 (Week 2-3)
- Blog: full public-facing build (listing, post page, MDX rendering, TOC, related posts)
- Blog SEO: per-post metadata, OG images, Article structured data, sitemap
- Services page with FAQ
- Admin blog management polish

### Phase 3 (Week 3-4)
- Testimonials page + admin management
- Resume/CV page with PDF download
- Google Analytics 4 integration with consent banner
- Full structured data audit (Person, Service, FAQPage, BreadcrumbList)
- Performance optimization (Core Web Vitals audit)
- Dark/light mode polish
- Final animation polish and accessibility review
- Proper Dockerfile for Next.js standalone deployment via Coolify
- PostgreSQL backup strategy (pg_dump cron job via Coolify)

### Future (Month 2)
- Freemium subscriber dashboard (freelancing, open source, AI education content)
- Free tier + paid tier with gated content
- Newsletter email collection from Month 1 becomes the subscriber base
