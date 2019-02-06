const MongoClient = require('mongodb').MongoClient;
const websocket = require('./lib/websocket');
const dateParser = require('date-and-time')

MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, client) {
  if (err) {
    throw err;
  }

  const database = client.db('co2');

  websocket.listen((rawData) => {

    const data = JSON.parse(rawData);
    const timestamp = new Date(data.date * 1000);
    const co2 = data.co2;

    const date = dateParser.format(timestamp, 'YYYY/MM/DD');
    const time = dateParser.format(timestamp, 'HH:mm:ss');

    console.log('save data', date, time, co2);
  });
});
