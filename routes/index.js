var express = require('express')
var config = require('config')
var request = require('request')
var router = express.Router()

var GOOGLE_CALENDAR_SERVER_URL = (process.env.GOOGLE_CALENDAR_SERVER_URL) ? (process.env.GOOGLE_CALENDAR_SERVER_URL) : config.get('serverUrl')
var GOOGLE_CALENDAR_ID = (process.env.GOOGLE_CALENDAR_ID) ? (process.env.GOOGLE_CALENDAR_ID) : config.get('calendarId')
var GOOGLE_API_KEY = (process.env.GOOGLE_API_KEY) ? (process.env.GOOGLE_API_KEY) : config.get('apiKey')

/* GET home */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' })
})

router.get('/index', (req, res, next) => {
  res.redirect('/')
})

router.get('/get', (req, res, next) => {
  request({
    uri: GOOGLE_CALENDAR_SERVER_URL.replace('calendarId', GOOGLE_CALENDAR_ID),
    qs: { key: GOOGLE_API_KEY },
    method: 'GET'
  }, function(error, response, body) {
    if(!error && res.statusCode == 200) {
      res.send(body)
    } else {
      console.log('something went wrong')
    }
  })
})

module.exports = router
