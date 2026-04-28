const hits = new Map<string, number[]>()

const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 10

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = hits.get(ip)?.filter(t => now - t < WINDOW_MS) ?? []

  timestamps.push(now)
  hits.set(ip, timestamps)

  // Periodic cleanup to avoid memory leak
  if (hits.size > 1000) {
    hits.forEach((ts, key) => {
      const recent = ts.filter(t => now - t < WINDOW_MS)
      if (recent.length === 0) hits.delete(key)
      else hits.set(key, recent)
    })
  }

  return timestamps.length > MAX_REQUESTS
}
