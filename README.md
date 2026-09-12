# Caitbot

Caitbot generates randomized skill sequences for an apparatus (e.g. trampoline, bars). Pick an apparatus, add one or more trick types to the sequence, and hit **Generate** — the app picks a random trick of each requested type performed on that apparatus and displays it as an expandable list with its description.

## Stack

- [Ruby on Rails 8](https://rubyonrails.org/) + PostgreSQL
- [React on Rails](https://www.shakacode.com/react-on-rails/) (Shakapacker/rspack) rendering the existing MUI React frontend
- [ActiveAdmin](https://activeadmin.info/) for the admin dashboard (including CSV bulk import of tricks)

## Data model

Defined in [`db/migrate`](db/migrate) and [`app/models`](app/models):

- **Apparatus** — a piece of equipment (e.g. Trampoline, Bars)
- **TrickType** — a category of trick (e.g. Twist, Flip)
- **Trick** — a specific move, with a name, description, and optional YouTube ID; belongs to a `TrickType` and can be performed on multiple `Apparatus`

## Getting started

1. Install Ruby (see [`.ruby-version`](.ruby-version)) and Node, then install dependencies:

   ```bash
   bundle install
   npm install
   ```

2. Create a `.env` file with a `DATABASE_URL` pointing to a PostgreSQL database (see [`.env.example`](.env.example)), or rely on the defaults in [`config/database.yml`](config/database.yml) for local development.
3. Prepare the database:

   ```bash
   bin/rails db:prepare
   ```

4. Run the dev server (Rails + the Shakapacker JS build):

   ```bash
   bin/dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Admin dashboard

`/admin` is gated by HTTP Basic Auth — set `ADMIN_USERNAME` and `ADMIN_PASSWORD` env vars before starting the server. From there you can manage Apparatuses, Trick Types, and Tricks, including bulk-importing tricks from a CSV (`name`, `description`, `youtube_id`, `trick_type`, `apparatuses` columns — trick types and apparatuses are matched or created by name).

## API routes

All routes live under `app/controllers/api/`:

- `GET /api/apparatuses`, `GET /api/apparatuses/:id`
- `GET /api/trick_types`, `GET /api/trick_types/:id`
- `GET /api/tricks`, `GET /api/tricks/:id`
- `GET /api/generate_sequence?apparatus_id=...&sequence_ids=...` — returns one random trick per requested trick type (`sequence_ids`, comma-separated) that's valid for the given apparatus

## Project structure

```
app/
  admin/                    ActiveAdmin resource definitions
  controllers/api/          JSON API consumed by the React frontend
  javascript/src/
    components/
      General/               Header, layout, and theme
      SequenceGenerator/     Sequence builder UI, generated sequence display, trick accordion
    SequenceGeneratorApp/    React on Rails entry component
  models/                   Apparatus, TrickType, Trick, and the CSV importer
  views/pages/home.html.erb Renders the SequenceGeneratorApp React component
db/migrate/                 Schema migrations
```
