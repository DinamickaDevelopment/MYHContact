$(window).ready(function () {
    if ($('html').prop('lang') == 'CN') {
        CNversion = true
    } else {
        CNversion = false;
    }
    $('#mc-embedded-subscribe-form input').on('change', checkReq);
    //Submit eventon the contact form 
    $('#mc-embedded-subscribe-form').on('submit',mailSend)
    var MailInProgres = false;
    function checkReq() {//Function for validation form
        if ($(this).hasClass('required')) {

            ////////////////////////////////////////////////// first name regexp
            if ($(this).prop('name') == 'FNAME')
            { // if it is first name
                if ($(this).val().match(/^[-'a-z\u4e00-\u9eff]{1,20}$/igm) == null && $(this).val() !== '')
                {

                    if ($(this).hasClass('error')) {
                        $(this).removeClass('error');
                        $(this).parent().find('.error_msg').remove();
                    }

                    if (!$(this).hasClass('invalid')) // add invalid class, because inout has test, but regexp without matches 
                    {
                        $(this).addClass('invalid');
                        if (CNversion) { // Chanise version
                            $(this).parent().append('<div class="error_msg">请正确填写您的名字。</div>');
                        }
                        else {// English version
                            $(this).parent().append('<div class="error_msg">This first name is invalid.</div>');
                        }
                    }
                }
                else if ($(this).val().match(/^[-'a-z\u4e00-\u9eff]{1,20}$/igm) !== null) // regexp found matches
                {
                    $(this).removeClass('invalid');
                    $(this).parent().find('.error_msg').remove();
                }
            }

            ///////////////////////////////////// last name regexp
            if ($(this).prop('name') == 'LNAME') { // if it is name
                if ($(this).val() !== '' && $(this).val().match(/^[-'a-z\u4e00-\u9eff]{1,20}$/igm) == null) {

                    if ($(this).hasClass('error')) {
                        $(this).removeClass('error');
                        $(this).parent().find('.error_msg').remove();
                    }

                    if (!$(this).hasClass('invalid')) // add invalid class, because inout has test, but regexp without matches 
                    {
                        $(this).addClass('invalid');

                        if (CNversion) { // Chanise version
                            $(this).parent().append('<div class="error_msg">请正确填写您的姓氏。</div>');
                        }
                        else {// English version
                            $(this).parent().append('<div class="error_msg">This last name is invalid.</div>');
                        }
                                                
                    }
                }
                else if ($(this).val().match(/^[-'a-z\u4e00-\u9eff]{1,20}$/igm) !== null) // regexp found matches
                {
                    $(this).removeClass('invalid');
                    $(this).parent().find('.error_msg').remove();
                }
            }

            //////////////////////////////// regexp city name
            if ($(this).prop('name') == 'NCITY') { // if it is city name
                if ($(this).val() !== '' && $(this).val().match(/^[-'a-z\u4e00-\u9eff]{1,20}$/igm) == null) {

                    if ($(this).hasClass('error')) {
                        $(this).removeClass('error');
                        $(this).parent().find('.error_msg').remove();
                    }

                    if (!$(this).hasClass('invalid')) // add invalid class, because inout has test, but regexp without matches 
                    {
                        $(this).addClass('invalid');

                        if (CNversion) { // Chanise version
                            $(this).parent().append('<div class="error_msg">该城市名不存在。</div>');
                        }
                        else {// English version
                            $(this).parent().append('<div class="error_msg">This city name is invalid.</div>');
                        }
                                                
                    }
                }
                else if ($(this).val().match(/^[-'a-z\u4e00-\u9eff]{1,20}$/igm) !== null) // regexp found matches
                {
                    $(this).removeClass('invalid');
                    $(this).parent().find('.error_msg').remove();
                }
            }


            // email regexp
            if ($(this).prop('type') == 'email' && $(this).val().match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/igm) == null && $(this).val() !== '') {
                if ($(this).hasClass('error')) {
                    $(this).removeClass('error');
                    $(this).parent().find('.error_msg').remove();
                }
                if (!$(this).hasClass('invalid')){
                $(this).addClass('invalid');

                    if (CNversion) { // Chanise version
                        $(this).parent().append('<div class="error_msg">请输入有效邮箱帐号</div>');
                    }
                    else {// English version
                $(this).parent().append('<div class="error_msg">This email is invalid.</div>');
            }
            }
            } else {
                if ($(this).val().match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/igm) !== null) {
                    $(this).removeClass('invalid');
                    $(this).parent().find('.error_msg').remove();
                }
            }


            /////////phone regexp /^[0-9\(\)\+\-\s]{5,20}$/gmi
            if ($(this).prop('name') == 'PHONE' && $(this).val().match(/^[0-9\(\)\+\-\s]{5,20}$/gmi) == null && $(this).val() !== '') {
                if ($(this).hasClass('error')) {
                    $(this).removeClass('error');
                    $(this).parent().find('.error_msg').remove();
                }
                if (!$(this).hasClass('invalid')) {
                    $(this).addClass('invalid');
                    $(this).parent().append('<div class="error_msg">This value is invalid.</div>');
                }
            }
            else {
                if ($(this).val().match(/^[0-9\(\)\+\-\s]{5,20}$/gmi) !== null) {
                    $(this).removeClass('invalid');
                    $(this).parent().find('.error_msg').remove();
                }
            }

            //check fill of required fields
            if ($(this).val() == '') {
                if ($(this).hasClass('invalid')) {
                    $(this).removeClass('invalid');
                    $(this).parent().find('.error_msg').remove();
                }
                if (!$(this).hasClass('error')) {
                    $(this).addClass('error');
                    if (CNversion) {
                        $(this).parent().append('<div class="error_msg">必填</div>');
                    } else {
                        $(this).parent().append('<div class="error_msg">This field is required.</div>');
                    }
                }
            } else {
                if (!$(this).hasClass('invalid')) {
                    $(this).removeClass('error');
                    $(this).parent().find('.error_msg').remove();
                }
            }

        }
    
        //Telephone field when Consumer radio button was checked and field without requrement
        else if ($(this).prop('id') == 'mce-PHONE') {
            //phone regexp /^[0-9\(\)\+\-\s]{5,20}$/gmi
            // this is telephone field is NOT empty
            if ($(this).val() !== '') {

                if ($(this).val().match(/^[0-9\(\)\+\-\s]{5,20}$/gmi) == null) {
                    //if input has a class error 
                    if ($(this).hasClass('error')) {
                        $(this).removeClass('error');
                        $(this).parent().find('.error_msg').remove();
                    }
                    // if input has text, but this text is INVALID 
                    if (!$(this).hasClass('invalid')) {
                        $(this).addClass('invalid');

                        if (CNversion) {
                            $(this).parent().append('<div class="error_msg">请输入正确信息。</div>'); // Chanise version
                        } else {
                            $(this).parent().append('<div class="error_msg">This value is invalid.</div>'); //English version
                        }

                        
                    }
                }
                //if input has a text, but this text is VALID 
                else {
                    if ($(this).val().match(/^[0-9\(\)\+\-\s]{5,20}$/gmi) !== null) {
                        $(this).removeClass('invalid');
                        $(this).parent().find('.error_msg').remove();
                    }
                }

            } 
            else if ($(this).val() === '') { //this is telephone field is EMTPY

                if ($(this).hasClass('error')) {
                    $(this).removeClass('error');
                    $(this).parent().find('.error_msg').remove();
                }

                if ($(this).hasClass('invalid')) {
                    $(this).removeClass('invalid');
                    $(this).parent().find('.error_msg').remove();
                }

            }

        } // it is a telephone field

    }

    function clearThisField() {//This function clear that field what located in "this" variable
        if ($(this).attr('type') == 'text' || $(this).attr('type') == 'email') {
            $(this).val('');
            if ($(this).val() == '') {
                $(this).parent().find('label.placeholderobj').show();
            }
        }
        if ($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio') {
            if ($(this).is(':checked')) {
                $(this).prop('checked',false)
            }
        }
    }

    function mailSend(event) {
        event.preventDefault();
        var AllValid = true
        $('input').each(checkReq);
        $('input').each(function () {
            if ($(this).hasClass('required')) {
                if ($(this).hasClass('error') || $(this).hasClass('invalid')) {
                    AllValid = false;
                }
            }
        });
        if ($('#mce-anti').val() !== '') {//check fake field to find bot-program
            AllValid = false;
        }
        if (AllValid && MailInProgres == false && $('#mc-embedded-subscribe-form').prop('name') == 'contactForm') {//check type of form , is it on homepage or contantpage
            MailInProgres = true;
            //ajax loader logick
            $('#mc-embedded-subscribe').prop('value','');
            $('#mc-embedded-subscribe').addClass('ajaxLoader');
            var inqury = document.forms[0],
                Fname = inqury.FNAME.value,
                Lname = inqury.LNAME.value,
                Email = inqury.EMAIL.value,
                Radio = $('input[name=RADIOAREA]:checked').val(),
                CompName = inqury.COMPANAM.value,
                Title = inqury.TITLE.value,
                Phone = inqury.PHONE.value,
                Adress = inqury.ADDRESS.value,
                Website = inqury.WEBSITE.value,
                InquryMsg = inqury.ENQUIRY.value,
                City = '',
                Newsletter,
                DataForAdminInquary, DataForAdminNewsletter,
                emailGot = 'sales@myhfinewines.com';//sales@myhfinewines.com

            var successResponse = $('#mce-success-response');
            var newsLetterObj = $('#Newsletter');

            if (newsLetterObj.prop('checked')) {

                Newsletter = 'Yes';               
                //change a pop up messages if nesletter was chacked   谢谢您的订阅！我们会及时回复您的询问。
                if (CNversion) {
                successResponse.html("谢谢您的订阅！我们会及时回复您的询问。");
                } else {
                successResponse.html("Thank you. <br/> You are subscribed to the newsletter. <br/> We will promptly reply to your inquiry.");
                }
                DataForAdminNewsletter = JSON.stringify({
                    'key': 'V0D_Zxz9tADoT1PJUBYXhQ',
                    'message': {
                        'from_email': 'sales@myhfinewines.com',
                        'to': [{ 'email': emailGot, 'type': 'to' }],
                        'autotext': 'true',
                        'subject': 'MYH Newsletter Subscribe - Contact Page',
                        'html': 'You have new subscriber ' + Email
                    }
                })
                $.ajax({
                    type: "POST",
                    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                    data: DataForAdminNewsletter,
                });
            } else {

                Newsletter = 'No';
                //change a pop up messages if nesletter was chacked
                if (CNversion) {
                    successResponse.html("谢谢您！我们会及时回复您的询问。");
                } else {
                    successResponse.html("Thank you. </br> We will promptly reply to your inquiry.");

                }

            }
                $('input[name=groupCity]:checked').each(function () {
                    if ($(this).val() == 'MainChina') {
                        City += inqury.NCITY.value + ', ';
                    } else {
                        City += $(this).val() + ', ';
                    }
                })

            // if user did not chose a Consumer radio button 
                if (Radio != "Consumer") {

                    DataForAdminInquary = JSON.stringify({
                    'key': 'V0D_Zxz9tADoT1PJUBYXhQ',
                    'message': {
                        'from_email': 'sales@myhfinewines.com',
                        'to': [{ 'email': emailGot, 'type': 'to' }],
                        'autotext': 'true',
                        'subject': 'MYH INQUIRY - ' + Fname + ' '+ Lname+ ' - ' +Radio+ ' - ' + City,
                        'html': '    <table border="1" style="border:1px solid black;border-collapse: collapse; overflow:auto;width:400px"><tr><td>First Name</td><td>' + Fname + '</td></tr><tr><td>Last Name</td><td>' + Lname + '</td></tr><tr><td>Email</td><td>' + Email + '</td></tr><tr><td>Type of Enquiry</td><td>' + Radio + '</td></tr><tr><td>Job Title</td><td>' + CompName + '</td></tr><tr><td>Phone</td><td>' + Phone + '</td></tr><tr><td>Address</td><td>' + Adress + '</td></tr><tr><td>Name of City</td><td>' + City + '</td></tr><tr><td>Website</td><td>' + Website + '</td></tr><tr><td>Newsletter</td><td>' + Newsletter + '</td></tr><tr><td>Enquiry Message</td><td>' + InquryMsg + '</td></tr></table>'
                    }
                })
                }
                else {
                    DataForAdminInquary = JSON.stringify({
                        'key': 'V0D_Zxz9tADoT1PJUBYXhQ',
                        'message': {
                            'from_email': 'sales@myhfinewines.com',
                            'to': [{ 'email': emailGot, 'type': 'to' }],
                            'autotext': 'true',
                            'subject': 'MYH INQUIRY - ' + Fname + ' '+ Lname+ ' - ' +Radio+ ' - ' + City,
                            'html': '    <table border="1" style="border:1px solid black;border-collapse: collapse; overflow:auto;width:400px"><tr><td>First Name</td><td>' + Fname + '</td></tr><tr><td>Last Name</td><td>' + Lname + '</td></tr><tr><td>Email</td><td>' + Email + '</td></tr><tr><td>Type of Enquiry</td><td>' + Radio + '</td></tr><tr><td>Phone</td><td>' + Phone + '</td></tr><tr><td>Name of City</td><td>' + City + '</td></tr><tr><td>Newsletter</td><td>' + Newsletter + '</td></tr><tr><td>Enquiry Message</td><td>' + InquryMsg + '</td></tr></table>'
                        }
                    })
                }
                $.ajax({
                    type: "POST",
                    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                    data: DataForAdminInquary
                }).done(function (response) {
                        $("#mce-responses").css("display", "block");
                        setTimeout(showSucessMessage, 3000);
                        function showSucessMessage() {
                            $("#mce-responses").css("display", "none");
                        }
                        $('#mc-embedded-subscribe').removeClass('ajaxLoader');
                        $('#mc-embedded-subscribe').prop('value', 'SUBMIT');

                        MailInProgres = false;
                        $('input,textarea').each(clearThisField);
                  });
                    
                        
        } else {//block for homepage form
            if (AllValid && MailInProgres == false) {
                MailInProgres = true;
                $('#mc-embedded-subscribe').prop('value', '');
                $('#mc-embedded-subscribe').addClass('ajaxLoader');
                var inqury = document.forms[0],
                Email = inqury.EMAIL.value,
                DataForAdminNewsletter,
                emailGot = 'sales@myhfinewines.com';//sales@myhfinewines.com

                var successResponse = $('#mce-success-response');
                if (CNversion) {
                    successResponse.html("您已经订阅成功。");
                } else {
                    successResponse.html("You are now subscribed");
                }
                DataForAdminNewsletter = JSON.stringify({
                    'key': 'V0D_Zxz9tADoT1PJUBYXhQ',
                    'message': {
                        'from_email': 'sales@myhfinewines.com',
                        'to': [{ 'email': emailGot, 'type': 'to' }],
                        'autotext': 'true',
                        'subject': 'MYH Newsletter Subscribe - Home Page',
                        'html': 'You have new subscriber ' + Email
                    }
                })

                $.ajax({
                    type: "POST",
                    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                    data: DataForAdminNewsletter,
                }).done(function (response) {
                    $("#mce-responses").css("display", "block");
                    setTimeout(showSucessMessage, 3000);
                    function showSucessMessage() {
                        $("#mce-responses").css("display", "none");
                    }
                    $('#mc-embedded-subscribe').removeClass('ajaxLoader');
                    $('#mc-embedded-subscribe').prop('value', 'SUBMIT');

                    MailInProgres = false;
                    $('input,textarea').each(clearThisField);
                });



            }
        }

    }
});