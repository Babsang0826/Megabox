window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById('pageUtil').classList.add('fixed');
    } else {
        document.getElementById('pageUtil').classList.remove('fixed');
    }
}