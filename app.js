var config = require('config')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

/*
var schedule = require('node-schedule')

var TWILIO_ACCOUNT_SID = (process.env.TWILIO_ACCOUNT_SID) ? (process.env.TWILIO_ACCOUNT_SID) : config.get('accountSid')
var TWILIO_AUTH_TOKEN = (process.env.TWILIO_AUTH_TOKEN) ? (process.env.TWILIO_AUTH_TOKEN) : config.get('authToken')
var TWILIO_FROM_NUMBER = (process.env.TWILIO_FROM_NUMBER) ? (process.env.TWILIO_FROM_NUMBER) : config.get('fromNumber')
var TWILIO_TO_NUMBER = (process.env.TWILIO_TO_NUMBER) ? (process.env.TWILIO_TO_NUMBER) : config.get('toNumber')

var twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
*/

var index = require('./routes/index')
var gnoter = require('./routes/gnoter')
var thegunnapp = require('./routes/thegunnapp')
var users = require('./routes/users')

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/gnoter', gnoter)
app.use('/thegunnapp', thegunnapp)
app.use('/users', users)

/*
var spam = schedule.scheduleJob('0 0 * * * *', function() {
  console.log('!')
  twilio.messages.create({
    to: TWILIO_TO_NUMBER,
    from: TWILIO_FROM_NUMBER,
    body: "This is a spam message. Thank you for reading and expect another one in an hour."
  }, function(error, message) {
    console.log(message.sid)
  })
})
*/

app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
