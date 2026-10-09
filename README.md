# NEXUS-7 | Human Evolution Protocol

> Cyborg-themed responsive landing page — Techfest IIT Bombay Submission


## ✦ Concept

**NEXUS-7** is a fictional bio-augmentation corporation that sells the idea of human-machine integration. The landing page acts as its public-facing recruitment portal — inviting visitors to "cross the threshold" and request augmentation modules.

The theme is built around the tension between organic humanity and mechanical precision, visualised through a split aesthetic: **cyan = machine**, **red = augmented flesh**.

---

## ✦ Unique Design Choices

| Element | Design Decision |
|---|---|
| **Cyborg Eye Hero** | An animated SVG iris with a scanning laser beam, rings orbiting in opposite directions, and a pupil that tracks the user's cursor |
| **Body Diagram** | Hand-drawn SVG showing half-mechanical / half-organic anatomy, labelled like a technical schematic |
| **HUD Corners** | Fixed bracket overlays in all four corners simulate a heads-up display |
| **Scanline Overlay** | Subtle CRT scanlines across the entire page |
| **Glitch Title** | CSS pseudo-element glitch effect on "HUMANITY" using clip-path masking |
| **Particle Field** | Canvas-based floating particles in cyan / red / neon green |
| **Live Ticker** | Auto-scrolling status bar mimicking a military comms feed |
| **Typing Effect** | Typewriter cycling through synonyms of connection |
| **Animated Counters** | Numbers count up when the hero enters the viewport |
| **Ring Charts** | SVG stroke-dashoffset animated progress rings in the metrics section |
| **Waveform** | Animated bio-signal bars that breathe |
| **Centred Timeline** | Alternating left/right sequence with coloured connector dots |
| **Easter Egg** | Type `nexus7` on keyboard → full hue-rotate glitch flash |

---

## ✦ Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties (design tokens), CSS Grid, Flexbox, animations
- **Vanilla JS** — no frameworks or libraries (zero dependencies)
- **Google Fonts** — Orbitron, Share Tech Mono, Rajdhani

---

## ✦ Features

- ✅ Fully responsive (mobile → 4K)
- ✅ Accessible — ARIA roles, skip links, focus-visible outlines, keyboard navigable
- ✅ Dark-mode native
- ✅ Scroll-reveal animations via IntersectionObserver
- ✅ Mobile hamburger nav
- ✅ Form with submission feedback
- ✅ Zero external dependencies (no jQuery, no React, no Bootstrap)

---

## ✦ File Structure

```
cyborg-landing/
├── NEXUS7.html      # Full single-page application combined .css and .js
├── style.css       # All styles — tokens, layout, animations, responsive
├── main.js         # Particles, counters, typing, eye tracking, reveals
└── README.md
└── LISENSE
└── index.html
```

---

## ✦ Running Locally

Just download and run the  `NEXUS7.html` in any modern browser. No build step needed.

```bash
```

---

## ✦ Color System

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#03070f` | Page background |
| `--cyan` | `#00ffff` | Machine / tech elements |
| `--red` | `#ff0044` | Augmented / flesh elements |
| `--neon` | `#39ff14` | Status / live indicators |
| `--muted` | `#5a6a80` | Secondary text |

---

## ✦ Credits

Designed and developed for **Techfest IIT Bombay** — Web Design Challenge.
Dewansh Dilip Lohakare
