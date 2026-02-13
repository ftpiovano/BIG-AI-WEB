# Technology Stack

## Overview
This project utilizes a modern, static web stack optimized for performance, visual impact, and accessibility. It follows a "less is more" philosophy, avoiding heavy frameworks in favor of clean, performant vanilla technologies.

## Core Technologies
- **HTML5:** Semantic structure for optimal SEO and accessibility.
- **CSS3:** Custom properties (CSS variables) for the Aurora theme, flexbox/grid for responsive layouts, and `backdrop-filter` for glassmorphism effects.
- **JavaScript (ES6+):** Lightweight vanilla JS for ensuring reliable video playback of the background media across mobile and desktop browsers, including fallback for restricted autoplay.
- **Video Media:** Optimized H.264 MP4 (`aurora_bg_h264.mp4`) for the global, fixed background.
- **Typography:** Google Fonts (Inter) for a modern, clean look.

## Key Implementation Features
- **Global Video Background:** A dedicated `.bg-video` layer (`z-index: 0`, `pointer-events: none`) with a fixed position, containing a muted, autoplaying video and a semi-transparent black overlay.
- **Layering System:** Uses a `.page` wrapper with `z-index: 1` to ensure content sits reliably above the background video layer.
- **Glassmorphic UI:** Unified styling for all UI containers (cards, headers, form panels) using semi-transparent fills and borders to maintain legibility and brand consistency.
- **Performance:** Optimized asset loading and minimal script execution.
- **Accessibility:** Adherence to semantic standards and focus on readability through strong contrast and whitespace.

## Deployment & Hosting
- **Static Hosting:** The site is designed for deployment on high-speed CDNs or static hosting providers (e.g., Netlify, Vercel, GitHub Pages).