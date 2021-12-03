const id = window.location.pathname.slice(6);
const API = "http://localhost:3030";

window.addEventListener("DOMContentLoaded", async () => {
    await fetch(API + "/player/" + id, { 
        method: "GET", 
        headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        document.querySelector("#name").value = data['name'];
        document.querySelector("#lvl").value = data['level'];
        document.querySelector("#rank").value = data['rank'];
        
    });
})

const submit = document.querySelector("#submit");

submit.addEventListener("click" , async()=>{
    
    const data = JSON.stringify( {
        "_id" : id,
        "name" : document.querySelector("#name").value,
        "level": parseInt(document.querySelector("#lvl").value),
        "rank": document.querySelector("#rank").value
    })

    // console.log(data)

    await fetch(API + "/player/update" , {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: data
    })
    
    alert("UPDATED");
    window.location.href = "/";
    

})
