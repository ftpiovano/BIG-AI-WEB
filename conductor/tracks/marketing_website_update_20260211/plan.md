# Implementation Plan: Marketing Website "Hard Redesign"

## Phase 1: Setup, Design Tokens & Grid System

- [x] Task: Initialize HTML Structure and Basic Files
    - [x] Write Tests: N/A (Initial setup)
    - [x] Implement Feature: Overwrite `index.html` with basic HTML5 structure, links to `styles.css` and `script.js`, and Google Fonts import (`Inter`).
    - [x] Implement Feature: Overwrite `script.js` with an empty file initially.
- [x] Task: Implement Global Background Video
    - [x] Implement Feature: Add `.bg-video` container with `aurora_bg_h264.mp4` to `index.html`.
    - [x] Implement Feature: Add CSS for fixed positioning, `z-index: 0`, and `pointer-events: none`.
    - [x] Implement Feature: Add `::before` overlay for readability (`rgba(0, 0, 0, 0.52)`).
    - [x] Implement Feature: Wrap all content in `.page` container with `z-index: 1`.
    - [x] Implement Feature: Ensure all sections have transparent backgrounds.
- [x] Task: Implement Glassmorphic Unified Styling
    - [x] Implement Feature: Update `styles.css` with global rules forcing `var(--color-background)` and `var(--color-border)` on all card-like components.
    - [x] Implement Feature: Add `backdrop-filter: blur(8px)` to the sticky header.
- [x] Task: Refine Mobile Responsiveness and Layout Stability
    - [x] Implement Feature: Add global `box-sizing: border-box` and `overflow-x: clip`.
    - [x] Implement Feature: Implement mobile-specific header overrides (hide tagline/CTA).
    - [x] Implement Feature: Optimize Services base-card and visual wrappers for mobile viewports.
- [x] Task: Define Comprehensive Design Tokens and Base Styles
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Overwrite `styles.css` with CSS reset, comprehensive design tokens in `:root` (colors, spacing, radius, shadows, font stack).
    - [x] Implement Feature: Refine base `body` styles, including `font-family`, `font-size`, `line-height`, and `text-rendering`.
- [x] Task: Implement Responsive Grid System and Fluid Typography
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Implement `max-width: 1120px` container and responsive 12/8/4-column grid system in `styles.css`.
    - [x] Implement Feature: Implement `clamp()` for H1 and H2 font sizes, and optimal line-length for paragraphs.
    - [x] Implement Feature: Implement common utility classes (`.container`, `.grid`, `.section-padding`, `.text-center`).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Setup, Design Tokens & Grid System' (Protocol in workflow.md)

## Phase 2: Core Components & Navigation

- [x] Task: Implement Premium Button Styles
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Implement primary and secondary button styles with distinct `hover` and `focus` states, consistent padding, and `border-radius`.
- [x] Task: Implement Card Component Styles
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Implement base `card` styles including `box-shadow`, `border-radius`, and subtle `hover` effects.
- [x] Task: Implement Sticky Header and Navigation
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Implement the full sticky header HTML structure (`main-header`, `logo`, `main-nav` with links to `Solutions`, `Platforms`, `Proof`, `Process`, `Contact`, `header-cta` button) in `index.html`.
    - [x] Implement Feature: Style the sticky header, navigation links, and desktop CTA in `styles.css`, ensuring responsiveness.
- [x] Task: Implement Mobile Sticky Bottom CTA Bar
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Add the `mobile-cta-bar` HTML structure (with a primary CTA button) to `index.html`.
    - [x] Implement Feature: Style the `mobile-cta-bar` in `styles.css`, ensuring it's only visible on mobile.
- [x] Task: Define Alternating Section Backgrounds
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Define CSS for alternating section backgrounds (e.g., `section-light`, `section-dark`) and apply to placeholder sections in `index.html`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core Components & Navigation' (Protocol in workflow.md)

## Phase 3: Hero Section & Trust Elements

- [x] Task: Redesign Hero Section with detailed specification and video background
    - [x] Implement Feature: Update index.html with new Hero section HTML structure.
    - [x] Implement Feature: Update styles.css with new Hero section styling and hide background glyphs to prioritize video.
- [x] Task: Implement Services Section with combined content and detailed styling
    - [x] Implement Feature: Update index.html with new Services section HTML structure.
    - [x] Implement Feature: Update styles.css with new Services section styling.
    - [x] Implement Feature: N/A - Decided against Services section floating card parallax effect.
- [x] Task: Implement 'Meet Our Expert Team' Section
    - [x] Implement Feature: Add 'Meet Our Expert Team' section HTML to index.html with detailed member profiles.
    - [x] Implement Feature: Add styles for 'Meet Our Expert Team' section to styles.css.
    - [x] Implement Feature: Re-add 'All Expertise' summary in index.html.
    - [x] Implement Feature: Update Experience timelines for Karl Clark and Rasheem Barnett in index.html.
    - [x] Implement Feature: Add initials to presentation cards in index.html.
    - [x] Implement Feature: Bold and make white the first line of 'Education & Certification' in index.html and styles.css.
- [x] Task: Implement Trust Metrics Pills
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Add HTML for 3 metric pills below the Hero section in `index.html`.
    - [x] Implement Feature: Style the metric pills in `styles.css`.
- [~] Task: Implement "Trusted by" Logo Strip
    - [ ] Write Tests: N/A (Visual verification only)
    - [ ] Implement Feature: Add HTML for a "Trusted by" logo strip (placeholders) below the metric pills in `index.html`.
    - [ ] Implement Feature: Style the logo strip in `styles.css`.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Hero Section & Trust Elements' (Protocol in workflow.md)

## Phase 4: Core Service Offerings

- [ ] Task: Implement Outcomes Section
    - [ ] Write Tests: N/A (Visual verification only)
    - [ ] Implement Feature: Add Outcomes section HTML to `index.html` with 6 cards in a responsive grid, each with outcome title, metric placeholder, and explanation.
    - [ ] Implement Feature: Style the Outcomes section and cards in `styles.css`.
- [ ] Task: Implement Solutions Section
    - [ ] Write Tests: N/A (Visual verification only)
    - [ ] Implement Feature: Add Solutions section HTML to `index.html` with 4 solution cards in a 2x2 grid (desktop), each with "Outcomes" (2 bullets) and "Deliverables" (3 bullets).
    - [ ] Implement Feature: Style the Solutions section and cards in `styles.css`.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Core Service Offerings' (Protocol in workflow.md)

## Phase 5: Platforms, Proof, & Process

- [ ] Task: Implement Platforms & Accelerators Section
    - [ ] Write Tests: N/A (Visual verification only)
    - [ ] Implement Feature: Add Platforms section HTML to `index.html` with 2 feature panels (AI automation, Voice AI agents concept) and a responsive "How it works" 3-step diagram (HTML/CSS).
    - [ ] Implement Feature: Style the Platforms section, panels, and diagram in `styles.css`.
- [ ] Task: Implement Proof Section
    - [ ] Write Tests: N/A (Visual verification only)
    - [ ] Implement Feature: Add Proof section HTML to `index.html` with logo strip placeholders, 2 mini case studies, and 1 testimonial card.
    - [ ] Implement Feature: Style the Proof section components in `styles.css`.
- [ ] Task: Implement Process Section
    - [ ] Write Tests: N/A (Visual verification only)
    - [ ] Implement Feature: Add Process section HTML to `index.html` as a 4-step timeline with short descriptions.
    - [ ] Implement Feature: Style the Process section and timeline in `styles.css`.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Platforms, Proof, & Process' (Protocol in workflow.md)

## Phase 6: Contact & Final Interactivity

- [x] Task: Implement Final CTA Band and Contact Form
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Add Final CTA band HTML to `index.html`.
    - [x] Implement Feature: Add Contact section HTML to `index.html` with a real form (name/email/message, validation) and mailto fallback.
    - [x] Implement Feature: Style the Final CTA band and Contact form in `styles.css`.
- [x] Task: Implement Footer
    - [x] Write Tests: N/A (Visual verification only)
    - [x] Implement Feature: Add a basic footer to `index.html` with copyright info.
    - [x] Implement Feature: Style the footer in `styles.css`.
- [ ] Task: Implement Smooth Scroll and Active Section Highlighting
    - [ ] Write Tests: N/A (Manual verification only)
    - [ ] Implement Feature: Add JavaScript for smooth scrolling for anchor links.
    - [ ] Implement Feature: Add JavaScript for active section highlighting in the navigation.
- [ ] Task: Implement Scroll Reveal Animations
    - [ ] Write Tests: N/A (Manual verification only)
    - [ ] Implement Feature: Implement `IntersectionObserver` in `script.js` for subtle reveal animations on sections/elements.
- [x] Task: Conductor - User Manual Verification 'Phase 6: Contact & Final Interactivity' (Protocol in workflow.md)


## Phase 7: Quality Assurance & Documentation

- [ ] Task: Final Quality Checks
    - [ ] Write Tests: N/A (Manual verification only)
    - [ ] Implement Feature: Review and refine all HTML/CSS/JS for responsiveness, accessibility (focus rings, labels, contrast, reduced-motion), and cross-browser compatibility.
- [ ] Task: Create Documentation
    - [ ] Write Tests: N/A
    - [ ] Implement Feature: Create `README.md` with setup instructions and project overview.
    - [ ] Implement Feature: Generate a brief diff-style summary of all changes.
- [ ] Task: Conductor - User Manual Verification 'Phase 7: Quality Assurance & Documentation' (Protocol in workflow.md)
