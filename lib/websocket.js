const WebSocket = require('ws')

const socketServer = new WebSocket.Server({ port: 8080 })
console.log('Websocket running on ws://localhost:8080')

const webSocket = {
  listen (callback) {
    socketServer.on('connection', (ws) => {
      ws.on('message', callback)
    })
  },

  send (data) {
    socketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  }
}

module.exports = webSocket
