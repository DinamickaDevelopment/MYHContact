$(window).ready(function () {
    $('#mc-embedded-subscribe-form input').on('change', checkReq);
    //Submit eventon the contact form 
    $('#mc-embedded-subscribe-form').on('submit',mailSend)
    var MailInProgres = false;
    function checkReq(a) {//Function for check fill of required fields;
        if ($(this).hasClass('required')) { 
            if ($(this).val() == '') {
                if (!$(this).hasClass('error')) {
                    $(this).addClass('error');
                    $(this).parent().append('<div class="error_msg">This field is required.</div>');
                }
            } else {
                $(this).removeClass('error');
                $(this).parent().find('.error_msg').remove();
            }

        }
    
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
                if ($(this).hasClass('error')) {
                    AllValid = false;
                }
            }
        });
        if (AllValid && MailInProgres == false) {
            MailInProgres = true;
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
                Newsletter, DataForAdminInquary, DataForAdminNewsletter;

            var successResponse = $('#mce-success-response');
            var newsLetterObj = $('#Newsletter');

            if (newsLetterObj.prop('checked')) {

                Newsletter = 'Yes';               
                //change a pop up messages if nesletter was chacked
                successResponse.html("Thank you. <br/> You are subscribed to the newsletter. <br/> We will promptly reply to your inquiry.");
                DataForAdminNewsletter = JSON.stringify({
                    'key': 'V0D_Zxz9tADoT1PJUBYXhQ',
                    'message': {
                        'from_email': 'sales@myhfinewines.com',
                        'to': [{ 'email': 'sales@myhfinewines.com', 'type': 'to' }],
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
                successResponse.html("Thank you. </br> We will promptly reply to your inquiry.");

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
                        'to': [{ 'email': 'sales@myhfinewines.com', 'type': 'to' }],
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
                            'to': [{ 'email': 'sales@myhfinewines.com', 'type': 'to' }],
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
                        MailInProgres = false;
                        $('input,textarea').each(clearThisField);
                  });
                    
                        
        } 

    }
});