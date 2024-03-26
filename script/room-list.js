import { rooms } from "../static-data/rooms-data.js";

function roomCard(data){
    data.forEach(element => {
    let cardContainer = document.createElement("div")
    cardContainer.classList.add("card-container")
    cardContainer.onclick = () => {
        // goToRoom(element.id); 
        navigator.serviceWorker.ready.then(sw =>{
            sw.showNotification("Notif", {body:"Notif ini"});
        })
        
    }
    cardContainer.innerHTML += `
        <div class="card-content">
            <span>Room ${element.id}</span>
            <img src="/images/icon512_rounded.png" alt="" width="10%" height="auto"> 
            <p>Harga per Bulan <span>${element.price}</span></p>
        </div>
    `
    document.getElementById("card-list").appendChild(cardContainer);

    // document.getElementById("card-list").innerHTML += `
    //     <div class="card-container"
    //         onclick="goToRoom(${element.id})"
    //         >
    //         <div class="card-content">
    //             <span>Room ${element.id}</span>
    //             <img src="/images/icon512_rounded.png" alt="" width="10%" height="auto"> 
    //             <p>Harga per Bulan <span>${element.price}</span></p>
    //         </div>
    //     </div>
    // `
    })

}
roomCard(rooms)

function goToRoom(id){
    location.href="/pages/single-page.html?id="+id
}

