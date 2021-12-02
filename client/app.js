const express = require('express')
const path = require('path')

const app = express()

app.use('/static', express.static(path.resolve(__dirname, 'assets','static')))

app.get("/" , (req,res)=> {
    res.sendFile(path.resolve(__dirname, "assets", "static","html","index.html"));
} )

app.get("/add" , (req,res)=> {
    res.sendFile(path.resolve(__dirname, "assets","static","html", "add.html"));
} )

app.get("/edit/:id" , (req,res)=> {
    res.sendFile(path.resolve(__dirname, "assets","static","html", "edit.html"));
} )

app.get("/del/:id" ,(req,res)=>{
    res.sendFile(path.resolve(__dirname, "assets","static","html", "del.html"));
})

app.get("*" , (req,res)=>{
    res.sendFile(path.resolve(__dirname, "assets","static","html", "404.html"));
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server is running on Port: ${PORT}`));