const websocket = require('./lib/websocket');
const dateParser = require('date-and-time')
const mongoPersistance = require('./lib/mongo-persistance');

exports.default = () => {
    mongoPersistance.connect(function(err, client) {
    if (err) {
      throw err;
    }

    websocket.listen((rawData) => {

      const data = JSON.parse(rawData);
      const timestamp = new Date(data.date * 1000);
      const co2 = data.co2;
      const date = dateParser.format(timestamp, 'YYYY/MM/DD');
      const time = dateParser.format(timestamp, 'HH:mm:ss');
      const record = { date, time, co2 }

      mongoPersistance.save(record).catch((error) => {
        console.log('Error:', error);
      });
    });
  });
};
