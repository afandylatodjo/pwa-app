
function roomCard(data){
    data.forEach(element => {
    document.getElementById("card-list").innerHTML += `
        <div class="card-container" id="card-container"
            onclick="goToRoom(${element.id})"
            >
            <div class="card-content">
                <span>Room ${element.id}</span>
                <img src="/images/icon512_rounded.png" alt="" width="10%" height="auto"> 
                <p>Harga per Bulan <span>${element.price}</span></p>
            </div>
        </div>
    `
    })

}
roomCard(rooms)

function goToRoom(id){
    location.pathname="/pages/room.html/"+id
}