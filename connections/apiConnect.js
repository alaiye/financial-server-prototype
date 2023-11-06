require("dotenv").config();
const WebSocket = require("ws");
const socket = new WebSocket("ws://localhost:3001");
const Binance = require("binance-api-node").default;


const client = Binance();
// Authenticated client, can make signed calls
const client2 = Binance({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET,
  //getTime: Date.now(),
});
client.time().then((time) => console.log(time));

var wsSocket = new WebSocket(
    "wss://fstream.binance.com/stream?streams=ethusdt@kline_1m" //future
    //"wss://stream.binance.com:9443/ws/ethusdt@kline_5m"
    // {
    //   "e": "kline",         // Event type
    //   "E": 1672515782136,   // Event time
    //   "s": "BNBBTC",        // Symbol
    //   "k": {
    //     "t": 1672515780000, // Kline start time
    //     "T": 1672515839999, // Kline close time
    //     "s": "BNBBTC",      // Symbol
    //     "i": "1m",          // Interval
    //     "f": 100,           // First trade ID
    //     "L": 200,           // Last trade ID
    //     "o": "0.0010",      // Open price
    //     "c": "0.0020",      // Close price
    //     "h": "0.0025",      // High price
    //     "l": "0.0015",      // Low price
    //     "v": "1000",        // Base asset volume
    //     "n": 100,           // Number of trades
    //     "x": false,         // Is this kline closed?
    //     "q": "1.0000",      // Quote asset volume
    //     "V": "500",         // Taker buy base asset volume
    //     "Q": "0.500",       // Taker buy quote asset volume
    //     "B": "123456"       // Ignore
    //   }
    // }
  );


  wsSocket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    var resC = message.data;
    var candlestick = resC.k;
    var candlestickS = {
      //time: Date.now(),
      time: candlestick.t / 1000,
      open: candlestick.o,
      high: candlestick.h,
      low: candlestick.l,
      close: candlestick.c,
      //bollitime: { year: year, month: month, day: date },
      volume: candlestick.v, //value: candlestick.v, //yazıyordu
      color:
        candlestick.o < candlestick.c
          ? "rgba(0, 150, 136, 0.8)"
          : "rgba(250, 0, 0, 0.8)",
    };
    let results = JSON.stringify(candlestickS);
    socket.send(results);
  };


  const allPrices = async () => {
    const results = await client.futuresPrices();
    return results;
  };

  const candlestick = async (data) => {
    //const { symbol, interval } = data;
    //`https://api.binance.com/api/v3/klines?symbol=${data.symbol}&interval=${data.period}`
    const results = await client.futuresCandles({
      symbol: data.symbol,
      interval: data.period,
    });
    return results;
  };

// module.exports = { wsSocket, wsSocket2 };
module.exports = { wsSocket, candlestick, allPrices, client };