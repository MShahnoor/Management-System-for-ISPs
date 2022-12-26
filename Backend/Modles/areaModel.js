const mongoose = require('mongoose')

areaSchema = new mongoose.Schema({
    code: {
        type: String,
        maxLength: 1,
        required: true
    },
    name:{
        type: String,
        required: true
    }
}, 
{timestamps:true})

module.exports = new mongoose.model("Area", areaSchema);