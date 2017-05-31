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

router.get('/note', (req, res, next) => {
  res.redirect('/gnoter')
})

router.get('/triggeredbot', (req, res, next) => {
  res.redirect('https://www.facebook.com/triggeredbot/')
})

router.get('/login', (req, res, next) => {
  res.redirect('/users/login')
})

router.get('/signup', (req, res, next) => {
  res.redirect('/users/signup')
})

module.exports = router
