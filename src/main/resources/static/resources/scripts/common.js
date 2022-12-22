const searchIcon = window.document.getElementById('searchIcon');
const searchBar = window.document.getElementById('searchBar');

const reservButton = window.document.getElementById('reservation');
const sortByOrderButton = window.document.getElementById('sortByOrder');

const movieRankFirst = window.document.getElementById('movieRankFirst');
const movieRankSecond = window.document.getElementById('movieRankSecond');

const resUnderline = window.document.querySelector('.res-underline');
const sboUnderline = window.document.querySelector('.sbo-underline');

searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('on');
});

reservButton.addEventListener('click', () => {
    movieRankSecond.classList.remove('on');
    movieRankFirst.classList.add('on');
    sboUnderline.classList.remove('on');
    resUnderline.classList.add('on');
});

sortByOrderButton.addEventListener('click', () => {
    movieRankFirst.classList.remove('on');
    movieRankSecond.classList.add('on');
    resUnderline.classList.remove('on');
    sboUnderline.classList.add('on');
});



const Cover = {
    show: (text) => {
        const cover = window.document.getElementById('cover');
        cover.querySelector('[rel="text"]').innerText = text;
        cover.classList.add('visible');
    },
    hide: () => {
        window.document.getElementById('cover').classList.remove('visible');
    }
};

