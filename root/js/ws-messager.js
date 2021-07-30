let webSocket = new WebSocket('ws://localhost:3000/ws');
webSocket.onmessage = async (m) => {
    let res;
    if(m.data.text) {
        res = await m.data.text();
    } else {
        res = await m.data;
    }
    console.log("WebSocket message " + res);
}
webSocket.onopen = function (event) {
    webSocket.send("Here's some text that the server is urgently awaiting!");
  };
function sendMessage() {
    webSocket.send("this is my message");
}
function killHeartbeat() {
    webSocket.send("kill heartbeat");
}