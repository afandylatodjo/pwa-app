import { rooms } from "/static-data/rooms-data.js";

async function FetchRoom(url){
    let resp = await fetch(url).then(resp => resp.json());
    return resp || {"message": "Cannot retrieved the data from api"};
}

async function fetchPush(){
    let url = "https://af84-36-85-223-54.ngrok-free.app";
    let msg = {"message": "Cannot retrieved data"}
    let resp = await fetch(url+"/push", {
        method: "get",
        mode: "cors"
    }).then(res => {
        res.json();
    }).catch(err => console.log(err, msg));
    // console.log(resp || msg);
    return resp || msg;
}


async function notif(){
    let url = "https://af84-36-85-223-54.ngrok-free.app"
    let resp = await fetch(url+"/send-notification").then(res=>res.json())
    console.log("From spa", resp);
}

document.getElementById("push").onclick = () => notif();



const Comp = ({id, image}) =>{
    let r = rooms.find(e => +e.id === +id);
    return(
        `
        <div class="room" id="${id}">
            <img src="${image}" alt="Room" width="50%" height="auto">
            <div class="room-detail">
                <h3>Room Detail</h3>
                <p>No. ${r.id} | ${r.bed} Bed | ${r.feat} | ${r.conn}</p>
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