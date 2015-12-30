$(window).ready(function () {
    //placeholder logick
    $('input.placeholderimit,textarea.placeholderimit').on('focus', hidePlace);
    $('input.placeholderimit,textarea.placeholderimit').on('blur', showPlace);
    function hidePlace() {$(this).parent().find('label.placeholderobj').hide();}
    function showPlace() { if ($(this).val() == '') { $(this).parent().find('label.placeholderobj').show(); } }

    //Radio Btn logick
    $('input[type=radio]').on('click', fadeforms);
    $('#citygroup input[type=checkbox],#citygroup input[type=checkbox]+label').on('click', cityAnable);
    function cityAnable() {
        if ($('.mainChina,.mainChina+label').is(':checked')) {
            document.getElementById('mce-NCITY').removeAttribute('disabled');
            $('#mce-NCITY').addClass('required');
            if ($('#mce-NCITY').val() == "") {
                //$('#mce-NCITY + label').show();
            }
        } else {
            document.getElementById('mce-NCITY').setAttribute('disabled', 'disabled');
            $('#mce-NCITY').removeClass('required');
            $('#mce-NCITY').val("");
            //$('#mce-NCITY + label').hide();
        }
    }
    function fadeforms() {
        if ($('#preHide').css('display') == 'none') {
            $('#preHide').css('display', 'block');
            $('#contactForm').removeClass('botOffset');
        }

        //When "Consumer" button is cheked. The attribute chacked set up 
        // after click event is fired!!!

        if ($('#mce-RADIOAREA-0').is(':checked')) {

            $('.hideJs').hide();
            //auto fill need to pass validation of hiden required fields. when consumer checked hiden fields woudnt include to JSON object
            $('.hideJs').find('input').attr('value', 'Consumer case');

            //remove red star for telephone label  
            $('input[name=PHONE]+label').addClass("nostar");

            //remove required attribute
            if ($('input[name=PHONE]').hasClass('required')) {
                $('input[name=PHONE]').removeClass("required");
                $('input[name=PHONE]').removeClass('error');
                $('input[name=PHONE]').removeClass('invalid');
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
    

    $('input#mce-FNAME, input#mce-LNAME, input#mce-EMAIL, input#mce-NCITY').on('change', function () {

       
        var id = $(this).attr('id');
        var val = $(this).val();

      
        switch (id) {

            //check Fname
            case 'mce-FNAME':
                var pattern_name = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;

                if (val.length > 2 && val != '' && pattern_name.exec(val)) {
                    $(this).addClass('not_error');
                   
                }
                else {
                    $(this).removeClass('not_error').addClass('error_msg');
                   
                }
                break;

            //check Lname
            case 'mce-LNAME':
                var pattern_name = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;

                if (val.length > 2 && val != '' && pattern_name.exec(val)) {
                    $(this).addClass('not_error');

                }
                else {
                    $(this).removeClass('not_error').addClass('error_msg');

                }
                break;


                //check email
            case 'mce-EMAIL':
                var pattern_email = /^^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
                if (val != '' && pattern_email.exec(val)) {
                    $(this).addClass('not_error');
                   
                }
                else {
                    $(this).removeClass('not_error').addClass('error_msg');
                   
                }
                break;


                // check city
            //case 'mce-NCITY':
            //    if (val.length > 2 && val != '' && pattern_city(val)) {
            //        $(this).addClass('not_error');

            //    }
            //    else {
            //        $(this).removeClass('not_error').addClass('error_msg');

            //    }
            //    break;


        } // end switch

    }); // end blur()

    $("form#mc-embedded-subscribe-form").submit(function (e) {

        if ($('.not_error').length !== 3)
        {
            return false;
        }
    })

});