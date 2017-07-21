var express = require('express')
var passport = require('passport')
var router = express.Router()

require('../auth.js')(passport)

router.get('/login', (req, res, next) => {
    res.render('login', { message: req.flash('loginMessage') })
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/signup', (req, res, next) => {
    res.render('signup', { message: req.flash('signupMessage') })
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
}))

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile', { user: req.user })
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

module.exports = router
