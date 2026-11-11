/**
 * Client half of the server's wallpaper-switch channel.
 *
 * The cadence lives in the NODE half now (`src/index.ts`: one 30 s tick that
 * advances the pool and broadcasts). A browser cannot be that clock — a closed
 * tab runs no timer, and N open tabs each running their own timer used to race
 * over `current` / `lastRotate`. So the page's job is the opposite of before:
 * it listens, and it repaints.
 *
 * Delivery assumptions, all of them load-bearing:
 *  · the event arrives AFTER the bytes in the wallpaper slot were replaced, so
 *    the receiver only has to repaint — it must never move the slot itself
 *    (that would double-switch and fight the sender);
 *  · `Automatic` reconnection is the browser's job: the server sends a `retry:`
 *    hint and every reconnect is a fresh GET. Nothing here re-arms a timer;
 *  · a tearing-down plugin must close the stream (`stop()`), because
 *    `EventSource` keeps a socket open on its own otherwise (§2-O).
 */

/** One wallpaper switch announced by the node half. */
export interface RotationEvent {
  /** Pool index now in the wallpaper slot. */
  index: number
  /** Slot mtime in ms — appended to the serve URL so the image refreshes. */
  rev: number
}

export interface RotationEventOptions {
  /** Same-origin SSE route registered by the node half. */
  url: string
  onEvent: (ev: RotationEvent) => void
  /** Called once per successful connection, after any reconnect. */
  onOpen?: () => void
}

/**
 * Subscribe to the server's rotation stream. Returns an unsubscribe function
 * that is safe to call twice and closes the underlying socket.
 *
 * A browser without `EventSource` (or a host that failed to register the
 * route) is not an error: the caller keeps its own `scheduleTick` fallback and
 * the page simply behaves as it did before this channel existed.
 */
export function startRotationEvents({ url, onEvent, onOpen }: RotationEventOptions): () => void {
  const Ctor = (globalThis as { EventSource?: typeof EventSource }).EventSource
  if (Ctor === undefined) {
    console.warn('dsh-any-background: EventSource unavailable — falling back to the 30 s client tick')
    return () => {}
  }
  let source: EventSource | null = null
  let disposed = false

  const connect = (): void => {
    if (disposed) return
    const es = new Ctor(url)
    source = es
    es.addEventListener('open', () => { onOpen?.() })
    es.addEventListener('rotation', (raw: Event) => {
      // The payload is our own JSON on our own route, but a truncated frame
      // after a dropped connection would parse to garbage — treat it as a
      // missing event and let the next tick / reload repair the page.
      try {
        const data = JSON.parse((raw as MessageEvent<string>).data) as Partial<RotationEvent>
        if (typeof data.index === 'number' && isFinite(data.index) && typeof data.rev === 'number' && isFinite(data.rev)) {
          onEvent({ index: data.index, rev: data.rev })
        }
      } catch {
        /* malformed frame: not worth a log line per drop */
      }
    })
    // `error` is NORMAL: the browser reconnects by itself using the server's
    // `retry:` hint, and every reconnect is a brand-new GET. Re-creating the
    // EventSource here would stack sockets — so an error is logged once by the
    // browser's own console and otherwise ignored.
    es.addEventListener('error', () => {
      if (es.readyState === EventSource.CLOSED && !disposed) {
        // Permanent close (e.g. the host unmounted the route). One retry after
        // a beat, then leave the page on the tick fallback rather than spin.
        window.setTimeout(() => { if (!disposed && source === es) connect() }, 10_000)
      }
    })
  }

  connect()
  return () => {
    if (disposed) return
    disposed = true
    source?.close()
    source = null
  }
}
