$(function() {
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
                    updateMessage('Draw 😐!')
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
}