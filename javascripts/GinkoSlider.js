window.addEventListener('load', start(), false);
function start() {
    $('#ginkoslider1 .g-slide:first-child').addClass('animationS');
    $('#ginkoslider2 .g-slide:first-child').addClass('animationR');
    a = $('#ginkoslider1 .g-slide:first-child');
    b = $('#ginkoslider2 .g-slide:first-child');
    i = 0;
    var first;
    setInterval(function () {
        if (first) {
            $('#ginkoslider1 .g-slide:last-child').removeClass('animationS');
            $('#ginkoslider2 .g-slide:last-child').removeClass('animationR');
            a.addClass('animationS');
            b.addClass('animationR')
            first = false;
            i++;
        } else {
        a.removeClass('animationS');
        b.removeClass('animationR');
        a.next().addClass('animationS');
        b.next().addClass('animationR');
        a = a.next();
        b = b.next();
        i++;
        if (i == 5) {
            a = $('#ginkoslider1 .g-slide:first-child');
            b = $('#ginkoslider2 .g-slide:first-child');
            first = true;
            i = 0;
        }
        }
    },16001)
}