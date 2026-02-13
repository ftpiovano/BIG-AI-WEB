# Technology Stack

## Overview
This project utilizes a modern, static web stack optimized for performance, visual impact, and accessibility. It follows a "less is more" philosophy, avoiding heavy frameworks in favor of clean, performant vanilla technologies.

## Core Technologies
- **HTML5:** Semantic structure for optimal SEO and accessibility.
- **CSS3:** Custom properties (CSS variables), `backdrop-filter`, `object-fit`, and global reset patterns (`overflow-x: clip`, `box-sizing: border-box`) for layout stability.
- **JavaScript (ES6+):** Lightweight vanilla JS for reliable cross-device autoplay and interaction-triggered video playback fallback.
- **Video Media:** Optimized H.264 MP4 (`aurora_bg_h264.mp4`) for the global, fixed background.
- **Typography:** Google Fonts (Inter) for a modern, clean look.

## Key Implementation Features
- **Global Video Background:** A dedicated `.bg-video` layer (`z-index: 0`, `pointer-events: none`) with a fixed position and semi-transparent overlay.
- **Mobile-First Responsiveness:** Specific CSS overrides for small screens, including simplified branding, hidden taglines, and optimized card heights.
- **Glassmorphic UI:** Unified container styling using `var(--color-background)` and `var(--color-border)` with consistent `box-shadow` and `backdrop-filter`.
- **Performance:** Optimized asset loading and minimal script execution.
- **Accessibility:** Adherence to semantic standards and focus on readability through strong contrast and whitespace.

## Deployment & Hosting
- **Static Hosting:** The site is designed for deployment on high-speed CDNs or static hosting providers (e.g., Netlify, Vercel, GitHub Pages).