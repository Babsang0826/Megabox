const searchIcon = window.document.getElementById('searchIcon');
const searchBar = window.document.getElementById('searchBar');

const reservButton = window.document.getElementById('reservation');
const sortByOrderButton = window.document.getElementById('sortByOrder');

const movieRankFirst = window.document.getElementById('movieRankFirst');
const movieRankSecond = window.document.getElementById('movieRankSecond');

const xMark = window.document.getElementById('xMarkGlass');
const glass = window.document.getElementById('glass');

const resUnderline = window.document.querySelector('.res-underline');
const sboUnderline = window.document.querySelector('.sbo-underline');

const siteMapContainer = window.document.getElementById('siteMapContainer');
const barIcon = window.document.getElementById('barIcon');
const xMarkBar = window.document.getElementById('xMarkBar');
const xMarkUser = window.document.getElementById('xMarkUser');
const bar = window.document.getElementById('bar');
const user = window.document.getElementById('user');

const loginSubContainer = window.document.getElementById('loginSubContainer');
const userIcon = window.document.getElementById('userIcon');

userIcon.addEventListener('click', () => {
    if (siteMapContainer.classList.contains('on')) {
        siteMapContainer.classList.remove('on');
        xMarkBar.classList.remove('on');
        bar.classList.remove('on');
    }
    if(searchBar.classList.contains('on')) {
        searchBar.classList.remove('on');
        xMark.classList.remove('on');
        glass.classList.remove('on');
    }
    loginSubContainer.classList.toggle('on');
    xMarkUser.classList.toggle('on');
    user.classList.toggle('on');
});

searchIcon.addEventListener('click', () => {
    if (siteMapContainer.classList.contains('on')) {
        siteMapContainer.classList.remove('on');
        xMarkBar.classList.remove('on');
        bar.classList.remove('on');
    }
    if (loginSubContainer.classList.contains('on')) {
        loginSubContainer.classList.remove('on');
        xMarkUser.classList.remove('on');
        user.classList.remove('on');
    }
    xMark.classList.toggle('on');
    glass.classList.toggle('on');
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

barIcon.addEventListener('click', () => {
    if (searchBar.classList.contains('on')) {
        searchBar.classList.remove('on');
        xMark.classList.remove('on');
        glass.classList.remove('on');
    }
    if (loginSubContainer.classList.contains('on')) {
        loginSubContainer.classList.remove('on');
        xMarkUser.classList.remove('on');
        user.classList.remove('on');
    }
    siteMapContainer.classList.toggle('on');
    xMarkBar.classList.toggle('on');
    bar.classList.toggle('on');
})



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

