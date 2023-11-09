const { realTimes } = require("../databases/mongoDb");
const { seconD, minutE, houR } = require("./dbTimer");

const insertRealTimePrice = async (data, firstStart) => {
    const { platform, section, symbol, price, date } = data;
    //console.log(date.getSeconds())
  
    let doc1 = await realTimes.findOne({ platform: platform, section: section, symbol: symbol });
    const processVal = {
      price: price,
      date: date,
      doc1: doc1
    }
  
    let second = date.getSeconds()
    let min = date.getMinutes()
    let hour = date.getHours()
  
    let jSecond, jMinute, jHour
    let boolM = false
    let boolH = false
    jSecond = seconD(processVal)
    if (second == 0) {
      boolM = true
      jMinute = minutE(processVal)
    }
    if (second == 0 && min == 0) {
      boolH = true
      jHour = houR(processVal)
    }
    //console.log(jSecond)
    let update = {}
  
    if (doc1 == null) {
      if (boolM == false && boolH == false) {
        update = {
          $set: {
            second: { ...jSecond }
          }
        };
      } else if (boolM == true && boolH == false) {
        update = {
          $set: {
            second: { ...jSecond },
            minute: { ...jMinute }
          }
        };
      } else if (boolM == true && boolH == true) {
        update = {
          $set: {
            second: { ...jSecond },
            minute: { ...jMinute },
            hour: { ...jHour }
          }
        };
      }
    } else {
      if (boolM == false && boolH == false) {
        update = {
          $set: {
            second: { ...doc1.second, ...jSecond }
          }
        };
      } else if (boolM == true && boolH == false) {
        update = {
          $set: {
            second: { ...doc1.second, ...jSecond },
            minute: { ...doc1.minute, ...jMinute }
          }
        };
      } else if (boolM == true && boolH == true) {
        update = {
          $set: {
            second: { ...doc1.second, ...jSecond },
            minute: { ...doc1.minute, ...jMinute },
            hour: { ...doc1.hour, ...jHour }
          }
        };
      }
    }
  
  
  
    const filter = { platform: platform, section: section, symbol: symbol };
    let doc = await realTimes.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true, // Make this update into an upsert
    });
    //doc = await realTimePrices.findOne({ symbol: 'BTCUSDT' });
    //if (doc != null) {
    //console.log(doc.symbol, " -> ", doc.second.s2);
    //} else console.log("yok")
    //A sayısından B sayısına değişim yüzdesini bulmak için: ((B-A)/A)x100
  }

  module.exports = { insertRealTimePrice };