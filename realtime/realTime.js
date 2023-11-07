const { pricesAndSymbols } = require("../connections/apiConnect");
const { objKeys } = require("../components/objKeys")

const priceUpdate = async (date, firstStart) => {
    //her 3 saniyeye 1 kontrol ediliyor
    if (date.getSeconds() % 3 == 0) {
        const prices_symbols = await pricesAndSymbols();
        let symbols = await objKeys(prices_symbols, filter = "USDT");
        for (let i = 0; i < symbols.length; i++) {
            text += symbols[i] + "<br>";
            //console.log(symbols[i])
            //console.log(deger[symbols[i]])
            var data = {
                platform: "binance",
                section: "futures",
                symbol: symbols[i],
                price: prices_symbols[symbols[i]],
                date: date
            }

            //insertRealTimePrice(data, firstStart)

        }
    }
}

module.exports = { priceUpdate };