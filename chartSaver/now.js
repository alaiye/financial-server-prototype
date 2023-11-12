const { charting, candleSeries } = require("../databases/mongoDb");
const { objKeys } = require("../components/objKeys")
const { client } = require("../connections/apiConnect")

const chartNowSaver = async (period) => {

    conf = {
        platform: "binance",
        section: "futures",
        symbol: "BTCUSDT",
        period: "8h"
    }

    const date = new Date()         //date :        2023-09-23T17:45:01.038Z
    let startTime = Date.now()      //startTime :   1695491103042
    let second = date.getSeconds()  //0 to 59
    let minute = date.getMinutes()  //0 to 59
    let hour = date.getHours()      //0 to 23
    let day = date.getDate()        //1-31 ay
    let week = date.getDay()        //0-6 haftanın günü
    let month = date.getMonth()     //0 to 11
    let year = date.getFullYear();  //2023
    if (second == 0) {
        await chartingCheckNow(minute, "minutes")
        if (minute = 0) {
            await chartingCheckNow(hour, "hours")
            if (hour = 0) {
                await chartingCheckNow(day, "days")
                if (day = 1) {
                    await chartingCheckNow(week, "weeks")
                    if (week = 1) {
                        await chartingCheckNow(month, "months")
                        //if (month = 1) {
                        //  await chartingCheck(year, "years")
                        //}
                    }
                }
            }
        }
    }
}

const chartingCheckNow = async (time, act) => {
    let doc1 = await charting.findOne();
    if (doc1?.selectedSymbols?.length > 0) {
        console.log(doc1.selectedSymbols)
        const val = doc1.selectedPeriods[act]//act : "minutes, hours..."
        let periods = await objKeys(val, filter = "");
        for (let symbol of doc1.selectedSymbols) { //for (let i = 0; i < doc1.selectedSymbols.length; i++) {
            console.log(symbol)
            periods.forEach(async (period, index) => {//for (let j = 0; j < periods.length; j++) { kullanılırsa senkron çalışıyor
                if (time % period == 0) {
                    console.log(time + " --- " + period + " >>> " + val[period])
                    //await chartingSave(doc1.platform, doc1.section, symbol, val[period])
                }
            });//}
        }
        console.log("bitti")
    }
}