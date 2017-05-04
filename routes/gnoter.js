var assert = require('assert')
var config = require('config')
var express = require('express')
var router = express.Router()

/* var connectionString = (process.env.CONNECTION_STRING) ? (process.env.CONNECTION_STRING) : config.get('connectionString')
var mongo = require('mongodb').MongoClient

mongo.connect(connectionString, function(err, db) {
  assert.equal(null, err)
  console.log('connected')

  db.createCollection('gnotes', {
    validator: {
      $or: [
        { key: { $type: "string" } },
        { content: { $type: "string" } },
        { passcode: { $type: "string" } }
      ]
    }
  })

  insert(db, function() {
    index(db, function() {
      db.close()
    })
  })
})

var insert = function(db, cb) {
  var collection = db.collection('docs')
  collection.insertMany([
    {a: 1},
    {a: 2},
    {a: 3}
  ], function(err, result) {
    assert.equal(err, null)
    assert.equal(3, result.result.n)
    assert.equal(3, result.ops.length)
    console.log('inserted')
    cb(result)
  })
}

var find = function(db, cb) {
  var collection = db.collection('docs')
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null)
    console.log('found:')
    console.log(docs)
    cb(docs)
  })
}

var update = function(db, cb) {
  var collection = db.collection('docs')
  collection.updateOne({a: 2}, { $set: {b: 1}}, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log('updated')
    cb(result)
  })
}

var remove = function(db, cb) {
  var collection = db.collection('docs')
  collection.deleteOne({a: 3}, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log('removed')
    cb(result)
  })
}

var index = function(db, cb) {
  db.collection('docs').createIndex({a: 1}, null, function(err, results) {
    console.log(results)
    cb()
  })
}
*/

router.get('/', (req, res, next) => {
  res.render('gnoter', { title: 'GNOTER' })
})

router.get('/index', (req, res, next) => {
  res.redirect('/')
})

module.exports = router