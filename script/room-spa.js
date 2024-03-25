import { rooms } from "../static-data/rooms-data.js";

async function FetchRoom(url){
    let resp = await fetch(url).then(resp => resp.json());
    return resp || {"message": "Cannot retrieved the data from api"};
}


const Comp = ({id, image}) =>{
    let r = rooms.find(e => +e.id === +id);
    return(
        `
        <div class="room" id="${id}">
            <img src="${image}" alt="Room" width="50%" height="auto">
            <div class="room-detail">
                <h3>Room Detail</h3>
                <p>No. ${r.id} | ${r.bed} | ${r.feat} | ${r.conn}</p>
                <p>Price ${r.price}/Mo.</p>
                <p>Available ${r.status}</p>
            </div>
        </div>
        `
    )
}

const Room = ({i, img})=>{
    document.title = "Room "+i
    document.getElementById("room-root").innerHTML += Comp({id: i, image: img});
}

const Render = async () => {
    Room({i: new URL(location).searchParams.get("id"), img: "/images/icon512_rounded.png"});
}
// Render();


export {
    Comp,
    Room,
    Render,
}