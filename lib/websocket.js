const WebSocket = require('ws');

const socketServer = new WebSocket.Server({ port: 8080 });
console.log('Server running on ws://localhost:8080');

const webSocket = {
  listen(callback) {
    socketServer.on('connection', (ws) => {
      ws.on('message', callback);
    });
  }
}

module.exports = webSocket;
