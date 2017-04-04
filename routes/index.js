var express = require('express')
var config = require('config')
var request = require('request')
var router = express.Router()

var SERVER_URL = (process.env.SERVER_URL) ? (process.env.SERVER_URL) : config.get('serverUrl')
var CALENDAR_ID = (process.env.CALENDAR_ID) ? (process.env.CALENDAR_ID) : config.get('calendarId')
var API_KEY = (process.env.API_KEY) ? (process.env.API_KEY) : config.get('apiKey')

/* GET home */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' })
})

router.get('/index', (req, res, next) => {
  res.redirect('/')
})

router.get('/get', (req, res, next) => {
  request({
    uri: SERVER_URL.replace('calendarId', CALENDAR_ID),
    qs: { key: API_KEY },
    method: 'GET'
  }, function(error, response, body) {
    if(!err && res.statusCode == 200) {
      res.send(body)
    } else {
      console.log('something went wrong')
    }
  })
})

module.exports = router
