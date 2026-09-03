const CACHE='albania-2026-both-couples-v3';
const ASSETS=[
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./docs/orit_israel_flight_out_elonora.pdf",
  "./docs/orit_israel_hotel_zallina_15-17sep.pdf",
  "./docs/koman_twin_cabins_17sep.pdf",
  "./docs/orit_israel_hotel_kroi_21sep.pdf",
  "./docs/bizant_boutique_22sep.pdf",
  "./docs/orit_israel_hotel_chicago_18sep.pdf",
  "./docs/valbone_two_e_19-21sep.pdf",
  "./docs/hotel_chicago_18sep.pdf",
  "./docs/hotel_zallina_15-17sep.pdf",
  "./docs/orit_israel_bizant_22sep.pdf",
  "./docs/orit_israel_flight_return_sorin.pdf",
  "./docs/orit_israel_koman_twin_cabins_17sep.pdf",
  "./docs/ferry_fierze_koman_21sep.pdf",
  "./docs/orit_israel_hotel_muja_14sep.pdf",
  "./docs/orit_israel_flight_out_sorin.pdf",
  "./docs/shala_booking_18sep.png",
  "./docs/fm2_hotel_23sep.pdf",
  "./docs/hotel_kroi_21sep.pdf",
  "./docs/orit_israel_flight_return_elonora.pdf",
  "./docs/orit_israel_fm2_23sep.pdf",
  "./docs/israir_flights_14-24sep.pdf",
  "./docs/hotel_muja_14sep.pdf",
  "./docs/orit_israel_valbone_two_e_19-21sep.pdf"
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return r;}).catch(()=>caches.match('./index.html')));return;}
 event.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{if(req.method==='GET'&&r.ok){const cp=r.clone();caches.open(CACHE).then(x=>x.put(req,cp));}return r;})));
});
