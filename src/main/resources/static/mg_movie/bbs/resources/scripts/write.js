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
        alert("제목을 작성해주세요.")
        // Warning.show('제목을 입력해 주세요.');
        form['title'].focus();
        return false;
    }

    if (editor.getData() === '') {
        alert("내용을 입력해 주세요.")
        editor.focus();
        return false;
    }
    if(form['sort'].value === '구분 선택') {
        alert("구분을 선택 해주세요.");
        return false;
    }else if(form['region'].value === '지역 선택') {
        alert("지역을 선택 해주세요.");
        return false;
    }else if(form['branch'].value === '극장 선택') {
        alert("극장을 선택 해주세요.");
        return false;
    }
    alert('게시글을 작성하고 있습니다.\n잠시만 기다려 주세요.');
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('title', form['title'].value);
    formData.append('content', editor.getData());
    formData.append('bid', form['bid'].value);
    formData.append('sort', form['sort'].value);
    formData.append('region', form['region'].value);
    formData.append('branch', form['branch'].value);
    xhr.open('POST', './write');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case'not_allowed':
                        alert('게시글을 작성할 수 있는 권한이 없거나 로그아웃되었습나다. 확인 후 다시 시도해 주세요.');
                        break;
                    case'success':
                        alert('작성되었습니다.');
                        // const aid = responseObject['aid'];
                        // window.location.href = `notice?aid=${aid}`;
                        window.location.href = 'http://localhost:8080/bbs/notice?bid=' + responseObject['bid'];
                        break;
                    default:
                      alert('알 수 없는 이유로 게시글을 작성하지 못하였습니다. 잠시 후 다시 시도해 주새요.');
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);
}

