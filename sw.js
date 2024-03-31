//Cache data
const CACHE_NAME = "static-site-v1";
const dynamicCache = "dynamic-site-v1";
let toCache = [
    "/",
    "/index.html",
    "/script/app.js",
    "/style/style.css",
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
//Install Event End


//Activate Event
self.addEventListener("activate", async e=>{
    e.waitUntil(async () => {
        try{

            const applicationServerKey = "BABRqz5Nry5Iz5uzO0tQnR3cgVNeZM3tGfw2lF5a-6xZVDI6P-fKWtfgdTbRjLgdviYqkVun69CYjgzlNLCBG0E";
            const options = {applicationServerKey, userVisibleOnly: true};
            const subscriptions = await self.registration.pushManager.subscribe(options);
            console.log(JSON.stringify(subscriptions));
            const resp = await saveSubscription(subscriptions);
            console.log(resp);

        }catch(err){
            console.log(err);
        }
        caches.keys().then(keys=>{
            return Promise.all(
                keys.filter(key=>key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })

    }
    );

});
//Active Event End


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
//Fetch Even End


//Push Manager Event
self.addEventListener("push", (event) => {
    if(event.data){
        console.log(event.data.text());
        showNotif("MESSAGE", event.data.text(), self.registration);
    }else{
        console.log("push event no data");
    }
})

const showNotif = (t, body, swRegistration)=>{
    const options ={
        body
    }
    swRegistration.showNotification(t, options)
}

//Encode base64
// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }


//Save Subscription
const saveSubscription = async (subs) => {
    let nurl = "https://af84-36-85-223-54.ngrok-free.app"
    const url = nurl+"/save-subscribe";
    const resp = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subs)
    }).then(res => res.json());
}