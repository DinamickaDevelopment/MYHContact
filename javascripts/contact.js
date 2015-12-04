﻿$(window).ready(function () {
    //placeholder logick
    $('input.placeholderimit,textarea.placeholderimit').on('focus', hidePlace);
    $('input.placeholderimit,textarea.placeholderimit').on('blur', showPlace);
    function hidePlace() {$(this).parent().find('label.placeholderobj').hide();}
    function showPlace() { if ($(this)[0].value == '') { $(this).parent().find('label.placeholderobj').show(); } }

    //Radio Btn logick
    $('input[type=radio],input[type=radio]+label').on('click', fadeforms);
    $('#citygroup input[type=checkbox],#citygroup input[type=checkbox]+label').on('click', cityAnable);
    function cityAnable() {
        if ($('.mainChina,.mainChina+label').is(':checked')) {
            document.getElementById('mce-NCITY').removeAttribute('disabled');
            $('#mce-NCITY').addClass('required');
        } else {
            document.getElementById('mce-NCITY').setAttribute('disabled', 'disabled');
            $('#mce-NCITY').removeClass('required');
        }
    }
    function fadeforms() {
        if ($('#preHide').css('display') == 'none') {
            $('#preHide').css('display', 'block');
            $('.tempMargin').css('margin-bottom','0')
        }
        if ($('#mce-RADIOAREA-0').is(':checked')) {
            $('.hideJs').hide();
            $('.hideJs').find('input').val('Consumer case');
        } else {
        $('.hideJs').find('input').val('');
        $('.hideJs').show();
        $('.hideJs').each(function () {
            if ($(this)[0].value == '') { $(this).parent().find('label.placeholderobj').show(); }
        })
        }

    }
});