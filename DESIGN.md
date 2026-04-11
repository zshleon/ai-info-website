# DESIGN SYSTEM: Decision Intelligence Hub

## 1. Aesthetic Identity: Glassmorphism 2.0
- **Background:** Frosted glass effect using `backdrop-blur-xl` (20px blur) alongside semi-transparent `#1e293b` backgrounds.
- **Borders:** Subtle `1px solid rgba(255,255,255,0.1)`.
- **Corners:** High radii to mimic native mobile apps. Primary cards use `24px` (`rounded-3xl` in Tailwind).

## 2. Color Palette
- **Midnight Charcoal (Backgrounds):** Clean dark foundation (`#0f111a` and `#1a1c29`).
- **Electric Cyan (Primary Action):** `#00e5ff`, used for CTAs, active toggles, and highlights.
- **High-Contrast Text:** Primary elements use `#f8fafc` (WCAG AAA compliant against Midnight Charcoal). Secondary descriptions use `#94a3b8` (WCAG AA compliant).

## 3. The Bento Grid Architecture
- Asymmetrical module distribution designed to prevent cognitive overload.
- **Hero Module:** Wide span (e.g. `col-span-2`), features bold AI name and primary "Best For" taxonomy.
- **Quota Visualizer Module:** Square span (`col-span-1`), strictly visualizing data rings or battery bars.
- **Spacing:** Fixed `24px` grid gaps across all breakpoints larger than mobile to ensure absolute consistency.

## 4. UI Components Strategy
We will use customized `shadcn/ui` components augmented by `framer-motion` for dynamic layout shifts. Ensure `Tailwind CSS v4` Native nested syntax and lightning-fast compiler handle all styling.
