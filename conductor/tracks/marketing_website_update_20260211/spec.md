# Specification: Marketing Website "Hard Redesign"

This document outlines the non-negotiable design specifications, content and component requirements, and quality bar for the marketing website redesign. The goal is to create a premium, scroll-storytelling experience inspired by modern web design principles.

## 1. Design & Layout Specifications

### 1.0. Global Background Video
*   **Implementation:** A dedicated `<div class="bg-video">` containing a `<video>` element (`aurora_bg_h264.mp4`).
*   **Behavior:** Fixed position, covering 100vw and 100vh, placed at `z-index: 0` with `pointer-events: none`.
*   **Overlay:** A `::before` pseudo-element on `.bg-video` provides a semi-transparent black overlay (`background: rgba(0, 0, 0, 0.52)`, `z-index: 1`) to ensure content legibility.
*   **Content Layering:** All page content must be wrapped in a `.page` container with `position: relative` and `z-index: 1` to sit above the video layer.
*   **Attributes:** `autoplay`, `muted`, `loop`, `playsinline`, `preload="auto"`.

### 1.1. Layout System
*   **Container:** `max-width: 1300px` for main content areas, centered horizontally.
*   **Glassmorphism:** All UI containers (cards, headers, team profiles, contact panels) must use `var(--color-background)` and `var(--color-border)` to create a unified glass effect.
*   **Responsive Grid:**
    *   **Desktop (>= 1024px):** 12-column grid.
    *   **Tablet (768px - 1023px):** 8-column grid.
    *   **Mobile (< 768px):** 4-column grid.
*   **Sections:**
    *   **Transparency:** All major sections must have `background: transparent !important` to reveal the global background video.
    *   Appropriate vertical padding to prevent "giant blank areas."

### 1.2. Typography
*   **Fluid Scale (using `clamp()`):**
    *   **H1:** `clamp(48px, 5vw, 80px)` (for new Hero Headline)
    *   **H2:** `clamp(28px, 3vw, 40px)`
    *   **Body Text:** `16px` to `18px`, with `line-height: 1.6`.
*   **Line Length:** Text blocks (`p` tags) should have a `max-width` (e.g., `65ch`-`75ch`) for optimal readability.
*   **Whitespace:** Generous and intentional use of whitespace around elements and text for visual clarity and hierarchy.

### 1.3. Spacing
*   **Consistent Scale (CSS Variables):** `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px`.

### 1.4. Buttons
*   **Primary Button:** Filled style, using brand primary color.
*   **Secondary Button:** Outline style, using brand primary color for text/border.
*   **States:** Distinct `hover` and `focus` states (e.g., subtle `transform: translateY(-2px)`, `box-shadow` changes).
*   **Styling:** Consistent padding and `border-radius`.

### 1.5. Navigation
*   **Sticky Header:** Persistent header at the top with logo, navigation links, and a primary "Book a Call" button.
*   **Active Section Highlighting:** Navigation links should visually indicate the currently scrolled-to section (via JS).
*   **Mobile CTA Bar:** A sticky bottom CTA bar with a "Book a Call" button, visible only on mobile.

### 1.6. Motion & Interactivity
*   **Scroll Animation:** Subtle reveal animations (e.g., fade-in, slide-up) for sections/elements as they enter the viewport, implemented via `IntersectionObserver` in `script.js`.
*   **Reduced Motion Support:** All animations must respect the `prefers-reduced-motion` media query (CSS).
*   **Smooth Scroll:** Clicking on internal anchor links (`href="#section-id"`) should result in smooth scrolling (CSS `scroll-behavior: smooth`).
*   **Parallax Scroll Effect:** Implement a smooth parallax scroll effect for designated elements (e.g., floating cards). **The `maxTravel` for parallax movement is `70px`.**

## 2. Content & Component Requirements

### 2.1. Hero Section (New Design)
*   **Container & Layout:** Full viewport width (100vw), tall hero band (~700–900px visible height). Everything centered horizontally; content constrained to a max width (`~1100–1300px`).
*   **Background / Visual Treatment:**
    *   Base color: near-black navy, subtle center lift (`#070B14` (edges) → `#0E1524` (center) radial gradient).
    *   Texture: “warp speed” / motion-blur streaks spanning the full section. Diagonal flow left→right with slight tilt, denser and brighter on the right side. Colors: cool blues and cyan, with occasional violet/magenta hints (more noticeable left/lower).
    *   Legibility overlay: a dark translucent veil/gradient over the background.
*   **Header Stack (top center):**
    *   Pill label: "About Us", rounded-full capsule, small type, semi-transparent blue-gray fill, subtle glow/soft edge, centered.
    *   Main headline (H1): "Accelerating Automotive Innovation with AI", very large (`clamp(48px, 5vw, 80px)`), bold/extra-bold, pure white, tight letter spacing, centered.
    *   Supporting paragraph: "At BIG Intelligence AI, we are at the forefront of AI transformation for the automotive industry. Combining deep domain knowledge with cutting-edge artificial intelligence, we empower companies to navigate complex challenges and unlock unprecedented innovation.", medium size, muted blue-gray, comfortable line height, centered, limited width.
*   **Feature Grid (4 columns):**
    *   4 equal columns, evenly spaced, centered within the same max-width container.
    *   Responsive collapse to 2 columns then 1 column.
    *   Each feature column: center-aligned stack: icon tile → heading → body text.
    *   Icon tile: rounded square (radius ~12–16px), size ~56–72px, blue gradient fill (mid blue to deeper blue), subtle inner shine, white line icon centered.
    *   Feature heading: white, semibold/bold, ~18–22px, centered.
    *   Feature body: muted blue-gray, smaller than heading, 2–4 lines, centered, constrained width per column.

### 2.2. Services Section
*   **Section Container:** Full-width section on a white background. Large vertical padding (~80–120px). Content centered with a max width (`~1100–1300px`).
*   **Top Header Stack (centered):**
    *   Small rounded pill label: "Our Services", light blue/blue-gray fill, tiny font.
    *   Large H2 heading: "Empowering Your Future with AI-Driven Solutions", dark text.
    *   Short supporting paragraph: "At BIG Intelligence AI, we believe technology should enhance and simplify your operations, not complicate them. We partner with forward-thinking organizations to lead meaningful AI transformation, bridging the gap between ambition and execution.", muted gray, constrained width, wraps to ~2–3 lines.
*   **Main Layout (two columns):**
    *   Responsive grid/flex: Desktop: 2 columns, roughly 45/55 or 50/50. Tablet: stack, with left visual on top of right content.
    *   Column gap: moderate/large (~40–80px).
*   **Left Column (visual composition):**
    *   A large “base card” rectangle: Pale blue/lavender tint, very rounded corners (radius ~24–32px), subtle soft shadow. **Height adjusted to `min-height: 600px;` to match adjacent content.**
    *   A landscape image element inside/overlapping the lower-left area of the base card: **A relevant consulting image is used.** Rounded corners (radius ~16px for all corners), slight drop shadow.
    *   A small floating white square/rounded card near the upper-right of the base card: Size ~120–170px (square-ish), rounded corners (radius ~14–18px), more pronounced shadow (to feel “floating”). Contains a simple blue line icon centered and **caption text "Strategy & Expertise".**
*   **Right Column (content block):**
    *   Oversized headline: "Transform Your Business with Strategic AI Solutions". Part of the headline ("Strategic AI Solutions") in bright accent blue, rest in dark/black. Font size roughly 44–60px on desktop (responsive down).
    *   Supporting paragraph below: "Unlock clarity, automation, and growth with a partner that brings strategy, education, and execution together. We help businesses and enterprise teams adopt AI with confidence—combining tailored consulting, voice solutions, and smart automation to boost efficiency, innovation, and competitive edge.", muted gray, comfortable line height.
    *   Checklist list (4 items):
        *   "Custom AI Model Development"
        *   "Legacy System Integration"
        *   "Scalable Architecture Design"
        *   "Process Optimization"
        Each item starts with a small circular blue check icon. Text dark gray/black, medium weight. Spacing between items moderate.
    *   CTA button: "Get Started" with right chevron/arrow icon. Dark navy/near-black fill, white text, rounded-pill shape, subtle shadow.
*   **Scroll effect requirement (floating square card):** As the user scrolls through this section, the small floating white square card should move slightly (parallax), smoothly, without jitter (transform for performance: translate3d). **The `maxTravel` for parallax movement is `70px`.**

### 2.3. Meet Our Expert Team Section
*   **Content:**
    *   Individual team member cards with:
        *   Initials in a circular container (replacing images).
        *   Name and Title.
        *   "All Expertise" summary paragraph below name and title.
        *   "Key Expertise" pills/tags.
        *   "💼 Experience" section with a timeline layout:
            *   Each timeline item includes a dot, title, subtitle, and date.
        *   "🎓 Education & Certification" section as the last item:
            *   First line (degree and university) bold and white.
            *   Other certification details below.
*   **Styling:** Professional and fancy, closely mimicking `bigintelligenceai.com`'s team section.

### 2.4. Outcomes Section
*   **Layout:** Responsive grid (e.g., 2 or 3 columns on desktop, 1 column on mobile) for 6 cards.
*   **Card Content (for each of 6 cards):**
    *   Outcome Title.
    *   Metric Placeholder (e.g., "-30% triage time", "25% faster development").
    *   One-line explanation.

### 2.5. Solutions Section
*   **Layout:** Responsive grid (e.g., 2x2 grid on desktop, stacked on mobile) for 4 solution cards.
*   **Solutions (each as a card):**
    *   **SDV Consulting & Support:**
        *   Outcomes (2 bullets).
        *   Deliverables (3 bullets).
    *   **Garage Opener Integrated with the Car:**
        *   Outcomes (2 bullets).
        *   Deliverables (3 bullets).
    *   **AI-assisted SDLC:**
        *   Outcomes (2 bullets).
        *   Deliverables (3 bullets).
    *   **Diagnostics / Prognostics / Data Analytics:**
        *   Outcomes (2 bullets).
        *   Deliverables (3 bullets).

### 2.6. Platforms & Accelerators Section
*   **Layout:** 2 feature panels (e.g., side-by-side on desktop, stacked on mobile).
*   **Content (for each panel):**
    *   **AI-driven automation / workflow optimization.**
    *   **Intelligent Conversational Interfaces** (Voice AI agents concept).
*   **Diagram:** A responsive "How it works" 3-step horizontal flow (HTML/CSS-based, no images).

### 2.7. Proof Section
*   **Content:**
    *   **Logo Strip:** Placeholder for client logos.
    *   **2 Mini Case Studies:** "Before/After" scenario with 3 metrics each (placeholders).
    *   **1 Testimonial Card:** Placeholder for client quote and name.

### 2.8. Process Section
*   **Content:** A 4-step timeline (Discover → Design → Build → Deploy) with short descriptions, responsive layout.

### 2.9. Contact Section
*   **Layout:** Final CTA band above the contact section.
*   **Form:** A real HTML contact form with fields for Name, Email, and Message.
*   **Validation:** Basic HTML5 form validation (e.g., `required`, `type="email"`).
*   **Fallback:** A `mailto` link.

### 2.10. Footer
*   Basic copyright information.

## 3. Quality Requirements (Definition of Done)
*   **Code Quality:**
    *   No external UI frameworks or build steps. Vanilla CSS/JS only.
    *   Must run by double-clicking `index.html`.
    *   No inline styles.
    *   Clean, semantic HTML5.
*   **Content Quality:** No "lorem ipsum". All copy must be concise, outcome-oriented, and reflect the "concise, confident, engineering-first" brand voice.
*   **Visual Fidelity:**
    *   Desktop layout clearly shows grids/cards/panels properly with no giant blank areas.
    *   Buttons look premium with specified states.
    *   Sections have clear visual differentiation (alternating backgrounds, clear separators).
*   **Responsiveness:** The layout must be intentional and well-designed for mobile, tablet, and desktop (`max-width: 1300px` container used consistently).
*   **Accessibility:**
    *   Visible focus rings on interactive elements (`:focus-visible`).
    *   Correct labels for form inputs (`<label for="...">`).
    *   Sufficient color contrast.
    *   Support for `prefers-reduced-motion`.
