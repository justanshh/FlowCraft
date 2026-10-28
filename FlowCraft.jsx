// FlowCraft v27 — Color-calibrated Flow-style easing editor for EffectCraft ScriptUI.
// Layout target: the real FlowCraft dock in EffectCraft 0.17.0 (447 x 296 px).
// EffectCraft 0.17.0 does not pass live dock dimensions to a ScriptUI panel, so this
// version deliberately lays out at the measured dock size instead of pretending to resize.
(function (thisObj) {
    // =========================================================================
    // 25 FLOW PRESETS (Full + Compact Names for Narrow Workspace Docks)
    // =========================================================================
    var LIBRARIES = {
        "default": [
            { id: "linear",   name: "linear",   shortName: "linear",  c: [0.3333, 0.3333, 0.6667, 0.6667] },
            { id: "easeIn",   name: "easeIn",   shortName: "easeIn",  c: [0.42, 0.00, 1.00, 1.00] },
            { id: "easeOut",  name: "easeOut",  shortName: "easeOut", c: [0.00, 0.00, 0.58, 1.00] },
            { id: "ease",     name: "ease",     shortName: "ease",    c: [0.42, 0.00, 0.58, 1.00] },
            { id: "quadIn",   name: "quadIn",   shortName: "quadIn",  c: [0.55, 0.09, 0.68, 0.53] },

            { id: "quadOut",  name: "quadOut",  shortName: "quadOut", c: [0.25, 0.46, 0.45, 0.94] },
            { id: "quad",     name: "quad",     shortName: "quad",    c: [0.46, 0.03, 0.52, 0.96] },
            { id: "cubicIn",  name: "cubicIn",  shortName: "cubIn",   c: [0.55, 0.06, 0.68, 0.19] },
            { id: "cubicOut", name: "cubicOut", shortName: "cubOut",  c: [0.22, 0.61, 0.36, 1.00] },
            { id: "cubic",    name: "cubic",    shortName: "cubic",   c: [0.65, 0.05, 0.36, 1.00] },

            { id: "quartIn",  name: "quartIn",  shortName: "qrtIn",   c: [0.90, 0.03, 0.69, 0.22] },
            { id: "quartOut", name: "quartOut", shortName: "qrtOut",  c: [0.17, 0.84, 0.44, 1.00] },
            { id: "quart",    name: "quart",    shortName: "quart",   c: [0.77, 0.00, 0.18, 1.00] },
            { id: "quintIn",  name: "quintIn",  shortName: "qntIn",   c: [0.76, 0.05, 0.86, 0.06] },
            { id: "quintOut", name: "quintOut", shortName: "qntOut",  c: [0.23, 1.00, 0.32, 1.00] },

            { id: "quint",    name: "quint",    shortName: "quint",   c: [0.86, 0.00, 0.07, 1.00] },
            { id: "expoIn",   name: "expoIn",   shortName: "expIn",   c: [0.95, 0.05, 0.80, 0.04] },
            { id: "expoOut",  name: "expoOut",  shortName: "expOut",  c: [0.19, 1.00, 0.22, 1.00] },
            { id: "expo",     name: "expo",     shortName: "expo",    c: [1.00, 0.00, 0.00, 1.00] },
            { id: "circIn",   name: "circIn",   shortName: "circIn",  c: [0.60, 0.04, 0.98, 0.34] },

            { id: "circOut",  name: "circOut",  shortName: "circOut", c: [0.08, 0.82, 0.17, 1.00] },
            { id: "circ",     name: "circ",     shortName: "circ",    c: [0.79, 0.14, 0.15, 0.86] },
            { id: "backIn",   name: "backIn",   shortName: "backIn",  c: [0.60, -0.28, 0.74, 0.05] },
            { id: "backOut",  name: "backOut",  shortName: "backOut", c: [0.18, 0.89, 0.32, 1.28] },
            { id: "back",     name: "back",     shortName: "back",    c: [0.68, -0.55, 0.27, 1.55] }
        ],
        "velocity": [
            { id: "hardHit",  name: "hardHit",  shortName: "hardHit", c: [0.05, 0.92, 0.10, 1.00] },
            { id: "snapOut",  name: "snapOut",  shortName: "snapOut", c: [0.02, 0.98, 0.05, 1.00] },
            { id: "whipIn",   name: "whipIn",   shortName: "whipIn",  c: [0.88, 0.00, 0.96, 0.12] },
            { id: "sRamp",    name: "sRamp",    shortName: "sRamp",   c: [0.82, 0.00, 0.18, 1.00] },
            { id: "twixFlow", name: "twixFlow", shortName: "twixFlw", c: [0.08, 0.85, 0.18, 1.00] },
            { id: "rebound",  name: "rebound",  shortName: "rebound", c: [0.15, 1.28, 0.30, 1.00] },
            { id: "beatDrop", name: "beatDrop", shortName: "beatDrp", c: [0.00, 0.95, 0.05, 1.00] }
        ],
        "custom": []
    };

    // Persist user-created curves in EffectCraft/After Effects script settings.
    var SETTINGS_SECTION = "FlowCraft";
    var SETTINGS_KEY = "customPresets";

    function validCurveArray(c) {
        if (!(c instanceof Array) || c.length !== 4) return false;
        for (var i = 0; i < 4; i++) if (typeof c[i] !== "number" || !isFinite(c[i])) return false;
        return true;
    }

    function normalizePreset(p, index) {
        if (!p || !validCurveArray(p.c)) return null;
        var name = String(p.name || ("custom" + (index + 1))).replace(/^\s+|\s+$/g, "");
        if (!name) name = "custom" + (index + 1);
        var c = [
            Math.max(0, Math.min(1, p.c[0])),
            Math.max(-0.65, Math.min(1.65, p.c[1])),
            Math.max(0, Math.min(1, p.c[2])),
            Math.max(-0.65, Math.min(1.65, p.c[3]))
        ];
        return { id: String(p.id || ("custom_" + Date.now() + "_" + index)), name: name,
            shortName: String(p.shortName || name).substr(0, 9), c: c };
    }

    function loadCustomPresets() {
        try {
            if (!app.settings || !app.settings.haveSetting(SETTINGS_SECTION, SETTINGS_KEY)) return;
            var doc = JSON.parse(app.settings.getSetting(SETTINGS_SECTION, SETTINGS_KEY));
            var list = doc && doc.presets instanceof Array ? doc.presets : [];
            var loaded = [];
            for (var i = 0; i < list.length; i++) {
                var item = normalizePreset(list[i], i);
                if (!item) continue;
                var duplicate = false;
                for (var j = 0; j < loaded.length; j++) {
                    if (loaded[j].name.toLowerCase() === item.name.toLowerCase()) { duplicate = true; break; }
                }
                if (!duplicate) loaded.push(item);
            }
            LIBRARIES.custom = loaded;
        } catch (e) {
            // A damaged preference should not prevent the panel from opening.
            LIBRARIES.custom = [];
        }
    }

    function persistCustomPresets() {
        try {
            if (!app.settings) return false;
            app.settings.saveSetting(SETTINGS_SECTION, SETTINGS_KEY,
                JSON.stringify({ version: 1, presets: LIBRARIES.custom }));
            return true;
        } catch (e) { return false; }
    }

    loadCustomPresets();

    var state = {
        x1: 0.42,
        y1: 0.00,
        x2: 0.58,
        y2: 1.00,
        activeId: "ease",
        activeLib: "default",
        direction: "both",       // "out" | "both" | "in"
        previewPlaying: true,
        previewDuration: 1000,   // 1000 | 500 | 1500
        previewT: 0.45,
        animStart: Date.now() - 450,
        applyFlashUntil: 0,      // brief pressed state on the APPLY button
        draggingMode: null       // "h1" | "h2" | "scrub" | null
    };

    // =========================================================================
    // CUBIC BEZIER MATH SOLVER
    // =========================================================================
    function sampleB(t, p1, p2) {
        var inv = 1.0 - t;
        return 3.0 * inv * inv * t * p1 + 3.0 * inv * t * t * p2 + t * t * t;
    }

    function sampleDeriv(t, p1, p2) {
        var inv = 1.0 - t;
        return 3.0 * inv * inv * p1 + 6.0 * inv * t * (p2 - p1) + 3.0 * t * t * (1.0 - p2);
    }

    function solveTForX(x, x1, x2) {
        if (x <= 0.0) return 0.0;
        if (x >= 1.0) return 1.0;
        var t = x;
        for (var i = 0; i < 6; i++) {
            var curX = sampleB(t, x1, x2) - x;
            if (Math.abs(curX) < 1e-4) return t;
            var d = sampleDeriv(t, x1, x2);
            if (Math.abs(d) < 1e-5) break;
            t -= curX / d;
        }
        return Math.max(0.0, Math.min(1.0, t));
    }

    function evalBezierY(timeX, x1, y1, x2, y2) {
        var t = solveTForX(timeX, x1, x2);
        return sampleB(t, y1, y2);
    }

    // =========================================================================
    // CACHED PENS & BRUSHES (Zero Lag)
    // =========================================================================
    var cachedG = null;
    var P = {};

    // Fonts do not depend on the graphics object, so create each size once
    // instead of on every repaint.
    var fontCache = {};
    function getFont(size) {
        if (!fontCache[size]) fontCache[size] = ScriptUI.newFont("dialog", "REGULAR", size);
        return fontCache[size];
    }

    // Label fit results (which name/face fits a cell) only change when the cell
    // width or the preset list changes, so measure once and reuse every frame.
    var labelCache = {};
    var labelCacheW = -1;

    // EffectCraft's ScriptUIGraphics consumes linear-light RGB. The palette
    // below is authored as ordinary display/sRGB values, so convert each RGB
    // channel before creating pens and brushes. Without this, #2e2e2e becomes
    // roughly #767676 and the entire panel looks washed out.
    function srgbToLinear(v) {
        v = Math.max(0, Math.min(1, v));
        return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }

    function toLinearColor(color) {
        return [srgbToLinear(color[0]), srgbToLinear(color[1]), srgbToLinear(color[2]),
            color.length > 3 ? color[3] : 1];
    }

    function makePen(g, color, width) {
        return g.newPen(g.PenType.SOLID_COLOR, toLinearColor(color), width);
    }

    function makeBrush(g, color) {
        return g.newBrush(g.BrushType.SOLID_COLOR, toLinearColor(color));
    }

    function getPens(g) {
        if (cachedG === g && P.whiteCurve) return P;
        cachedG = g;
        P = {
            bgBrush:     makeBrush(g, [0.18, 0.18, 0.18, 1]),
            border:      makePen(g, [0.34, 0.34, 0.34, 1], 1),
            grid:        makePen(g, [0.27, 0.27, 0.27, 1], 1),
            refCurve:    makePen(g, [0.42, 0.42, 0.42, 1], 1.4),
            blueAxis:    makePen(g, [0.30, 0.56, 0.88, 1], 1.6),
            dimAxis:     makePen(g, [0.31, 0.31, 0.31, 1], 1.2),
            whiteCurve:  makePen(g, [1.00, 1.00, 1.00, 1], 2.5),
            yellowLine:  makePen(g, [0.95, 0.75, 0.28, 1], 1.6),
            yellowDot:   makePen(g, [0.95, 0.75, 0.28, 1], 5.5),
            yellowCap:   makePen(g, [0.95, 0.75, 0.28, 1], 2.5),
            blueDot:     makePen(g, [0.32, 0.60, 0.96, 1], 5.0),
            iconLight:   makePen(g, [0.85, 0.85, 0.85, 1], 1.5),
            iconMuted:   makePen(g, [0.56, 0.56, 0.56, 1], 1.3),
            iconBlue:    makePen(g, [0.42, 0.68, 0.98, 1], 1.8),
            tickPen:     makePen(g, [0.44, 0.44, 0.44, 1], 1),
            anchorPen:   makePen(g, [0.52, 0.52, 0.52, 1], 2.6),
            keyFill:     makePen(g, [0.32, 0.60, 0.96, 1], 4.8),
            keyBorder:   makePen(g, [1.00, 1.00, 1.00, 1], 1.2),
            miniCurve:   makePen(g, [0.96, 0.96, 0.96, 1], 1.6),
            miniTan:     makePen(g, [0.48, 0.48, 0.48, 1], 1.1),
            miniTanSel:  makePen(g, [0.88, 0.94, 1.00, 1], 1.1),
            miniDot:     makePen(g, [0.95, 0.95, 0.95, 1], 2.0),
            txtWhite:    makePen(g, [0.96, 0.96, 0.96, 1], 1),
            txtMuted:    makePen(g, [0.64, 0.64, 0.64, 1], 1),
            blueBrush:   makeBrush(g, [0.38, 0.64, 0.95, 1]),
            blueBrushPressed: makeBrush(g, [0.25, 0.48, 0.78, 1]),
            starBrush:   makeBrush(g, [0.90, 0.90, 0.90, 1])
        };
        return P;
    }

    function strokeRect(g, x, y, w, h, pen) {
        g.newPath();
        g.moveTo(x, y);
        g.lineTo(x + w, y);
        g.lineTo(x + w, y + h);
        g.lineTo(x, y + h);
        g.closePath();
        g.strokePath(pen);
    }

    function drawDiamond(g, cx, cy, r, fillPen, borderPen) {
        var hr = r * 0.55;
        g.newPath();
        g.moveTo(cx, cy - hr);
        g.lineTo(cx + hr, cy);
        g.lineTo(cx, cy + hr);
        g.lineTo(cx - hr, cy);
        g.closePath();
        g.strokePath(fillPen);

        if (borderPen) {
            g.newPath();
            g.moveTo(cx, cy - r);
            g.lineTo(cx + r, cy);
            g.lineTo(cx, cy + r);
            g.lineTo(cx - r, cy);
            g.closePath();
            g.strokePath(borderPen);
        }
    }

    // =========================================================================
    // FLOW-STYLE LAYOUT
    // At the measured 447 x 296 dock this is a side-by-side layout: curve on
    // the left, preset browser on the right. The narrow branch is kept for
    // floating palettes and for hosts that do pass a smaller size.
    // =========================================================================
    var L = {};

    function updateLayout(rawW, rawH) {
        var W = Math.max(200, rawW || 446);
        var H = Math.max(210, rawH || 295);
        var activeList = LIBRARIES[state.activeLib] || [];
        var visibleCount = Math.min(activeList.length, 35);

        if (W < 420) {
            var topH = Math.max(150, Math.floor(H * 0.43));
            topH = Math.min(topH, Math.max(112, H - 100));
            var graphH = Math.max(68, topH - 58);
            var colsNarrow = W < 250 ? 3 : (W < 330 ? 4 : 5);
            var rowsNarrow = Math.max(1, Math.ceil(visibleCount / colsNarrow));
            L = {
                W: W, H: H, vertical: true,
                gx: 6, gy: 4, gw: W - 12, gh: graphH,
                px: 6, py: 6 + graphH, pw: W - 12, ph: 16,
                rx: 6, ry: 24 + graphH, rw: W - 12, rh: 16,
                ax: 6, ay: 42 + graphH, aw: W - 12, ah: 20,
                hx: 6, hy: topH + 8, hw: W - 12, hh: 18,
                kx: 6, ky: topH + 28, kw: W - 12, kh: Math.max(80, H - (topH + 32)),
                cols: colsNarrow, rows: rowsNarrow
            };
        } else {
            // Avoid a fixed 200px graph: allocate half of the real panel width
            // to the curve and half to the preset browser, as in aescripts Flow.
            var outer = 4;
            var gap = 24;
            var contentW = Math.max(220, W - outer * 2);
            // The graph gets a slight width advantage; the preset grid keeps
            // enough room for seven readable labels on a full-size dock.
            var leftW = Math.floor((contentW - gap) * 0.51);
            var rightX = outer + leftW + gap;
            var rightW = Math.max(100, W - rightX - outer);
            var colsWide = rightW >= 330 ? 7 : (rightW >= 245 ? 5 : 4);
            var rowsWide = Math.max(1, Math.ceil(visibleCount / colsWide));

            var ah = 24;
            var rh = 18;
            var ph = 18;
            var ay = H - ah - 4;
            var ry = ay - rh - 3;
            var py = ry - ph - 3;
            var gh = Math.max(80, py - 8);

            L = {
                W: W, H: H, vertical: false,
                gx: outer, gy: 4, gw: leftW, gh: gh,
                px: outer, py: py, pw: leftW, ph: ph,
                rx: outer, ry: ry, rw: leftW, rh: rh,
                ax: outer, ay: ay, aw: leftW, ah: ah,
                hx: rightX, hy: 4, hw: rightW, hh: 24,
                kx: rightX, ky: 32, kw: rightW, kh: Math.max(80, H - 36),
                cols: colsWide, rows: rowsWide
            };
        }
        return L;
    }

    function getGraphTransform() {
        var minVal = Math.min(0.0, state.y1, state.y2) - 0.08;
        var maxVal = Math.max(1.0, state.y1, state.y2) + 0.08;
        var spanVal = Math.max(1.16, maxVal - minVal);

        function mapX(nx) {
            return L.gx + 8 + nx * (L.gw - 16);
        }
        function mapY(ny) {
            var norm = (ny - minVal) / spanVal;
            return L.gy + L.gh - 8 - norm * (L.gh - 16);
        }
        function unmapX(px) {
            return Math.max(0.0, Math.min(1.0, (px - (L.gx + 8)) / Math.max(1, L.gw - 16)));
        }
        function unmapY(py) {
            var norm = ((L.gy + L.gh - 8) - py) / Math.max(1, L.gh - 16);
            return Math.max(-0.65, Math.min(1.65, minVal + norm * spanVal));
        }
        return { mapX: mapX, mapY: mapY, unmapX: unmapX, unmapY: unmapY };
    }

    function getDirectCanvasXY(e) {
        if (!e) return null;
        // EffectCraft ScriptUI MouseEvent.clientX/clientY are local to the event target.
        if (typeof e.clientX === "number" && typeof e.clientY === "number") {
            return { x: e.clientX, y: e.clientY };
        }
        if (typeof e.localX === "number" && typeof e.localY === "number") {
            return { x: e.localX, y: e.localY };
        }
        if (typeof e.offsetX === "number" && typeof e.offsetY === "number") {
            return { x: e.offsetX, y: e.offsetY };
        }
        if (typeof e.x === "number" && typeof e.y === "number") {
            return { x: e.x, y: e.y };
        }
        return null;
    }

    var surfaceRef = null;

    // EffectCraft's alert()/prompt() and File.openDialog()/saveDialog() are non-interactive
    // shims, so use real ScriptUI dialogs for editable text and notices.
    function askTextDialog(titleText, labelText, defaultText) {
        var dlg = new Window("dialog", titleText);
        dlg.orientation = "column";
        dlg.alignChildren = ["fill", "top"];
        dlg.margins = 12;
        dlg.spacing = 8;
        dlg.add("statictext", undefined, labelText);
        var input = dlg.add("edittext", undefined, defaultText || "");
        input.characters = 48;
        var buttons = dlg.add("group");
        buttons.alignment = ["right", "center"];
        var ok = buttons.add("button", undefined, "OK", { name: "ok" });
        var cancel = buttons.add("button", undefined, "Cancel", { name: "cancel" });
        var result = null;
        ok.onClick = function () { result = input.text; dlg.close(1); };
        cancel.onClick = function () { result = null; dlg.close(0); };
        dlg.layout.layout(true);
        var code = dlg.show();
        return code === 1 ? result : null;
    }

    function showNotice(titleText, messageText) {
        var dlg = new Window("dialog", titleText);
        dlg.orientation = "column";
        dlg.alignChildren = ["fill", "top"];
        dlg.margins = 12;
        dlg.spacing = 10;
        var label = dlg.add("statictext", undefined, messageText, { multiline: true });
        label.preferredSize = [340, 58];
        var row = dlg.add("group");
        row.alignment = ["right", "center"];
        var ok = row.add("button", undefined, "OK", { name: "ok" });
        ok.onClick = function () { dlg.close(1); };
        dlg.layout.layout(true);
        dlg.show();
    }

    function exportCurrentLibrary() {
        try {
            var list = LIBRARIES[state.activeLib] || [];
            var presets = [];
            for (var i = 0; i < list.length; i++) {
                presets.push({ name: list[i].name, shortName: list[i].shortName, c: list[i].c });
            }
            var defaultPath = "FlowCraft-" + state.activeLib + ".json";
            try { if (Folder.current) defaultPath = Folder.current.fsName + "/" + defaultPath; } catch (folderError) {}
            var chosenPath = askTextDialog("Export FlowCraft Library", "Enter the full output path for the JSON file:", defaultPath);
            if (!chosenPath) return;
            chosenPath = String(chosenPath).replace(/^\s+|\s+$/g, "");
            if (!chosenPath) return;
            if (!/\.json$/i.test(chosenPath)) chosenPath += ".json";
            var target = new File(chosenPath);
            if (!target.open("w")) throw new Error(target.error || "Could not open the chosen file for writing.");
            target.write(JSON.stringify({ format: "FlowCraft", version: 1, library: state.activeLib, presets: presets }, null, 2));
            target.close();
            showNotice("FlowCraft Export", "Exported " + presets.length + " curve(s) to:\n" + target.fsName);
        } catch (e) { showNotice("FlowCraft Export Failed", e.toString() + "\n\nCheck EffectCraft's scripting file-write permission."); }
    }

    function importCustomLibrary() {
        try {
            var chosenPath = askTextDialog("Import FlowCraft Library", "Enter the full path to a FlowCraft JSON file:", "");
            if (!chosenPath) return;
            chosenPath = String(chosenPath).replace(/^\s+|\s+$/g, "");
            if (!chosenPath) return;
            var source = new File(chosenPath);
            if (!source.open("r")) throw new Error(source.error || "Could not open the chosen file. Keep it inside the project folder and check script file access.");
            var raw = source.read(); source.close();
            var doc = JSON.parse(raw);
            if (!doc || !(doc.presets instanceof Array)) throw new Error("This file is not a FlowCraft library JSON file.");
            var added = 0;
            for (var i = 0; i < doc.presets.length; i++) {
                var normalized = normalizePreset(doc.presets[i], i);
                if (!normalized) continue;
                var baseName = normalized.name, name = baseName, suffix = 2, exists = true;
                while (exists) {
                    exists = false;
                    for (var j = 0; j < LIBRARIES.custom.length; j++) {
                        if (LIBRARIES.custom[j].name.toLowerCase() === name.toLowerCase()) { exists = true; break; }
                    }
                    if (exists) { name = baseName + " " + suffix; suffix++; }
                }
                normalized.name = name;
                normalized.shortName = name.substr(0, 9);
                normalized.id = "import_" + Date.now() + "_" + i;
                LIBRARIES.custom.push(normalized); added++;
            }
            persistCustomPresets();
            state.activeLib = "custom";
            if (LIBRARIES.custom.length) {
                var last = LIBRARIES.custom[LIBRARIES.custom.length - 1];
                state.activeId = last.id;
                state.x1 = last.c[0]; state.y1 = last.c[1]; state.x2 = last.c[2]; state.y2 = last.c[3];
            }
            if (surfaceRef) surfaceRef.notify("onDraw");
            showNotice("FlowCraft Import", "Imported " + added + " curve(s) into the Custom library.");
        } catch (e) { showNotice("FlowCraft Import Failed", e.toString()); }
    }

    // Keep the mini preview moving even when the pointer is not over the panel.
    // EffectCraft clamps a *repeating* task to a 50 ms minimum, which is only
    // 20 updates/sec. A self-rescheduling *one-shot* task is not clamped, so this
    // asks for a frame every 33 ms (~30 fps). The whole panel is repainted per
    // frame; 16 ms looks better but saturates the UI thread on this machine.
    var PREVIEW_FRAME_MS = 33;
    var PREVIEW_IDLE_MS = 100;

    function startPreviewTicker(win) {
        try {
            var globalObj = (typeof $ !== "undefined" && $.global) ? $.global : null;
            if (!globalObj || !app || typeof app.scheduleTask !== "function") return;

            function cancelTaskIds(ids) {
                if (!ids) return;
                for (var i = 0; i < ids.length; i++) {
                    try { app.cancelTask(ids[i]); } catch (cancelError) {}
                }
            }
            try {
                if (globalObj.__flowCraftTaskId !== undefined && globalObj.__flowCraftTaskId !== null) {
                    app.cancelTask(globalObj.__flowCraftTaskId);
                }
                cancelTaskIds(globalObj.__flowCraftTaskIds);
            } catch (cancelOldError) {}

            var generation = (globalObj.__flowCraftGen || 0) + 1;
            globalObj.__flowCraftGen = generation;

            var tickFn = function () {
                if (globalObj.__flowCraftGen !== generation) return;
                // No notify("onDraw") here: running a scheduled task already makes
                // the host take a ScriptUI snapshot, and that snapshot calls the
                // panel's onDraw (which advances the preview). Calling notify too
                // ran onDraw a second time for every frame, doubling the work.
                // One task at a time: schedule the next one-shot after this frame.
                try {
                    globalObj.__flowCraftTaskId = app.scheduleTask(
                        "__flowCraftTick()",
                        state.previewPlaying ? PREVIEW_FRAME_MS : PREVIEW_IDLE_MS,
                        false
                    );
                } catch (scheduleError) {}
            };
            globalObj.__flowCraftTick = tickFn;
            globalObj.__flowCraftTaskId = app.scheduleTask("__flowCraftTick()", PREVIEW_FRAME_MS, false);

            win.onClose = function () {
                globalObj.__flowCraftGen = generation + 1;
                try { app.cancelTask(globalObj.__flowCraftTaskId); } catch (cancelError) {}
                if (globalObj.__flowCraftTick === tickFn) {
                    try { delete globalObj.__flowCraftTick; } catch (e2) { globalObj.__flowCraftTick = null; }
                }
                return true;
            };
        } catch (e) {
            // The panel still works without the animated preview if scheduling is unavailable.
        }
    }

    // =========================================================================
    // BUILD DOCKABLE UI (Small Minimum Size = ZERO Scrollbars in EffectCraft)
    // =========================================================================
    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel)
            ? thisObj
            : new Window("palette", "FlowCraft — Easing Curves", undefined, { resizeable: true });

        // "stack" is the only orientation for which EffectCraft honors fill on
        // both axes; a "column" parent always keeps a child at its preferred
        // height. That was the cause of the old fixed 440 x 280 surface.
        // Keep the dock tab clean; EffectCraft may ignore this for docked
        // panels, but a floating panel/window will show the friendly name.
        try { win.text = "FlowCraft"; } catch (nameError) {}

        win.orientation = "stack";
        win.margins = 0;
        win.spacing = 0;
        win.alignChildren = ["fill", "fill"];

        var surface = win.add("group");
        surfaceRef = surface;
        surface.orientation = "column";
        surface.margins = 0;
        surface.spacing = 0;
        surface.alignment = ["fill", "fill"];
        surface.minimumSize = [180, 180];
        // The measured content area of the FlowCraft dock in EffectCraft 0.17.0
        // is 447 x 296 px. Keep the canvas one pixel inside that so EffectCraft's
        // fractional split sizes cannot create a 1 px scrollbar. The background
        // overscan below covers the margin; the layout itself uses 446 x 295.
        // EffectCraft never reports a later dock resize to the script, so a hard
        // target is honest here.
        surface.preferredSize = [446, 295];
        if (win instanceof Window) win.preferredSize = [446, 295];

        // =====================================================================
        // MASTER SINGLE-CANVAS RENDERER
        // =====================================================================
        surface.onDraw = function () {
            var g = this.graphics;
            var P = getPens(g);
            updateLayout(this.size.width, this.size.height);
            // Draw a calibrated dark background in linear-light color space.
            // This avoids the mid-grey washed-out look from raw sRGB values.
            // The 2 px overscan covers fractional dock sizes (EffectCraft's
            // split can report 296.00006 px) without changing the layout.
            g.newPath();
            g.rectPath(-1, -1, L.W + 2, L.H + 2);
            g.fillPath(P.bgBrush);

            // Small brand/credit line in the empty strip above the graph.
            try {
                if (typeof g.drawString === "function") {
                    var brandFont = getFont(10);
                    var creditFont = getFont(8);
                    g.drawString("FlowCraft", P.txtWhite, L.gx + 8, 9, brandFont);
                    if (L.gw > 140) {
                        var credit = "by just_anshh";
                        g.drawString(credit, P.txtMuted, L.gx + 70, 11, creditFont);
                    }
                }
            } catch (brandError) {}

            var gt = getGraphTransform();

            // Live Preview Bar Time Advancement right inside onDraw!
            if (state.previewPlaying && state.draggingMode !== "scrub") {
                var cycle = state.previewDuration + 240;
                var elapsed = (Date.now() - state.animStart) % cycle;
                state.previewT = Math.min(1.0, Math.max(0.0, elapsed / state.previewDuration));
            }

            var x0 = gt.mapX(0.0), y0 = gt.mapY(0.0);
            var x3 = gt.mapX(1.0), y3 = gt.mapY(1.0);
            var x1 = gt.mapX(state.x1), y1 = gt.mapY(state.y1);
            var x2 = gt.mapX(state.x2), y2 = gt.mapY(state.y2);

            // -----------------------------------------------------------------
            // 1. GRAPH EDITOR
            // -----------------------------------------------------------------
            strokeRect(g, L.gx, L.gy, L.gw, L.gh, P.border);

            // 4x4 Inner Grid
            g.newPath();
            for (var gi = 1; gi <= 3; gi++) {
                var vx = gt.mapX(gi * 0.25);
                g.moveTo(vx, y3);
                g.lineTo(vx, y0);
                var hy = gt.mapY(gi * 0.25);
                g.moveTo(x0, hy);
                g.lineTo(x3, hy);
            }
            g.strokePath(P.grid);

            // Subtle Grey Reference Ease Curve (0.42, 0.00, 0.58, 1.00)
            var rx1 = gt.mapX(0.42), ry1 = gt.mapY(0.00);
            var rx2 = gt.mapX(0.58), ry2 = gt.mapY(1.00);
            g.newPath();
            g.moveTo(x0, y0);
            for (var rs = 1; rs <= 20; rs++) {
                var rt = rs / 20.0;
                var rmt = 1.0 - rt;
                var rpx = rmt*rmt*rmt*x0 + 3*rmt*rmt*rt*rx1 + 3*rmt*rt*rt*rx2 + rt*rt*rt*x3;
                var rpy = rmt*rmt*rmt*y0 + 3*rmt*rmt*rt*ry1 + 3*rmt*rt*rt*ry2 + rt*rt*rt*y3;
                g.lineTo(rpx, rpy);
            }
            g.strokePath(P.refCurve);

            // Active Direction Blue Axes
            g.newPath();
            g.moveTo(x0, y3);
            g.lineTo(x0, y0);
            g.lineTo(x3, y0);
            g.strokePath((state.direction === "out" || state.direction === "both") ? P.blueAxis : P.dimAxis);

            g.newPath();
            g.moveTo(x0, y3);
            g.lineTo(x3, y3);
            g.lineTo(x3, y0);
            g.strokePath((state.direction === "in") ? P.blueAxis : P.dimAxis);

            // Main Thick White Cubic Bezier Curve
            g.newPath();
            g.moveTo(x0, y0);
            for (var s = 1; s <= 28; s++) {
                var t = s / 28.0;
                var mt = 1.0 - t;
                var px = mt*mt*mt*x0 + 3*mt*mt*t*x1 + 3*mt*t*t*x2 + t*t*t*x3;
                var py = mt*mt*mt*y0 + 3*mt*mt*t*y1 + 3*mt*t*t*y2 + t*t*t*y3;
                g.lineTo(px, py);
            }
            g.strokePath(P.whiteCurve);

            // Yellow Tangent Lines + Handle Dots
            g.newPath();
            g.moveTo(x0, y0);
            g.lineTo(x1, y1);
            g.moveTo(x3, y3);
            g.lineTo(x2, y2);
            g.strokePath(P.yellowLine);

            g.newPath();
            g.ellipsePath(x0 - 1.5, y0 - 1.5, 3, 3);
            g.ellipsePath(x3 - 1.5, y3 - 1.5, 3, 3);
            g.strokePath(P.yellowCap);

            g.newPath();
            g.ellipsePath(x1 - 3, y1 - 3, 6, 6);
            g.ellipsePath(x2 - 3, y2 - 3, 6, 6);
            g.strokePath(P.yellowDot);

            // Live Playhead Blue Dot on Curve
            var easedPlayY = evalBezierY(state.previewT, state.x1, state.y1, state.x2, state.y2);
            var playCurveX = gt.mapX(state.previewT);
            var playCurveY = gt.mapY(easedPlayY);
            g.newPath();
            g.ellipsePath(playCurveX - 2.5, playCurveY - 2.5, 5, 5);
            g.strokePath(P.blueDot);

            // -----------------------------------------------------------------
            // 2. WORKING KEYFRAME EASING PREVIEW BAR (Click/Drag to Scrub or Play)
            // -----------------------------------------------------------------
            var pMidY = L.py + L.ph * 0.5;
            var trackL = L.px + 18;
            var trackR = L.px + L.pw - 26;
            var trackW = Math.max(40, trackR - trackL);
            var spanStart = trackL + trackW * 0.14;
            var spanEnd   = trackL + trackW * 0.86;
            var spanLen   = spanEnd - spanStart;

            strokeRect(g, L.px, L.py, L.pw, L.ph, P.border);

            // Play / Pause Vector Icon
            g.newPath();
            if (state.previewPlaying) {
                g.moveTo(L.px + 6.5, pMidY - 3.5);
                g.lineTo(L.px + 6.5, pMidY + 3.5);
                g.moveTo(L.px + 10.5, pMidY - 3.5);
                g.lineTo(L.px + 10.5, pMidY + 3.5);
            } else {
                g.moveTo(L.px + 6, pMidY - 4);
                g.lineTo(L.px + 12, pMidY);
                g.lineTo(L.px + 6, pMidY + 4);
                g.closePath();
            }
            g.strokePath(P.iconLight);

            // Track Rail + 13 Onion-Skin Spacing Ticks
            g.newPath();
            g.moveTo(spanStart, pMidY);
            g.lineTo(spanEnd, pMidY);
            g.strokePath(P.dimAxis);

            g.newPath();
            for (var tk = 1; tk <= 13; tk++) {
                var nt = tk / 14.0;
                var tyVal = evalBezierY(nt, state.x1, state.y1, state.x2, state.y2);
                var txPos = Math.max(trackL + 2, Math.min(trackR - 2, spanStart + tyVal * spanLen));
                g.moveTo(txPos, pMidY - 3);
                g.lineTo(txPos, pMidY + 3);
            }
            g.strokePath(P.tickPen);

            drawDiamond(g, spanStart, pMidY, 2.4, P.anchorPen, null);
            drawDiamond(g, spanEnd,   pMidY, 2.4, P.anchorPen, null);

            var travX = Math.max(trackL + 4, Math.min(trackR - 4, spanStart + easedPlayY * spanLen));
            drawDiamond(g, travX, pMidY, 4.2, P.keyFill, P.keyBorder);

            // Speed Label ("1.0s")
            try {
                if (typeof g.drawString === "function") {
                    var spdTxt = (state.previewDuration === 1000) ? "1.0s" : (state.previewDuration === 500 ? "0.5s" : "1.5s");
                    g.drawString(spdTxt, P.txtMuted, trackR + 2, pMidY - 6);
                }
            } catch (e) {}

            // -----------------------------------------------------------------
            // 3. FLOW READOUT ROW:  ->]   0.17, 0.84, 0.44, 1.00   ★ (No Overlap!)
            // -----------------------------------------------------------------
            var rMidY = L.ry + L.rh * 0.5;

            // Left Vector Import Icon ->]
            g.newPath();
            g.moveTo(L.rx + 2, rMidY);
            g.lineTo(L.rx + 9, rMidY);
            g.moveTo(L.rx + 6.5, rMidY - 2.5);
            g.lineTo(L.rx + 9, rMidY);
            g.lineTo(L.rx + 6.5, rMidY + 2.5);
            g.moveTo(L.rx + 8.5, rMidY - 4.5);
            g.lineTo(L.rx + 12, rMidY - 4.5);
            g.lineTo(L.rx + 12, rMidY + 4.5);
            g.lineTo(L.rx + 8.5, rMidY + 4.5);
            g.strokePath(P.iconLight);

            // Center Coordinate Readout Text (Compact spacing when narrow so it never touches ★)
            var sep = (L.rw < 162) ? "," : ", ";
            var coordStr =
                state.x1.toFixed(2) + sep +
                state.y1.toFixed(2) + sep +
                state.x2.toFixed(2) + sep +
                state.y2.toFixed(2);
            try {
                if (typeof g.drawString === "function") {
                    var coordX = L.rx + Math.max(16, Math.floor((L.rw - coordStr.length * 5.4) * 0.48));
                    g.drawString(coordStr, P.txtWhite, coordX, rMidY - 6);
                }
            } catch (e) {}

            // Right Vector Star Icon ★
            var sx = L.rx + L.rw - 6;
            var sy = rMidY;
            g.newPath();
            for (var sp = 0; sp < 10; sp++) {
                var rad = (sp % 2 === 0) ? 4.8 : 2.0;
                var ang = (sp * Math.PI / 5.0) - Math.PI * 0.5;
                var pxStar = sx + Math.cos(ang) * rad;
                var pyStar = sy + Math.sin(ang) * rad;
                if (sp === 0) g.moveTo(pxStar, pyStar);
                else g.lineTo(pxStar, pyStar);
            }
            g.closePath();
            g.fillPath(P.starBrush);

            // -----------------------------------------------------------------
            // 4. BOTTOM ACTION ROW:  <   [Hourglass]   >   |   [   APPLY   ]
            // -----------------------------------------------------------------
            var aMidY = L.ay + L.ah * 0.5;
            var dirZoneW = Math.floor(L.aw * 0.46);

            // Left Chevron < (Ease Out)
            var c1x = L.ax + Math.floor(dirZoneW * 0.18);
            g.newPath();
            g.moveTo(c1x + 3, aMidY - 4);
            g.lineTo(c1x - 2, aMidY);
            g.lineTo(c1x + 3, aMidY + 4);
            g.strokePath(state.direction === "out" ? P.iconBlue : P.iconLight);

            // Center Hourglass (Ease In & Out)
            var hgx = L.ax + Math.floor(dirZoneW * 0.50);
            g.newPath();
            g.moveTo(hgx - 4, aMidY - 4.5);
            g.lineTo(hgx + 4, aMidY - 4.5);
            g.lineTo(hgx, aMidY);
            g.closePath();
            g.moveTo(hgx, aMidY);
            g.lineTo(hgx + 4, aMidY + 4.5);
            g.lineTo(hgx - 4, aMidY + 4.5);
            g.closePath();
            if (state.direction === "both") {
                g.fillPath(P.blueBrush);
            } else {
                g.strokePath(P.iconLight);
            }

            // Right Chevron > (Ease In)
            var c2x = L.ax + Math.floor(dirZoneW * 0.82);
            g.newPath();
            g.moveTo(c2x - 3, aMidY - 4);
            g.lineTo(c2x + 2, aMidY);
            g.lineTo(c2x - 3, aMidY + 4);
            g.strokePath(state.direction === "in" ? P.iconBlue : P.iconLight);

            // Solid Blue APPLY Button. A short flash after a click makes it read
            // as a real button press even when the result is applied instantly.
            var appX = L.ax + dirZoneW + 2;
            var appW = L.aw - dirZoneW - 2;
            var appPressed = (state.applyFlashUntil || 0) > Date.now();
            var appDY = appPressed ? 1 : 0;
            g.newPath();
            g.rectPath(appX, L.ay + 1 + appDY, appW, L.ah - 2 - appDY);
            g.fillPath(appPressed ? P.blueBrushPressed : P.blueBrush);

            try {
                if (typeof g.drawString === "function") {
                    g.drawString("APPLY", P.txtWhite, appX + Math.max(8, (appW - 34) * 0.5), aMidY - 6 + appDY);
                }
            } catch (e) {}

            // Center Splitter Dots (⋮ in Side-by-Side mode, ⋯ in Vertical mode)
            g.newPath();
            if (L.vertical) {
                var midX = L.W * 0.5;
                var sepY = L.hy - 4;
                g.ellipsePath(midX - 6, sepY, 2, 2);
                g.ellipsePath(midX,     sepY, 2, 2);
                g.ellipsePath(midX + 6, sepY, 2, 2);
            } else {
                var sepX = L.gx + L.gw + 10;
                var midH = L.H * 0.45;
                g.ellipsePath(sepX, midH - 6, 2, 2);
                g.ellipsePath(sepX, midH,     2, 2);
                g.ellipsePath(sepX, midH + 6, 2, 2);
            }
            g.strokePath(P.iconMuted);

            // -----------------------------------------------------------------
            // 5. PRESET HEADER BAR:  default          v   +  []  x
            // -----------------------------------------------------------------
            var hMidY = L.hy + L.hh * 0.5;
            var dropW = L.hw - 48;

            g.newPath();
            g.moveTo(L.hx, L.hy + L.hh - 2);
            g.lineTo(L.hx + dropW, L.hy + L.hh - 2);
            g.strokePath(P.iconMuted);

            var libTitle = (state.activeLib === "default")
                ? "default"
                : (state.activeLib === "velocity" ? "velocity edits" : "user saved ★");
            try {
                if (typeof g.drawString === "function") {
                    g.drawString(libTitle, P.txtWhite, L.hx + 2, hMidY - 7);
                }
            } catch (e) {}

            // Dropdown 'v' Chevron
            var dvx = L.hx + dropW - 8;
            g.newPath();
            g.moveTo(dvx - 3, hMidY - 2);
            g.lineTo(dvx, hMidY + 2);
            g.lineTo(dvx + 3, hMidY - 2);
            g.strokePath(P.iconLight);

            // '+' Save Preset Icon
            var plusX = L.hx + dropW + 10;
            g.newPath();
            g.moveTo(plusX - 3.5, hMidY);
            g.lineTo(plusX + 3.5, hMidY);
            g.moveTo(plusX, hMidY - 3.5);
            g.lineTo(plusX, hMidY + 3.5);
            g.strokePath(P.iconLight);

            // Pack Switcher Icon []
            var impX = L.hx + dropW + 25;
            strokeRect(g, impX - 3.5, hMidY - 4.5, 7, 9, P.iconMuted);

            // Delete Icon x
            var delX = L.hx + dropW + 40;
            g.newPath();
            g.moveTo(delX - 3, hMidY - 3);
            g.lineTo(delX + 3, hMidY + 3);
            g.moveTo(delX + 3, hMidY - 3);
            g.lineTo(delX - 3, hMidY + 3);
            g.strokePath(P.iconMuted);

            // -----------------------------------------------------------------
            // 6. RESPONSIVE VISUAL PRESET GRID (7 columns on wide docks, fewer on narrow)
            // -----------------------------------------------------------------
            var list = LIBRARIES[state.activeLib] || [];
            var cellW = L.kw / L.cols;
            var cellH = L.kh / L.rows;
            var maxGridItems = L.cols * L.rows;
            var labelFont = getFont(10);
            var labelFontSmall = getFont(9);

            var presetGeom = [];
            for (var j = 0; j < list.length && j < maxGridItems; j++) {
                var p = list[j];
                var row = Math.floor(j / L.cols);
                var col = j % L.cols;

                var cellX = L.kx + col * cellW;
                var cellY = L.ky + row * cellH;
                var bSize = Math.max(18, Math.min(cellW - 8, cellH - 14));
                var bx = cellX + (cellW - bSize) * 0.5;
                var by = cellY + 1;

                var isSel = (state.activeId === p.id);
                if (isSel) {
                    g.newPath();
                    g.rectPath(bx - 2, by - 1, bSize + 4, bSize + 2);
                    g.fillPath(P.blueBrush);
                }

                var sx0 = bx + 2.5,         sy0 = by + bSize - 2.5;
                var sx3 = bx + bSize - 2.5, sy3 = by + 2.5;
                var sw  = sx3 - sx0,        sh  = sy0 - sy3;

                var kx1 = sx0 + p.c[0] * sw;
                var ky1 = sy0 - Math.max(-0.25, Math.min(1.25, p.c[1])) * sh;
                var kx2 = sx0 + p.c[2] * sw;
                var ky2 = sy0 - Math.max(-0.25, Math.min(1.25, p.c[3])) * sh;

                presetGeom.push({
                    p: p, isSel: isSel, cellX: cellX, by: by, bSize: bSize,
                    sx0: sx0, sy0: sy0, sx3: sx3, sy3: sy3,
                    kx1: kx1, ky1: ky1, kx2: kx2, ky2: ky2
                });
            }

            // Batch the 25 mini-curves into a few paths. Each preset used to
            // submit six separate path ops; on a full-panel redraw that per-op
            // overhead was most of the animation cost. The selected preset's
            // tangents still use their lighter color; curves/endpoints are all
            // the same white pen.
            g.newPath();
            for (var gi = 0; gi < presetGeom.length; gi++) {
                var pg = presetGeom[gi];
                if (pg.isSel) continue;
                g.moveTo(pg.sx0, pg.sy0);
                g.lineTo(pg.kx1, pg.ky1);
                g.moveTo(pg.sx3, pg.sy3);
                g.lineTo(pg.kx2, pg.ky2);
            }
            g.strokePath(P.miniTan);

            g.newPath();
            for (var gj = 0; gj < presetGeom.length; gj++) {
                var pg2 = presetGeom[gj];
                if (!pg2.isSel) continue;
                g.moveTo(pg2.sx0, pg2.sy0);
                g.lineTo(pg2.kx1, pg2.ky1);
                g.moveTo(pg2.sx3, pg2.sy3);
                g.lineTo(pg2.kx2, pg2.ky2);
            }
            g.strokePath(P.miniTanSel);

            g.newPath();
            for (var gk = 0; gk < presetGeom.length; gk++) {
                var pg3 = presetGeom[gk];
                if (pg3.isSel) continue;
                g.ellipsePath(pg3.kx1 - 1, pg3.ky1 - 1, 2, 2);
                g.ellipsePath(pg3.kx2 - 1, pg3.ky2 - 1, 2, 2);
            }
            g.strokePath(P.miniTan);

            g.newPath();
            for (var gl = 0; gl < presetGeom.length; gl++) {
                var pg4 = presetGeom[gl];
                if (!pg4.isSel) continue;
                g.ellipsePath(pg4.kx1 - 1, pg4.ky1 - 1, 2, 2);
                g.ellipsePath(pg4.kx2 - 1, pg4.ky2 - 1, 2, 2);
            }
            g.strokePath(P.miniTanSel);

            g.newPath();
            for (var gm = 0; gm < presetGeom.length; gm++) {
                var pg5 = presetGeom[gm];
                g.moveTo(pg5.sx0, pg5.sy0);
                for (var ms = 1; ms <= 12; ms++) {
                    var mt = ms / 12.0;
                    var inv = 1.0 - mt;
                    var mx = inv*inv*inv*pg5.sx0 + 3*inv*inv*mt*pg5.kx1 + 3*inv*mt*mt*pg5.kx2 + mt*mt*mt*pg5.sx3;
                    var my = inv*inv*inv*pg5.sy0 + 3*inv*inv*mt*pg5.ky1 + 3*inv*mt*mt*pg5.ky2 + mt*mt*mt*pg5.sy3;
                    g.lineTo(mx, my);
                }
            }
            g.strokePath(P.miniCurve);

            g.newPath();
            for (var gn = 0; gn < presetGeom.length; gn++) {
                var pg6 = presetGeom[gn];
                g.ellipsePath(pg6.sx0 - 1, pg6.sy0 - 1, 2, 2);
                g.ellipsePath(pg6.sx3 - 1, pg6.sy3 - 1, 2, 2);
            }
            g.strokePath(P.miniDot);

            // Labels last so they stay above the curves. Measure the real
            // string width so long preset names cannot bleed past the panel
            // edge; fall back to the short name and a 9 px face when needed.
            if (Math.abs(cellW - labelCacheW) > 0.01) { labelCache = {}; labelCacheW = cellW; }
            for (var go = 0; go < presetGeom.length; go++) {
                var pg7 = presetGeom[go];
                var labelStr = pg7.p.name;
                var labelFace = labelFont;
                var labelW = 0;
                try {
                    var labelKey = pg7.p.id + "|" + pg7.p.name + "|" + pg7.p.shortName;
                    var fit = labelCache[labelKey];
                    if (!fit) {
                        if (typeof g.measureString === "function") {
                            labelW = g.measureString(labelStr, labelFace).width;
                            if (labelW > cellW - 4) {
                                labelStr = pg7.p.shortName;
                                labelW = g.measureString(labelStr, labelFace).width;
                            }
                            if (labelW > cellW - 4) {
                                labelFace = labelFontSmall;
                                labelW = g.measureString(labelStr, labelFace).width;
                            }
                        } else {
                            labelW = labelStr.length * (labelFace.size || 10) * 0.58;
                        }
                        fit = { str: labelStr, face: labelFace, w: labelW };
                        labelCache[labelKey] = fit;
                    }
                    labelStr = fit.str; labelFace = fit.face; labelW = fit.w;
                    if (typeof g.drawString === "function") {
                        var tx = pg7.cellX + Math.max(1, (cellW - labelW) * 0.5);
                        var ty = pg7.by + pg7.bSize + 2;
                        g.drawString(labelStr, pg7.isSel ? P.txtWhite : P.txtMuted, tx, ty, labelFace);
                    }
                } catch (e) {}
            }
        };

        // =====================================================================
        // UNIFIED MOUSE HANDLERS + SMOOTH PREVIEW ANIMATION ON HOVER/DRAG
        // =====================================================================
        function onPointerDown(lx, ly, shiftKey) {
            updateLayout(surface.size.width, surface.size.height);

            // 1. Check Graph Box
            if (lx >= L.gx - 4 && lx <= L.gx + L.gw + 4 && ly >= L.gy - 4 && ly <= L.gy + L.gh + 4) {
                var gt = getGraphTransform();
                var x1 = gt.mapX(state.x1), y1 = gt.mapY(state.y1);
                var x2 = gt.mapX(state.x2), y2 = gt.mapY(state.y2);
                var d1 = (lx - x1)*(lx - x1) + (ly - y1)*(ly - y1);
                var d2 = (lx - x2)*(lx - x2) + (ly - y2)*(ly - y2);
                state.draggingMode = (d1 <= d2) ? "h1" : "h2";
                onPointerMove(lx, ly, shiftKey);
                return;
            }

            // 2. Check Preview Bar (Play/Pause, Speed Toggle, or Interactive Scrub!)
            if (lx >= L.px && lx <= L.px + L.pw && ly >= L.py - 2 && ly <= L.py + L.ph + 2) {
                if (lx <= L.px + 18) {
                    state.previewPlaying = !state.previewPlaying;
                    if (state.previewPlaying) {
                        state.animStart = Date.now() - state.previewT * state.previewDuration;
                    }
                    surface.notify("onDraw");
                    return;
                }
                if (lx >= L.px + L.pw - 26) {
                    if (state.previewDuration === 1000) state.previewDuration = 500;
                    else if (state.previewDuration === 500) state.previewDuration = 1500;
                    else state.previewDuration = 1000;
                    state.animStart = Date.now() - state.previewT * state.previewDuration;
                    surface.notify("onDraw");
                    return;
                }
                state.draggingMode = "scrub";
                onPointerMove(lx, ly, shiftKey);
                return;
            }

            // 3. Check Readout Row: [->]]   0.42, 0.00, 0.58, 1.00   [★]
            if (lx >= L.rx && lx <= L.rx + L.rw && ly >= L.ry && ly <= L.ry + L.rh) {
                if (lx <= L.rx + 18) {
                    readFromSelectedKeyframes();
                    return;
                }
                if (lx >= L.rx + L.rw - 18) {
                    saveCurrentToCustom();
                    return;
                }
                var curStr = state.x1.toFixed(4) + ", " + state.y1.toFixed(4) + ", " + state.x2.toFixed(4) + ", " + state.y2.toFixed(4);
                var entered = askTextDialog("Edit Bezier Curve", "Enter x1, y1, x2, y2 or paste cubic-bezier(x1, y1, x2, y2):", curStr);
                if (entered !== null && String(entered).replace(/^\s+|\s+$/g, "") !== "") {
                    var parts = String(entered).match(/[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g);
                    if (parts && parts.length === 4) {
                        var nx1 = parseFloat(parts[0]), ny1 = parseFloat(parts[1]);
                        var nx2 = parseFloat(parts[2]), ny2 = parseFloat(parts[3]);
                        if (isFinite(nx1) && isFinite(ny1) && isFinite(nx2) && isFinite(ny2)) {
                            state.x1 = Math.max(0.0, Math.min(1.0, nx1));
                            state.y1 = Math.max(-0.65, Math.min(1.65, ny1));
                            state.x2 = Math.max(0.0, Math.min(1.0, nx2));
                            state.y2 = Math.max(-0.65, Math.min(1.65, ny2));
                            state.activeId = null;
                            state.animStart = Date.now() - 400;
                            surface.notify("onDraw");
                        } else showNotice("Invalid Bezier Curve", "Enter four finite numeric values.");
                    } else showNotice("Invalid Bezier Curve", "Enter exactly four values, for example: 0.42, 0, 0.58, 1");
                }
                return;
            }

            // 4. Check Bottom Action Row: [<]  [Hourglass]  [>]  |  [APPLY]
            if (lx >= L.ax && lx <= L.ax + L.aw && ly >= L.ay && ly <= L.ay + L.ah) {
                var dirZoneW = Math.floor(L.aw * 0.46);
                var relX = lx - L.ax;
                if (relX < dirZoneW * 0.33) {
                    state.direction = "out";
                    surface.notify("onDraw");
                } else if (relX < dirZoneW * 0.67) {
                    state.direction = "both";
                    surface.notify("onDraw");
                } else if (relX <= dirZoneW) {
                    state.direction = "in";
                    surface.notify("onDraw");
                } else {
                    state.applyFlashUntil = Date.now() + 200;
                    surface.notify("onDraw");
                    applyCurveToKeyframes();
                }
                return;
            }

            // 5. Check Preset Header Bar
            if (lx >= L.hx && lx <= L.hx + L.hw && ly >= L.hy && ly <= L.hy + L.hh) {
                var dropW = L.hw - 48;
                if (lx <= L.hx + dropW) {
                    if (state.activeLib === "default") state.activeLib = "velocity";
                    else if (state.activeLib === "velocity") state.activeLib = "custom";
                    else state.activeLib = "default";
                } else if (lx <= L.hx + dropW + 17) {
                    saveCurrentToCustom();
                    return;
                } else if (lx <= L.hx + dropW + 32) {
                    // Click [] to import a FlowCraft JSON library; Shift-click to export the current one.
                    if (shiftKey) exportCurrentLibrary(); else importCustomLibrary();
                    surface.notify("onDraw");
                    return;
                } else {
                    deleteSelectedCustom();
                    return;
                }
                surface.notify("onDraw");
                return;
            }

            // 6. Check Responsive Preset Grid
            if (lx >= L.kx && lx <= L.kx + L.kw && ly >= L.ky && ly <= L.ky + L.kh) {
                var col = Math.floor((lx - L.kx) / (L.kw / L.cols));
                var row = Math.floor((ly - L.ky) / (L.kh / L.rows));
                if (col >= 0 && col < L.cols && row >= 0 && row < L.rows) {
                    var idx = row * L.cols + col;
                    var list = LIBRARIES[state.activeLib] || [];
                    if (idx >= 0 && idx < list.length) {
                        var item = list[idx];
                        state.x1 = item.c[0];
                        state.y1 = item.c[1];
                        state.x2 = item.c[2];
                        state.y2 = item.c[3];
                        state.activeId = item.id;
                        // Jump preview to active mid-curve point & play
                        state.previewPlaying = true;
                        state.animStart = Date.now() - 380;
                        surface.notify("onDraw");
                    }
                }
            }
        }

        function onPointerMove(lx, ly, shiftKey) {
            var now = Date.now();

            if (!state.draggingMode) {
                // The preview ticker already drives the animation. Letting
                // mousemove request extra frames here made the playhead alternate
                // between two independent clocks and burned script time.
                return;
            }

            updateLayout(surface.size.width, surface.size.height);

            if (state.draggingMode === "scrub") {
                var trackL = L.px + 18;
                var trackR = L.px + L.pw - 26;
                var trackW = Math.max(40, trackR - trackL);
                var sStart = trackL + trackW * 0.14;
                var sEnd   = trackL + trackW * 0.86;
                var newT = Math.max(0.0, Math.min(1.0, (lx - sStart) / Math.max(1, sEnd - sStart)));
                if (newT === state.previewT) return;
                state.previewT = newT;
                state.animStart = now - state.previewT * state.previewDuration;
                surface.notify("onDraw");
                return;
            }

            var gt = getGraphTransform();
            var nx = gt.unmapX(lx);
            var ny = gt.unmapY(ly);
            if (shiftKey) {
                if (Math.abs(ny - 0.0) < 0.22) ny = 0.0;
                else if (Math.abs(ny - 1.0) < 0.22) ny = 1.0;
            }

            // Cursor past the clamp limits yields the same value as last event:
            // nothing to redraw, so don't queue another full repaint.
            if (state.draggingMode === "h1" && nx === state.x1 && ny === state.y1) return;
            if (state.draggingMode === "h2" && nx === state.x2 && ny === state.y2) return;

            if (state.draggingMode === "h1") {
                state.x1 = nx;
                state.y1 = ny;
            } else if (state.draggingMode === "h2") {
                state.x2 = nx;
                state.y2 = ny;
            }
            state.activeId = null;
            state.previewT = nx;
            state.animStart = now - nx * state.previewDuration;
            surface.notify("onDraw");
        }

        try {
            surface.addEventListener("mousedown", function (e) {
                var pt = getDirectCanvasXY(e);
                if (pt) onPointerDown(pt.x, pt.y, !!e.shiftKey);
            });
            surface.addEventListener("mousemove", function (e) {
                var pt = getDirectCanvasXY(e);
                if (pt) onPointerMove(pt.x, pt.y, !!e.shiftKey);
            });
            surface.addEventListener("mouseup", function () {
                state.draggingMode = null;
            });
        } catch (e) {}

        // =====================================================================
        // KEYFRAME READ, CUSTOM SAVE, & APPLY FUNCTIONS
        // =====================================================================
        var warnedNoPersist = false;

        function customNameTaken(name) {
            var lower = name.toLowerCase();
            for (var i = 0; i < LIBRARIES.custom.length; i++) {
                if (LIBRARIES.custom[i].name.toLowerCase() === lower) return true;
            }
            return false;
        }

        function saveCurrentToCustom() {
            // loadCustomPresets() drops duplicate names, so never reuse one
            // (e.g. after deleting custom1 of custom1/custom2).
            var num = LIBRARIES.custom.length + 1;
            while (customNameTaken("custom" + num)) num++;
            var preset = {
                id: "custom_" + Date.now(),
                name: "custom" + num,
                shortName: "cust" + num,
                c: [
                    Number(state.x1.toFixed(4)),
                    Number(state.y1.toFixed(4)),
                    Number(state.x2.toFixed(4)),
                    Number(state.y2.toFixed(4))
                ]
            };
            LIBRARIES.custom.push(preset);
            var saved = persistCustomPresets();
            state.activeLib = "custom";
            state.activeId = preset.id;
            surface.notify("onDraw");
            if (!saved && !warnedNoPersist) {
                warnedNoPersist = true;
                showNotice("Preset not stored", "The preset is saved for this session, but EffectCraft would not store it, so it will be gone after a restart.\n\nShift-click the [] icon to export a backup.");
            }
        }

        function deleteSelectedCustom() {
            if (state.activeLib !== "custom" || !state.activeId) return;
            var nextList = [];
            for (var i = 0; i < LIBRARIES.custom.length; i++) {
                if (LIBRARIES.custom[i].id !== state.activeId) nextList.push(LIBRARIES.custom[i]);
            }
            LIBRARIES.custom = nextList;
            persistCustomPresets();
            if (nextList.length > 0) {
                state.activeId = nextList[0].id;
                state.x1 = nextList[0].c[0]; state.y1 = nextList[0].c[1];
                state.x2 = nextList[0].c[2]; state.y2 = nextList[0].c[3];
            } else {
                state.activeId = null;
                state.x1 = 0.42; state.y1 = 0.00; state.x2 = 0.58; state.y2 = 1.00;
            }
            surface.notify("onDraw");
        }

        // Helpers matching EffectCraft's documented Ease Presets semantics.
        function isSpatialProperty(prop) {
            try {
                return typeof PropertyValueType !== "undefined" &&
                    (prop.propertyValueType === PropertyValueType.TwoD_SPATIAL ||
                     prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL);
            } catch (e) { return false; }
        }

        function spatialPathLength(a, outTangent, inTangent, b) {
            var points = [], dimensions = Math.max(a.length, b.length), length = 0, prev = null;
            for (var d = 0; d < dimensions; d++) {
                var av = a[d] || 0, bv = b[d] || 0;
                points.push([av, av + (outTangent[d] || 0), bv + (inTangent[d] || 0), bv]);
            }
            for (var step = 0; step <= 96; step++) {
                var t = step / 96, u = 1 - t, point = [];
                for (var e = 0; e < dimensions; e++) {
                    var q = points[e];
                    point.push(u*u*u*q[0] + 3*u*u*t*q[1] + 3*u*t*t*q[2] + t*t*t*q[3]);
                }
                if (prev) {
                    var sum = 0;
                    for (var f = 0; f < dimensions; f++) sum += Math.pow(point[f] - prev[f], 2);
                    length += Math.sqrt(sum);
                }
                prev = point;
            }
            return length;
        }

        function segmentBaseSpeeds(prop, firstKey) {
            var duration = prop.keyTime(firstKey + 1) - prop.keyTime(firstKey);
            try {
                var layer = prop.propertyGroup(prop.propertyDepth);
                if (layer && typeof layer.stretch === "number" && layer.stretch !== 0) duration *= 100 / layer.stretch;
            } catch (e) {}
            if (!(duration > 0) || !isFinite(duration)) return null;

            var v0 = prop.keyValue(firstKey), v1 = prop.keyValue(firstKey + 1), speeds = [];
            var easeCount = 1;
            try { easeCount = Math.max(1, prop.keyOutTemporalEase(firstKey).length); } catch (e) {}

            if (isSpatialProperty(prop) && v0 instanceof Array && v1 instanceof Array) {
                try {
                    var dist = spatialPathLength(v0, prop.keyOutSpatialTangent(firstKey),
                        prop.keyInSpatialTangent(firstKey + 1), v1);
                    for (var si = 0; si < easeCount; si++) speeds.push(dist / duration);
                    return speeds;
                } catch (e) {}
            }
            if (typeof v0 === "number" && typeof v1 === "number") {
                speeds.push((v1 - v0) / duration);
            } else if (v0 instanceof Array && v1 instanceof Array && v0.length === v1.length) {
                for (var d = 0; d < v0.length; d++) speeds.push(((v1[d] || 0) - (v0[d] || 0)) / duration);
            } else {
                // Non-numeric values (for example, shape paths) ease their overall progress.
                for (var j = 0; j < easeCount; j++) speeds.push(1 / duration);
            }
            return speeds;
        }

        function curveSlopes() {
            var outSlope, inSlope, eps = 0.000001;
            if (state.x1 > eps) outSlope = state.y1 / state.x1;
            else if (state.x2 > eps) outSlope = state.y2 / state.x2;
            else outSlope = (Math.abs(state.y1) > eps) ? (state.y1 < 0 ? -100 : 100) : 1;

            if (1 - state.x2 > eps) inSlope = (1 - state.y2) / (1 - state.x2);
            else if (1 - state.x1 > eps && Math.abs(1 - state.y2) < eps) inSlope = (1 - state.y1) / (1 - state.x1);
            else inSlope = (Math.abs(1 - state.y2) > eps) ? ((1 - state.y2) < 0 ? -100 : 100) : 1;

            // Avoid unbounded handle speeds from a collapsed endpoint handle.
            return {
                out: Math.max(-100, Math.min(100, isFinite(outSlope) ? outSlope : 0)),
                in: Math.max(-100, Math.min(100, isFinite(inSlope) ? inSlope : 0))
            };
        }

        function collectSelectedKeyedProperties() {
            var comp = app.project.activeItem, result = [];
            if (!comp || !(comp instanceof CompItem)) return result;
            var props = comp.selectedProperties || [];
            for (var i = 0; i < props.length; i++) {
                var prop = props[i], keys = [];
                try {
                    if (typeof PropertyType !== "undefined" && prop.propertyType !== PropertyType.PROPERTY) continue;
                    if (prop.numKeys < 2 || !prop.isInterpolationTypeValid(KeyframeInterpolationType.BEZIER)) continue;
                    keys = prop.selectedKeys || [];
                } catch (e) { continue; }
                if (keys.length) result.push({ prop: prop, keys: keys });
            }
            return result;
        }

        function readFromSelectedKeyframes() {
            var keyed = collectSelectedKeyedProperties();
            for (var i = 0; i < keyed.length; i++) {
                var prop = keyed[i].prop, keys = keyed[i].keys;
                for (var j = 0; j + 1 < keys.length; j++) {
                    var a = keys[j];
                    if (keys[j + 1] !== a + 1) continue;
                    try {
                        if (prop.keyOutInterpolationType(a) === KeyframeInterpolationType.HOLD) continue;
                        var base = segmentBaseSpeeds(prop, a);
                        if (!base) continue;
                        var outEase = prop.keyOutTemporalEase(a), inEase = prop.keyInTemporalEase(a + 1);
                        var dim = 0;
                        for (var d = 1; d < base.length; d++) if (Math.abs(base[d]) > Math.abs(base[dim])) dim = d;
                        if (Math.abs(base[dim]) < 1e-12) continue;
                        var oe = outEase[dim] || outEase[0], ie = inEase[dim] || inEase[0];
                        if (!oe || !ie) continue;
                        state.x1 = Math.max(0, Math.min(1, oe.influence / 100));
                        state.y1 = state.x1 * (oe.speed / base[dim]);
                        state.x2 = Math.max(0, Math.min(1, 1 - ie.influence / 100));
                        state.y2 = 1 - (1 - state.x2) * (ie.speed / base[dim]);
                        state.y1 = Math.max(-0.65, Math.min(1.65, state.y1));
                        state.y2 = Math.max(-0.65, Math.min(1.65, state.y2));
                        state.activeId = null;
                        state.animStart = Date.now() - 400;
                        surface.notify("onDraw");
                        return;
                    } catch (e) {}
                }
            }
            showNotice("Read Curve", "Select two adjacent keyframes on the same animated property, then click the read icon again.");
        }

        function applyCurveToKeyframes() {
            var keyed = collectSelectedKeyedProperties();
            if (!keyed.length) {
                showNotice("Apply Curve", "Select one or more keyframes on an animated property, then click APPLY.");
                return;
            }
            var slopes = curveSlopes();
            var outInfluence = Math.max(0.1, Math.min(100, state.x1 * 100));
            var inInfluence = Math.max(0.1, Math.min(100, (1 - state.x2) * 100));
            var sides = [], easedKeys = 0, rovingKeys = 0;

            function makeEases(baseSpeeds, relativeSpeed, influence) {
                var arr = [];
                for (var d = 0; d < baseSpeeds.length; d++) {
                    arr.push(new KeyframeEase(baseSpeeds[d] * relativeSpeed, influence));
                }
                return arr;
            }

            // Calculate all speeds before changing any side, so adjacent selections are stable.
            for (var i = 0; i < keyed.length; i++) {
                var prop = keyed[i].prop;
                for (var j = 0; j < keyed[i].keys.length; j++) {
                    var k = keyed[i].keys[j], before = sides.length;
                    try { if (prop.keyRoving(k)) { rovingKeys++; continue; } } catch (e) {}

                    if (state.direction !== "out" && k > 1) {
                        var inBase = segmentBaseSpeeds(prop, k - 1);
                        if (inBase) sides.push({ prop: prop, key: k, out: false,
                            eases: makeEases(inBase, slopes.in, inInfluence) });
                    }
                    if (state.direction !== "in" && k < prop.numKeys) {
                        var outBase = segmentBaseSpeeds(prop, k);
                        if (outBase) sides.push({ prop: prop, key: k, out: true,
                            eases: makeEases(outBase, slopes.out, outInfluence) });
                    }
                    if (sides.length > before) easedKeys++;
                }
            }

            if (!sides.length) {
                showNotice("Apply Curve", "No usable keyframe sides were found. Roving keys and properties without neighbouring keys cannot be eased.");
                return;
            }

            // One bad keyframe side must not abort the rest of the selection.
            var failedSides = 0, lastApplyError = "";
            app.beginUndoGroup("Apply FlowCraft Curve");
            try {
                for (var e = 0; e < sides.length; e++) {
                    var item = sides[e], p = item.prop, key = item.key;
                    try {
                        var oldIn = p.keyInTemporalEase(key), oldOut = p.keyOutTemporalEase(key);
                        var inType = p.keyInInterpolationType(key), outType = p.keyOutInterpolationType(key);
                        try { if (p.keyTemporalContinuous(key)) p.setTemporalContinuousAtKey(key, false); } catch (e2) {}
                        if (item.out) {
                            p.setTemporalEaseAtKey(key, oldIn, item.eases);
                            p.setInterpolationTypeAtKey(key, inType, KeyframeInterpolationType.BEZIER);
                        } else {
                            p.setTemporalEaseAtKey(key, item.eases, oldOut);
                            p.setInterpolationTypeAtKey(key, KeyframeInterpolationType.BEZIER, outType);
                        }
                    } catch (sideError) {
                        failedSides++;
                        lastApplyError = sideError.toString();
                    }
                }
            } finally {
                app.endUndoGroup();
            }
            surface.notify("onDraw");

            // Dialogs open only after the undo group is closed.
            var notes = [];
            if (failedSides > 0) notes.push(failedSides + " keyframe side(s) could not be eased (last error: " + lastApplyError + ").");
            if (rovingKeys > 0) notes.push("Applied to " + easedKeys + " selected keyframe(s). Skipped " + rovingKeys + " roving keyframe(s); turn off Roving to ease them.");
            if (notes.length) showNotice("Apply Curve", notes.join("\n\n"));
        }

        win.onResizing = win.onResize = function () {
            this.layout.resize();
            surface.notify("onDraw");
        };

        startPreviewTicker(win);

        if (win instanceof Window) {
            win.layout.layout(true);
            win.layout.resize();
            win.center();
            win.show();
        } else {
            win.layout.layout(true);
            win.layout.resize();
            surface.notify("onDraw");
        }
        return win;
    }

    buildUI(thisObj);
})(this);