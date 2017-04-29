var config = require('config')
var express = require('express')
var pg = require('pg')
var router = express.Router()

/*
var connectionString = (process.env.CONNECTION_STRING) ? (process.env.CONNECTION_STRING) : config.get('connectionString')

pg.connect(connectionString, function(err, client, next) {
  if (err) {
    return console.error(':(', err)
  }
  client.query('', function(err, result) {
    next()
    if (err) {
      return console.error(':\'(', err)
    }
    console.log(result.rows[0])
    process.exit(0)
  })
})
*/
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' })
})

router.get('/index', (req, res, next) => {
  res.redirect('/')
})

module.exports = router