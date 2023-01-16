window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('pageUtil').classList.add('fixed');
    } else {
        document.getElementById('pageUtil').classList.remove('fixed');
    }
}