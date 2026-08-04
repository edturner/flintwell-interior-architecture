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
| `SelectedWorks` | 3-col grid. Thumbnails keep their **own aspect ratio** (from Sanity's `metadata.dimensions.aspectRatio`) and are bottom-aligned within the row so captions land on a common line. |

## Selected Works: the one deliberate departure

Ian's mockups draw the grid completely flat. This build keeps his layout,
proportions and captions but adds two restrained hover moves — a 1.03 image
scale and a hairline that draws in under the caption. Nothing else on the
site moves. If Ian wants it fully flat, delete the two `:hover` blocks in
`SelectedWorks.module.css`.

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
