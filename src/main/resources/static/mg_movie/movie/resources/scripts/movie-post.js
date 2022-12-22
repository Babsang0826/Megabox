const content = window.document.getElementById('content');

// 모든 영화, 현재 상영중 선택
content.querySelector('[rel="onScreen"]').addEventListener('click', () => {
    content.querySelector('[rel="onScreen"]').classList.add('on');
    content.querySelector('[rel="allMovie"]').classList.remove('on');
});

content.querySelector('[rel="allMovie"]').addEventListener('click', () => {
    content.querySelector('[rel="onScreen"]').classList.remove('on');
    content.querySelector('[rel="allMovie"]').classList.add('on');
});

