# Style Guide

## Typography

### Fonts
- **Headings & Titles**: `Playfair Display` (Serif)
  - CSS Variable: `--font-playfair`
  - Usage: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
  - Example Scale (Hero Title): `clamp(2.8rem, 10vw, 7rem)`

- **Body & UI Text**: `Space Mono` (Monospace)
  - CSS Variable: `--font-space-mono`
  - Usage: `body`, `p`, `.description`, Buttons
  - Weights: 400 (Regular), 700 (Bold)

### Text Styling
- **Hero Title**: Times New Roman (Specific override in `Hero` component)
- **Hero Subtitle**: Times New Roman, Uppercase, letter-spacing `0.4em`

## Color Palette

| Name | Hex Code | Description |
|------|----------|-------------|
| `--background` | `#fdfbf7` | Off-white / Cream background |
| `--foreground` | `#1a1a1a` | Dark Gray / Black text & elements |
| `--grid-lines` | `#e6e6e6` | Light Gray for technical patterns |
| `--accent` | `#d4a373` | Golden / Sand accent color |

## UI Components

### Buttons
**Primary Outline Button** (e.g., "Start Your Project")
- **Font**: Space Mono, Bold (700)
- **Border**: 1px solid `var(--foreground)`
- **Padding**: `1rem 2rem`
- **Text Transform**: Uppercase
- **Hover State**:
  - Background: `var(--foreground)`
  - Text: `var(--background)`

### Backgrounds
- **Technical Grid**: `.grid-technical`
  - Creates a 40px x 40px grid pattern using linear gradients with `var(--grid-lines)`.

## Assets

### Icons
- `globe.svg`
- `window.svg`
- `next.svg`
- `file.svg`
- `icon.svg` (Site Icon)

### Images
- **Logo**: `logo.svg`, `logo.jpeg`
- **Hero**: `hero-main.jpeg`
- **Philosophy**:
  - `philosophy_interior.png`
  - `philosophy_process.png`

## Layout

- **Container Padding**: 
  - Mobile: `6rem 1.5rem 1.5rem`
  - Desktop: `5rem 2rem 2rem`
- **Responsive Philosophy**: Fluid typography using `clamp()` and `vw` units.
