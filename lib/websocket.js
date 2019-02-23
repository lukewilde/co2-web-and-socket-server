const WebSocket = require('ws')

const socketServer = new WebSocket.Server({ port: 8080 })
console.log('Websocket running on ws://localhost:8080')

let websocket = null

const webSocket = {
  listen (callback) {
    socketServer.on('connection', (ws) => {
      websocket = ws
      ws.on('message', callback)
    })
  },

  send (data) {
    websocket.send(JSON.stringify(data))
  }
}

module.exports = webSocket
