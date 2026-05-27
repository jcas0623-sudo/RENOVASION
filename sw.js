const CACHE_NAME = 'sura-meds-cache-v5';
const ASSETS = [ './', './index.html', './manifest.json', './audio/instrucciones.mp3', './audio/alerta.mp3' ];

let alertasProgramadas = [];

self.addEventListener('message', (event) => {
    if (event.data && event.data.tipo === 'ACTUALIZAR_ALERTAS') {
        alertasProgramadas = event.data.datos;
    }
});

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
}); 
