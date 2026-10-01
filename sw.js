/* Service worker · Paulo Xavier
 * - Offline: o site inteiro fica em cache após a primeira visita.
 * - Atualização automática: HTML sempre busca a versão nova na rede (cache só como reserva);
 *   demais arquivos usam "stale-while-revalidate". Se este arquivo mudar, o novo SW assume
 *   sozinho e a página recarrega.
 * Ao alterar sw.js, ícones ou a lista CORE, aumente VERSION. */
const VERSION = '2026-10-01.44';
const CORE_CACHE = 'vita-core-' + VERSION;
const RUNTIME_CACHE = 'vita-runtime';
const CORE = ['./', 'index.html', '404.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'curriculo-ilustracao.svg'];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CORE_CACHE)
      .then((c) => c.addAll(CORE.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CORE_CACHE && k !== RUNTIME_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function cacheable(res) {
  return res && (res.ok || res.type === 'opaque');
}

async function navegacao(req) {
  const cache = await caches.open(CORE_CACHE);
  const fallback = async () =>
    (await cache.match(req, { ignoreSearch: true })) ||
    (await cache.match('index.html')) ||
    (await cache.match('404.html'));
  const rede = fetch(req, { cache: 'no-cache' }).then((res) => {
    if (res.ok) cache.put(req.url.split('#')[0], res.clone()).catch(() => {});
    return res;
  });
  // rede lenta (>4s): usa a cópia guardada enquanto a rede continua atualizando o cache
  const tempo = new Promise((r) => setTimeout(() => r(null), 4000));
  try {
    const res = await Promise.race([rede, tempo.then(async () => (await fallback()) || rede)]);
    return res || (await fallback());
  } catch (_) {
    return (await fallback()) || Response.error();
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(RUNTIME_CACHE);
  const guardado = (await cache.match(req)) || (await caches.match(req));
  const rede = fetch(req)
    .then((res) => {
      if (cacheable(res)) cache.put(req, res.clone()).catch(() => {});
      return res;
    })
    .catch(() => null);
  return guardado || (await rede) || Response.error();
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') {
    e.respondWith(navegacao(req));
    return;
  }
  if (url.origin === self.location.origin || FONT_HOSTS.includes(url.hostname)) {
    e.respondWith(staleWhileRevalidate(req));
  }
});
