"use strict";
const CACHE = "sfls-v2";
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

// network-first for navigation (so updates land), cache-first for the rest
self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate") {
    ev.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  ev.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }))
  );
});
