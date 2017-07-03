/*$(function() {
    get()
})

$('.cell').on('click', function() {
    play($(this).attr('id'))
})

$('#reset').on('click', function() {
    reset()
})


function get() {
    $.ajax({
        url: window.location.origin + '/tictactoe/board',
        type: 'POST',
        success: function(data) {
            updateBoard(data.board)
            if (data.gameOver) {
                if (data.winner) {
                    updateMessage(data.winner.replace('X', '😡').replace('O', '💩') + ' wins!')
                } else {
                    updateMessage('Draw! 😐')
                }
            } else {
                updateMessage(data.currentPlayer.replace('X', '😡').replace('O', '💩') + '\'s turn')
            }
        }
    })
}

function play(cell) {
    $.ajax({
        url: window.location.origin + '/tictactoe/play',
        type: 'POST',
        data: JSON.stringify({
            cell: cell
        }),
        processData: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        complete: function() {
            get()
        }
    })
}

function reset() {
    $.ajax({
        url: window.location.origin + '/tictactoe/reset',
        type: 'POST',
        success: function() {
            get()
        }
    })
}

function updateBoard(board) {
    for(var i = 1; i < 10; i++) {
        $('td#' + i).text(board[i].replace('X', '😡').replace('O', '💩'))
    }
}

function updateMessage(message) {
    $('#message').text(message)
}*/

$(function() {
    var socket = io()
    socket.on('connected', function(data) {
        console.log('connected to server')
        //$('#activities').append('<li>You have connected</li>')
        addMessage('You have connected')
    })
    socket.on('user connected', function(data) {
        addMessage(data.player.username + ' is connected')
    })
    socket.on('user disconnected', function(data) {
        addMessage(data.player.username + ' has disconnected')
    })
    socket.on('message', function(data) {
        addMessage(data.player.username + ': ' + data.message)
    })
    socket.on('game created', function(data) {
        console.log(data.game.id)
        updateBoard(data.game.board)
    })

    function addMessage(m) {
        var a = $('#activities')
        a.append('<li class="collection-item">' + escapeTags(m) + '</li>')
        a.scrollTop(a[0].scrollHeight)
    }    
    function escapeTags(m) {
        return m.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
    function updateBoard(board) {
        for(var i = 1; i < 10; i++) {
            $('td#' + i).text(board[i].replace('X', '😡').replace('O', '💩'))
        }
    }

    var hasUsername = false

    $('#input').keydown(function(e) {
        if (e.which == 13) {
            var val = $('#input').val()
            e.preventDefault()
            if (hasUsername) {
                if (val.trim()) {
                    socket.emit('send message', { message: val })
                }
            } else {
                socket.emit('set username', { username: val })
                addMessage('You have set your name to ' + val)
                $('#input').attr('placeholder', 'enter message')
                hasUsername = true
            }
            $('#input').val('')
        }
    })
})