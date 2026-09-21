# Shopfloor Layout Sketcher

A mobile-first web app for sketching shop floor layouts to scale. Set your floor
dimensions, drop in machines, benches, and shelves as scaled rectangles, drag
them into place with grid snapping, and export the result.

No build step, no dependencies — plain HTML/CSS/JS, installable as a PWA and
fully offline once loaded.

## Features

- **Floor to scale** — set floor width/depth in meters, centimeters, feet, or inches
- **Item presets** — workbench, machine, table saw, shelf, pallet, cabinet, or custom
- **Touch-first canvas** — drag to move items, pinch to zoom, drag empty space to pan
- **Grid snapping** — configurable grid size (or off)
- **Edit in place** — rename, resize, recolor, rotate 90°, duplicate, delete
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
