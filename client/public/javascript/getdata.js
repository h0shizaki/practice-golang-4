const APIURL = "http://localhost:3030/player";

fetch(APIURL,)
.then(res => res.json())
.then(playerList => {
    playerList.forEach(player => {
        console.log(player)
        document.querySelector(".list").innerHTML = `<li> ${player['name']} </li>`
    })
})