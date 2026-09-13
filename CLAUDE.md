# CLAUDE.md

This app uses **React on Rails**. For React on Rails conventions — adding and
registering components, the `react_component` view helper, `.client`/`.server`
bundle rules, the `ReactOnRails` JS API, common errors and fixes, and the
`bin/rails react_on_rails:doctor` diagnostic — read **[AGENTS.md](./AGENTS.md)**.

## Commit and PR conventions

Commit messages and PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/):
`<type>(<optional scope>): <description>`, e.g. `fix(admin): handle blank CSV rows`.

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`.

PR titles are enforced by CI (`.github/workflows/pr-title.yml`) and become the squash
commit message on `main`, so an invalid PR title blocks merging.

Follow any project-specific instructions elsewhere in this file or repository.
