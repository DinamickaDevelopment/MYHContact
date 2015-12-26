$(window).ready(function () {
    $('.swicher').on('click', function () {
        if ($(this).parent().find('.description').css('display') == 'none') {
            $(this).parent().find('.description').slideDown(700);
            $(this).html('Hide details');
        } else {
            $(this).parent().find('.description').slideUp(700);
            $(this).html('查看细节');
        }
    });
    $('#ShowMorePIC , .showMore-text').on('click', function () {
        if ($('.zaltoPart2').css('display') == 'none') {
            $('.showMore-text').html('Show less');
            $('#ShowMorePIC').addClass('rotate180')
            $('.zaltoPart2').slideDown(700);
        } else {
            $('.zaltoPart2').slideUp(700);
            $('.showMore-text').html('Show more');
            $('#ShowMorePIC').removeClass('rotate180')

        }
    })

    $('button').on('click', function () {
        if ($('#navbar-collapse-1').hasClass('expand')) {
            $('#navbar-collapse-1').removeClass('expand');
        } else {
            $('#navbar-collapse-1').addClass('expand');
        }
    })
});