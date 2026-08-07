/* Client-side COOP/COEP for hosts that can't set response headers
   (GitHub Pages). The FwGUI WASM app needs SharedArrayBuffer, which
   requires cross-origin isolation. Include this as the FIRST script on
   the page; on first visit it registers itself as a service worker and
   reloads once, after which all /fwgui/ responses carry the headers.
   Based on gzuidhof/coi-serviceworker (MIT). */
if (typeof window === 'undefined') {
  /* Service-worker context: stamp isolation headers onto every response. */
  self.addEventListener('install', function () { self.skipWaiting(); });
  self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
  self.addEventListener('fetch', function (e) {
    var req = e.request;
    if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') return;
    e.respondWith(fetch(req).then(function (res) {
      if (res.status === 0) return res;
      var h = new Headers(res.headers);
      h.set('Cross-Origin-Opener-Policy', 'same-origin');
      h.set('Cross-Origin-Embedder-Policy', 'require-corp');
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
    }));
  });
} else {
  (function () {
    if (window.crossOriginIsolated) return;
    if (!window.isSecureContext || !('serviceWorker' in navigator)) return;
    var src = document.currentScript.src;
    navigator.serviceWorker.register(src).then(function (reg) {
      /* Reload once the worker controls the page; guard against loops. */
      if (navigator.serviceWorker.controller) return;
      if (reg.active) { window.location.reload(); return; }
      navigator.serviceWorker.ready.then(function () { window.location.reload(); });
    });
  })();
}
