# WinWinTravel — filter modal

## Getting started

Requirements: Node.js 24 (see `.nvmrc`) and pnpm 10 (pinned in `package.json` → `packageManager`, available via `corepack enable`).

```shell
pnpm install
pnpm dev # http://localhost:3000
```

| Script                  | What it does                                  |
| ----------------------- | --------------------------------------------- |
| `pnpm dev`              | Start the dev server                          |
| `pnpm build`            | Type-check and build into `dist`              |
| `pnpm preview`          | Serve the production build locally            |
| `pnpm test`             | Run tests in watch mode (`--run` to run once) |
| `pnpm coverage`         | Run tests with a coverage report              |
| `pnpm lint:all`         | Lint the whole project                        |
| `pnpm format:check:all` | Check formatting                              |

## Decisions

- **Draft vs. applied filter.** The modal edits a local draft; only a confirmed selection goes to the zustand store as `SearchRequestFilter`.
- **Native `<dialog>`.** Focus trapping, Escape and the top layer out of the box. The confirmation dialog is a sibling of the filter modal, because React propagates a nested dialog's `close` event to its parents.
- **Tooltip trigger** is a separate button next to the checkbox label, so tapping it does not toggle the checkbox.
- **Tests** use Vitest and Testing Library. jsdom lacks the dialog API, so it is stubbed in `src/shared/test/dialogPolyfill.ts`.
- **CI** checks formatting, lint, build and tests on Node 24 and 26.

## Added dependencies

- `@floating-ui/react` — tooltip positioning that stays on screen and is not clipped by the scrollable modal, plus accessible hover, tap and focus interactions.
- `@testing-library/react` 16, `@testing-library/dom`, `@testing-library/user-event` — React 19 support and realistic user interactions in tests.
