module.exports = function(io) {
  var express = require('express')
  var shortid = require('shortid')
  var router = express.Router()

  router.get('/', (req, res, next) => {
      res.render('apps/tictactoe', { title: 'tic tac toe' })
  })

  router.get('/index', (req, res, next) => {
    res.redirect('/')
  })

  var games = []

  var players = []

  io.on('connection', function(socket) {
    var playerId = shortid.generate()
    var player = {
      id: playerId,
      username: 'User ' + playerId
    }
    players[playerId] = player
    console.log(playerId + ' is connected')
    socket.emit('connected')
    
    socket.on('set username', function(data) {
      player.username = data.username
      socket.broadcast.emit('user connected', { player: player })
      console.log(player.id + ' is now named ' + player.username)
    })

    socket.on('send message', function(data) {
      data.player = player
      socket.emit('message', data)
      socket.broadcast.emit('message', data)
      console.log('sent message ' + data.message + ' from ' + data.player.username)
    })

    socket.on('new game', function(data) {
      var gameId = shortid.generate()
      var game = {
        id: gameId,
        board: {
          1: '', 2: 'O', 3: 'X',
          4: '', 5: 'O', 6: '',
          7: '', 8: '', 9: ''
        },
        players: [ player ]
      }
      games[gameId] = game
      socket.broadcast.emit('game created', { game: game })
    })
    
    socket.on('join game', function(data) {
      var game = games[data.game.id]
      if (game.players.length < 2) {
        game.players.push(playerId)
      }
    })

    socket.on('disconnect', function() {
      console.log(playerId + ' has disconnected')
      delete players[playerId]
      socket.broadcast.emit('user disconnected', { player: player })
    })
  })

  return router
}