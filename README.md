# Linear Landing Page Clone

A responsive landing page inspired by [Linear](https://linear.app), built with React, TypeScript, and Vite. The page includes an animated hero section, interactive resource cards, a feature grid, and a multi-column footer.

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

---

## Project Structure

The application follows a simple, component-driven layout. Each UI section lives in its own folder with a dedicated `.tsx` and `.css` file.

```
src/
├── assets/              # Images (ball.avif, card1–card7, hero.png)
├── components/
│   ├── header/          # Fixed navigation bar with mobile menu
│   ├── hero/            # Hero section with scrolling icon grid + center ball
│   ├── resource/        # Planning & Building cards (interactive graph)
│   ├── featureCard/     # 2-column grid of 6 feature cards
│   └── footer/          # Multi-column footer with legal links
├── pages/
│   └── home/            # Home page — composes all sections
├── App.tsx              # Root app entry
├── main.tsx             # React DOM mount
└── index.css            # Global styles
```

**How it is organized**

- **`pages/home`** acts as the page shell. It imports and arranges sections in order: Header → Hero → Resource → FeatureCards → Footer.
- **`components/`** holds self-contained UI blocks. Each folder owns its markup, styles, and (where needed) local data files.
- **`assets/`** stores static images referenced by components.
- **Data files** (`footerData.ts`, `featureCardsData.ts`) are separated from presentation so content can be updated without touching component logic.

---

## Reusable Components

| Component | Location | Why it is reusable |
|-----------|----------|-------------------|
| **Header** | `components/header/` | Fixed nav with logo, link list, auth buttons, and a hamburger menu. Nav links are driven by a data array, so links can be changed in one place. Works on any page by dropping in `<Header />`. |
| **Hero** | `components/hero/` | Self-contained hero with animated background grid and centered logo. No page-specific props required. |
| **Resource** | `components/resource/` | Card layout pattern (image area + description footer) used for Planning and Building cards. The Building card reuses the same card shell with a different visual (`BuildingGraph`). |
| **BuildingGraph** | `components/resource/BuildingGraph.tsx` | Isolated SVG graph with cursor-driven animation. Exported `useGraphMouse` hook can be attached to any parent container. |
| **FeatureCards** | `components/featureCard/` | Renders a grid from `featureCardsData.ts`. Adding or editing cards only requires updating the data file. |
| **Footer** | `components/footer/` | Column-based footer driven by `footerData.ts`. Logo, link columns, and legal links are all data-driven. |

**Reusability patterns used**

- **Data-driven rendering** — Footer links, feature cards, and header nav items are arrays mapped to JSX, not hard-coded one-off markup.
- **Colocated styles** — Each component ships with its own CSS file, so it can be moved or reused without global style conflicts.
- **Separation of concerns** — Animation logic (`BuildingGraph`, `useGraphMouse`) is extracted from layout components (`Resource`).

---

## Engineering Decisions

1. **React + TypeScript + Vite**  
   Vite gives fast dev feedback. TypeScript adds type safety for component props and data structures (e.g. `FeatureCard`, `FooterColumn`).

2. **Plain CSS over a UI framework**  
   Custom CSS was chosen to match Linear’s dark, minimal aesthetic without pulling in Tailwind or a component library. Scoped class names per component keep styles predictable.

3. **CSS animations for the hero grid**  
   The background icon rows use `@keyframes` and `translateX` for a smooth, infinite horizontal scroll. This avoids JavaScript animation overhead for a purely decorative effect.

4. **SVG + `requestAnimationFrame` for the Building graph**  
   The interactive graph uses SVG paths with Catmull-Rom splines. Cursor position is tracked on X and Y axes; values are smoothed with linear interpolation (lerp) inside a `requestAnimationFrame` loop for fluid motion without jank.

5. **Fixed header with backdrop blur**  
   The header stays visible on scroll using `position: fixed`, a semi-transparent background, and `backdrop-filter: blur()` for a modern glass effect.

6. **Mobile-first responsive breakpoints**  
   Media queries at `1024px`, `768px`, and `480px` adjust layout: hamburger menu on mobile, single-column feature cards, wider resource cards with side padding on small screens.

7. **Lucide React for icons**  
   Lightweight icon set used for chevrons, menu/close buttons, and hero grid icons — tree-shakeable and consistent in style.

---

## Trade-offs

| Intentionally not implemented | Reason |
|------------------------------|--------|
| **Routing (React Router)** | Single-page landing only. No additional routes were needed. |
| **State management library** | Local `useState` / `useRef` is sufficient for menu toggle and graph animation. Redux or Zustand would add unnecessary complexity. |
| **Real navigation links** | Footer and header links use `href="#"` placeholders. The focus was on UI fidelity, not backend or routing integration. |
| **Accessibility audit (full WCAG)** | Basic semantics (`<header>`, `<footer>`, `<nav>`, `aria-label` on menu button) are in place, but full keyboard navigation and screen-reader testing were not completed. |
| **Unit / E2E tests** | Time was prioritized for visual accuracy and interactions. Tests would be a natural next step. |
| **Image optimization pipeline** | Assets are used as provided (`.avif`, `.png`). No lazy loading or responsive `srcset` was added. |
| **Pixel-perfect match to Linear** | The clone closely follows the reference design but uses approximate colors, spacing, and animation curves rather than extracting exact values from production. |

---

## Future Improvements

If there were another week to work on this page, the priorities would be:

1. **Polish animations** — Fine-tune hero grid speed, graph wave amplitude, and easing curves to match Linear’s production site more closely.
2. **Accessibility** — Add focus traps for the mobile menu, skip-to-content link, proper heading hierarchy, and keyboard support for all interactive elements.
3. **Performance** — Lazy-load below-the-fold images, add `loading="lazy"` on feature card images, and consider converting heavy PNGs to AVIF/WebP.
4. **Component library extraction** — Pull `Card`, `ArrowButton`, and `SectionLabel` into shared primitives used by Resource and FeatureCards to reduce duplicated markup and styles.
5. **Routing & real pages** — Wire header/footer links to actual routes (Pricing, Docs, etc.) with React Router.
6. **Testing** — Add Vitest component tests for `BuildingGraph` cursor behavior and Playwright E2E tests for mobile menu and responsive layouts.
7. **Dark/light theme toggle** — Linear supports theme switching; a CSS variable–based theme system would make this straightforward to add.
8. **Footer responsive layout** — Improve footer column stacking on very small screens and reduce horizontal scroll risk on narrow viewports.
