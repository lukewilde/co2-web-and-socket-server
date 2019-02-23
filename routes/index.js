const express = require('express')
const co2Persistance = require('../lib/co2-persistance')

const router = express.Router()

router.get('/', function (req, res, next) {
  co2Persistance.load((error, co2Data) => {
    if (error) {
      console.error('Error loading co2 results', error)
    }

    res.render('index', { co2Data })
  })
})

module.exports = router
