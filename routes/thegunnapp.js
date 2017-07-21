var config = require('config')
var express = require('express')
var fs = require('fs')
var moment = require('moment')
var path = require('path')
var request = require('request')
var router = express.Router()

var serverUrl = (process.env.GOOGLE_CALENDAR_SERVER_URL) ? (process.env.GOOGLE_CALENDAR_SERVER_URL) : config.get('serverUrl')
var calendarId = (process.env.GOOGLE_CALENDAR_ID) ? (process.env.GOOGLE_CALENDAR_ID) : config.get('calendarId')
var apiKey = (process.env.GOOGLE_API_KEY) ? (process.env.GOOGLE_API_KEY) : config.get('apiKey')

router.get('/', (req, res, next) => {
    res.redirect('thegunnapp/today')
})

router.get('/index', (req, res, next) => {
    res.redirect('/thegunnapp')
})

router.get('/today', (req, res, next) => {
    getToday(function (today) {
        res.render('apps/thegunnapp', { title: 'TheGunnApp', data: today, moment: moment, format: formatSchedule })
    }, function () {
        console.log('oi not like dis')
        res.sendStatus(500)
    })
})

router.get('/list', (req, res, next) => {
    getSchedule(function (calendar) {
        res.render('apps/thegunnapp', { title: 'TheGunnApp', data: calendar, moment: moment, format: formatSchedule })
    }, function () {
        console.log('crap something happened')
        res.sendStatus(500)
    })
})

router.post('/list', (req, res, next) => {
    getSchedule(function (calendar) {
        res.send(calendar)
    }, function () {
        console.log('done with yo shit')
        res.sendStatus(500)
    })
})

/*
router.get('/post', (req, res, next) => {
    getCalendar(function() {
        console.log('sending file')
        res.sendFile(path.resolve('public/data/thegunnapp.json'))
    }, function() {
        console.log('error')
    })    
})
*/

function copy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? copy(v) : v;
    }
    return output;
}

function getCalendar(cb, err) {
    request({
        uri: serverUrl.replace('calendarId', calendarId),
        qs: {
            key: apiKey,
            singleEvents: true,
            orderBy: "startTime",
            timeMin: moment().format()
        },
        method: 'GET'
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('successfully retrived calendar')
            cb(body)
            //fs.writeFile(__dirname + '/../public/data/thegunnapp.json', body.trim(), cb(error, response, body))
        } else {
            console.log('retriving calendar failed')
            err()
        }
    })
}

function getSchedule(cb, err) {
    getCalendar(function (body) {
        var data = JSON.parse(body.trim())
        var calendar = copy(data)
        calendar.items = []
        for (var i = 0; i < data.items.length; i++) {
            var event = data.items[i]
            if (event.summary && event.summary.toLowerCase().includes('schedule')) {
                calendar.items.push(event)
            }
        }
        cb(calendar)
    }, err)
}

function getToday(cb, err) {
    getSchedule(function (schedule) {
        var today = copy(schedule)
        today.items = []
        var date = moment().format('YYYY-MM-DD')
        for (var i = 0; i < schedule.items.length; i++) {
            var event = schedule.items[i]
            if (event.start.date == date) {
                today.items.push(event)
            }
        }
        cb(today)
    }, err)
}

function formatSchedule(s) {
    var a = []
    var l = 0
    for (var i = 0; i < s.length; i++) {
        if (s[i] == ')') {
            a.push(s.substring(l, i + 1))
            l = i + 1
        }
    }
    for (var i = 0; i < a.length; i++) {
        var b = a[i]
        var time = b.substring(b.indexOf('(') + 1, b.length - 1)
        var name = i == 0 ? b.substring(0, b.indexOf('(') - 1) : b.substring(1, b.indexOf('(') - 1)
        a[i] = time + '|' + name
    }
    return a
}

formatSchedule("Period A Final (8:30-10:10) Brunch (10:10-10:25) Period C Final (10:30-12:10) Lunch (12:10-12:40) Period G Final (12:45-2:25)")

module.exports = router
