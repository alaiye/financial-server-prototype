const { candleSeries } = require("../databases/mongoDb");

const mongoSave = async (platform, section, symbol, period, dataset) => {

    dataset.map(async (data) => {

        const cseries = new candleSeries({
            platform: platform,
            section: section,
            symbol: symbol,
            period: period,
            candleSerie: {
                openTime: data.openTime,
                open: data.open,
                high: data.high,
                low: data.low,
                close: data.close,
                volume: data.volume,
                closeTime: data.closeTime
            },
            indicators: {
                sma: 0,
                ema: 0,
                long: true,
                short: false,
                rsi: 0,
                macd_fast: 0,
                macd_slow: 0,
                macd_histogram: 0
            },
            oscillators: {
                deneme: null
            }
        })

        let doc1 = await candleSeries.findOne({ platform: platform, section: section, symbol: symbol, period: period, 'candleSerie.openTime': data.openTime });
        //console.log(doc1)
        if (doc1 == null) {
            cseries.save().then(() => {
                //console.log("\x1b[36m",symbol,period,"was Updated")
            });
        }//else console.log("\x1b[31m",symbol,period,"was not Updated")
    });
    return;
}

module.exports = { mongoSave };