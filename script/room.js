function include(file){
    let script = document.createElement("script");
    script.src = file;
    script.defer = true;
    script.type = "application/javascript";

    document.getElementsByTagName("head").item(0).appendChild(script);
}

// include("/static-data/rooms-data.js");
// include("/script/room-spa.js");
// include("/script/room-list.js");
