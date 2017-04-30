$('#help-button-collapse').click(function () {
    $('#help-content').slideToggle('slow', function () {
        if ($('#help-button-down').hasClass('help-button-hidden')) {
            $('#help-button-up').addClass('help-button-hidden');
            $('#help-button-up').hide();
            $('#help-button-down').removeClass('help-button-hidden');
            $('#help-button-down').show();
        } else {
            $('#help-button-down').addClass('help-button-hidden');
            $('#help-button-down').hide();
            $('#help-button-up').removeClass('help-button-hidden');
            $('#help-button-up').show();
        }
    });
});

function get() {
    if ($('input#key').val().length >= 5) {
        $.ajax({
            url: window.location.origin + '/app/note/get',
            type: 'POST',
            data: JSON.stringify({
                key: $('input#key').val(),
                passcode: $('input#passcode').val()
            }),
            processData: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success: function (data) {
                if (data.status) {
                    $('textarea#content').val(data.content);
                    $('textarea#content').trigger('autoresize');
                    $('textarea#content').focus();
                    $('#response').html('<span><i class="fa fa-check-circle fa-3x green-text" aria-hidden="true"></i> ' + data.message + '</span>');
                } else {
                    $('#response').html('<span><i class="fa fa-exclamation-circle fa-3x orange-text" aria-hidden="true"></i> ' + data.message + '</span>');
                }
            }
        });
    } else {
        $('#response').html('<span><i class="fa fa-refresh fa-spin fa-2x fa-fw prefix"></i> Key must be at least 5 characters long</span>');
    }
}

function check() {
    if ($('input#key').val().length >= 5) {
        $.ajax({
            url: window.location.origin + '/app/note/check',
            type: 'POST',
            data: JSON.stringify($('input#key').val()),
            processData: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success: function (data) {
                if (data.status) {
                    $('#response').html('<span><i class="fa fa-check-circle fa-3x green-text" aria-hidden="true"></i> ' + data.message + '</span>');
                } else {
                    $('#response').html('<span><i class="fa fa-times-circle fa-3x red-text" aria-hidden="true"></i> ' + data.message + '</span>');
                }
            }
        });
    } else {
        $('#response').html('<span><i class="fa fa-exclamation-circle fa-3x orange-text" aria-hidden="true"></i> Key must be at least 5 characters long</span>');
    }
}

$(function () {
    // buttons
    $('a#submit').click(function () {
        $('#note-form').trigger('submit');
    });
    $('a#update').click(get());
    $('a#clear').click(function () {
        $('#note-form').trigger('reset');
        $('textarea#content').trigger('autoresize');
        $('input#key').focus();
    });

    // check
    $('input#key').keyup(check);

    // get
    $('input#key').change(get);
    $('input#passcode').change(get);

    // update
    $('#note-form').submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: window.location.origin + '/app/note/save',
            type: 'POST',
            data: JSON.stringify({
                key: $('input#key').val(),
                passcode: $('input#passcode').val(),
                content: $('textarea#content').val()
            }),
            processData: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success: function (data) {
                if (data.status) {
                    $('#response').html('<span><i class="fa fa-check-circle fa-3x green-text" aria-hidden="true"></i> ' + data.message + '</span>');
                    Materialize.toast(data.message, 4000);
                } else {
                    $('#response').html('<span><i class="fa fa-times-circle fa-3x red-text" aria-hidden="true"></i> ' + data.message + '</span>');
                }
            },
            error: function () {
                $('#response').html('<span><i class="fa fa-check-circle fa-3x red-text" aria-hidden="true"></i> Server is not responding. Please try again later!</span>');
            }
        });
    });
});