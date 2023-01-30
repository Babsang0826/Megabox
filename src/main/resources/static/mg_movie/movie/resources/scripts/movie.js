const contents = window.document.getElementById('contents');

contents.querySelector('[rel="notScreen"]').addEventListener('click', () => {
    contents.querySelector('[rel="commingInnerWrap"]').classList.add('on');
    contents.querySelector('[rel="boxInnerWrap"]').classList.remove('on');
});

contents.querySelector('[rel="boxOffice"]').addEventListener('click', () => {
    contents.querySelector('[rel="commingInnerWrap"]').classList.remove('on');
    contents.querySelector('[rel="boxInnerWrap"]').classList.add('on');
});

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



const expForm = document.getElementById('expForm');
const commingSearchCnt = document.querySelector('[rel="commingSearchCnt"]');

expForm.addEventListener('submit', e => {
    e.preventDefault();
    let x = 0;
    commingMovies.forEach(movie => {
        const title = movie.querySelector('[rel="title"]').innerText;
        const keyword = expForm['keyword'].value;
        movie.style.display = keyword === '' || title.indexOf(keyword) > -1 ? 'list-item' : 'none';
        x = keyword === '' || title.indexOf(keyword) > -1 ? x + 1 : x;
    });
    commingSearchCnt.innerText = x;
});



const searchCnt = window.document.querySelector('.searchCnt');
const noResult = window.document.querySelector('.no-result');
if (searchCnt.innerText === '0') {
    noResult.style.display = 'block';
}












