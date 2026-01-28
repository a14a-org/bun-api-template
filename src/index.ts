import { serve } from 'bun'
import { app } from './app'
import { runMigrations } from './db/migrate'
import { env } from './lib/env'

const start = async () => {
	// Run migrations on startup
	try {
		await runMigrations()
	} catch (error) {
		console.error('[startup] Migration failed:', error)
		// Continue anyway - let the app fail naturally if schema is broken
	}

	// Start server
	const server = serve({
		fetch: app.fetch,
		port: env.PORT,
	})

	console.log(`[startup] Server running on http://localhost:${server.port}`)
}

start()
