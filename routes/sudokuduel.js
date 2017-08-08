module.exports = function (io) {
    var express = require('express')
    var shortid = require('shortid')
    var sudoku = require('sudoku')

    var router = express.Router()

    router.get('/', (req, res, next) => {
        res.render('apps/sudokuduel', { title: 'Sudokul Duel' })
    })

    router.get('/index', (req, res, next) => {
        res.redirect('/sudokuduel')
    })

    function normalizePuzzle (puzzle) {
        var fixed = []
        for (var i = 0; i < puzzle.length; i++) {
            if (puzzle[i] != null) {
                fixed[i] = puzzle[i] + 1
            }
        }
        return fixed
    }
    
    var games = []

    var players = []

    io.on('connection', function (socket) {
        var playerId = shortid.generate()
        var player = {
            id: playerId,
            username: 'User ' + playerId
        }
        players[playerId] = player
        console.log(playerId + ' is connected')
        socket.emit('connected')

        socket.on('set username', function (data) {
            player.username = data.username
            socket.broadcast.emit('user connected', { player: player })
            console.log(player.id + ' is now named ' + player.username)
        })

        socket.on('send message', function (data) {
            data.player = player
            socket.emit('message', data)
            socket.broadcast.emit('message', data)
            console.log('sent message ' + data.message + ' from ' + data.player.username)
        })

        socket.on('create game', function (data) {
            var gameId = shortid.generate()
            var game = {
                id: gameId,
                players: [player],
                spectators: []
            }
            console.log('game ' + gameId + ' is created')
            games[gameId] = game
            socket.join(game.id)
            socket.emit('game created', { game: game, player: player })
        })

        socket.on('join game', function (data) {
            console.log('attempting to join game ' + data.id)
            if (games[data.id]) {
                var game = games[data.id]
                socket.join(game.id)
                if (game.players.length < 2) {
                    console.log('adding player')
                    game.players.push(playerId)
                    socket.emit('game joined', { player: player })
                    socket.emit('player joined', { player: game.players[0] })
                    socket.broadcast.to(game.id).emit('player joined', { player: player })
                } else {
                    console.log('adding spectator')
                    game.spectators.push(playerId)
                    socket.broadcast.to(game.id).emit('spectator joined', { player: player })
                }
            } else {
                console.log('game not found')
                socket.emit('join failed')
            }
        })

        socket.on('start game', function (data) {
            console.log('starting game ' + data.id)
            if (games[data.id]) {
                var game = games[data.id]
                if (!game.board) {
                    console.log('making puzzle')
                    var puzzle = sudoku.makepuzzle()
                    game.board = normalizePuzzle(puzzle)
                    game.solution = normalizePuzzle(sudoku.solvepuzzle(puzzle))
                }
                socket.emit('game started', { game: game })
                socket.broadcast.to(game.id).emit('game started', { game: game })
            }
        })

        socket.on('disconnect', function () {
            console.log(playerId + ' has disconnected')
            delete players[playerId]
            socket.broadcast.emit('user disconnected', { player: player })
        })
    })

    return router
}