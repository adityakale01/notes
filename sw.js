// Generated at build time. Keeps the app working offline.
const VERSION = '18c7bc4caf68'
const CACHE = 'notes-' + VERSION
const FILES = ["./","./assets/export-CyFj2iWs.js","./assets/index-BjWkyq0M.js","./assets/index-CAqtJWwE.js","./assets/index-CMmcK3_7.js","./assets/index-DKWN08Vr.css","./assets/pdf-gh-BrLFn.js","./assets/pdf.worker.min-DgRcL-GR.js","./assets/pdf.worker.min-yatZIOMy.mjs","./assets/web-BD0mVXJG.js","./assets/web-CS4BmPd4.js"]

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
