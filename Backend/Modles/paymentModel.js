const mongoose = require('mongoose')

paymentSchema = new mongoose.Schema({

    areaCode: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Area'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    serialNo: {
        type: Number,
        maxLength: 1,
        required: true
    },
    paymentDate:{
        type: Date,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
}, 
{timestamps:true})

module.exports = new mongoose.model("Payment", paymentSchema);