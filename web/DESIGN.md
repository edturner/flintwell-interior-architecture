# Style Guide

Rebuilt on the `client-feedback` branch to match Ian's June 2026 mockups.
This replaces the earlier cream / Space-Mono / `[ BRACKETED ]` system entirely.

## The two voices

The whole design is two typefaces doing two clearly separated jobs. Keeping
them separated is what makes it hold together — don't set body copy in the
sans, and don't set UI labels in the serif.

| Voice | Face | CSS var | Used for |
|-------|------|---------|----------|
| Reading | Cormorant Garamond | `--font-serif` | Hero statement, body copy, quotes, menu nav, form labels |
| Labelling | Jost (300) | `--font-sans` | `menu`, section labels, wordmark, `PROJECT23`, attributions, footer small print |

The sans is **always lowercase and always tracked out** (`--track-wide`,
`0.32em`). Tracking adds a trailing space after the final letter, so anything
that needs to sit flush right or flush left cancels it with a negative
margin — see `SectionLabel.module.css`.

The wordmark no longer uses a tracking token at all: `FlintwellWordmark` is
outlined artwork, so the letter positions carry Ian's own 567 tracking and
there is no live text to space. (`--track-wider` was documented here but has
never existed in `globals.css`.)

Fonts are substitutes for Ian's originals: Jost stands in for a Futura-style
geometric sans, Cormorant Garamond for the mockups' transitional serif. Swap in the
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

Spacing runs off four tokens in `globals.css`, so overall density is tuned
in one place rather than per component. Don't reintroduce per-section
clamps:

| Token | Role |
|-------|------|
| `--gutter` | Page margin everywhere |
| `--section-top` / `--section-bottom` | Every full-screen section's padding |
| `--label-gap` | Section label → content beneath it |

- Sections are `min-height: 100svh`. The mockups are drawn as discrete
  screens, and the design depends on that breathing room.
- Section labels sit flush right, directly under the `menu` control. So
  does the About copy block — left-aligned text, but the *block* sits
  right, sharing an edge with the label above it.
- The testimonial carousel is centred in its panel (`margin: auto`), not
  offset right like the other sections.
- Breakpoints: 1100px (work grid 3→2 col), 900px (hero/about stack),
  700px (contact form tightens), 640px (work grid →1 col and, on the
  homepage, becomes a swipe track; menu overlay stacks).

## Components

| Component | Notes |
|-----------|-------|
| `FlintwellMark` | The hand-drawn `f.` — `public/flintwell-mark.png` through `next/image`. Ian's supplied SVG is a raster plus a luminance mask in an SVG shell, not vector, and is kept as the source. The ink is baked into the artwork, so it does **not** recolour on the overlay; it reads correctly on both surfaces as drawn. |
| `Wordmark` | FLINTWELL + rule + `interior architecture` / `est2023`. `centred` prop for the footer. Outlined artwork, not live text. |
| `SectionLabel` | The flush-right tracked lowercase heading. `as="h1"` on `/contact`, where this label is the page title; `h2` everywhere else. |
| `Header` | Fixed mark + `menu`/`close`, and the terracotta overlay. Client component; `SiteHeader` is the server wrapper that feeds it Sanity content. |
| `SelectedWorks` | 3-col grid, one uniform 4:5 crop performed by Sanity so the hotspot is honoured. Thumbnails used to keep their own aspect ratio, which left the tops of each row ragged. Below 640px it stacks, or becomes a scroll-snap swipe track when `swipeOnMobile` is set. |
| `RevealGrid` | Drives the work grid's entrance through a `data-reveal` attribute. Renders `idle` — plain and visible — and only arms the hidden state once its effect runs, so a blocked script can never hide the work. |

### Header scroll behaviour

Off the top of the page (`BAR_THRESHOLD`, 24px) the chrome settles onto a
translucent white bar with a 12px backdrop blur and a hairline bottom rule,
so the mark and `menu` stay legible over whatever is scrolling underneath.
The chrome itself never moves or fades out. The mark condenses to
`scale(0.76)` with the bar. Over the open overlay the bar drops away, since
it would fight the terracotta.

The listener is rAF-throttled and passive, and runs once on mount so a reload
partway down the page already shows the bar.

Tune `--header-bar-alpha` in `globals.css` for the fill weight.

## Deliberate departures from the mockups

Three places where this build does not draw what Ian drew. Each is a
usability call, and each is easy to revert.

**Selected Works hover.** The mockups draw the grid completely flat. This
build keeps the layout, proportions and captions but adds two restrained
moves — a 1.03 image scale and a hairline that draws in under the caption.
Nothing else on the site moves. Delete the two `:hover` blocks in
`SelectedWorks.module.css` to go fully flat.

Hover motion across the site is gated behind
`@media (hover: hover) and (pointer: fine)`, because touch browsers fire a
synthetic hover on tap and leave it applied — on the mobile swipe track that
left a stuck scale visible after back-navigation. `:focus-visible` mirrors
each hover rule *outside* the query, so keyboard users keep the feedback on
every device.

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
- `home.heroImage` — **not currently used.** The field still holds the logo
  PNG from the old build, which was rendering as the full-size hero image.
  The hero now points at the local `public/hero-desk.jpeg`; once a proper
  photograph is uploaded in the Studio, restore the Sanity binding in
  `Hero.tsx` (one line, marked with a comment).
- `philosophy` (now "About") — `aboutHeading` / `aboutText` / `aboutImage`.
- `footer` (now "Site Details") — also feeds the menu overlay via `phone`,
  `addressLines` and `menuSlogan`, **and** the contact section's "or reach us
  directly" block. A page rendering `<Contact>` must pass `details`, or that
  block silently disappears.
- `project.displayOrder` / `testimonial.displayOrder` — lower first, blanks
  last. This is how the studio chooses which six projects lead the homepage
  and which quote the carousel opens on; without it the order fell out of
  upload date.
- Every image is the `imageWithAlt` object type: an image plus `alt` and a
  `decorative` flag. Alt is required unless `decorative` is ticked, and the
  site reads it through `altText()` in `sanity/lib/image.ts`.

## Motion tokens

Curves and durations live in `globals.css` alongside colour and spacing.
Don't hand-type a cubic-bezier — there were eleven near-identical copies of
two curves before these existed.

| Token | Value | Role |
|-------|-------|------|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | UI responding to you: hover, press, state change |
| `--ease-entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` | Content arriving: the work grid reveal, slide changes |
| `--duration-hover` | `0.25s` | Hover and press feedback |
| `--duration-state` | `0.4s` | Header bar, overlay |
| `--duration-entrance` | `0.9s` | The work grid reveal |

Reduced motion kills **movement only** — transforms — and keeps opacity and
colour. A blanket `transition-duration: 0.01ms !important` was overriding
components that had already thought about it, turning the testimonial
cross-fade into a hard cut. Components may still drop more than the default
does; `SelectedWorks.module.css` removes its entrance outright.

## Removed

The Services / "THE PROCESS" section and all pricing are gone from the site
at the client's request. The `service` document type is still registered in
the Studio so existing documents stay reachable; nothing renders them.
