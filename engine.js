const { priceUpdate } = require("./realtime/realTime");

const processRealtimePrice = async (period) => {
    let firstStart = true
    setInterval(() => {
      const date = new Date()
  
      priceUpdate(date, firstStart)
      firstStart = false
    }, period);
  }

  module.exports = { processRealtimePrice };