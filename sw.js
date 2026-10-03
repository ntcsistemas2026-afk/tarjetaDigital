// Guarda la app en el celular para que funcione sin internet.
// Cambiar VERSION al publicar cambios para que los celulares se actualicen.
const VERSION = 'tarjetaDigital-v1';
const ARCHIVOS = ['./', 'index.html', 'manifest.json', 'JsBarcode.code128.min.js', 'icono-192.png', 'icono-512.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
// Primero la copia guardada (funciona sin señal); si no esta, la red.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
