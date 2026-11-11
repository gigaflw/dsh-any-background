# dsh-any-background

<p align="center">
  <a href="https://www.npmjs.com/package/dsh-any-background"><img alt="npm version" src="https://img.shields.io/npm/v/dsh-any-background?color=4d6bfe"></a>
  <a href="https://www.npmjs.com/package/dsh-any-background"><img alt="npm monthly downloads" src="https://img.shields.io/npm/dm/dsh-any-background?color=4d6bfe"></a>
  <a href="https://github.com/Tkingxiao/dsh-any-background/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/npm/l/dsh-any-background?color=4d6bfe"></a>
  <a href="https://www.npmjs.com/package/@deepseek-ai/dsh?activeTab=versions"><img alt="Supported DSH versions: 0.2.0-rc.1 ~ 0.2.2-rc.1 and above" src="https://img.shields.io/badge/DSH-0.2.0--rc.1%20~%200.2.2--rc.1%2B-4d6bfe" /></a>
  <a href="https://github.com/topics/dsh-better-sidebar"><img alt="Plugin ecosystem: GitHub topic dsh-better-sidebar" src="https://img.shields.io/badge/plugin%20ecosystem-topic%20dsh--better--sidebar-4d6bfe" /></a><br /><br />
  <a href="https://github.com/Tkingxiao/dsh-any-background"><img src="https://img.shields.io/github/stars/Tkingxiao/dsh-any-background?style=social" alt="GitHub stars"></a>
  <a href="https://dsh.directory/plugins/tkingxiao/dsh-any-background"><img src="https://dsh.directory/badges/listed.svg" alt="dsh.directory listed"></a>
</p>

English | [中文](README.zh.md)

A **DeepSeek Harness** appearance plugin: custom theme color, background wallpaper (image / video / algorithmically generated), and per-surface opacity & blur control. Compatible with **DSH `0.2.0-rc.1` through `0.2.2-rc.1` — and every host release above it**.

---

## Screenshots

<table>
  <tr>
    <td align="center"><img src="example_img/image.png" width="440" alt="Custom homepage"><br/><em>Custom homepage · wallpaper + theme color applied</em></td>
    <td align="center"><img src="example_img/image-2.png" width="440" alt="Theme color picker"><br/><em>Theme color picker · PS-style wheel + HSL/RGB inputs</em></td>
  </tr>
  <tr>
    <td align="center"><img src="example_img/image-3.png" width="440" alt="Per-surface opacity and blur"><br/><em>Per-surface opacity and blur</em></td>
    <td align="center"><img src="example_img/image-4.png" width="440" alt="Background editor"><br/><em>Background editor · pan and zoom</em></td>
  </tr>
  <tr>
    <td align="center"><img src="example_img/image-6.png" width="440" alt="Generated dynamic background"><br/><em>Generated background · mesh gradient / Shader / geometric</em></td>
    <td align="center"><img src="example_img/image-9.png" width="440" alt="Geometric background, low-poly mode"><br/><em>Generated background · geometric low-poly</em></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><img src="example_img/image-10.png" width="440" alt="Config export and import"><br/><em>Export and import configs to share them</em></td>
  </tr>
</table>

## Features

### Color & theme

- **PS-style color wheel** — Hue on the ring, saturation and lightness in the inscribed square; generates 30+ CSS design tokens live.
- **Precise HSL / RGB input** — Numeric entry, bidirectionally synced with the wheel.
- **Smart extraction / eyedropper** — One click derives a theme color from the wallpaper (sampling the visible area and discarding gray, near-black and near-white), or hover any pixel to pick it. Video wallpapers contribute an auto-captured frame. All client-side.
- **Forced light / dark scheme** — Light, dark or auto. In auto the surface and font direction follow the accent color's lightness (dark pick → light text), falling back to the wallpaper's brightness when no accent is set.
- **Theme export / import** — A self-contained `dsh-any-theme.json` (config + wallpaper + the whole rotation pool) that restores anywhere.
- **Presets & profiles** — Six one-click presets plus named profiles that can be renamed and duplicated; deleting asks for confirmation twice.

### Background & wallpaper

- **Image wallpaper** — Upload any image as the background.
- **Video wallpaper** — Muted, looping, survives refreshes (persisted on disk + HTTP Range streaming), with one frame captured for the preview, color extraction and position editing.
- **Position editor & layout modes** — Drag to pan, scroll or pinch to zoom, one-click reset; Fit / Fill / Stretch / Tile / Center. Image and video placements are stored separately and never overwrite each other.
- **Generated backgrounds** — Mesh gradient, Shader or geometric patterns, with adjustable spread and intensity and a lockable seed.
- **Wallpaper rotation** — Build a pool with the thumbnail picker and rotate by shuffle or order, on every refresh / hourly / daily / weekly; the cadence advances while the page stays open, not only on reload.
- **Day / night switch** — A day profile and a night profile, switched on a fixed schedule or by following the OS dark mode.

### Per-surface opacity & blur

- **Eleven parts, each with its own slider pair** — main background, sidebar, card panels, input & controls, settings panel, conversation frame, trajectory view, right sidebar (or bettersidebar), produced / highlighted content, header popovers, and the header bar.
- **The slider IS the frost amount, and 0 means no frost** — including over the host's own default menu frost. Every part still **defaults to 30px**, so a stock install keeps the frosted look.
- **Opacity re-scopes the host's own token** — it never stacks a second color over the original, so the wallpaper shows through the content.
- **Produced / highlighted content shares one slider** — code blocks (with their language banner), inline `code` chips and produced chips move together.
- **Right sidebar / bettersidebar: one pair, two identities** — without dsh-better-sidebar it drives the official right sidebar; with it installed the same pair takes over that plugin's bottom workbench panel (the official sidebar keeps responding too).
- **On the Windows desktop shell it also drives the caption band** — the sidebar pair paints the segment directly above the sidebar, and the cut follows the sidebar's width as it is dragged or collapsed (at width 0 the band returns to the header card). The 「标题栏」 card drives the rest of the band and the native window controls, with a four-state 「标题条带文字」 choice (auto / follow theme / always white / always black) for when a light strip fights the theme.

### Interface parts

- **Sidebar "Theme" page (dual mode)** — The same five pages (Color / Interface / Font / Background / Profiles) register into the official right sidebar's guide page or into dsh-better-sidebar's sidebar, sharing one state with the settings panel, so a change anywhere shows everywhere. On a host without that extension point nothing is registered, silently.
- **Conversation view cards** — The message list is wrapped in a translucent card automatically, and the trajectory page adjusts as a whole page.
- **Header popovers and the header bar are separately adjustable** — the Agent Team panel, the background-job list, the session-header dropdowns, and the title / view-tab row at the top of a session each have their own opacity + blur pair.
- **Custom font** — Upload a ttf / otf / woff / woff2 (up to 100 MB) and apply it across the interface; code blocks stay monospace. Can be disabled or removed at any time.
- **Per-part text outline** — The same surface groups as the interface page, each with its own `-webkit-text-stroke` (0–4px, 0 = off) in auto-contrast / gray / black / white / accent / custom. Code blocks, inline `code`, icons and the host's gradient-shimmer text are exempt automatically.
- **Third-party compatibility** — When [dsh-better-display](https://github.com/aa2246740/dsh-better-display) is detected, its sticky summary band is pinned at a 20% plate + 30px frost outside the sliders. Any other plugin whose surface reads a token this plugin owns is named in the console, and the whole accommodation can be switched off in Settings.

### General

- **File-based persistence** — Everything is stored under `~/.dsh/.dsh-any-background-data/`, not in `localStorage`.
- **Bilingual UI** — Full Chinese / English interface following the host's locale.
- **Theme watchdog** — Re-asserts the custom theme if the host resets it.

## Changelog (latest two releases)

### v0.4.5 (rotation driven by the Node half · server broadcast)

- **Scheduled wallpaper switching no longer depends on a page running its own timer.** The `hourly` / `daily` / `weekly` cadences used to be advanced by the browser's 30 s tick: close the page and nothing ever rotates; open two pages and each computes its own next pick — whichever fires first swaps the picture and overwrites `current` / `lastRotate`, while the other page keeps showing the old one until it is reloaded. There is now exactly one mover: the Node half's 30 s tick (`setInterval` + `unref`, so it never pins a sleeping host awake). After it advances, it broadcasts the result to every open page.
- **The broadcast rides its own SSE route**, not RPC. RPC is request/response, and what is needed here is the opposite direction — nobody asked, the server moved the slot itself. `GET /dsh-any-background/events` sits behind the same Host/Origin + browser-auth fence as the RPC channel (an unauthenticated caller gets 401/403, never a live event stream); the `<img>` / `<video>` GET routes stay open because the browser loads them without custom headers. The event carries exactly one meaning: **receiving it means the bytes in the wallpaper slot are already swapped** — the receiver only repaints, it must never advance the cursor itself.
- **A manual click now moves `lastRotate` too.** Manual and scheduled switching share one slot, so a click is one advance on that same cadence clock. Without this, picking a picture you like at 12:59 meant the 13:00 tick replaced it, which reads as the click having been ignored.
- **Due-ness now tolerates cross-process clock skew.** `lastRotate` is stamped by whichever half wrote it, and the host and browser clocks can differ by minutes; a skew that pushes the stamp across an hour boundary made bucket equality say "not due" for that whole hour. A bucket difference **or** a real elapsed gap is now due (`hourly` 55 min, `daily` 24 h, `weekly` 7 days) — the safe direction is "a little late", never "missed".
- **The fallback is explicit**: a browser without `EventSource`, or a host that did not register the route, leaves `rotationEventsLive` false and the client's 30 s tick keeps advancing — i.e. exactly the behaviour before this release. A dropped stream reconnects on its own using the server's `retry:` hint, one connection per page, and `ctx.effect` closes it when the plugin unloads.
- **`npm test` gained an end-to-end assertion**: it boots real HTTP, attaches to the SSE stream, lets the server tick (compressed to 200 ms in the test) advance the pool for real, then asserts the received index matches the persisted `current` and carries the slot mtime. With the broadcast deliberately deleted it fails within 5 s — the first version had no timeout and hung for 2 minutes, which reads as "slow" rather than "broken".

### v0.4.4 (real-host check on `0.2.2-rc.1` · issue #34 registry & reporting · issue #33 numeric input & region highlight)

- **Checked `0.2.2-rc.1` on a real host.** An isolated test profile under launcher `homes/0.2.2-rc.1` (local plugin via link, plus dshmarket `1.73.16` / dsh-better-sidebar `0.30.1` / dsh-update-checker `1.7.3`) boots `dsh web`: the gate admits the plugin, `read` answers `host.version=0.2.2-rc.1 / channel=0.2.2`, and the config round-trip lands on disk. A separate headless Chrome boot reports 179 `style[data-plugin]` sheets and all three "unregistered" log lines from issue #34, verbatim. The build now joins all four gate ranges and `dshReleases`; its verdict rises from `line` to `exact`.
- **Adapter facts re-read: three evidence literals moved, none is a rule input.** Across the tag's 98 `lib/client.js` artifacts, `_handle{z-index:11}` / `_leadingSeat{z-index:15}` / `_overlayLayer{z-index:20}`, the menu token names, 9 `--dsw-menu-backdrop-filter` consumers, `data-shimmer` / `data-shell-bottom` / `data-rightbar-col` and the session-header slot keys all still resolve. What moved: `--dsw-menu-surface-fill` (`#f8f9fa94` / `#43454a73` → `#fcfdfeb3` / `#303136a3`), `--dsw-font-family` (now a single `var(--dsh-font-family-text-default)`, still a `body` declaration so the font rule's `!important` still wins), and `--dsh-dockkit-float-top` is no longer emitted (this folder emits no promotion, so it is unaffected). The adapter only asks for token NAMES, so its answer stands; details live in `v0-2-2/adapter.ts`. Pixel-level A/B for blur / occlusion is still open.
- **Issue #34: three plugins now have a verdict instead of "unregistered".** Two low-risk pins were added — dshmarket's task popover (`--dsw-alias-bg-layer-1`) and dsh-update-checker's two buttons (`--dsw-alias-bg-layer-2`) — re-declaring only the token literal, never `background`, geometry or frost; all four selector names are 0-hit in that host's artifacts. `dsh-better-sidebar` is registered as **reviewed, deliberately not pinned**: its whole panel is exactly what the Main-interface slider is for, so pinning it would take the slider away from the user. Every pin still lives in the one `-third-party` dynamic sheet, so the switch removes all of it at once.
- **Reporting no longer needs the console.** The settings card lists each plugin, its status and its tokens, with a "Copy report line" button carrying the host release and switch state. Production builds cannot open DevTools, so the button is the whole feedback path; where the clipboard is unavailable a selectable readonly field appears.
- **Issue #33, items 1 and 2.** ① **Slider values are typeable**: every slider gained a number field, kept in sync with dragging in both directions, clamping out-of-range values and leaving an empty mid-edit alone. The original zero-lag DOM path is untouched. ② **Hover highlights the matching region**: hovering a module card outlines the real region it controls. The three frame columns reuse the very nodes `setBlur` / `applyPartOpacities` paint; the rest use only `data-*` markers and runtime tags from this plugin's own rules. No host node is written and no third-party z-index is touched — a single `fixed`, `pointer-events:none` outline layer is removed on mouse-out and on leaving the settings page. Positions update from capture-phase `scroll` / `resize`, never rAF. **The hint reuses the plugin's own scheme resolver `rScheme()`** (forced override > theme-color lightness > wallpaper brightness verdict) and paints its **inverse**: a translucent WHITE plate on a dark interface, a translucent BLACK plate on a light one, with the tag inverted the same way. Strictly neutral black/white — not `--dsw-alias-brand-primary` (extracted from the wallpaper, so it collides after a theme-color change) and not a fixed accent (which collides with a wallpaper of that same color). The plate **breathes slowly and continuously** (2.4s `ease-in-out`, fill opacity 22% ↔ 100% — not a one-shot flash); only the fill pseudo-element animates, so the two non-overlapping dashed rings (near-white border + near-black outline) and the tag stay steady. `prefers-reduced-motion` falls back to a static plate, and nested targets collapse to the outermost box so alpha never stacks. Measured luminance delta: white-on-dark `0.243` / black-on-light `0.240`, versus `0.015` / `0` if the direction is chosen wrongly; on an amber wallpaper the white / black plates still give `0.067` / `0.178`. When a region is absent on the current page the card says so rather than drawing a guessed box — the honest answer to "some surfaces only exist once a conversation is open". The other three requests (per-module annotations, a post-turn token-usage module, a model-picker submenu) need per-surface structural probing and are NOT in this release.
- After installing or updating, **restart the host once** — the compatibility gate runs when the profile is composed.

## Installation

### Method 1: npm install (Recommended)

```sh
# published on the npm registry
dsh plugin --profile web add dsh-any-background

# or straight from the GitHub repository
dsh plugin --profile web add github:Tkingxiao/dsh-any-background
```

Then launch:

```sh
dsh web
```

The plugin appears as a **"Theme"** section in Settings.

### Method 2: npx (No Global Install)

```sh
npx @deepseek-ai/dsh plugin --profile web add dsh-any-background
npx @deepseek-ai/dsh web
```

### Method 3: Local Build (Development)

The `lib/` directory is committed, so installs need no build step. To rebuild after editing `src/`:

```sh
git clone https://github.com/Tkingxiao/dsh-any-background.git
cd dsh-any-background
pnpm install
pnpm run bundle
pnpm dsh plugin --profile web add "dsh-any-background"
pnpm dsh web
```

## Compatibility

- **[`dsh web`](https://github.com/deepseek-ai/deepseek-harness): `0.2.0-rc.1` ~ `0.2.2-rc.1`, and everything above it.** The gate names each build that was checked and then closes with an uncapped `>=0.2.0-rc.1`. That umbrella is deliberate: the host enforces exactly this peer list — a release it does not name is disabled before a single module is imported — so a range that runs out is a wall in front of a plugin that would have kept working. (More precisely: the host's `app-boot` `unmetRequirements` reads `engines.dsh` alone when that field is present and ignores peerDependencies, so all four places must say the same thing but `engines.dsh` is what actually decides whether the plugin loads.)
- **How an unseen build runs**: it gets the closest verified set of facts plus a log line saying how far from `exact` that is. The worst a stale fact can cost is one slider no longer fading a surface the host has since moved; a version check that failed closed would cost the whole plugin.
- **Verified builds** (`dsh.compatibility.dshReleases`):

  | Host build | Facts folder | Notes |
  |---|---|---|
  | `0.2.0-rc.1` | `v0-2-0-rc-1` | verified by diffing its tag, package by package |
  | `0.2.0-rc.2` | `v0-2-0-rc-2` | same; this rc renamed the token a sticky menu group heading paints from, so it opened its own facts |
  | `0.2.1-alpha.1` ~ `0.2.1-rc.5` | `v0-2-1` | facts unchanged, folded into one folder; every checked build gets its own row with an `exact` verdict. `rc.4` and `rc.5` ship artifacts byte-identical to `rc.3`, file by file |
  | `0.2.2-alpha.2` | `v0-2-2` | a new patch line, so its own facts folder; every claim re-read and still true (z-index ladder, menu frost tokens, font token composition, header slot keys, 75 host selectors matching) |
  | `0.2.2-rc.1` | `v0-2-2` | **checked on a real host**: gate / RPC / boot self-check all pass; every rule input still hits across 98 artifacts, three moved evidence literals recorded in the adapter; `exact` verdict |
  | above `0.2.2-rc.1` | reuses the closest row | an unverified build takes that line's adapter, stated in the log |

- **Facts are isolated per release**: the host release is resolved on the Node half and handed down through the `read` RPC; styling and logic only ask the adapter questions (who owns this surface, which layer carries the frost, which token fades a menu) and never compare version strings. Supporting a new host means adding one version folder and registering it.
- **A restart is still needed after installing or updating the plugin**: the compatibility check runs while the profile is composed, not when the plugin is updated. Features that depend on a specific host structure (the right sidebar's panel blur, the official sidebar's "Theme" card) enable themselves only where that structure exists; everything else behaves identically across the range.
- **The `0.1.5` / `0.1.6` / `0.1.7` era is out of the supported range**: those fact folders assert things nothing re-checks any more, and a table nobody verifies is worse than no table. An older host is now refused at composition rather than quietly restyled by the wrong adapter.
- **[DSHA](https://github.com/DSH-APP/DSHA)** — the DeepSeek Harness Android launcher (ROOT-free, Termux-free). Its bundled `dsh` is `0.1.5-rc.2`, below this plugin's supported floor: the peer gate refuses it at composition, so the plugin never loads there.
- **[deepseek-harness-desktop](https://github.com/anywhere-labs/deepseek-harness-desktop)** — supported. Windows-only behavior (the caption band, the native window controls) applies on the desktop shell only.

## Permissions, side effects & boundaries

- **Integration form**: an official Profile Bundle — `package.json` declares `dsh.bundle.patch: ./cordis.patch.yml` (a loader insert layer) and the repository ships ready-to-use prebuilt artifacts (`lib/index.js`, `lib/client.js`). No install scripts, no postinstall, no native binaries, no build step at install time.
- **Filesystem**: the server half reads and writes only inside `<dsh home>/.dsh-any-background-data/` (config, wallpaper, rotation pool, video, font) and touches nothing outside it; config writes are atomic (temp file + rename). These files live on the real disk, so they are **outside generation restore — it neither captures nor rolls them back**; deleting the directory is a full plugin reset.
- **Network**: exactly one outbound fetch, and only when the user pastes an http/https image or video URL and presses Apply. No telemetry, no other external calls.
- **Shell / native**: none. No `child_process`, no native modules, no dynamically downloaded binaries.
- **HTTP surface**: only `/dsh-any-background/{video,wallpaper,font}` (GET/HEAD streaming) with the matching `*/upload` POST routes (100 MB cap), plus the dedicated RPC channel `/dsh-any-background`, all under the local dsh web server. No extra listening ports.
- **Restart required**: the first install needs a (re)start of `dsh web` to load the client bundle; settings changes afterwards apply live and persist automatically. Changing plugin version requires a restart to pick up the new `lib/client.js`.
- **Tests & verification**: `pnpm run typecheck` (full tsc check), `pnpm run bundle` (tsdown emits `lib/`), and `npm test`, which starts the real host half and round-trips config writes, reads and profiles plus the upload fence. Visual changes go through two further paths: a local mock page that measures computed values, and real `dsh web` testing slider by slider.
- **Known limitations**:
  - The styling relies on stable host DOM markers (such as `[data-sidebar-right-panel]`) and CSS token names. A host restyle of those layers can leave a slider ineffective for its surface — cosmetic only, nothing breaks. The version-specific half of those selectors lives inside its own version folder, so a host revision normally means editing that one file.
  - `-webkit-text-stroke` may clip about 1px at the edge of some single-line ellipsis containers.
  - One rule is a deliberate cross-plugin accommodation: dsh-better-display paints its sticky reading lanes from the token our 「主界面」 opacity owns, so when that plugin is detected its lanes are pinned at a 20% plate + 30px frost outside the sliders. If it ever renames those markers the rule stops matching and its lanes go back to being painted its own way.

## Star History

[![Star History Chart](https://api.star-history.com/chart?repos=Tkingxiao/dsh-any-background&type=timeline&legend=bottom-right&sealed_token=f5MhnHibC049CC0Ed_nZX8rYpIq2wPTdTXUsPPafAiYxYKOeqyKyMFirxKppeLNJygxv1iw2BlsnCYOWgu9zN6ffr7kJlAG1SlRoQRmQivCIkPzZ2lhSBQ)](https://www.star-history.com/?repos=Tkingxiao%2Fdsh-any-background&type=timeline&legend=bottom-right)

## License

MIT
