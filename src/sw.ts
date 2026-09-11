/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = "maro-dash-v1";

const PRECACHE_ASSETS: string[] = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.png",
  "/icon.svg",
  "/pwa-192x192.png",
  "/pwa-512x512.png",
  "/apple-touch-icon.png",
];

// Install: pre-cache app shell
self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

// Activate: clean old caches & claim clients
self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch handler
self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;

  // Only handle GET requests and http/https schemes
  if (request.method !== "GET" || !request.url.startsWith("http")) {
    return;
  }

  // Skip third-party analytics
  const url = new URL(request.url);
  if (
    url.hostname.includes("googletagmanager.com") ||
    url.hostname.includes("google-analytics.com") ||
    url.hostname.includes("vercel-analytics")
  ) {
    return;
  }

  // Handle HTML navigation requests (SPA routing)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put("/index.html", responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match("/index.html").then((cached) => {
            return cached || caches.match("/");
          }) as Promise<Response>;
        }),
    );
    return;
  }

  // For static assets: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === "basic"
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return null as unknown as Response;
        });

      return cachedResponse || fetchPromise;
    }) as Promise<Response>,
  );
});

// Listen for message to skip waiting
self.addEventListener("message", (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

export {};
