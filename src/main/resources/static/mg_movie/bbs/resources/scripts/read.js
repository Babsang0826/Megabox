const form = window.document.getElementById('form');

window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('pageUtil').classList.add('fixed');
    } else {
        document.getElementById('pageUtil').classList.remove('fixed');
    }
}

const noArticle = form.querySelectorAll('.link');
console.log(noArticle);

for (let noSuchArticle of noArticle) {
    if (noSuchArticle.innerText === '다음글이 존재하지 않습니다.' || noSuchArticle.innerText === '이전글이 존재하지 않습니다.') {
        noSuchArticle.href = '#';
    }
}

form.querySelector('[rel="actionDelete"]').addEventListener('click', () => {
    let flag;
    swal = swal({
        title: "알림",
        text: "정말로 게시글을 삭제하시겠습니까?",
        // icon: "info",
        buttons: ["NO", "YES"]
    }).then((YES) => {
        if (YES) {
            flag = true;
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
                                window.location.replace("/bbs/notice?bid=notice");
                                break;
                            case 'no_such_article':
                                swal("알림", "삭제하려는 게시물이 더 이상 존재하지 않습니다.");
                                break;
                            case 'not_allowed':
                                swal("알림", "삭제할 권한이 없어요.");
                                break;
                            default:
                                swal("알림", "알 수 없는 이유로 삭제하지 못하였습니다. 다시 시도해주세요.");
                        }
                    } else {
                        swal("알림", "서버와 통신하지 못하였습니다. 잠시후 다시 시도해 주세요.");
                    }
                }
            };
            xhr.send(formData);
        } else {
            flag = false;
            return window.location.reload();
        }
    });
});

form.querySelector('[rel="actionModify"]').addEventListener('click', () => {
    let flag;
    swal = swal({
        title: "알림",
        text: "게시글을 수정하시겠습니까?",
        // icon: "info",
        buttons: ["NO", "YES"]
    }).then((YES) => {
        if (YES) {
            flag = true;
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
                                window.location.reload();
                                break;
                            case 'no_such_article':
                                swal("알림", "삭제하려는 게시물이 더 이상 존재하지 않습니다.");
                                break;
                            case 'not_allowed':
                                swal("알림", '삭제할 권한이 없어요.');
                                break;
                            default:
                                swal("알림", "알 수 없는 이유로 삭제하지 못하였습니다. 다시 시도해주세요.");
                        }
                    } else {
                        swal("알림", '서버와 통신하지 못하였습니다. 잠시후 다시 시도해 주세요.');
                    }
                }
            };
            xhr.send(formData);
        }else{
            flag = false;
            return window.location.reload();
            // window.location.reload();
        }
    });
});





