import { z } from 'zod/v4'

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
	console.error('[env] Invalid environment variables:')
	console.error(parsed.error.flatten().fieldErrors)
	throw new Error('Invalid environment variables')
}

export const env = parsed.data
