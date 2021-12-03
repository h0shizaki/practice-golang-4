console.log("Welcome to delete");

const submit = document.querySelector("#del");

submit.addEventListener("click" , async()=>{

    await fetch("http://localhost:3030" + location.pathname , {method:"DELETE"})
    .then(res => res.json)
    .then(data => console.log(data));

    alert("DELETE SUCCESS")
    window.location.href = "/"

})
