const CACHE = "haunt-pwa-v3";
const APP_SHELL = ["/", "/index.html", "/manifest.webmanifest"];

async function cacheResponse(request, response) {
  if (response.ok && response.type === "basic") {
    const cache = await caches.open(CACHE);
    await cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    return await cacheResponse(request, await fetch(request));
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    if (request.mode === "navigate") {
      return caches.match("/index.html");
    }

    throw new Error(`Unable to load ${request.url}`);
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const outdatedCaches = keys.filter((key) => key.startsWith("haunt-") && key !== CACHE);

    await Promise.all(outdatedCaches.map((key) => caches.delete(key)));
    await self.clients.claim();

    if (outdatedCaches.length > 0) {
      const windows = await self.clients.matchAll({ type: "window" });
      await Promise.all(windows.map((client) => client.navigate(client.url)));
    }
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(networkFirst(event.request));
});
