const form = window.document.getElementById('form');

const loginButton = document.getElementById('loginButton');
loginButton?.addEventListener('click', e => {
    e.preventDefault();
    alert("성공");
    window.open('https://kauth.kakao.com/oauth/authorize?client_id=ab3e0e3a866959cb53f8a5d683ad4cd7&redirect_uri=http://localhost:8080/member/kakao&response_type=code',
        '로그인', 'width=500; height=750');
});

const searchMovieInput = document.querySelector('[rel="searchMovieInput"]');
const searchMovieBtn = document.querySelector('[rel="searchMovieBtn"]');

searchMovieBtn.addEventListener('click', () => {
    window.location.href = `http://localhost:8080/movie/movie?keyword=` + `${searchMovieInput.value}`
});
//