$(window).ready(function () {
    $('#mc-embedded-subscribe-form input').on('change', checkReq);
    //Submit eventon the contact form 
    $('#mc-embedded-subscribe-form').on('submit',mailSend)

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
        if (AllValid) {
            var inqury = document.forms[0],
                Fname = inqury.FNAME.value,
                Lname = inqury.LNAME.value,
                Email = inqury.EMAIL.value,
                Radio = $('input[name=RADIOAREA]:checked').val(),
                CompName = '' ,
                Title = '',
                Phone = inqury.PHONE.value,
                Adress = '',
                Website = '',
                InquryMsg = inqury.ENQUIRY.value,
                City = '',
                Newsletter;

            // if user did not chose a Consumer radio button 
            if (Radio != "Consumer") {

                CompName = '<tr><td>Company Name</td><td>' + inqury.COMPANAM.value + '</td></tr>';
                Title = '<tr><td>Job Title</td><td>' + inqury.TITLE.value + '</td></tr>';
                Adress = '<tr><td>Address</td><td>' + inqury.ADDRESS.value + '</td></tr>';
                Website = '<tr><td>Website</td><td>' + inqury.WEBSITE.value + '</td></tr>';
            }
            else {
                CompName = '';
                Title = '';
                Adress = '';
                Website = '';
            }

            var successResponse = $('#mce-success-response');
            var newsLetterObj = $('#Newsletter');

            if (newsLetterObj.prop('checked')) {

                Newsletter = 'Yes';               
                //change a pop up messages if nesletter was chacked
                successResponse.html("Thank you. <br/> You are subscribed to the newsletter. <br/> We will promptly reply to your inquiry.");

            } else {

                Newsletter = 'No';
                //change a pop up messages if nesletter was chacked
                successResponse.html("Thank you. </br> We will promptly reply to your inquiry.");

            }
                $('input[name=groupCity]:checked').each(function () {
                    if ($(this).val() == 'MainChina') {
                        City += inqury.NCITY.value + ', ';
                    } else {
                        City += $(this).val() + ' ';
                    }
                })
            
                var DataForAdmin = JSON.stringify({
                    'key': 'V0D_Zxz9tADoT1PJUBYXhQ',
                    'message': {
                        'from_email': 'sales@myhfinewines.com',
                        'to': [{ 'email': 'o.petryk@dinamicka.com', 'type': 'to' }],
                        'autotext': 'true',
                        'subject': 'MYH INQUIRY - ' + Fname + ', '+ Lname+ ' - ' +Radio+ ' - ' + City,
                        'html': '<head><style>td {padding: 3px;}</style></head><body><table border="1" style="border:1px solid black;border-collapse: collapse; overflow:auto;width:400px"><tr><td>First Name</td><td>' + Fname + '</td></tr><tr><td>Last Name</td><td>' + Lname + '</td></tr><tr><td>Email</td><td>' + Email + '</td></tr><tr><td>Type of Enquiry</td><td>' + Radio + '</td></tr>' + CompName + Title + '<tr><td>Phone</td><td>' + Phone + '</td></tr>' + Adress + '<tr><td>Name of City</td><td>' + City + '</td></tr>' + Website + '<tr><td>Newsletter</td><td>' + Newsletter + '</td></tr><tr><td>Enquiry Message</td><td>' + InquryMsg + '</td></tr></table></body>'
                    }
                })
                //, DataForUser = JSON.stringify({
                //    'key': 'V0D_Zxz9tADoT1PJUBYXhQ',
                //    'message': {
                //        'from_email': 'sales@myhfinewines.com',
                //        'to': [{ 'email': Email, 'type': 'to' }],
                //        'autotext': 'true',
                //        'subject': 'Newsletter',
                //        'html': '<body><div style="width:100%;font-style:italic;font-size:32px;text-align:center">Thanks!</div><div style="width:100%;font-size:20px;margin-top:20px;text-align:center">We will respond to you as soon as possible</div></body>'
                //    }
                //})
                ;
                $.ajax({
                    type: "POST",
                    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                    data: DataForAdmin,
                })
                    //.done(function (response) {
                    //$.ajax({
                    //    type: "POST",
                    //    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                    //    data: DataForUser,
                    //})
                        .done(function (response) {

                        $("#mce-responses").css("display", "block");

                        setTimeout(showSucessMessage, 3000);

                        function showSucessMessage() {
                            $("#mce-responses").css("display", "none");
                        }



                    //});
                });
        } else {

        }

    }
});