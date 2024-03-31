if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service worker registered"))
    .catch(() => console.log("Service Worker not registered"))
}

if("PushManager" in window){
    // alert("Push Manager in Window");
    console.log("Push Manager in window");
}

if("Notification" in window){
    Notification.requestPermission()
}

