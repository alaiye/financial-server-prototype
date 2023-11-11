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

const chartingSchema = new Schema({
    platform: String,           // Binance, Bitrex vs...
    section: String,            // Futures(kaldıraçlı) yada Spot 
    symbols: Array,             // Tüm semboller, modüllerde kullanılmak üzere hazır(sadece enter)
    selectedSymbols: Array,
    periods: {
        minutes:Object,
        hours:Object,
        days:Object,
        weeks:Object,
        months:Object,
        years:Object
    },            // 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
    selectedPeriods: {
        minutes:Object,
        hours:Object,
        days:Object,
        weeks:Object,
        months:Object,
        years:Object
    },            // 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
    symbolsInactive: Array,     // Delist edilmiş aktif olmayan semboller
    nowProcessing: {
        symbolsQueue: Array,    // İşlenmemiş sembollerin hazır olduğu sembol kuyruğu
        symbol: String,         // Symbol verilerini toplayıp sonrasında strateji toplama anı
        symbolsReady: Array
    },
    historicalProcessing: {         // İşlenen sembol
        symbolsQueue: Array,    // İşlenmemiş sembollerin hazır olduğu sembol kuyruğu
        symbol: String,
        period: Number,    // 1M vs... sembol periodu
        symbolsReady: Array     // İşlenmiş sembollerin bulunduğu dizi
    }
}, {
    versionKey: false // set to false then it wont create in mongodb, __v:0 --> veri tabanına eklenmemesi için
});

const candleseriesSchema = new Schema({
    platform: String,       //Binance, Bitrex vs...
    section: String,        //Spot, Futures(Kaldıraç) vs...
    symbol: String,         //Sembol adı
    period: String,         /// 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
    candleSerie: {
        openTime: Number,
        open: Number,
        high: Number,
        low: Number,
        close: Number,
        volume: Number,
        closeTime: Number
    },
    indicators: {
        sma: Number,
        ema: Number,
        long: Boolean,
        short: Boolean,
        rsi: Number,
        macd_fast: Number,
        macd_slow: Number,
        macd_histogram: Number
    },
    oscillators: Object
}, {
    versionKey: false // set to false then it wont create in mongodb, __v:0 --> veri tabanına eklenmemesi için
})

const realTimes = mongoose.model('realtimes', realtimesSchema);
const charting = mongoose.model('chartings', chartingSchema);
const candleSeries = mongoose.model('candleseries', candleseriesSchema);

module.exports = { realTimes, charting, candleSeries };