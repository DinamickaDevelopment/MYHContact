$(window).ready(function () {
    $('#mc-embedded-subscribe-form input').on('change', checkReq);
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
                CompName = inqury.COMPANAM.value,
                Title = inqury.TITLE.value,
                Phone = inqury.PHONE.value,
                Adress = inqury.ADDRESS.value,
                Website = inqury.WEBSITE.value,
                InquryMsg = inqury.ENQUIRY.value,
                City = '',
                Newsletter;
            if (document.getElementById('Newsletter').checked) {
                Newsletter = 'Yes';
            } else {
                Newsletter = 'No';
            }
                $('input[name=groupCity]:checked').each(function () {
                    if ($(this).val() == 'MainChina') {
                        City += inqury.NCITY.value + ', ';
                    } else {
                        City += $(this).val() + ', ';
                    }
                })
            
                var DataForAdmin = JSON.stringify({
                    'key': 'V0D_Zxz9tADoT1PJUBYXhQ',
                    'message': {
                        'from_email': 'sales@myhfinewines.com',
                        'to': [{ 'email': 'b.druzhynin@dinamicka.com', 'type': 'to' }],
                        'autotext': 'true',
                        'subject': 'ZALTO INQUIRY - ' + Fname + ' '+ Lname+ ' - ' +Radio+ ' - ' + City,
                        'html': '<head><style>td {padding: 3px;}</style></head><body><table border="1" style="border:1px solid black;border-collapse: collapse; overflow:auto;width:400px"><tr><td>First Name</td><td>' + Fname + '</td></tr><tr><td>Last Name</td><td>' + Lname + '</td></tr><tr><td>Email</td><td>' + Email + '</td></tr><tr><td>Typeof Enquiry</td><td>' + Radio + '</td></tr><tr><td>Company Name</td><td>' + CompName + '</td></tr><tr><td>Job Title</td><td>' + Title + '</td></tr><tr><td>Phone</td><td>' + Phone + '</td></tr><tr><td>Address</td><td>' + Adress + '</td></tr><tr><td>Name of City</td><td>' + City + '</td></tr><tr><td>Website</td><td>' + Website + '</td></tr><tr><td>Newsletter</td><td>' + Newsletter + '</td></tr><tr><td>Enquiry Message</td><td>' + InquryMsg + '</td></tr></table></body>'
                    }
                }), DataForUser = JSON.stringify({
                    'key': 'V0D_Zxz9tADoT1PJUBYXhQ',
                    'message': {
                        'from_email': 'sales@myhfinewines.com',
                        'to': [{ 'email': Email, 'type': 'to' }],
                        'autotext': 'true',
                        'subject': 'Newsletter',
                        'html': '<body><div style="width:100%;font-style:italic;font-size:32px;text-align:center">Thanks!</div><div style="width:100%;font-size:20px;margin-top:20px;text-align:center">We will respond to you as soon as possible</div></body>'
                    }
                });
                $.ajax({
                    type: "POST",
                    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                    data: DataForAdmin,
                }).done(function (response) {
                    $.ajax({
                        type: "POST",
                        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                        data: DataForUser,
                    }).done(function (response) {

                    });
                });
        } else {

        }

    }
});