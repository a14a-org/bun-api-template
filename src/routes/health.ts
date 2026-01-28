import { Hono } from 'hono'
import { getDb } from '../db/client'

export const healthRoutes = new Hono()

healthRoutes.get('/', async (c) => {
	try {
		const db = getDb()
		await db`SELECT 1`
		return c.json({ status: 'ok', database: 'connected' })
	} catch {
		return c.json({ status: 'degraded', database: 'disconnected' }, 503)
	}
})
