var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' })
})

router.get('/index', (req, res, next) => {
  res.redirect('/')
})

router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About' })
})

router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact' })
})

module.exports = router
