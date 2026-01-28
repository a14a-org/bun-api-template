import type { SQL } from 'bun'

export const id = '001-initial'

export const up = async (db: SQL) => {
	// Example table - replace with your schema
	await db`
		CREATE TABLE IF NOT EXISTS items (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			name TEXT NOT NULL,
			description TEXT,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)
	`
}
