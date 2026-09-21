"use strict";
const CACHE = "sfls-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-maskable.svg",
  "./floorplan.png",
];

self.addEventListener("install", ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Offline-first: navigations are served from cache immediately (no waiting on
// a dead network) and refreshed in the background so updates land next visit.
// Everything else is cache-first. Cross-origin requests are left alone.
self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;
  if (req.mode === "navigate") {
    ev.respondWith((async () => {
      const cached = await caches.match("./index.html");
      const network = fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put("./index.html", copy));
        }
        return res;
      });
      if (cached) { network.catch(()=>{}); return cached; }
      return network.catch(()=>caches.match("./index.html"));
    })());
    return;
  }
  ev.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(()=>Response.error()))
  );
});
