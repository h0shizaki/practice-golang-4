//fetch api

const API_URL = "http://localhost:3030";

function getData() {

    fetch(API_URL + "/player", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
        .then(res => res.json())
        .then(results => {
            let trData = "";
            results.forEach(result => {
                trData += "<tr>";
                trData += `<td>${result['name']}</td>`;
                trData += `<td>${result['level']}</td>`;
                trData += `<td>${result['rank']}</td>`;
                trData += `<td><a href="/edit/${result['_id']}"><button class="btn btn-warning">Edit</button></a></td>`;
                trData += `<td><a href="/player/delete/${result['_id']}"><button class="btn btn-danger">Delete</button></a></td>`;
                trData += "</tr>";

            })

            document.querySelector('#myTable').innerHTML = trData;

        })
}

function delPlayer(player) {
    console.log(player);
    getData();
}



// page loaded
document.addEventListener("DOMContentLoaded", async function () {
    console.log("Welcome to main page")
    await getData()


})

