const content = window.document.getElementById('content');

content.querySelector('[rel="onScreen"]').addEventListener('click', () => {
    content.querySelector('[rel="onScreen"]').classList.add('on');
    content.querySelector('[rel="allMovie"]').classList.remove('on');
});

content.querySelector('[rel="allMovie"]').addEventListener('click', () => {
    content.querySelector('[rel="onScreen"]').classList.remove('on');
    content.querySelector('[rel="allMovie"]').classList.add('on');
});

