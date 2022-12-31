const express = require('express')
var cors = require('cors');
const mongoose = require('mongoose')
const areaRoutes = require("../routes/areaRoutes")


const app = express()
const port = 3001
app.use(express.json())
app.use(cors());


//Routes
app.use('/api/area', areaRoutes);    



//DB Connection
mongoose.connect('mongodb+srv://aneeqduraiz:unlock!!!@cluster0.ide38ku.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log("Connected to Mongo Atlas")
         app.listen(port, () => console.log(`Example app listening on port ${port}!`))
        // app.listen(3001, "192.168.100.57");
    })
    .catch((error)=>{
        console.log("Fooking error in connection to mongo")
        console.log(error.message)

    })

