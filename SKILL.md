---
name: animation
description: >
  Expert web animation skill for building polished, production-grade animations on websites.
  Use this skill whenever the user wants to animate anything on a website — including but not
  limited to: scroll-triggered reveals, cinematic hero intros, card hover effects, element
  entrance animations, GSAP timelines, Framer Motion components, parallax effects, spring
  physics, Android 16 / Material 3 Expressive-style springy UI animations, page transitions,
  staggered list reveals, magnetic buttons, text character animations, morphing shapes, or
  any other visual motion effect. Trigger even for casual phrasing like "make this pop",
  "animate when scrolling", "add some life to the page", or "make it feel more modern".
  Covers vanilla JS, React, HTML/CSS, GSAP, Framer Motion, and CSS-only animations.
---

# Animation Skill

A skill for building high-quality, production-grade web animations. Covers the full spectrum
from subtle micro-interactions to cinematic multi-step sequences.

## Library Selection Guide

Pick the right tool first:

| Goal | Best Tool |
|------|-----------|
| Scroll-driven storytelling, complex timelines | GSAP + ScrollTrigger |
| React component animations, page transitions | Framer Motion (motion/react) |
| Lightweight CSS-only hover/reveal | CSS transitions + @keyframes |
| Spring-physics / Android 16 feel | Framer Motion springs OR GSAP elastic ease |
| Page-load cinematic intros | GSAP timeline OR Framer Motion variants |
| 3D transforms, morphing shapes | GSAP + CSS `perspective` / `transform-style` |
| Character/word text reveals | GSAP SplitText OR custom Framer span mapping |

If the user hasn't specified, ask or infer from context (React project → Framer Motion; HTML page → GSAP or CSS).

---

## Core Principles (apply to all animations)

1. **Only animate `transform` and `opacity`** — these are GPU-composited and never cause layout reflow. Avoid animating `width`, `height`, `top`, `left`, `margin` directly.
2. **Respect `prefers-reduced-motion`** — always wrap animations in a media query check or conditional.
3. **Stagger intentionally** — stagger reveals at 0.08–0.15s per item for natural feel; too fast looks mechanical, too slow feels sluggish.
4. **Easing matters** — use `power2.out` / `easeOut` for entrances, `power2.inOut` for scrubbed scroll, `back.out` or spring for bouncy/expressive feel.
5. **Clean up on unmount** (React) — always return cleanup functions from `useEffect` for GSAP contexts; always use `AnimatePresence` for exit animations in Framer Motion.

---

## Android 16 / Material 3 Expressive Style

Material 3 Expressive (Android 16) uses **spring-based physics** — not duration/easing curves.
Key characteristics to replicate on the web:
- **Spatial springs**: elements feel like they have mass and momentum (use `stiffness: 400, damping: 28` as a starting point)
- **Effects springs**: color/opacity transitions feel "attached" to the interaction
- **Contextual reaction**: nearby elements subtly respond when one is interacted with (use variant propagation in Framer Motion or staggered GSAP tweens)
- **Shape morphing**: smooth border-radius transitions between states

```jsx
// Framer Motion spring card — Android 16 feel
<motion.div
  whileHover={{ scale: 1.03, y: -4 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 28 }}
/>

// Shape morph example
<motion.div
  animate={{ borderRadius: isExpanded ? "24px" : "8px" }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>
```

For CSS-only spring feel, use `cubic-bezier(0.34, 1.56, 0.64, 1)` — this creates a subtle overshoot like a spring.

---

## GSAP Patterns

### Setup (always register plugins)
```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // Club plugin
gsap.registerPlugin(ScrollTrigger, SplitText);
```

### Cinematic Page Intro Timeline
```js
// Staggered hero intro — elements drop in one after another
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
  .from(".hero-title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
  .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
  .from(".hero-cta", { y: 20, opacity: 0, scale: 0.95, duration: 0.5 }, "-=0.3");
```

### Scroll-Triggered Card Reveal (staggered)
```js
gsap.from(".card", {
  scrollTrigger: {
    trigger: ".cards-container",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 60,
  opacity: 0,
  duration: 0.7,
  ease: "power2.out",
  stagger: 0.1,
});
```

### Scrubbed Parallax (scroll-linked)
```js
gsap.to(".parallax-bg", {
  yPercent: -25,
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

### Pinned Horizontal Scroll Panel
```js
gsap.to(".panels-container", {
  xPercent: -100 * (panelCount - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-section",
    pin: true,
    scrub: 1,
    end: () => "+=" + document.querySelector(".panels-container").offsetWidth,
    invalidateOnRefresh: true, // responsive-safe
  },
});
```

### React + GSAP (useGSAP hook — preferred)
```jsx
import { useGSAP } from "@gsap/react";

function Component() {
  const container = useRef();
  useGSAP(() => {
    gsap.from(".item", { opacity: 0, y: 30, stagger: 0.1 });
    // No manual cleanup needed — useGSAP handles it
  }, { scope: container });
  return <div ref={container}>...</div>;
}
```

> See `references/gsap-patterns.md` for more advanced patterns: SplitText word reveals, SVG drawing, image sequence on scroll, Flip animations.

---

## Framer Motion Patterns

### Cinematic Staggered Intro (variants pattern)
```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};
const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i} variants={item}>{i}</motion.li>)}
</motion.ul>
```

### Card Reveal on Scroll
```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ type: "spring", stiffness: 260, damping: 22 }}
/>
```

### 3D Tilt Hover Card
```jsx
function TiltCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
```

### Page Transitions (AnimatePresence)
```jsx
// In layout or router
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Magnetic Button
```jsx
function MagneticButton({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  return (
    <motion.button
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      {children}
    </motion.button>
  );
}
```

> See `references/framer-patterns.md` for more: layout animations, shared element transitions, drag-to-reorder, scroll-linked progress indicators.

---

## CSS-Only Animations

### Smooth Hover Card Lift
```css
.card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Shimmer/Skeleton Loading
```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### Scroll-Driven CSS Animation (modern browsers)
```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

---

## Accessibility

Always include reduced-motion handling:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

For GSAP:
```js
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // all GSAP animations here
});
```

For Framer Motion:
```jsx
const { reducedMotion } = useReducedMotion();
// Use reducedMotion flag to conditionally simplify transitions
```

---

## Performance Checklist

- [ ] Only animating `transform` and `opacity`
- [ ] Used `will-change: transform` sparingly (only on elements mid-animation)
- [ ] GSAP ScrollTrigger has `invalidateOnRefresh: true` on responsive layouts
- [ ] Large image sequences preloaded before scroll animation starts
- [ ] React: GSAP animations scoped with `useGSAP` or tied to `useLayoutEffect`
- [ ] No `stagger` delay over 0.2s on lists longer than 10 items
- [ ] Tested with DevTools → Rendering → "Paint flashing" off during animation

---

## Reference Files

- `references/gsap-patterns.md` — Advanced GSAP: SplitText, SVG, Flip, image sequences, horizontal scroll
- `references/framer-patterns.md` — Advanced Framer Motion: layout animations, drag, shared transitions, scroll progress
