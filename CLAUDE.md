# Project Conventions

## Tech Stack

- Runtime: Bun
- Framework: Hono
- Database: Bun SQL (PostgreSQL)
- Linting: Biome
- Git hooks: Lefthook
- Deployment: Coolify + Nixpacks

## Architecture

Hexagonal architecture (ports & adapters):

- `src/core/` - Pure domain logic, no I/O
- `src/db/` - Database client, migrations
- `src/routes/` - HTTP route handlers
- `src/services/` - Business orchestration
- `src/lib/` - Utilities (env validation)

## Code Standards

### Functional Programming (Mandatory)

- Arrow functions only: `export const fn = () => {}`
- No loops: use `map`, `filter`, `reduce`, `flatMap`
- Immutability: no `push`, `splice`, or direct mutation
- Early returns over nested ternaries

### TypeScript

- Let TypeScript infer return types
- Union types over optionals: `field: T | null` not `field?: T`
- `import type` for type-only imports
- Named exports only

### File Organization

- kebab-case file names
- Files under 300 lines
- Import order: types → external → internal

### Security (OWASP)

- Parameterized queries only (Bun SQL template literals)
- Input validation with Zod
- No hardcoded secrets

## Git Conventions

### Branches

Pattern: `(feat|fix|chore)/kebab-case`

### Commits

Pattern: `type: lowercase present-tense description`
Types: feat, fix, chore, docs, refactor, test, style, perf, ci, build

Example: `feat: add user authentication`

## Commands

- `bun dev` - Start dev server with watch
- `bun test` - Run tests
- `bun run lint` - Run Biome (with fixes)
- `bun run lint:check` - Run Biome (check only)
- `bun run typecheck` - TypeScript check

## Database

### Connection

Uses lazy initialization - no DATABASE_URL needed at build time:

```typescript
import { getDb } from './db/client'

const db = getDb()
const items = await db`SELECT * FROM items WHERE id = ${itemId}`
```

### Migrations

- Stored in `src/db/migrations/`
- Auto-run on app startup
- Lock prevents concurrent migration runs
- Add new migrations by creating numbered files and adding to `migrations/index.ts`

### Adding a Migration

1. Create `src/db/migrations/XXX-description.ts`
2. Export `id` and `up` function
3. Add to `migrations/index.ts` array
4. Deploy - migration runs automatically on startup

## API Routes

Using Hono for routing:

```typescript
import { Hono } from 'hono'

export const itemRoutes = new Hono()

itemRoutes.get('/', async (c) => {
  const db = getDb()
  const items = await db`SELECT * FROM items`
  return c.json(items)
})

itemRoutes.post('/', async (c) => {
  const body = await c.req.json()
  // validate with zod, then insert
  return c.json(created, 201)
})
```
