$(window).ready(function () {
    //placeholder logick
    $('input.placeholderimit,textarea.placeholderimit').on('focus', hidePlace);
    $('input.placeholderimit,textarea.placeholderimit').on('blur', showPlace);
    function hidePlace() {$(this).parent().find('label.placeholderobj').hide();}
    function showPlace() { if ($(this)[0].value == '') { $(this).parent().find('label.placeholderobj').show(); } }

    //Radio Btn logick
    $('input[type=radio]').on('click', fadeforms);
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

        //When "Consumer" button is cheked. The attribute chacked set up 
        // after click event is fired!!!

        if ($('#mce-RADIOAREA-0').is(':checked')) {
            
            $('.hideJs').hide();
            //$('.hideJs').find('input').val('Consumer case');

            //remove red star for telephone label  
            $('input[name=PHONE]+label').addClass("nostar");

            //remove required attribute
            if ($('input[name=PHONE]').hasClass('required')) {
                $('input[name=PHONE]').removeClass("required");
                $('input[name=PHONE]').removeClass('error');
                $('input[name=PHONE]').parent().find('.error_msg').remove();
            }

                            
        } else {

            //add red star for telephone label  

            if ($('input[name=PHONE]+label').hasClass("nostar")) {
                $('input[name=PHONE]+label').removeClass("nostar");
            }

            //add class required 

            $('input[name=PHONE]').addClass("required");
        $('.hideJs').find('input').val('');
        $('.hideJs').show();
        $('.hideJs').each(function () {
            if ($(this)[0].value == '') { $(this).parent().find('label.placeholderobj').show(); }
        })
        }

    }
});