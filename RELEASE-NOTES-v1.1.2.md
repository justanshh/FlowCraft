# FlowCraft v1.1.2

## Fixes

- **Preview no longer stops mid-curve.** When the panel opened or a preset was picked, the one-shot preview could stop at the starting position (around 0.45) instead of the end of the curve. It now runs to 1.0, holds there briefly, then stops.
- **Play/pause no longer loops forever.** Resuming used to restart a continuous ~30 fps repaint loop, which made the panel feel laggy. Play now resumes from the current playhead, runs one pass to the end, then stops.

## Performance

- **Default section is lighter.** The 25-preset default grid no longer draws handle dots and tangent lines for every thumbnail; only the selected preset gets them. The curves and endpoint dots are unchanged.
- **Thumbnail geometry is cached.** The preset grid reuses its measurements between frames instead of rebuilding 25 objects every preview tick.
- **Preview is smoother.** The frame interval is now 20 ms (~50 fps) instead of 33 ms (~30 fps), and the one-shot preview stops after one pass instead of looping.

## Notes

- No changes to presets, curve math, or how curves are applied to keyframes.
- Runs on EffectCraft v0.19 and older versions as before.

**Download:** `FlowCraft.jsx` (install via EffectCraft → Scripts → Install UI Panel)
