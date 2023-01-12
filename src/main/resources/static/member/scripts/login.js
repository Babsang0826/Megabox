form.onsubmit = (e) => {
    e.preventDefault();

    if (form['loginId'].value === '') {
        alert("아이디를 입력해주세요.")
        form['loginId'].focus();
        return;
    }
    if (form['pwd'].value === '') {
        alert("비밀번호를 입력해주세요.")
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
                        window.location.href = "http://localhost:8080"
                        break;
                    case'failure':
                        alert('로그인에 실패하였습니다.')
                        break;
                    default:
                        alert("잠시만 기다려 주세요.")
                }
            }
        }
    };
    xhr.send(formData);

}