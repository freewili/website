# FREE-WILi 2 Landing Page — Design Spec

Date: 2026-06-01

## Goal
A single-scroll product landing page for **FREE-WILi 2** (www.freewili.com), in the spirit of the
M5 CardputerZero page: hero → spec strip → alternating feature blocks → full spec table → CTA.
Dark hacker/DEFCON neon aesthetic. Curated highlights (~12 feature blocks). Delivered as one
self-contained `index.html` (CSS + JS inline) referencing the existing `assets/` folder. No build step.

## Visual language
- Canvas `#0a0a0b`, surfaces `#141416`, hairlines `rgba(255,255,255,.08)`.
- Brand: "FREE" (white) + "WILI" (red `#e8202a`). Neon accents: cyan `#22d3ee`, electric green `#39ff14`.
- Fonts: JetBrains Mono (eyebrows, labels, stats, spec keys) + Inter (body), via Google Fonts with
  system fallbacks.
- Texture: faint PCB-trace/grid background + subtle scanline. Glow on CTAs, hover-lift on cards,
  IntersectionObserver scroll-reveal. Respects `prefers-reduced-motion`.
- Responsive: multi-column → single column on mobile; sticky nav collapses.

## Structure
1. Sticky nav — logo, anchors (Features · Software · Specs), `Buy at DEFCON` CTA.
2. Hero — `DEFCON 2025` eyebrow, "FREE-WILi 2" headline, tagline, `freewil2.png` device with neon glow,
   two CTAs, animated grid backdrop.
3. Spec strip — chips: RP2350 · 8MB SRAM · 3.5″ 480×320 touch · 3000mAh · 7-port USB hub · CAN FD 8Mbit.
4. ~12 alternating feature blocks (asset + copy from the brief):
   RP2350 brain + 8MB SRAM (DEFCON origin) · 3.5″ cap-touch display · Radios (WiFi C5 5GHz + SubGHz
   CC1101/LoRa + Meshtastic, `meshtastic.webp`) · AI & Agents (Claude + LM Studio, `ai.webp`) ·
   FREE-WILi GUI (`fwgui.webp`, `screen.webp`) · Retro gaming (Fruit Jam-compatible, PICO-8 & Doom;
   `doom.mov` muted-loop, `fruitjam.webp`) · Linux onboard RPi CM0 (`cm0.webp`) · 3× USB host
   (`hostports.webp`) · Sensors & environment (9-DOF IMU+mag, light, temp/humidity; `sensors.webp`) ·
   Expandable GPIO/Orca + analog + prog. power + CAN FD (`pinout.webp`, `FWConnector.webp`) ·
   RFID/NFC + IR · Portable power (ULP, 17 power zones, 3000mAh).
5. Full spec table — grouped: Compute, Display & Input, Connectivity, Analog/GPIO, Sensors, Power, Storage.
6. CTA footer — "See it at DEFCON", link to freewili.com.

## Assets used
`freewil2.png` (hero), `wili8.webp`, `pinout.webp`, `FWConnector.webp`, `fwgui.webp`, `screen.webp`,
`sensors.webp`, `meshtastic.webp`, `fruitjam.webp`, `cm0.webp`, `hostports.webp`, `ai.webp`,
`simulator.webp`, `doom.mov`.

## Out of scope
E-commerce/cart, real nav routing, CMS, multi-page. Marketing copy is paraphrased from the brief.
