import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { healthRoutes } from './routes/health'

export const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors())

// Routes
app.route('/health', healthRoutes)

// 404 handler
app.notFound((c) => c.json({ error: 'Not found' }, 404))

// Error handler
app.onError((err, c) => {
	console.error('[error]', err)
	return c.json({ error: 'Internal server error' }, 500)
})
