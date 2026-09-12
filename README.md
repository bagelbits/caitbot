# Caitbot

Caitbot generates randomized skill sequences for an apparatus (e.g. trampoline, bars). Pick an apparatus, add one or more trick types to the sequence, and hit **Generate** — the app picks a random trick of each requested type performed on that apparatus and displays it as an expandable list with its description.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [MUI](https://mui.com/) for UI components
- [SWR](https://swr.vercel.app/) for data fetching
- [Prisma](https://www.prisma.io/) + PostgreSQL for data storage

## Data model

Defined in [`src/prisma/schema.prisma`](src/prisma/schema.prisma):

- **Apparatus** — a piece of equipment (e.g. Trampoline, Bars)
- **TrickType** — a category of trick (e.g. Twist, Flip)
- **Trick** — a specific move, with a name, description, and optional YouTube ID; belongs to a `TrickType` and can be performed on multiple `Apparatus`

## Getting started

1. Create a `.env` file with a `DATABASE_URL` pointing to a PostgreSQL database, e.g. `DATABASE_URL="postgresql://user:password@localhost:5432/caitbot"`.
2. Install dependencies and apply migrations:

   ```bash
   yarn install
   yarn prisma migrate deploy
   ```

3. Run the dev server:

   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `yarn dev` — start the dev server
- `yarn build` — production build
- `yarn start` — run the production build
- `yarn lint` — lint the project

## API routes

All routes live under `src/app/api/`:

- `GET /api/apparatuses`, `GET /api/apparatuses/[id]`
- `GET /api/trick_types`, `GET /api/trick_types/[id]`
- `GET /api/tricks`, `GET /api/tricks/[id]`
- `GET /api/generate_sequence?apparatus_id=...&sequence_ids=...` — returns one random trick per requested trick type (`sequence_ids`, comma-separated) that's valid for the given apparatus

## Project structure

```
src/
  app/            Pages, layout, and API routes
  components/
    General/      Header, layout, and theme
    SequenceGenerator/  Sequence builder UI, generated sequence display, trick accordion
  prisma/         Schema and migrations
  types/          Shared API types
  utils/          Fetch helpers for SWR
```
