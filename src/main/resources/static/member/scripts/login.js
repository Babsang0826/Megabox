form.onsubmit = (e) => {
    e.preventDefault();

    if (form['loginId'].value === '') {
        swal("알림", "아이디를 입력해주세요.")
        form['loginId'].focus();
        return;
    }
    if (form['pwd'].value === '') {
        swal("알림", "비밀번호를 입력해주세요.")
        form['pwd'].focus();
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('id', form['loginId'].value);
    formData.append('password', form['pwd'].value);
    xhr.open('POST', './login');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case'success':
                        if(document.referrer.indexOf('member/register') !== -1) {
                            window.location.href = "/"
                            break;
                        } else {
                            window.location.href = document.referrer;
                            break;
                        }
                    case 'failure':
                        swal("알림", '로그인에 실패하였습니다.')
                        break;
                    default:
                        swal("알림", "잠시만 기다려 주세요.")
                }
            }
        }
    };
    xhr.send(formData);

}