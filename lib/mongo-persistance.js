const MongoClient = require('mongodb').MongoClient

let collection = null

module.exports = {

  connect: (callback) => {
    MongoClient.connect('mongodb://127.0.0.1:27017/', (error, client) => {
      if (error) {
        return callback(error)
      }

      collection = client.db('co2').collection('readings')
      callback(null, client)
    })
  },

  save: (record) => {
    console.log('Saving:', record)
    return collection.insertOne(record)
  },

  load () {

  }
}
