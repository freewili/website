# Spec Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Each of the 26 spec-strip chips on the FREE-WILi 2 landing page links to its own detail page, styled identically to the main page, with shared CSS extracted to `style.css`.

**Architecture:** Extract `index.html`'s inline `<style>` into a shared `style.css` linked by all 27 pages. Convert the strip's `<div class="stat">` chips to `<a class="stat">` links. Build 26 pages in `specs/` from one HTML template; content paraphrased from `design.md` (the product brief). No build step; everything works from `file://`.

**Tech Stack:** Plain HTML/CSS/JS, headless Edge for screenshot verification. Not a git repo — no commit steps; verification is visual + a link-check script.

**Spec:** `docs/superpowers/specs/2026-06-03-spec-detail-pages-design.md`
**Brief (content source):** `design.md` at repo root.

---

### Task 1: Extract index.html CSS into style.css

**Files:**
- Create: `style.css`
- Modify: `index.html` (the `<style>…</style>` block in `<head>`)

- [ ] **Step 1: Baseline screenshot.** `msedge --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size=1280,2200 --screenshot="$env:TEMP\fw-before.png" "file:///C:/~prj/Dropbox/vibeProjects/webpage/index.html"` (note: `~` in the path is a literal directory name).
- [ ] **Step 2:** Copy the entire contents between `<style>` and `</style>` in `index.html` verbatim into a new `style.css`. Do not reformat or change any rule.
- [ ] **Step 3:** In `index.html`, replace the whole `<style>…</style>` block with `<link rel="stylesheet" href="style.css">`.
- [ ] **Step 4: After screenshot** (same command → `fw-after.png`) and compare by eye against `fw-before.png`. Expected: pixel-identical.

### Task 2: Add spec-page CSS to style.css

**Files:**
- Modify: `style.css` (append at end)

- [ ] **Step 1:** Append:

```css
/* ---------- spec strip links ---------- */
a.stat{text-decoration:none;color:inherit;display:block;transition:background .2s}
a.stat:hover{background:rgba(44,230,255,.05)}
a.stat:hover .v{color:var(--cyan);text-shadow:0 0 18px rgba(44,230,255,.55)}
a.stat:hover .v em{color:#fff}

/* ---------- spec detail pages ---------- */
.spec-hero{padding:72px 0 36px;text-align:center;border-bottom:1px solid var(--line)}
.spec-hero h1{font-size:clamp(2rem,6vw,3.4rem);margin:.9rem 0 .4rem}
.spec-hero h1 .n{color:var(--red);text-shadow:0 0 30px rgba(255,46,67,.5)}
.spec-hero .big-stat{font-family:var(--display);font-weight:700;font-size:clamp(1.2rem,3vw,1.7rem);color:#fff}
.spec-hero .big-stat em{font-style:normal;color:var(--cyan)}
.spec-hero .sub{font-family:var(--mono);font-size:.85rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:.3rem}
.spec-body{padding:56px 0;max-width:820px;margin:0 auto}
.spec-body p{color:var(--muted);margin-bottom:1.2rem;font-size:1.04rem}
.spec-body p b,.spec-body p strong{color:var(--text)}
.spec-body .frame{margin:2rem 0;border:1px solid var(--line-strong);border-radius:14px;overflow:hidden;background:#0c0c0e}
.spec-body .frame img{width:100%;height:auto;display:block;cursor:zoom-in}
.spec-facts{background:var(--bg-2);border:1px solid var(--line);border-radius:12px;padding:26px;margin-top:2.2rem}
.spec-facts h4{font-family:var(--mono);font-size:.74rem;letter-spacing:.2em;text-transform:uppercase;color:var(--green);margin-bottom:1rem;font-weight:700}
.spec-facts dl{display:grid;grid-template-columns:auto 1fr;gap:.55rem 1.2rem;font-size:.92rem}
.spec-facts dt{font-family:var(--mono);color:var(--faint);font-size:.8rem;white-space:nowrap}
.spec-facts dd{color:var(--text)}
.spec-nav{display:flex;justify-content:space-between;align-items:center;gap:1rem;border-top:1px solid var(--line);padding:28px 0;flex-wrap:wrap}
.spec-nav a{font-family:var(--mono);font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.spec-nav a:hover{color:var(--cyan)}
.spec-nav .home{color:var(--text)}
```

Note: `.spec-card` uses `background:var(--bg-2)` with no border in the current sheet — `.spec-facts` adds a border deliberately since it stands alone on the page.

### Task 3: Convert strip chips to links

**Files:**
- Modify: `index.html` (the `<!-- SPEC STRIP -->` section, currently `index.html:250-280`)

- [ ] **Step 1:** Replace each `<div class="stat">…</div>` with `<a class="stat" href="specs/<slug>.html">…</a>`, preserving inner markup exactly. Slugs in strip order:

| # | Chip `.v` | slug |
|---|---|---|
| 1 | RP2350 | rp2350 |
| 2 | LinuxCM0 | linux-cm0 |
| 3 | ESP32C5 | esp32-c5 |
| 4 | ICE40FPGA | ice40-fpga |
| 5 | 3.5" | display |
| 6 | SDCardBootloader | sd-bootloader |
| 7 | LoRa+SubGhz | subghz-lora |
| 8 | USBHostx3 | usb-host |
| 9 | CANFD | can-fd |
| 10 | AudioIO | audio |
| 11 | AnalogIO | analog-io |
| 12 | GPIOIOx14 | gpio |
| 13 | ProgrammablePWR | programmable-power |
| 14 | IntegratedDebug | debug |
| 15 | NiceUSB | scriptable-usb |
| 16 | DVIout | dvi |
| 17 | SDCardreader | sd-reader |
| 18 | GameON | gaming |
| 19 | SensorPackage | sensors |
| 20 | AIAgent | ai-agents |
| 21 | 3000mAh | power |
| 22 | PythonAPI | python-api |
| 23 | ZoomIORISCV | zoomio |
| 24 | rTHONScript | rthon |
| 25 | C++/RustWASM | wasm |
| 26 | WiliBLOCKS | wiliblocks |

- [ ] **Step 2:** Screenshot the strip area and confirm chips look unchanged (no underlines/blue text) and hover works.

### Task 4: Build the first spec page (specs/rp2350.html) — the template

**Files:**
- Create: `specs/rp2350.html`

- [ ] **Step 1:** Create `specs/` and write `specs/rp2350.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RP2350 — FREE-WILi 2 Specifications</title>
<meta name="description" content="FREE-WILi 2 spec detail: dual RP2350 microcontrollers with 8 MB SRAM and 16 MB flash each.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" media="print" onload="this.media='all'" href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap"></noscript>
<link rel="stylesheet" href="../style.css">
</head>
<body>

<header class="nav">
  <div class="wrap nav-in">
    <a href="https://www.freewili.com" target="_blank" rel="noopener" class="logo" aria-label="FREE-WILi — visit freewili.com">
      <img class="logo-img" src="../assets/FW_Full_Logo_WHT2.svg" alt="FREE-WILi">
    </a>
    <nav class="links">
      <a href="../index.html#features">Features</a>
      <a href="../index.html#software">Software</a>
      <a href="../index.html#specs">Specs</a>
    </nav>
    <a class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLScKhaCV1lJEdg0SZROQ1WWX5aNY4GcFk7fkkuHtbKtyJYV3zA/viewform" target="_blank" rel="noopener">Buy at DEFCON</a>
  </div>
</header>

<section class="spec-hero">
  <div class="wrap">
    <span class="eyebrow" style="justify-content:center">// specifications</span>
    <h1>Dual RP<span class="n">2350</span> compute</h1>
    <div class="big-stat">RP<em>2350</em></div>
    <div class="sub">Dual MCU 16+8MByte</div>
  </div>
</section>

<div class="wrap">
  <div class="spec-body">
    <p>[2–4 paragraphs of content — see Task 5 content table]</p>
    <div class="frame"><img src="../assets/board.png" alt="FREE-WILi 2 internal board" loading="lazy" decoding="async"></div>
    <div class="spec-facts">
      <h4>Key facts</h4>
      <dl>
        <dt>[fact]</dt><dd>[value]</dd>
      </dl>
    </div>
  </div>
  <nav class="spec-nav">
    <a href="wiliblocks.html">&larr; WiliBLOCKS</a>
    <a class="home" href="../index.html">FREE-WILi 2 home</a>
    <a href="linux-cm0.html">Linux CM0 &rarr;</a>
  </nav>
</div>

<footer>
  <div class="wrap foot-in">
    <a href="https://www.freewili.com" target="_blank" rel="noopener" class="logo" aria-label="FREE-WILi — visit freewili.com">
      <img class="logo-img" src="../assets/FW_Full_Logo_WHT2.svg" alt="FREE-WILi">
    </a>
    <span>&copy; 2026 FREE-WILi &middot; Open hardware</span>
  </div>
</footer>

<div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lb-close" type="button" aria-label="Close image">&#10005;</button>
  <img alt="">
</div>

<script>
(function(){
  var lb=document.getElementById('lightbox'),lbImg=lb.querySelector('img'),closeBtn=lb.querySelector('.lb-close');
  function open(src,alt){lbImg.src=src;lbImg.alt=alt||'';lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
  function close(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');lbImg.src='';document.body.style.overflow=''}
  document.querySelectorAll('.frame img').forEach(function(img){img.addEventListener('click',function(){open(img.currentSrc||img.src,img.alt)})});
  lb.addEventListener('click',close);
  closeBtn.addEventListener('click',function(e){e.stopPropagation();close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('open'))close()});
})();
</script>
</body>
</html>
```

> **Important:** before writing, check the exact footer markup in `index.html` (search `<footer`) and mirror its classes. If the footer's container class differs from `foot-in`, use whatever `index.html` actually uses.

- [ ] **Step 2:** Fill in the real rp2350 content (paragraphs + facts) from the Task 5 table, row 1.
- [ ] **Step 3:** Screenshot `specs/rp2350.html` headlessly. Expected: dark themed page, nav, big title, board image, facts card, prev/next footer.
- [ ] **Step 4:** Open in browser; click the image → lightbox opens; Escape closes.

### Task 5: Build the remaining 25 pages

**Files:**
- Create: `specs/linux-cm0.html` … `specs/wiliblocks.html` (25 files)

Use the Task 4 template for every page; change `<title>`, meta description, hero (h1 / big-stat / sub), body paragraphs, image (or omit the `.frame` div when no image), facts `<dl>`, and prev/next links (strip order, wrap-around: page N links N−1 and N+1; page 1's prev is wiliblocks; page 26's next is rp2350).

Content table — paragraphs are written from these facts (paraphrase the brief in `design.md`; do not invent numbers). H1 styling: wrap one key token in `<span class="n">…</span>` for the red accent.

| slug | H1 | big-stat / sub | image | paragraph facts (from brief) | key facts dl |
|---|---|---|---|---|---|
| rp2350 | Dual RP&lt;n&gt;2350&lt;/n&gt; compute | RP*2350* / Dual MCU 16+8MByte | board.png | FW1 launched at DEFCON 2024 same day RPi announced RP2350; FW2 upgrades both main + display MCUs; closes RP2040 shortcomings; more resources, performance, low-power; mostly software compatible; augmented with 8 MB serial SRAM | Main/Display: 2× RP2350; Memory: 8 MB SRAM / 16 MB flash per CPU; Cores: dual-core + PIO each; Compatibility: RP2040 software-mostly |
| linux-cm0 | Linux onboard: RPi &lt;n&gt;CM0&lt;/n&gt; | Linux*CM0* / Raspberry Pi CM0 | cm0.webp | optional RPi CM0 module; direct connection to FPGA; on internal hub as USB gadget + 3rd host port (software-swapped, CM0 has one USB); own SD card for OS; talks to FW2 like any Linux app (drivers work like python API); headless by default, draws via WASM API; availability questionable — designed to work without it; bring-your-own soldering under study | Module: RPi CM0 (optional); FPGA: direct link; USB: gadget or host (swapped); Storage: dedicated microSD; Mode: headless Linux |
| esp32-c5 | WiFi &amp; BT: ESP32-&lt;n&gt;C5&lt;/n&gt; | ESP32*C5* / 2.4/5GHz WiFi+BT | (none) | FW1 needed the Bottlenose WiFi Orca; FW2 integrates WiFi using zero GPIO; upgraded to C5 for 5 GHz; also provides USB debugging/serial output for in-the-box debug | Module: ESP32-C5; Bands: 2.4 + 5 GHz; BT: yes; GPIO cost: none; Extra: USB debug/serial |
| ice40-fpga | Lattice &lt;n&gt;ICE40&lt;/n&gt; FPGA | ICE40*FPGA* / Software Programmable Logic | (none) | same proven FPGA as FW1; covers what RP2350 PIO + dual core can't (e.g. SPI slave simulation); paired with 8 MB SRAM; CM0 connects directly to it | FPGA: Lattice ICE40; SRAM: 8 MB; Example: SPI slave simulation; Linux: direct CM0 link |
| display | 3.5&Prime; capacitive &lt;n&gt;touch&lt;/n&gt; | 3.5*"* / 480×320 Touch | screen.webp | upgraded from FW1 to 3.5″ 480×320 cap touch; driven by dedicated display RP2350; much more UI possible; pairs with 14 buttons for input | Panel: 3.5″ IPS; Resolution: 480×320; Touch: capacitive; GPU: dedicated RP2350 |
| sd-bootloader | SD-card &lt;n&gt;UF2&lt;/n&gt; bootloader | SDCard*Bootloader* / Load any RP2350/ESP32 binaries | (none) | SD bootloader loads 3rd-party apps; with open hardware docs + AI Agent.md files, FW2 is a platform for running any code — software by the user, for the user | Format: UF2 on microSD; Targets: RP2350 + ESP32 binaries; Source: 3rd-party friendly |
| subghz-lora | Sub-GHz + &lt;n&gt;LoRa&lt;/n&gt; radio | LoRa+Sub*GHz* / CC1101+LoRa+external antenna | meshtastic.webp | upgraded sub-GHz: one antenna switched between CC1101 and LoRa radio; LoRa is STM32WLE5JC (STM32 with integrated LoRa); Meshtastic ported — full pirate radio | SubGHz: CC1101; LoRa: STM32WLE5JC; Antenna: shared, switched, external; App: Meshtastic |
| usb-host | 3&times; USB &lt;n&gt;host&lt;/n&gt; ports | USBHost*x3* / GPS, UART, joystick, keyboard | hostports.webp | 3 host ports: mouse, keyboard, joystick, GPS, serial, thumbdrive — up to the USB stack (TinyUSB); 2× 12 Mbit on display CPU + 1× 480 Mbit high-speed; 5V host power switched by display CPU | Ports: 3; Speeds: 2× 12 Mbit + 1× 480 Mbit; Power: switched 5 V; Stack: TinyUSB |
| can-fd | &lt;n&gt;CAN FD&lt;/n&gt; at 8 Mbit | CAN*FD* / 8 Mbit SIC | (none) | old debug pins are now CAN FD; talk to cars and industrial systems; full 8 Mbit speed grade supported | Bus: CAN FD; Speed: 8 Mbit (SIC); Use: automotive + industrial |
| audio | Audio &lt;n&gt;in &amp; out&lt;/n&gt; | Audio*IO* / 4-mic array, 2 W speaker, 3.5 mm jack | (none) | 3.5 mm jack for headphone and/or mic; 3 extra microphones form a 4-mic phase array; RP2350 horsepower enables serious audio apps; VIVA LAS VEGAS loud and clear | Mics: 4 (phased array); Speaker: 2 W; Jack: 3.5 mm headphone/mic |
| analog-io | &lt;n&gt;Analog&lt;/n&gt; I/O, 0–5 V | Analog*IO* / 4 in, 4 out, PGA | FWConnector.webp | op-amp front end captures 0–5 V on RP2350; PGA reads low differential signals at lower rates (1 kHz); outputs 0–5 V at 25 kHz update; IO-voltage pin doubles as analog trigger through window comparator | Inputs: 4× 0–5 V; Outputs: 4× 0–5 V @ 25 kHz; PGA: differential, 1 kHz; Trigger: window comparator |
| gpio | Expanded &lt;n&gt;GPIO&lt;/n&gt; | GPIO*IOx14* / SPI, I2C, GPIO, UART | pinout.webp | 20-pos connector keeps FW1/Orca compatibility; new 10-pos mostly-analog connector; fastening posts for rigid Orcas; faster I2C translator; IO voltage from 4 sources (5 V, 3.3 V, IO pin, programmable supply) and measured by ADC; Orca EEPROM auto-config | Legacy: 20-pos (Orca-compatible); New: 10-pos analog; IO voltage: 4 selectable sources + ADC readback; Orca: EEPROM auto-config |
| programmable-power | Programmable &lt;n&gt;power&lt;/n&gt; supply | Programmable*PWR* / 1.1–5.5 V with glitching | (none) | programmable supply 1–5.5 V, 1.5 A; set over main-CPU I2C (update rate limited); MOSFET crowbar wired to main CPU for voltage glitching | Range: 1–5.5 V; Current: 1.5 A; Control: I2C; Glitching: MOSFET crowbar |
| debug | Integrated &lt;n&gt;debug&lt;/n&gt; probe | Integrated*Debug* / RPi Debug Probe onboard, ESP32 JTAG | (none) | debug CPU is an enhanced RPi Debug Probe; flashes/debugs both RP2350s and the LoRa STM32; ESP32-C5 adds USB debug/serial; great for hand-written or AI-assisted firmware | Probe: enhanced RPi Debug Probe; Targets: RP2350 + LoRa STM32; ESP32: JTAG/serial via USB |
| scriptable-usb | Scriptable &lt;n&gt;USB&lt;/n&gt; | Nice*USB* / Scriptable USB | (none) | second (PIO-based) USB port on display CPU connects to the host for scriptable USB — BadUSB-style payloads and USB testing | Engine: PIO USB on display CPU; Uses: BadUSB, USB testing |
| dvi | &lt;n&gt;DVI&lt;/n&gt; video out | DVI*out* / TV time | (none) | full-size DVI connector driven by RP2350 HSTX | Connector: full-size DVI; Driver: RP2350 HSTX |
| sd-reader | USB &lt;n&gt;SD reader&lt;/n&gt; | SDCard*reader* / High-speed USB SD reader onboard | (none) | SD card run-time swappable between main CPU and integrated reader; high-speed USB, wide OS support; launch FREE-WILi GUI right from the device (no-install USB-drive app); works with RPi Imager | Speed: high-speed USB; Swap: run-time CPU↔reader; Bonus: RPi-Imager ready |
| gaming | Built for &lt;n&gt;gaming&lt;/n&gt; | Game*ON* / 14 gamer buttons, emulator friendly | fruitjam.webp | display CPU nearly 100% Fruit Jam compatible (some different pins) — easy app ports; wiliteam ported PICO-8; 5-button dpad + 4 ABXY-positioned buttons (home/ok/cancel/page) + 5 under-screen context buttons + touch; comfort-designed for retro play; 2-press-per-letter keyboard | Buttons: 14 + touch; Compatible: Adafruit Fruit Jam; Ported: PICO-8, Doom; Keyboard: 2-press per letter |
| sensors | Sensor &lt;n&gt;package&lt;/n&gt; | Sensor*Package* / IR, IMU, MAG, ALS, humidity | sensors.webp | full IMU (BMI323) + magnetometer (BMM350) for physical-position input; ambient light (OPT4001); humidity/temp (SHT40); improved IR — stronger TX LED, real case window, better RX/TX orientation; sensors wired to the ULP as wake sources | IMU: BMI323; Mag: BMM350; Light: OPT4001; Temp/RH: SHT40; IR: TX/RX + case window; Wake: via ULP |
| ai-agents | &lt;n&gt;AI&lt;/n&gt;-native platform | AI*Agent* / Open hardware, UF2 bootloader | ai.webp | the AI age lets tools like Claude Code write and debug your embedded app; Claude + LM Studio (local models) integrated in FREE-WILi GUI; open hardware docs + Agent.md files make FW2 a platform for agent-built code | Cloud: Claude integration; Local: LM Studio; Docs: open hardware + Agent.md |
| power | &lt;n&gt;Portable&lt;/n&gt; power | 3000*mAh* / 17 power zones | (none) | designed as a portable tool from the start; ULP micro controls 17 power zones, dynamically on/off; tripled battery to 3000 mAh; ULP manages charging and squeezes the most from available USB power; sensors wake it | Battery: 3000 mAh; Zones: 17, ULP-controlled; Charging: USB-aware; Sleep current: TBD |
| python-api | &lt;n&gt;Python&lt;/n&gt; API | Python*API* / Runs on host or internal Linux | (none) | same Python API drives FW2 from a host PC or from the onboard Linux CM0 — Linux drivers work just like the Python API (thin page; expand later) | Runs on: host PC or CM0 Linux; Pairing: FREE-WILi GUI |
| zoomio | &lt;n&gt;ZoomIO&lt;/n&gt; RISC-V | ZoomIO*RISCV* / Sub-microsecond bit-bang scripting | (none) | scriptable RISC-V engine for sub-microsecond bit-bang I/O (thin page; expand later) | Core: RISC-V; Timing: sub-µs bit-bang |
| rthon | &lt;n&gt;rTHON&lt;/n&gt; scripting | rTHON*Script* / Python-like embedded script | (none) | Python-like embedded scripting language running on-device (thin page; expand later) | Style: Python-like; Runs: on-device |
| wasm | C++/Rust &lt;n&gt;WASM&lt;/n&gt; | C++/Rust*WASM* / Onboard WiliWASM engine | simulator.webp | onboard WiliWASM engine runs C++/Rust compiled to WASM, with debugger and API; FREE-WILi GUI integrates WASM compilers and debuggers; headless CM0 Linux draws to screen via the same WASM API | Engine: WiliWASM; Languages: C++, Rust; Tooling: GUI-integrated compiler + debugger |
| wiliblocks | &lt;n&gt;WiliBLOCKS&lt;/n&gt; | Wili*BLOCKS* / Point &amp; click scripting | fwgui.webp | point-and-click block scripting in FREE-WILi GUI — includes point-and-click GUI drawing, I2C component databases (thin page; expand later) | Editor: FREE-WILi GUI; Style: block-based, point & click |

(`*x*` in big-stat means `<em>x</em>`; `&lt;n&gt;x&lt;/n&gt;` in H1 means `<span class="n">x</span>`.)

- [ ] **Step 1:** Write all 25 files from the table. Pages without an image omit the `.frame` block entirely (the lightbox JS handles zero matches fine).
- [ ] **Step 2:** Run the link check (Task 6 Step 1) — expect 0 missing.

### Task 6: Verify

- [ ] **Step 1: Link check.** PowerShell: parse `index.html` + every file in `specs/` for `href`/`src` values that are relative paths; resolve each against the file's folder and `Test-Path` it. Expected output: `0 missing`.
- [ ] **Step 2: Screenshots.** Headless-Edge screenshot of `index.html` (strip area intact), `specs/rp2350.html` (rich, image), `specs/can-fd.html` (no image), `specs/zoomio.html` (thin). Expected: consistent dark style, fonts, nav/footer.
- [ ] **Step 3: Click-through (manual or scripted).** From index: click a chip → spec page; prev/next walks the ring; "FREE-WILi 2 home" returns; Buy opens the Google Form.

## Self-review notes
- Spec coverage: CSS extraction (T1), strip links (T3), 26 pages (T4+T5), template anatomy incl. prev/next ring + lightbox (T4), verification (T1/T6). Hover style (T2). ✔
- Wrap-around ring: rp2350.prev=wiliblocks, wiliblocks.next=rp2350. ✔
- Thin pages marked honestly in content table. ✔
- No invented numbers beyond brief except chip labels the user wrote himself (2 W speaker, 14 IO, ZoomIO, rTHON) — used verbatim from his labels.
