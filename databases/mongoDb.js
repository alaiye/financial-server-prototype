const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');
const Schema = mongoose.Schema;

const realtimesSchema = new Schema({
    platform: String,       //Binance, Bitrex vs...
    section: String,        //Spot, Futures(Kaldıraç) vs...
    symbol: String,
    second: {
        s3: { price: Number, percent: Number },
        s6: { price: Number, percent: Number },
        s9: { price: Number, percent: Number },
        s15: { price: Number, percent: Number },
        s30: { price: Number, percent: Number },
    },
    minute: {
        m1: { price: Number, percent: Number },
        m3: { price: Number, percent: Number },
        m5: { price: Number, percent: Number },
        m15: { price: Number, percent: Number },
        m30: { price: Number, percent: Number },
    },
    hour: {
        h1: { price: Number, percent: Number },
        h2: { price: Number, percent: Number },
        h4: { price: Number, percent: Number },
        h6: { price: Number, percent: Number },
        h8: { price: Number, percent: Number },
        h12: { price: Number, percent: Number },
        h24: { price: Number, percent: Number },
    }
}, {
    versionKey: false // set to false then it wont create in mongodb, __v:0 --> veri tabanına eklenmemesi için
});

const realTimes = mongoose.model('realtimes', realtimesSchema);
module.exports = { realTimes };