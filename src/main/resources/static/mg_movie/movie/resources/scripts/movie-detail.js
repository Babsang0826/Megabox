
// 스크롤 시 영화와 탭 리스트 변경
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById('movieDetail').classList.add('fixed');
        document.getElementById('tabList').classList.add('fixed');
        document.getElementById('contentData').classList.add('fixed');
    } else {
        document.getElementById('movieDetail').classList.remove('fixed')
        document.getElementById('tabList').classList.remove('fixed')
        document.getElementById('contentData').classList.remove('fixed');
    }
}

// 더보기 클릭 시
const contents = window.document.getElementById('contents');

contents.querySelector('[rel="moreBtn"]').addEventListener('click', () => {
    contents.querySelector('[rel="movieSummary"]').classList.toggle('on');
});


