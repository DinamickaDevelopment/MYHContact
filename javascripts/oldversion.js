$(window).ready(function () {
    // eventlistener svg audio video webanimations cssgradients fontface cssanimations appearance borderradius csstransforms csstransitions
    if ($('html').hasClass('no-eventlistener') || $('html').hasClass('no-svg') || $('html').hasClass('no-audio') || $('html').hasClass('no-video')|| $('html').hasClass('no-fontface') || $('html').hasClass('no-borderradius') || $('html').hasClass('no-csstransforms')) {
        if ($('html').prop('lang') == 'en-us') {
            alert('For correct display of the content, please update your browser to a newer version');
        } else {
            alert('*Chinese version of warning should be here*');

        }
    }

});