---
name: Raxior Cinematic Core
colors:
  surface: '#10150c'
  surface-dim: '#10150c'
  surface-bright: '#353b30'
  surface-container-lowest: '#0b1007'
  surface-container-low: '#181d14'
  surface-container: '#1c2118'
  surface-container-high: '#262c22'
  surface-container-highest: '#31362c'
  on-surface: '#dfe4d6'
  on-surface-variant: '#c0cab4'
  inverse-surface: '#dfe4d6'
  inverse-on-surface: '#2d3228'
  outline: '#8a9480'
  outline-variant: '#404a39'
  surface-tint: '#87db57'
  primary: '#87dc57'
  on-primary: '#143800'
  primary-container: '#6dbf3e'
  on-primary-container: '#1c4900'
  inverse-primary: '#2c6c00'
  secondary: '#c8c6c6'
  on-secondary: '#303030'
  secondary-container: '#474747'
  on-secondary-container: '#b6b5b4'
  tertiary: '#ffb0d2'
  on-tertiary: '#63003e'
  tertiary-container: '#ff82bf'
  on-tertiary-container: '#79124f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2f970'
  primary-fixed-dim: '#87db57'
  on-primary-fixed: '#082100'
  on-primary-fixed-variant: '#205100'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#ffd8e6'
  tertiary-fixed-dim: '#ffafd2'
  on-tertiary-fixed: '#3d0025'
  on-tertiary-fixed-variant: '#821b57'
  background: '#10150c'
  on-background: '#dfe4d6'
  surface-variant: '#31362c'
typography:
  hero-display:
    fontFamily: Space Grotesk
    fontSize: 96px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-mono:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-page: 64px
  section-gap: 160px
---

## Brand & Style

The design system is built on a "Cinematic Tech" philosophy, blending the high-performance utility of developer tools like Vercel with the immersive, atmospheric aesthetics of high-end production houses. It prioritizes a 95% dark environment to create a sense of infinite depth, punctuated by ultra-bright lime green accents that function as light sources within a digital void. 

The aesthetic style is a hybrid of **Minimalism** and **Glassmorphism**, emphasizing technical precision through sharp edges and geometric clarity. It evokes an emotional response of elite competence, forward-leaning innovation, and absolute clarity. Every element is designed to feel like a high-speed interface, utilizing subtle motion and layered translucency to maintain a lightweight, high-performance tone.

## Colors

The palette is strictly controlled to maintain a high-contrast, premium atmosphere. The background is a near-pure black, serving as the canvas for all cinematic effects. 

- **Primary (Lime Green):** Used exclusively for critical calls to action, active states, and focal points. It should occupy no more than 5% of the total screen real estate to maximize its visual impact.
- **Secondary (Graphite):** Employed for structural elements, borders, and subtle containers.
- **Surface & Depth:** Glassmorphism is achieved using low-opacity white (#FFFFFF) overlays with high-density backdrop blurs, creating a "frosted tech" appearance.
- **Neutral/Text:** Body text uses a desaturated light gray to ensure long-term legibility without competing with the primary lime accents.

## Typography

The design system utilizes **Space Grotesk** for its technical, geometric character. The typography hierarchy is designed for dramatic impact, utilizing extreme scale differences between headlines and body text.

Large headlines must use tight tracking (negative letter spacing) to achieve a "compressed" professional look found in premium editorial design. For body text, tracking is set to neutral to ensure readability against the dark background. Use the "label-mono" style for technical metadata, small tags, or category markers, emphasizing the IT agency's precision-oriented nature.

## Layout & Spacing

This design system follows a **Fixed Grid** philosophy for primary content containers to ensure a cinematic, composed feel, while utilizing fluid margins for edge-to-edge background elements.

The layout is built on an 8px base grid. Section transitions should be aggressive and spacious, using large vertical gaps to allow the 3D abstract shapes and glowing mesh gradients to "breathe" behind the content. Use a 12-column grid for standard layouts, but prioritize asymmetrical compositions for hero sections to maintain a futuristic, non-standard agency vibe.

## Elevation & Depth

Depth is not communicated through traditional drop shadows but through **Tonal Layers** and **Light Emission**.

1.  **Backdrop Layer:** Pure black (#0A0A0A) with subtle 1px grid patterns or mesh gradients.
2.  **Surface Layer:** Semi-transparent Graphite (#3A3A3A) or white-tinted glass (5-10% opacity) with a 20px-40px backdrop blur.
3.  **Glow Layer:** Elements using the primary lime green color should have a subtle radial outer glow (blur: 20px, opacity: 0.3) to simulate a light-emitting diode (LED) effect.
4.  **Borders:** Use thin, 1px solid borders in #3A3A3A or low-opacity white to define shapes without adding visual weight.

## Shapes

The shape language is a deliberate juxtaposition of **Extreme Sharpness** and **Hyper-Fluidity**.

- **Primary Structure:** All cards, input fields, and containers use a 0px radius. This reinforces a technical, "industrial-grade" aesthetic.
- **Interactive Elements:** Buttons and decorative chips utilize a 999px pill-shape. This contrast makes interactive elements instantly recognizable and provides a modern, "Linear-style" sophistication.
- **Visual Decor:** Abstract 3D shapes should feature sharp, crystalline geometry, while background glows should be soft, circular bursts to provide a cinematic atmosphere.

## Components

### Buttons
- **Primary:** Pill-shaped, solid Lime Green (#6DBF3E) with black text. On hover, increase the intensity of the lime glow.
- **Secondary:** Pill-shaped, 1px White border with transparent background and white text.
- **Ghost:** 0px radius (sharp), #A0A0A0 text, no background.

### Cards
- **Technical Card:** 0px radius, #3A3A3A 1px border, backdrop-blur (12px).
- **Glass Card:** 0px radius, 5% white background opacity, subtle top-down white-to-transparent gradient border.

### Inputs
- **Field:** 0px radius, #3A3A3A bottom border only. On focus, the border transitions to Lime Green with a subtle glow.
- **Labels:** Use "label-mono" typography style, positioned above the field.

### Status Indicators & Chips
- **Chips:** Pill-shaped, dark background with 1px Lime Green border. Use a small "glowing dot" (4px circle) next to the text for active status indicators.

### Futuristic Overlays
- **Grid Mesh:** A 1px grid overlay with 40px spacing, set to 5% opacity, used as a background texture for hero sections.
- **Mesh Gradients:** Subtle, slow-moving blurs of Lime Green and Charcoal in the background corners to provide cinematic depth.