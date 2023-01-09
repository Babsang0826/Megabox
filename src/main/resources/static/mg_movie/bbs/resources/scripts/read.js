const form = window.document.getElementById('form');

const noArticle = form.querySelectorAll('.link');
console.log(noArticle);

for (let noSuchArticle of noArticle) {
    if (noSuchArticle.innerText === '다음글이 존재하지 않습니다.' || noSuchArticle.innerText === '이전글이 존재하지 않습니다.') {
        noSuchArticle.href = '#';
    }
}

form.querySelector('[rel="actionDelete"]').addEventListener('click', () => {
    if (!confirm('정말로 게시글을 삭제 할건가요?')) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('aid', form['aid'].value);
    xhr.open('DELETE', `./delete`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        window.location.href = "./notice?bid=notice"
                        break;
                    case 'no_such_article':
                        alert("삭제하려는 게시물이 더 이상 존재하지 않습니다.");
                        break;
                    case 'not_allowed':
                        alert('삭제할 권한이 없어요.');
                        break;
                    default:
                        alert("알 수 없는 이유로 삭제하지 못하였습니다. 다시 시도해주세요.");
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시후 다시 시도해 주세요.');
            }
            }
    };
    xhr.send(formData);
});

form.querySelector('[rel="actionModify"]').addEventListener('click', () => {
    if (!confirm('정말로 게시글을 수정 할건가요?')) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('aid', form['aid'].value);
    xhr.open('GET', `./modify`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        window.location.href = "./notice"
                        break;
                    case 'no_such_article':
                        alert("삭제하려는 게시물이 더 이상 존재하지 않습니다.");
                        break;
                    case 'not_allowed':
                        alert('삭제할 권한이 없어요.');
                        break;
                    default:
                        alert("알 수 없는 이유로 삭제하지 못하였습니다. 다시 시도해주세요.");
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);
});




