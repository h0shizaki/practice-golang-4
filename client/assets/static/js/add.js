console.log("Welcome to Add");

const submit = document.getElementById("submit");


submit.addEventListener("click", async() => {

    const name = document.querySelector("#name").value;
    const lvl = document.querySelector("#lvl").value;
    const rank = document.querySelector("#rank").value;

    let data = JSON.stringify({ "name" : name , "level" : parseInt(lvl) , "rank" : rank});

    console.log(data);

    await postData(data);
    
    alert("DATA ADDED");
    window.location.href = "/"


});

function clearForm(){
    document.querySelector("#name").value = "";
    document.querySelector("#lvl").value = 0;
    document.querySelector("#rank").value = "";
}

function postData(data){
    fetch("http://localhost:3030/player/add" , {
        headers:{ "Content-Type": "application/json"},
        method: "POST",
        body: data
    })
    .then( res=>res.json)
    .then(data => {
        console.log(data);
    })
    
}