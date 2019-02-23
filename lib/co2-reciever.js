const websocket = require('./websocket');
const dateParser = require('date-and-time')
const mongoPersistance = require('./mongo-persistance');

module.exports = () => {
    mongoPersistance.connect(function(err, client) {
    if (err) {
      throw err;
    }

    websocket.listen((rawData) => {

      const data = JSON.parse(rawData);
      const timestamp = new Date(data.date * 1000);
      const co2 = data.co2;
      const record = { timestamp, co2 }

      mongoPersistance.save(record).catch((error) => {
        console.log('Error:', error);
      });
    });
  });
};
