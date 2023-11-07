const express = require("express");
const app = express();
var cors = require("cors");
const WebSocket = require("ws");
const server = require("http").createServer(app);

const { processRealtimePrice } = require("./engine");// işlem merkezi
processRealtimePrice(1000)

const wss = new WebSocket.Server({ server: server });
wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  //ws.send('Welcome New Client!');

  ws.on("message", function incoming(message) {
    //console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(String(message));
        //console.log('received---: %s', message);
      }
    });
  });
});

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(3001, () => console.log(`Lisening on port :3001`));