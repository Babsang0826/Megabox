const contents = window.document.getElementById('contents');

contents.querySelector('[rel="notScreen"]').addEventListener('click', () => {
    contents.querySelector('[rel="commingInnerWrap"]').classList.add('on');
    contents.querySelector('[rel="boxInnerWrap"]').classList.remove('on');
});

contents.querySelector('[rel="boxOffice"]').addEventListener('click', () => {
    contents.querySelector('[rel="commingInnerWrap"]').classList.remove('on');
    contents.querySelector('[rel="boxInnerWrap"]').classList.add('on');
});