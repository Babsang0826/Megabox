const form = window.document.getElementById('form');

const searchMovieInput = document.querySelector('[rel="searchMovieInput"]');
const searchMovieBtn = document.querySelector('[rel="searchMovieBtn"]');

searchMovieBtn.addEventListener('click', () => {
    window.location.href = `/movie/movie?keyword=` + `${searchMovieInput.value}`
});


const rankPosterBox = document.querySelectorAll('.rank-poster-box');
const detailMpRank = document.querySelectorAll('.detail-mp-rank');

for (let i = 0; i < rankPosterBox.length; i++) {
    rankPosterBox[i].addEventListener('click', () => {

        detailMpRank[i].classList.add('on');
    })
}










