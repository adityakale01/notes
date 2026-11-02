// Generated at build time. Keeps the app working offline.
const VERSION = 'f13fb559ca3a'
const CACHE = 'notes-' + VERSION
const FILES = ["./","./assets/export-1JTnz4gz.js","./assets/index-Bra6ZQW6.css","./assets/index-NMFiH7PO.js","./assets/pdf-gh-BrLFn.js","./assets/pdf.worker.min-DgRcL-GR.js","./assets/pdf.worker.min-yatZIOMy.mjs"]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('notes-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

// The page asks for this when the person taps "Update".
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return
  if (req.mode === 'navigate') {
    // Always open instantly from the saved copy; updates arrive through a new service worker.
    event.respondWith(caches.open(CACHE).then((c) => c.match('./', { ignoreVary: true })).then((hit) => hit || fetch(req)))
    return
  }
  // ignoreVary: some servers mark files as varying by headers the browser sends, which would hide the saved copy.
  event.respondWith(caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req)))
})
