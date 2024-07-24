import 'server-only'

const trackers: Record<string, { count: number; createdAt: number }> = {}
type TLimiter = { isExceed: false; count: number } | { isExceed: true; remainingSecond: number }

export function limitByIdentifier(identifier: string, attempt = 5, expiredInSecond = 30): TLimiter {
  const existingTracker = trackers[identifier]
  if (!existingTracker) {
    trackers[identifier] = { count: attempt, createdAt: Date.now() }

    setTimeout(() => delete trackers[identifier], expiredInSecond * 1000)
    return { isExceed: false, count: trackers[identifier].count }
  }

  if (trackers[identifier].count <= 1) {
    const createdAtPlusExpiryDate = existingTracker.createdAt + expiredInSecond * 1000

    const remainingSecond = Math.floor((createdAtPlusExpiryDate - Date.now()) / 1000)
    return { isExceed: true, remainingSecond }
  }

  trackers[identifier].count = existingTracker.count - 1
  return { isExceed: false, count: existingTracker.count - 1 }
}
