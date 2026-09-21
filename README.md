# Shopfloor Layout Sketcher

A mobile-first web app for sketching shop floor layouts to scale. Set your floor
dimensions, drop in machines, benches, and shelves as scaled rectangles, drag
them into place with grid snapping, and export the result.

No build step, no dependencies — plain HTML/CSS/JS, installable as a PWA and
fully offline once loaded.

## Features

- **Floor plan background** — the Vån 1 plan (`floorplan.png`) is drawn to scale
  under the layout (its bold grid squares are 5×5 m, fine grid 1×1 m,
  floor ≈ 25.6×38.2 m); toggle it in floor settings
- **Select to move** — items only move while selected; tap to select, then drag
- **Rotate gizmo** — a selected item shows a rotation knob that snaps to 45° steps
- **Double-tap to edit** — edit mode per item: switch the core between rectangle
  and circle, and drag translucent clearance zones (individual depth per side of
  a rectangle, extra radius ring on a circle) with touch-friendly handles
- **Pen / touch / mouse** — pointer-events based, works with Apple Pencil on
  iPad and mouse + wheel zoom on desktop
- **Item presets** — workbench, machine, table saw, shelf, pallet, cabinet, or custom
- **Grid snapping** — configurable snap size (or off)
- **Duplicate / delete / rename / recolor** — from the selection panel
- **Autosave** — layout persists in the browser (localStorage)
- **Export / import** — PNG snapshot for sharing, JSON for backup/restore
- **Offline PWA** — add to home screen and use it on the shop floor without a connection

## Running it

It's a static site — serve the folder any way you like:

```sh
python3 -m http.server 8080
# then open http://localhost:8080
```

Or enable **GitHub Pages** on this repo (Settings → Pages → deploy from the
`main` branch, root folder) and open the published URL on your phone. From
there, "Add to Home Screen" installs it as an app.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The entire app — markup, styles, and logic |
| `sw.js` | Service worker for offline caching |
| `manifest.webmanifest` | PWA manifest |
| `icon.svg`, `icon-maskable.svg` | App icons |
