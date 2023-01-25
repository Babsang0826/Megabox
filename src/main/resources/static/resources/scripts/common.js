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
    if (document.querySelector('[rel="hiddenUser"]').value === '') {
        loginSubContainer.classList.toggle('on');
        xMarkUser.classList.toggle('on');
        user.classList.toggle('on');
    }

});

if (document.querySelector('[rel="hiddenUser"]').value !== '') {
    userIcon.style.display = 'none'
} else {
    document.querySelector('#unsignedUserIcon').style.display = 'none'
}

searchIcon.addEventListener('click', () => {
    if (siteMapContainer.classList.contains('on')) {
        siteMapContainer.classList.remove('on');
        xMarkBar.classList.remove('on');
        bar.classList.remove('on');
    }
    if (document.querySelector('[rel="hiddenUser"]').value === '') {
        if (loginSubContainer.classList.contains('on')) {
            loginSubContainer.classList.remove('on');
            xMarkUser.classList.remove('on');
            user.classList.remove('on');
        }
    }
    xMark.classList.toggle('on');
    glass.classList.toggle('on');
    searchBar.classList.toggle('on');
});

reservButton.addEventListener('click', () => {
    posters[0].style.display = 'block'
    movieRankSecond.classList.remove('on');
    movieRankFirst.classList.add('on');
    sboUnderline.classList.remove('on');
    resUnderline.classList.add('on');
});

sortByOrderButton.addEventListener('click', () => {
    posters[5].style.display = 'block'
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
    if (document.querySelector('[rel="hiddenUser"]').value === '') {
        if (loginSubContainer.classList.contains('on')) {
            loginSubContainer.classList.remove('on');
            xMarkUser.classList.remove('on');
            user.classList.remove('on');
        }
    }
    siteMapContainer.classList.toggle('on');
    xMarkBar.classList.toggle('on');
    bar.classList.toggle('on');
})

const searchMovieInput = window.document.querySelector('[rel="searchMovieInput"]');
const searchMovieBtn = window.document.querySelector('[rel="searchMovieBtn"]');

searchMovieBtn.addEventListener('click', () => {
    window.location.href = `/movie/movie?keyword=` + `${searchMovieInput.value}`
})

const titles = window.document.querySelectorAll('[rel="title"]');
const posters = window.document.querySelectorAll('[rel="poster"]');

for (let i = 0; i < titles.length; i++) {
    titles[i].addEventListener('mouseover', () => {
        for (let poster of posters) {
            poster.style.display = 'none'
        }
        posters[i].style.display = 'block';
    })
}

const homeSearchMovieInput = document.querySelector('[rel="homeSearchMovieInput"]');
const homeSearchMovieBtn = document.querySelector('[rel="homeSearchMovieBtn"]');

if (homeSearchMovieBtn != null) {
    homeSearchMovieBtn.addEventListener('click', () => {
        window.location.href = `http://localhost:8080/movie/movie?keyword=` + `${homeSearchMovieInput.value}`
    });
}

const moviePosterTopFour = document.querySelectorAll('[rel="moviePosterTopFour"]');
const hiddenMid = document.querySelectorAll('[rel="hiddenMid"]');

for (let i = 0; i < moviePosterTopFour.length; i++) {
    moviePosterTopFour[i].addEventListener('click', () => {
        window.location.href = `http://localhost:8080/movie/movie-detail?mid=${hiddenMid[i].value}`
    })
}

const rankPosterBox = document.querySelectorAll('.rank-poster-box');
const detailMpRank = document.querySelectorAll('.detail-mp-rank');
const hashtag = document.querySelectorAll('.hashtag');
const bestImage = document.querySelectorAll('.best-mp-image');

for (let i = 0; i < rankPosterBox.length; i++) {
    rankPosterBox[i].addEventListener('click', () => {
        for (let j = 0; j < detailMpRank.length; j++) {
            detailMpRank[j].style.display = 'none'
            hashtag[j].style.display = 'none';
            bestImage[j].style.display = 'none';
            // rankPosterBox[j].styles.display = 'block'
        }
        detailMpRank[i].style.display = 'block';
        hashtag[i].style.display = 'block';
        bestImage[i].style.display = 'block';
        // rankPosterBox[i].style.display = 'none';

        // detailMpRank[i].classList.add('on');
    })
}




