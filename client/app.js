const express = require('express')
const path = require('path')

const app = express()

app.use('/static', express.static(path.join(__dirname, 'assets','static')))


app.get("/*" , (req,res)=> {
    // console.log(__dirname)
    res.sendFile(path.resolve(__dirname, "assets", "index.html"));
} )

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server is running on Port: ${PORT}`));