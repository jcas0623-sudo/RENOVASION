// Nombre de la caja fuerte donde guardaremos los archivos (Caché)
const CACHE_NAME = 'sura-meds-cache-v1';

// Lista de archivos que la aplicación necesita para funcionar sin internet
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './audio/instrucciones.mp3',
  './audio/alerta.mp3',
  './icon-192.png',
  './icon-512.png'
];

// 1. Evento de Instalación: Guarda todos los archivos en la memoria del celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Guardando archivos en la memoria para uso sin conexión...');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Evento de Activación: Limpia memorias viejas si actualizas la app en el futuro
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Borrando caché antiguo...');
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 3. Evento de Respuesta: Si no hay internet, saca los archivos de la memoria
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si el archivo está en la memoria (caché), lo usa. Si no, lo busca en internet.
      return cachedResponse || fetch(event.request);
    })
  );
}); 
