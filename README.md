# Blog App — Full Stack Open: Next.js, Chapter 4

A blog application built with **Next.js (App Router)**, **NextAuth.js**
(Credentials provider), **Drizzle ORM** and **PostgreSQL**, styled with
**Tailwind CSS**. Implements every exercise of chapter 4
(*Authentication and more*) of the
[Full Stack Open: Next.js](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs)
course (University of Helsinki):

- Login with NextAuth.js + bcryptjs (ex. 11)
- User registration page with server-side validation (ex. 12, 15)
- Blog creation form with `useActionState` validation, values retained on
  error (ex. 13, 14)
- Notification system via React Context, Tailwind styled (ex. 16)
- Tailwind styling: navbar, blog list, blog detail, creation form (ex. 17)
- Personal `/me` page with API token generation (ex. 18)
- `GET /api/me` protected by `Authorization: Bearer <token>` (ex. 19)
- Personal reading list, grouped unread/read with "mark as read" (ex. 20, 21)
- Static homepage rendered from Markdown via MDX (ex. 22)
- Testing API routes `DELETE /api/testing/reset` and
  `POST /api/testing/users` (ex. 23)
- Playwright end-to-end tests from
  [fullstack-hy2020/next-js-tests](https://github.com/fullstack-hy2020/next-js-tests)
  (ex. 24)

## Getting started

```bash
npm install

# 1. environment
cp .env.example .env.local        # fill in DATABASE_URL + secrets
cp .env.example .env.test         # fill in DATABASE_URL + secrets (test db)

# 2. database
npm run db:push                   # push schema to the dev database

# 3. run
npm run dev
```

Secrets: set `AUTH_SECRET` (generate with `openssl rand -base64 32`).
The app also accepts the legacy `NEXTAUTH_SECRET` / `NEXTAUTH_URL` names used
by the course's test workflow.

## Running the end-to-end tests

```bash
NODE_ENV=test npm run db:push     # push schema to the test database
npm run test:e2e
```

(The Playwright config starts `next dev` with `NODE_ENV=test` automatically;
it reuses an already running server outside CI.)

## GitHub Actions

Copy of the course's workflow lives in `.github/workflows/playwright.yml`.
Add these repository secrets before pushing:

- `DATABASE_URL` — Neon test database URL (create a Neon DB in Vercel)
- `NEXTAUTH_SECRET` — any random string
- `NEXTAUTH_URL` — `http://localhost:3000`
