
const CACHE = 'airgas-v10';
const ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'service-worker.js',
  'assets/favicon.ico',
  'assets/airgas-logo.png',
  'assets/safety-icon.svg',
  'assets/safety-icon.png',
  'assets/oxygen.svg',
  'assets/nitrogen.svg',
  'assets/argon.svg',
  'assets/carbon_dioxide.svg',
  'assets/helium.svg',
  'assets/hydrogen.svg',
  'assets/acetylene.svg',
  'assets/propane.svg',
  'assets/propylene.svg'
];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)))
);
self.addEventListener('activate', e =>
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))))
);
self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
