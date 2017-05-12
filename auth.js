var LocalStrategy = require('passport-local').Strategy
var User = require('./models/user')

module.exports = function(passport) {
    passport.serializeUser(function(user, next) {
        next(null, user.id)
    })

    passport.deserializeUser(function(id, next) {
        User.findById(id, function(err, user) {
            next(err, user)
        })
    })

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, next) {
        process.nextTick(function() {
            User.findOne({ 'local.email': email }, function(err, user) {
                if (err) {
                    return next(err)
                }
                if (user) {
                    return next(null, false, req.flash('signupMessage', 'Email unavailable'))
                } else {
                    var user = new User()
                    user.local.email = email
                    user.local.password = user.generateHash(password)
                    user.save(function(err) {
                        if (err) {
                            throw err
                        }
                        return next(null, user)
                    })
                }
            })
        })
    }))

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, next) {
        User.findOne({ 'local.email': email }, function(err, user) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return next(null, false, req.flash('loginMessage', 'User not found'))
            }
            if (!user.validPassword(password)) {
                return next(null, false, req.flash('loginMessage', 'Wrong password'))
            }
            return next(null, user)
        })
    }))
}