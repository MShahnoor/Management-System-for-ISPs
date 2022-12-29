const express = require('express')
const mongoose = require('mongoose')
const Area = require('../Modles/areaModel')
var cors = require('cors');


const app = express()
const port = 3001


app.use(express.json())
app.use(cors());

//Routes
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/', (req, res) => res.send('A Test String'))

app.post('/testp', (req, res) => res.send('A Test String form post'))

app.post('/addArea', async (req, res) => {
    const {code, name} = req.body
    try{
        const area = await Area.create({code, name})
        res.send(area)
    }catch(err){
        res.send("Error")
        console.log(err.message)
    }

    })

app.post('/addArea', async (req, res) => {
        const {code, name} = req.body
        try{
            const area = await Area.create({code, name})
            res.send(area)
        }catch(err){
            res.send("Error")
            console.log(err.message)
        }
    
        })

app.get('/getAreas', async (req, res) => {
    try{
        let response = await Area.find().select("code name")
       
        let areas = []
        for (i=0;i<response.length;i++){
            obj ={id: response[i]._id,
            code:response[i].code,
            name: response[i].name,
            activeUsers: 2,
            streets: 3,}
            areas.push(obj)
        }
       // res.send(typeof(x))
        res.send(areas)


    }catch(error){
        res.send(error.message)
    }  
        
})

app.delete('/deleteArea/:id', async(req, res) => {
    const id = req.params.id

    try{
        const deletedArea = await Area.findOneAndDelete({_id: id})
        if(!deletedArea){
            res.send("No Area Found!")
        }
        res.send(deletedArea)

    }catch(err){
        res.send(error.message)
    }
})

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

