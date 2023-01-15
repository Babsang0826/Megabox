const form = window.document.getElementById('form');

let editor;
ClassicEditor
    .create(form['content'], {
        simpleUpload: {
            uploadUrl: './image'
        }
    })
    .then(e => editor = e);

form['back'].addEventListener('click', () =>
    window.history.length < 2 ? window.close() : window.history.back());

form.onsubmit = e => {
    e.preventDefault();
    // Warning.hide();

    if (form['title'].value === '') {
        swal("알림", "제목을 작성해주세요.")
        // Warning.show('제목을 입력해 주세요.');
        form['title'].focus();
        return false;
    }

    if (editor.getData() === '') {
        swal("알림", "내용을 입력해 주세요.")
        editor.focus();
        return false;
    }
    if (form['sort'].value === '구분 선택') {
        swal("알림", "구분을 선택 해주세요.");
        return false;
    } else if (form['region'].value === '지역 선택') {
        swal("알림", "지역을 선택 해주세요.");
        return false;
    } else if (form['branch'].value === '극장 선택') {
        swal("알림", "극장을 선택 해주세요.");
        return false;
    }
    Cover.show('게시글을 수정하고 있습니다.\n잠시만 기다려 주세요.');
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    // formData.append('aid', form['aid'].value);
    formData.append('sort', form['sort'].value);
    formData.append('region', form['region'].value);
    formData.append('branch', form['branch'].value);
    formData.append('title', form['title'].value);
    formData.append('content', editor.getData());
    // formData.append('index', form['index'].value);
    // xhr.open('POST', window.location.href);
    xhr.open('PATCH', window.location.href);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'no_such_article':
                        swal("알림", '게시글을 수정할 수 없습니다, 게시글이 존재하지 않습니다.');
                        break;
                    case'not_allowed':
                        swal("알림", '게시글을 수정할 수 있는 권한이 없거나 로그아웃되었습나다. 확인 후 다시 시도해 주세요.');
                        break;
                    case'success':
                        const aid = responseObject['aid'];
                        window.location.href = `read?aid=${aid}`;
                        break;
                    default:
                        swal("알림", '알 수 없는 이유로 게시글을 작성하지 못하였습니다. 잠시 후 다시 시도해 주새요.');
                }
            } else {
                swal("알림", '서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);
}