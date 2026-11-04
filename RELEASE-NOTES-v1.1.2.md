# FlowCraft v1.1.2

## Fixes

- **Preview no longer stops mid-curve.** When the panel opened or a preset was picked, the one-shot preview could stop at the starting position (around 0.45) instead of the end of the curve. It now runs to 1.0, holds there briefly, then stops.
- **Play/pause no longer loops forever.** Resuming used to restart a continuous ~30 fps repaint loop, which made the panel feel laggy. Play now resumes from the current playhead, runs one pass to the end, then stops.

## Notes

- No changes to presets, curve math, or how curves are applied to keyframes.
- Runs on EffectCraft v0.19 and older versions as before.

**Download:** `FlowCraft.jsx` (install via EffectCraft → Scripts → Install UI Panel)
