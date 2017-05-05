var assert = require('assert')
var bodyParser = require('body-parser')
var config = require('config')
var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

var connectionString = (process.env.CONNECTION_STRING) ? (process.env.CONNECTION_STRING) : config.get('connectionString')
mongoose.connect(connectionString, function(err) {
  if (err) {
    throw err
  }
  console.log('connected')
})

var Gnote = require('../models/gnote.js')

router.get('/', (req, res, next) => {
  var key = req.param('key')
  var passcode = req.param('passcode')
  res.render('gnoter', { title: 'GNOTER' })
})

router.get('/index', (req, res, next) => {
  res.redirect('/')
})

router.post('/get', (req, res, next) => {
  Gnote.find({ key: req.body.key }, function(err, data) {
    if (err) {
      res.status(404).send({ error: 'key does not exist'})
    }
    var gnote = data[0]
    if (req.body.passcode || gnote.passcode) {
      if (req.body.passcode == gnote.passcode) {
        res.send(gnote)
      } else {
        res.status(401).send({ error: 'key or passcode is incorrect' })
      }
    } else {
      res.send(gnote)
    }
  })
})

router.post('/save', (req, res, next) => {
  var gnote = new Gnote(req.body)
  gnote.save(function(err) {
    if (err) {
      console.log(err.message)
      res.status(500).send({ error: 'key alreay in use' })
    } else {
      res.status(200)
    }
  })
})

module.exports = router