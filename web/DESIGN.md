# Style Guide

Rebuilt on the `client-feedback` branch to match Ian's June 2026 mockups.
This replaces the earlier cream / Space-Mono / `[ BRACKETED ]` system entirely.

## The two voices

The whole design is two typefaces doing two clearly separated jobs. Keeping
them separated is what makes it hold together — don't set body copy in the
sans, and don't set UI labels in the serif.

| Voice | Face | CSS var | Used for |
|-------|------|---------|----------|
| Reading | Playfair Display | `--font-serif` | Hero statement, body copy, quotes, menu nav, form labels |
| Labelling | Jost (300) | `--font-sans` | `menu`, section labels, wordmark, `PROJECT23`, attributions, footer small print |

The sans is **always lowercase and always tracked out** (`--track-wide`,
`0.32em`). The wordmark uses `--track-wider` (`0.42em`). Tracking adds a
trailing space after the final letter, so anything that needs to sit flush
right or flush left cancels it with a negative margin — see
`SectionLabel.module.css`.

Fonts are substitutes for Ian's originals: Jost stands in for a Futura-style
geometric sans, Playfair for the mockups' transitional serif. Swap in the
studio's licensed faces if he has them.

## Colour

| Name | Hex | Where |
|------|-----|-------|
| `--background` | `#ffffff` | Everything except the two surfaces below |
| `--foreground` | `#1a1a1a` | All text, all rules, the mark |
| `--blush` | `#f7efea` | "our friends" testimonial panels |
| `--terracotta` | `#9c4a22` | Full-screen menu overlay |
| `--terracotta-fg` | `#f7efea` | Type on the overlay |

There is no accent colour and no grid pattern. The composition is carried by
whitespace and one image per screen.

## Layout

- `--gutter: clamp(1.5rem, 5vw, 5rem)` — the page margin everywhere.
- Sections are `min-height: 100svh`. The mockups are drawn as discrete
  screens, and the design depends on that breathing room.
- Section labels sit flush right, directly under the `menu` control.
- Breakpoints: 1100px (work grid 3→2 col), 900px (hero/about stack),
  700px (work grid →1 col, contact form tightens), 640px (menu overlay stacks).

## Components

| Component | Notes |
|-----------|-------|
| `FlintwellMark` | The hand-drawn `f.` — inline SVG traced from the studio artwork, normalised to a 100×100 box. Uses `currentColor` so it recolours on the overlay. |
| `Wordmark` | FLINTWELL + rule + `interior architecture` / `est2023`. `centred` prop for the footer. |
| `SectionLabel` | The flush-right tracked lowercase heading. |
| `Header` | Fixed mark + `menu`, and the terracotta overlay. Client component; `SiteHeader` is the server wrapper that feeds it Sanity content. |

### Header scroll behaviour

The chrome fades out (and lifts 0.75rem) when you scroll **down**, and
returns when you scroll **up** or come back within `REVEAL_ZONE` (120px) of
the top. A `SCROLL_DELTA` of 6px ignores sub-pixel and rubber-band jitter,
and the listener is rAF-throttled and passive. It pauses while the menu
overlay is open, since the overlay is fixed and unscrollable.
| `SelectedWorks` | 3-col grid. Thumbnails keep their **own aspect ratio** (from Sanity's `metadata.dimensions.aspectRatio`) and are bottom-aligned within the row so captions land on a common line. |

## Deliberate departures from the mockups

Three places where this build does not draw what Ian drew. Each is a
usability call, and each is easy to revert.

**Selected Works hover.** The mockups draw the grid completely flat. This
build keeps the layout, proportions and captions but adds two restrained
moves — a 1.03 image scale and a hairline that draws in under the caption.
Nothing else on the site moves. Delete the two `:hover` blocks in
`SelectedWorks.module.css` to go fully flat.

**Testimonials are a carousel.** The mockups give each quote its own
full-height blush screen. As a scrolling page that's a very long run of
near-identical panels, so they cycle in place instead: prev/next arrows and
an `01 — 05` counter, with swipe on touch. The panel composition is
otherwise exactly as drawn.

The stage must not resize between slides. Every quote is rendered into the
**same CSS grid cell** (`.slide { grid-area: 1 / 1 }`), so the grid measures
the longest one and holds that height for all of them; inactive slides are
faded out, not unmounted. Do not replace this with a measured `min-height`
or an animated container height — both reintroduce the growing and
shrinking this exists to prevent.

**The contact form has writing lines.** Ian draws only the single vertical
rule, with no boxes and no lines — which leaves nothing indicating where to
type. Each field now has its own hairline underneath (`--rule-soft`,
darkening to `--foreground` on hover and focus), an italic placeholder, and
a terracotta `*` on required fields. The vertical rule and the bare serif
labels are unchanged, so it still reads as the drawing rather than as a
conventional boxed form.

## Sanity content this design expects

- `project.projectNumber` — drives `PROJECT23 | Dingle`. Captions fall back
  to the name alone when it's blank.
- `home.statement` — the hero line.
- `home.heroImage` — should be an on-site photograph. It currently holds the
  logo PNG left over from the old build.
- `philosophy` (now "About") — `aboutHeading` / `aboutText` / `aboutImage`.
- `footer` (now "Site Details") — also feeds the menu overlay via `phone`,
  `addressLines` and `menuSlogan`.

## Removed

The Services / "THE PROCESS" section and all pricing are gone from the site
at the client's request. The `service` document type is still registered in
the Studio so existing documents stay reachable; nothing renders them.
