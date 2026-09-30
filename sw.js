/* =========================================================
   DWA防災情報センター Service Worker

   更新が反映されない問題への対策として、次の方針で作っています。

   1) HTMLは必ずネットワークを先に見る（ネットワーク優先）
      → メニューを変えたら、次に開いたときすぐ反映される。
        通信が無いときだけキャッシュを使うので、オフラインでも開ける。

   2) 画像やCSSなどはキャッシュを先に返しつつ裏で更新（stale-while-revalidate）
      → 表示は速いまま、次回には新しいものに入れ替わる。

   3) CACHE_NAME を書き換えると、古いキャッシュを全部捨てて作り直す。
      ファイルを更新したら必ず日付部分を新しくしてください。
   ========================================================= */

const CACHE_NAME = 'dwa-bousai-2026-10-01-01';   /* ← 更新のたびに必ず変える */

/* 最初に入れておくもの。増やしすぎると初回が重くなるので最小限に */
const PRECACHE = [
  './',
  './index.html',
  './manifest.json'
];

/* ---------- インストール ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    /* 1件でも失敗すると全体が失敗するため、個別に入れる */
    await Promise.all(PRECACHE.map((url) =>
      cache.add(new Request(url, { cache: 'reload' })).catch(() => {})
    ));
    /* 待機せずすぐ次の版になる準備をする */
    await self.skipWaiting();
  })());
});

/* ---------- 有効化：古いキャッシュを捨てる ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    );
    /* ナビゲーションの先読みが使えるなら有効にする */
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch (e) {}
    }
    await self.clients.claim();
  })());
});

/* ---------- ページ側からの指示 ---------- */
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
  }
});

/* ---------- 取得 ---------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;

  /* GET以外は素通し */
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  /* 別ドメイン（CDN・API・タイル画像など）は扱わない */
  if (url.origin !== self.location.origin) return;

  /* --- HTMLはネットワーク優先 --- */
  const isHTML =
    req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        if (preload) {
          putInCache(req, preload.clone());
          return preload;
        }
        const fresh = await fetch(req, { cache: 'no-store' });
        putInCache(req, fresh.clone());
        return fresh;
      } catch (e) {
        /* 通信できないときはキャッシュ、それも無ければトップを返す */
        const cached = await caches.match(req);
        if (cached) return cached;
        const top = await caches.match('./index.html');
        if (top) return top;
        return new Response(
          '<meta charset="utf-8"><p>オフラインのため表示できません。通信環境をご確認ください。</p>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      }
    })());
    return;
  }

  /* --- それ以外：キャッシュを返しつつ裏で更新 --- */
  event.respondWith((async () => {
    const cached = await caches.match(req);
    const fetching = fetch(req)
      .then((res) => { putInCache(req, res.clone()); return res; })
      .catch(() => null);
    return cached || (await fetching) || new Response('', { status: 504 });
  })());
});

/* ---------- 保存の共通処理 ---------- */
function putInCache(req, res) {
  if (!res || !res.ok || res.type === 'opaque') return;
  caches.open(CACHE_NAME).then((cache) => cache.put(req, res)).catch(() => {});
}
