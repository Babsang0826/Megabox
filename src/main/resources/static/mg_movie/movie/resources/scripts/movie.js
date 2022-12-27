const contents = window.document.getElementById('contents');

//박스오피스, 상영예정작 보이기
contents.querySelector('[rel="notScreen"]').addEventListener('click', () => {
    contents.querySelector('[rel="commingInnerWrap"]').classList.add('on');
    contents.querySelector('[rel="boxInnerWrap"]').classList.remove('on');
});

contents.querySelector('[rel="boxOffice"]').addEventListener('click', () => {
    contents.querySelector('[rel="commingInnerWrap"]').classList.remove('on');
    contents.querySelector('[rel="boxInnerWrap"]').classList.add('on');
});

//스크롤시 탭메뉴
window.onscroll = function () {
    scrollFunction()
};
function scrollFunction() {
    if (document.body.scrollTop > 280 || document.documentElement.scrollTop > 280) {
        document.getElementById('pageUtil').classList.add('fixed');
        document.getElementById('BoxTabList').classList.add('fixed');
        document.getElementById('commingTabList').classList.add('fixed');
    } else {
        document.getElementById('pageUtil').classList.remove('fixed');
        document.getElementById('BoxTabList').classList.remove('fixed')
        document.getElementById('commingTabList').classList.remove('fixed')
    }
}