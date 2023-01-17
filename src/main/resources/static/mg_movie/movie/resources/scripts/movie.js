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

//토글 체크 시
const toggle = contents.querySelector('#toggle');
const movieContainer = contents.querySelector('#movieContainer');
const commingMovieContainer = contents.querySelector('#commingMovieContainer');
let movies = movieContainer.querySelectorAll('.movie');
const commingMovies = commingMovieContainer.querySelectorAll('.movie');

toggle.addEventListener('input', () => {
    let count = 0;
    movieContainer.querySelectorAll(':scope > .movie').forEach(movie => {
        movie.style.display = toggle.checked && movie.dataset.opened === 'false' ? 'none' : 'list-item';
        count += movie.style.display !== 'none' ? 1 : 0;
    });
    document.querySelector('.searchCnt').innerText = count;
});

// for (let i = 0; i < movies.length; i++) {
    for (let j = 0; j < commingMovies.length; j++) {
    }
// }
// if (toggle.checked) {
//
// }

const expForm = document.getElementById('expForm');
expForm.addEventListener('submit', e => {
    e.preventDefault();

    commingMovies.forEach(movie => {
        const title = movie.querySelector('[rel="title"]').innerText;
        const keyword = expForm['keyword'].value;
        movie.style.display = keyword === '' || title.indexOf(keyword) > -1 ? 'list-item' : 'none';
    });
});

const searchCnt = window.document.querySelector('.searchCnt');
const noResult = window.document.querySelector('.no-result');
if (searchCnt.innerText === '0') {
    noResult.style.display = 'block';
}












