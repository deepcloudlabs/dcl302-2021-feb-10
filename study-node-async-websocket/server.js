let Websocket = require("ws");
const wsUrl = "wss://stream.binance.com:9443/ws/btcusdt@trade";
// WebSocket: Connection is always open!
//            Full dublex
//            req->res, publish/subscribe, ...
//            streaming (text, binary) -> Event-Driven (Domain Event)
let ws = new Websocket(wsUrl);
// Consuming REST over Websocket (Binance)
// Web Socket Client
ws.on('message', frame => {
    let trade = JSON.parse(frame);
    console.log(trade);
})

// HTTP: HD, req -> res, Connection Oriented,
// HTTP/2 (SSE: Server Sent Event)(Text, Push)
// HTTP/3
//       Connection is closed after response
// Consuming REST over Http (Binance)
// Http Client
let fetch = require("node-fetch");
let url = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
setInterval( () => {
    fetch(url).then( res => res.json())
              .then(ticker => console.log(ticker));
}, 1000)
