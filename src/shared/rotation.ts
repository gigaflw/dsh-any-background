/**
 * Rotation-cadence math shared by BOTH halves.
 *
 * The client used to carry a hand-mirrored copy of this logic, and a drift
 * between the two (the server advancing on one week boundary, the client's
 * fallback on another) would make them fight over `current`/`lastRotate`.
 * One implementation, inlined into both bundles by tsdown — change daily/weekly
 * semantics here only.
 */

/** Everything the cadence math needs; both halves' RotationConfig satisfy it. */
export interface RotationCadence {
  enabled: boolean
  mode: 'shuffle' | 'order'
  interval: 'reload' | 'hourly' | 'daily' | 'weekly'
  current: number
  items: ReadonlyArray<unknown>
  lastRotate: string | null
}

/** ISO week key (Monday-first). */
export function isoWeekKey(d: Date): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = t.getUTCDay() || 7
  t.setUTCDate(t.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${t.getUTCFullYear()}-W${week}`
}

/**
 * Upper bound on an `hourly` gap, and the reason this file no longer decides
 * "due" by bucket equality alone.
 *
 * Buckets (`hourKey` / `toDateString` / `isoWeekKey`) are computed from the
 * local wall clock, but the value they are compared against — `lastRotate` —
 * is stamped by whichever half last advanced: the Node host or the browser.
 * Two clocks in two processes can disagree by minutes, and a skew that pushes
 * the host's stamp past the local hour boundary made `last === now` in bucket
 * terms, so the cadence simply stopped advancing for that hour. The elapsed
 * rule below closes that: a bucket difference OR a real elapsed gap is due.
 * (The gap is measured on the browser's own clock against a server stamp, so
 * it tolerates skew in the safe direction — a slightly late advance, never a
 * missed one.)
 */
const HOURLY_RECOVER_MS = 55 * 60 * 1000

/** Whether the pool should advance right now. */
export function rotationDue(rot: RotationCadence, now: Date = new Date()): boolean {
  if (!rot.enabled || rot.items.length === 0) return false
  if (rot.interval === 'reload') return true
  const last = rot.lastRotate !== null ? new Date(rot.lastRotate) : null
  if (last === null || isNaN(last.getTime())) return true
  const elapsed = now.getTime() - last.getTime()
  if (rot.interval === 'hourly') return hourKey(last) !== hourKey(now) || elapsed >= HOURLY_RECOVER_MS
  if (rot.interval === 'daily') return last.toDateString() !== now.toDateString() || elapsed >= 24 * 3_600_000
  return isoWeekKey(last) !== isoWeekKey(now) || elapsed >= 7 * 24 * 3_600_000
}

/** Epoch-hour bucket: hourly cadence advances on each full hour boundary
 *  (in whole-hour timezones — UTC+8 among them — that is exactly the local
 *  on-the-hour tick). */
const hourKey = (d: Date): number => Math.floor(d.getTime() / 3_600_000)

/** Whether an OPEN page should keep advancing this cadence on its timer.
 *  Only the time-based cadences tick live; 'reload' is a once-per-READ pick
 *  (the server advances it inside the `read` itself), so a live tick driving
 *  it would flip the wallpaper every 30 s — exactly the v0.4.0 regression
 *  (rotationDue is unconditionally true for 'reload'). */
export function rotationAdvancesLive(rot: Pick<RotationCadence, 'interval'>): boolean {
  return rot.interval !== 'reload'
}

/** Pick the next pool index under the configured mode. */
export function pickNextRotationIndex(rot: RotationCadence): number {
  const n = rot.items.length
  if (n === 0) return -1
  if (rot.mode === 'shuffle' && n > 1) {
    let idx = rot.current
    while (idx === rot.current) idx = Math.floor(Math.random() * n)
    return idx
  }
  return (rot.current + 1) % n
}
