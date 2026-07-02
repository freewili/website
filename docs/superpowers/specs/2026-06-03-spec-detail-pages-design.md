# FREE-WILi 2 Spec Detail Pages — Design Spec

Date: 2026-06-03

## Goal
Every chip in the landing page's spec strip (26 chips) links to its own detail page in the
same dark hacker/DEFCON style as `index.html`. No build step; works from `file://` or any
static host.

## File structure
```
webpage/
  index.html        <- inline <style> extracted; links style.css instead
  style.css         <- shared stylesheet: all existing CSS + spec-page additions
  specs/
    rp2350.html          linux-cm0.html       esp32-c5.html        ice40-fpga.html
    display.html         sd-bootloader.html   subghz-lora.html     usb-host.html
    can-fd.html          audio.html           analog-io.html       gpio.html
    programmable-power.html  debug.html       scriptable-usb.html  dvi.html
    sd-reader.html       gaming.html          sensors.html         ai-agents.html
    power.html           python-api.html      zoomio.html          rthon.html
    wasm.html            wiliblocks.html
```

## Chip → page mapping (strip order)
| Chip | Page |
|---|---|
| RP2350 / Dual MCU 16+8MByte | rp2350.html |
| Linux CM0 | linux-cm0.html |
| ESP32 C5 | esp32-c5.html |
| ICE40 FPGA | ice40-fpga.html |
| 3.5" 480×320 Touch | display.html |
| SDCard Bootloader | sd-bootloader.html |
| LoRa+SubGhz | subghz-lora.html |
| USBHost x3 | usb-host.html |
| CAN FD | can-fd.html |
| Audio IO | audio.html |
| Analog IO | analog-io.html |
| GPIO IOx14 | gpio.html |
| Programmable PWR | programmable-power.html |
| Integrated Debug | debug.html |
| Nice USB (scriptable) | scriptable-usb.html |
| DVI out | dvi.html |
| SDCard reader | sd-reader.html |
| Game ON | gaming.html |
| Sensor Package | sensors.html |
| AI Agent | ai-agents.html |
| 3000 mAh | power.html |
| Python API | python-api.html |
| ZoomIO RISCV | zoomio.html |
| rTHON Script | rthon.html |
| C++/Rust WASM | wasm.html |
| WiliBLOCKS | wiliblocks.html |

## Changes to index.html
1. Move the entire `<style>` block into `style.css`; replace with
   `<link rel="stylesheet" href="style.css">`. No rule changes during the move.
2. Each spec-strip `<div class="stat">` becomes `<a class="stat" href="specs/<slug>.html">`
   with identical inner markup. New hover state: cyan glow on `.v`, subtle background lift.
   `.stat` gains `text-decoration:none;color:inherit;display:block` so the look is unchanged.

## Spec page template
Shared structure, all paths relative from `specs/` (`../style.css`, `../assets/...`):
- **Nav** — same sticky nav. Logo → freewili.com. Anchors → `../index.html#features`,
  `#software`, `#specs`. Buy button → the Google Form (same URL as index).
- **Header** — eyebrow `// specifications`, page H1 in Chakra Petch with red/cyan accents,
  the chip's stat value rendered big (same `.v` styling language), chip label as sub-line.
- **Body** — 2–4 paragraphs paraphrased from the product brief (`design.md`); a key-facts
  `<dl>` styled like the index spec cards; a relevant image from `assets/` where one exists,
  click-to-zoom via the same lightbox pattern (markup + small JS per page).
- **Footer nav** — prev/next links following strip order (wrap-around), a
  "← Back to FREE-WILi 2" link to `../index.html`, then the standard © 2026 footer.
- Scroll-reveal (`.rise`) reused; same IntersectionObserver snippet.

## Content depth
- Rich pages (brief covers them): rp2350, linux-cm0, esp32-c5, ice40-fpga, display,
  sd-bootloader, subghz-lora, usb-host, can-fd, audio, analog-io, gpio,
  programmable-power, debug, scriptable-usb, dvi, sd-reader, gaming, sensors,
  ai-agents, power.
- Thin pages (label-only; honest short pages, easy to expand): python-api, zoomio,
  rthon, wasm, wiliblocks.
- All copy paraphrased; no invented hard numbers — unknowns stated plainly or omitted.

## Verification
- Headless Edge screenshots of index.html before/after the CSS extraction (visual diff by eye).
- Screenshots of a sample of spec pages (one rich, one thin, one with image).
- Click-through check: strip chip → page → prev/next → back to index.

## Out of scope
Search, breadcrumbs beyond back-link, CMS, build tooling, changes to index content other
than the strip links and CSS extraction.
