const { charting } = require("../databases/mongoDb");
const { arrDifference } = require("./arrayDifference")

const chartingSymbols = async (symbols) => {

    let data = await charting.findOne();
    if (data == null) {
        const values = new charting({
            platform: "binance",
            section: "futures",
            symbols: symbols,
            selectedSymbols: ["BTCUSDT", "ETHUSDT", "SPELLUSDT", "TOMOUSDT", "ARBUSDT"],
            periods: {
                minutes: { 1: "1m", 3: "3m", 5: "5m", 15: "15m", 30: "30m" },
                hours: { 1: "1h", 2: "2h", 4: "4h", 6: "6h", 8: "8h", 12: "12h" },
                days: { 1: "1d", 3: "3d" },
                weeks: { 1: "1w" },
                months: { 1: "1M" },
                years: null
            },
            selectedPeriods: {
                minutes: { 1: "1m", 3: "3m", 5: "5m", 15: "15m", 30: "30m" },
                hours: { 1: "1h", 4: "4h" },
                days: { 1: "1d" },
                weeks: { 1: "1w" },
                months: { 1: "1M" },
                years: null
            },
            symbolsInactive: [],
            nowProcessing: {
                symbolsQueue: [],
                symbol: "",
                symbolsReady: []
            },
            historicalProcessing: {
                symbolsQueue: symbols,
                symbol: "",
                periodStage: 0,
                symbolsReady: []
            }
        })
        values.save()
    } else {
        // symbols -> kaynaktan gelen semboller
        // data.symbols -> db'deki semboller

        const newlist = await arrDifference(data.symbols, symbols)
        const delist = await arrDifference(symbols, data.symbols)

        if (newlist.length > 0) {
            update = {
                $set: {
                    symbols: symbols
                }
            };
            let doc = await charting.findOneAndUpdate({}, update, {
                new: true,
                upsert: true, // Make this update into an upsert
            });
        }
        if (delist.length > 0) {
            update = {
                $set: {
                    symbols: symbols,
                    symbolsInactive: [...data.symbolsInactive, ...delist]
                }
            };
            let doc = await charting.findOneAndUpdate({}, update, {
                new: true,
                upsert: true, // Make this update into an upsert
            });
        }

        //a = ["ali", "veli", "cengiz", "oktay"]
        //b = ["veli", "cengiz", "oktay", "mert"]//(a,b) -> [ 'mert' ]
        //console.log(await arrDifference(a, b))
        //console.log(delist.length)

    }
}

module.exports = { chartingSymbols };