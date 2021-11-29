express = require('express')
path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'public')));


app.get("/" , (req,res)=> {
    console.log(__dirname)
    res.sendFile(__dirname + "/views/index.html");
} )

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server is running on Port: ${PORT}`));