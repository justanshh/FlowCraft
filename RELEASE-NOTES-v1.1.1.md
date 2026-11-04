# FlowCraft v1.1.1

## Fixes

- **Handle drag no longer stuck.** Releasing the mouse button outside the panel now ends dragging correctly. Previously, if you dragged a handle and let go off-panel, the curve would keep moving on the next mouse move.
- **Faster keyframe apply.** Applying curves to multiple adjacent keyframes is now faster. Segment speeds are cached so shared segments are calculated only once, and overshoot checks are skipped entirely for curves with handles inside the normal range (0–1).

## Improvements

- **Smarter preview behavior.** The live preview now plays a single pass when the panel opens or when a preset is picked, then stops. When paused, no frames are scheduled at all — no idle animation, no unnecessary repaints.
- **Better UI responsiveness.** The preview ticker cancels outright when paused or finished, avoiding unnecessary work on the UI thread.
- **Tight drag handling.** Handles release correctly even if the mouse exits the panel, preventing accidental movement.

## Notes

- No changes to preset values or the way curves are applied to keyframes.
- Runs on EffectCraft v0.19 and older versions as before.

**Download:** `FlowCraft.jsx` (install via EffectCraft → Scripts → Install UI Panel)
