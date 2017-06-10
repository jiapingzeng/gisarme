var express = require('express')
var router = express.Router()

var game = {
  id: '',
  currentPlayer: 'X',
  gameOver: false,
  winner: '',
  board: {
    1: '', 2: '', 3: '',
    4: '', 5: '', 6: '',
    7: '', 8: '', 9: ''
  },
  winConditions: [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ],
  updateStatus: function() {
    if (this.checkWin()) {
      this.gameOver = true
      if (this.currentPlayer == 'X') {
        this.winner = 'O'
      } else {
        this.winner = 'X'
      }
    } else if (this.checkDraw()) {
      this.gameOver = true
    }
  },
  checkWin: function() {
    for (var i = 0; i < this.winConditions.length; i++) {
      var board = this.board
      var cond = this.winConditions[i]
      if (this.checkEqual(board[cond[0]], board[cond[1]], board[cond[2]])) {
        return true
      }
    }
    return false
  },
  checkDraw: function() {
    var board = this.board
    for (var i = 1; i <= 9; i++) {
      if(!board[i]) {
        return false
      }
    }
    return true
  },
  checkEqual: function() {
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i] == '' || arguments[i] != arguments[i - 1]) {
        return false
      }
    }
    return true
  },
  clearBoard: function() {
    var board = this.board
    for (var i = 1; i <= 9; i++) {
      board[i] = ''
    }
    this.gameOver = false
    this.winner = ''
  },
  play: function(cell) {
    var board = this.board
    if (!this.gameOver && board[cell] == '') {
      player = this.currentPlayer
      board[cell] = player
      if (player == 'X') {
        this.currentPlayer = 'O'
      } else {
        this.currentPlayer = 'X'
      }
      return true
    } else if (!this.checkDraw()) {
      if (this.currentPlayer == 'X') {
        this.winner = 'O'
      } else if (this.currentPlayer == 'O') {
        this.winner = 'X'
      }
    }
    return false
  }
}

router.get('/', (req, res, next) => {
  res.render('apps/tictactoe', { title: 'tic tac toe', board: game.board })
})

router.get('/index', (req, res, next) => {
  res.redirect('/')
})

router.post('/board', (req, res, next) => {
  game.updateStatus()
  res.status(200).send({ board: game.board, currentPlayer: game.currentPlayer, gameOver: game.gameOver, winner: game.winner })
})

router.post('/play', (req, res, next) => {
  if (game.play(req.body.cell)) {
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

router.post('/reset', (req, res, next) => {
  game.clearBoard()
  res.sendStatus(200)
})

module.exports = router