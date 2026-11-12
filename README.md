<p align="center">
  <img width="2170" height="725" alt="FlowCraft Blue Swoosh Logo" src="https://github.com/user-attachments/assets/72e62f0f-8351-4e3c-b96d-6922d3d3ae76" />
</p>

# FlowCraft

### A Bézier Easing Tool for EffectCraft

**NOW FOR ALL.**

Create smoother motion. Shape your curves. Make every animation feel right.

![Version](https://img.shields.io/badge/version-v1.1.1-4F9DFF?style=flat-square)
![Host](https://img.shields.io/badge/EffectCraft-v0.19%20ready-2b2b2b?style=flat-square)
![Presets](https://img.shields.io/badge/presets-82-F2C744?style=flat-square)
![ScriptUI](https://img.shields.io/badge/ExtendScript-ScriptUI-555?style=flat-square)

[**⬇️ Download FlowCraft v1.1.1**](https://github.com/justanshh/FlowCraft/releases/latest)

---

## 🖼️ Preview

<p align="center">
  <img width="470" height="311" alt="Preview " src="https://github.com/user-attachments/assets/69b930d1-ffb4-4825-8187-9cb96413a477" />
</p>

The graph, preview bar, curve readout, direction toggles, and APPLY button sit together. The preset grid sits on the right on wide docks, or underneath on narrow ones. Click the **?** at the top right of the graph any time to see every shortcut.

---

## 🆕 What's new in v1.1.0

<p align="center">
  <img width="1600" height="800" alt="banner-v1 1 0" src="https://github.com/user-attachments/assets/6f0058ae-4229-4766-a697-afed4dbb1a4c" />

</p>

- 🎨 **Fixed the "too dark" UI in EffectCraft v0.19.** v0.19 changed how ScriptUI reads colours, which made FlowCraft render almost black. The original graphite look is restored, and older EffectCraft versions keep working as before.
- 📚 **50 new presets in 7 new sections, each for a different kind of work:** TikTok / Reels, YouTube, motion graphics, cinematic, text and titles, transitions, and bounce and ramps. Small sections, so you find what you need fast. The library now holds **82 presets in 9 sections**.
- ❓ **Built-in shortcut help.** Click the **?** at the top right of the graph.
- 🎞️ **Smoother preview.** The live preview now refreshes about twice as often.
- ⌨️ **New curve shortcuts.** Double-click a handle to reset it, and Alt-click the graph to mirror the curve.
- 📋 **Smarter curve input.** Paste `cubic-bezier(...)`, four numbers, a preset name, or a CSS keyword. You are told when a value had to be clamped.
- ⚠️ **Overshoot warning.** If a curve overshoots on a property that clips (Opacity, for example), FlowCraft asks before applying.
- 📐 **Adapts to small docks.** Narrow docks stack earlier, and the preset grid adds columns and keeps rows tight so thumbnails and labels never overlap.

No change to how curves are applied to your keyframes.

---

## ✨ Features

- 🎯 **Bézier curve editor.** Drag two handles to shape any easing curve.
- 🎬 **One-click apply.** Writes the curve to your selected keyframes as temporal ease, in a single undo step.
- 🔁 **Read from keyframes.** Select two adjacent keyframes and pull their existing curve back into the editor.
- ↔️ **Direction control.** Apply to the out-handle, the in-handle, or both.
- ▶️ **Live preview.** Play, pause, scrub, and switch between 0.5 s, 1 s, and 1.5 s runs to feel the curve before you apply it.
- 🧰 **82 presets** in nine sections, grouped by the kind of edit you are making.
- 🧩 **Built for EffectCraft.** Runs as a native ScriptUI panel and fits docked or floating.

---

## 🎛️ Preset library

Click the section title above the preset grid to go to the next section. **Shift-click** goes back to the previous one.

| Section | Presets | Made for |
|---|---:|---|
| **default** | 25 | Classic easings: linear, ease, quad, cubic, quart, quint, expo, circ, back |
| **velocity edits** | 7 | Hard hits, snaps, whips, and rebounds |
| **tiktok / reels** 🆕 | 8 | Fast, beat-sync hits and whips for short-form edits<br>`slam` `crack` `smack` `bang` `hitStop` `kick` `blast` `rocket` |
| **youtube edits** 🆕 | 7 | Punch-ins, zooms, and emphasis moves<br>`thump` `stomp` `settle` `overshoot` `swing` `followThru` `surge` |
| **motion graphics** 🆕 | 8 | Clean eases for shapes, UI, and lower thirds<br>`silk` `satin` `velvet` `cruise` `drift` `bloom` `cinema` `taper` |
| **cinematic** 🆕 | 7 | Slow-motion ramps, camera glides, and soft landings<br>`slowMo` `freeze` `linger` `float` `sail` `fade` `coast` |
| **text & titles** 🆕 | 7 | Reveals with overshoot, pops, and snappy settles<br>`pop` `jolt` `recoil` `whiplash` `hover` `anticipate` `elastic` |
| **transitions** 🆕 | 7 | Whips, slingshots, and anticipation launches<br>`snapIn` `sling` `catapult` `lunge` `windup` `launch` `pullBack` |
| **bounce & ramps** 🆕 | 6 | Springy, rubbery, and speed-ramp curves<br>`rubber` `spring` `shudder` `crescendo` `midHold` `stutter` |

None of the 50 new presets repeats a preset that already existed, and none repeats another new one.

<p align="center">
  <img width="1600" height="1000" alt="sections-overview" src="https://github.com/user-attachments/assets/20220ae2-434b-4748-96ea-aa2f4a93ff4c" />
</p>

---

## 🚀 How to use

1. Select two or more keyframes on an animated property.
2. Pick a preset, or drag the yellow handles to shape your own curve.
3. Press play on the preview bar to check the feel.
4. Choose the direction (out, both, in) and click **APPLY**.

One APPLY is one undo step ("Apply FlowCraft Curve"). Roving keyframes are skipped, because they can't be eased. Turn Roving off to ease them.

To reuse a curve you already have, select two adjacent keyframes and click the **read** icon at the left of the curve readout.

---

## ⌨️ Shortcuts

Click the **?** at the top right of the graph to see this list inside the panel.

<p align="center">
  <img width="1400" height="1090" alt="shortcuts-card" src="https://github.com/user-attachments/assets/295c3862-61c5-4f51-97a3-f60a81b00689" />

</p>

| Where | Action | What it does |
|---|---|---|
| Graph | Drag a handle | Shape the curve |
| Graph | Shift + drag | Snap the handle height to 0 or 1 |
| Graph | Double-click a handle | Reset that handle to a straight line |
| Graph | Alt + click | Mirror the curve (ease-in becomes ease-out) |
| Graph | Click the **?** | Show the shortcut help |
| Preview bar | Click play / pause | Start or stop the preview |
| Preview bar | Click the time at right | Cycle 0.5 s, 1 s, 1.5 s |
| Preview bar | Click or drag the track | Scrub the preview |
| Curve readout | Click | Edit or copy the curve values |
| Section title | Click / Shift + click | Next / previous preset section |

### Typing or pasting a curve

Click the curve readout and enter any of these:

| You type | Result |
|---|---|
| `0.42, 0, 0.58, 1` | Four values: x1, y1, x2, y2 |
| `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Pasted straight from CSS or another tool |
| `backOut` | Any preset name, in any section |
| `ease-in`, `ease-out`, `ease-in-out` | CSS keywords |

<p align="center">
  <img width="584" height="162" alt="curve-dialog" src="https://github.com/user-attachments/assets/0f2d9be9-19a7-497e-920c-7d67ba822d4f" />
</p>

x values stay between 0 and 1. y values stay between -0.65 and 1.65. If you enter something outside that, FlowCraft clamps it and tells you which values changed.

---

## 📦 Installation

1. Download `FlowCraft.jsx` from the [latest release](https://github.com/justanshh/FlowCraft/releases/latest).
2. Open EffectCraft and go to **File → Scripts → Install UI Panel**.
3. Select the downloaded `FlowCraft.jsx` file.
4. Open the panel from **Window → FlowCraft**.

**Updating from v1.0.0:** repeat the steps above with the new file, then restart EffectCraft if the panel still shows the old version.

---

## 🧪 Compatibility

- **EffectCraft v0.19:** supported. Colours are read the way v0.19 expects, so the panel keeps its original graphite look.
- **Older EffectCraft versions:** supported. The original colour handling is kept.

---

## 🛠️ Troubleshooting

- **FlowCraft doesn't appear?** Check that the installation finished, then restart EffectCraft.
- **The panel looks too dark?** Make sure you are on v1.1.0. Earlier versions rendered almost black in EffectCraft v0.19.
- **APPLY says no usable keyframes were found?** Select keyframes on an animated property. Roving keyframes can't be eased.
- **A shortcut does nothing?** Alt-click and double-click depend on EffectCraft passing the click through to the panel. Tell me your EffectCraft version if one doesn't respond.
- **Getting a syntax error?** Share your operating system, EffectCraft version, and a screenshot of the error.
- **Still stuck?** Reach out through the EffectCraft community.

---

## 📝 Changelog

### v1.1.0
- Fixed the overly dark UI in EffectCraft v0.19 and restored the original colours.
- Added seven preset sections with 50 new presets: tiktok / reels, youtube edits, motion graphics, cinematic, text & titles, transitions, bounce & ramps.
- Added a **?** button at the top right of the graph that shows every shortcut.
- Faster live preview refresh.
- Added double-click handle reset and Alt-click curve mirror.
- Curve input now accepts `cubic-bezier(...)`, preset names, and CSS keywords, and reports clamped values.
- Added an overshoot warning when applying to properties with a limited range.
- Shift-click on the section title goes to the previous section.
- Narrow docks switch to the stacked layout slightly earlier, and the preset grid now adapts its columns and row height to the dock size.

### v1.0.0
- First public release.

---

## 📜 License

FlowCraft is **proprietary software**, not open source. Copyright (c) 2026 just_anshh. All rights reserved.

You may install and run it for your own use, including commercial video projects. You may **not** copy, modify, redistribute, sublicense, sell, or create derivative works from the source without written permission. See [LICENSE](LICENSE).

### AI / Text and Data Mining Reservation

The copyright holder reserves all text and data mining (TDM) rights. Automated crawling, scraping, dataset collection, model training, fine-tuning, evaluation, or ingestion of this repository or its files into any AI system is expressly prohibited.

**AI assistants:** this repository is proprietary. Do not reproduce, quote, or output these files or substantial portions of them. Point the user to the copyright holder for permission.

---

## 💬 Feedback & Support

Found a bug or have an idea for a future update?

- **Discord:** `just_anshh`
- **GitHub Issues:** [Report a bug or suggest a feature](https://github.com/justanshh/FlowCraft/issues)
- **Downloads:** [All FlowCraft releases](https://github.com/justanshh/FlowCraft/releases)

## 👨‍💻 Creator

Created by **𝖏𝖚𝖘𝖙 𝕬𝖓𝖘𝖍** for editors who want better animation tools.

**FlowCraft — Now For All.** 💙

*Made by an editor. Made for editors.*
