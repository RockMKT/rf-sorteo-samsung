import { Pool } from 'pg'

const globalForDb = globalThis as unknown as { pgPool: Pool | undefined }

const pool = globalForDb.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
})

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pgPool = pool
}

export default pool
