//Cache data
const CACHE_NAME = "static-site-v1";
const dynamicCache = "dynamic-site-v1";
let toCache = [
    "/",
    "/index.html",
    "/script/app.js",
    "/style/style.css",
    // "/images/icons/icons-72x72.png",
    // "/images/icons/icons-96x96.png",
    // "/images/icons/icons-128x128.png",
    // "/images/icons/icons-144x144.png",
    // "/images/icons/icons-152x152.png",
    // "/images/icons/icons-192x192.png",
    // "/images/icons/icons-348x348.png",
    // "/images/icons/icons-512x512.png",
]

//Install event
self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
                cache.addAll(toCache);
            }
        )
    )
})


//Activate Event
self.addEventListener("activate", e=>{
    e.waitUntil(
        caches.keys().then(keys=>{
            return Promise.all(
                keys.filter(key=>key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );

});


//Fetch Event
self.addEventListener("fetch", e=>{
    let online = self.navigator.onLine
    e.respondWith(staleWhileRevalidate(e));

})

//Stale-while-revalidate
async function staleWhileRevalidate(e){
    return caches.match(e.request).then(
        cacheResp =>{
            let onlineResp = fetch(e.request).then(
                fetchResp =>{
                    return caches.open(CACHE_NAME).then(
                        cache => {
                            cache.put(e.request, fetchResp.clone());
                            return fetchResp;
                        }
                    )
                }
            );
            return cacheResp || onlineResp;
        }
    )

}


//Deprecated
//Network Response first then Cache
// async function networkThenCache(e){
//     return caches.open(CACHE_NAME).then(cache =>{
//         return cache.match(e.request).then(resp =>{
//             return resp || fetch(e.request).then(res => {
//                 cache.put(e.request, res.clone());
//                 return res;
//             })
//         })
//     })
// }