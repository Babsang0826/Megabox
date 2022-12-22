const form = window.document.getElementById('form');

let emailAuthIndex = null;
setInterval(() => {
    if (emailAuthIndex === null) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('index', emailAuthIndex);
    xhr.open('POST', './recoverPasswordEmail');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                switch (responseObject['result']) {
                    case'success':
                        form['code'].value = responseObject['code'];
                        form['salt'].value = responseObject['salt'];
                        form['password'].focus();
                        emailAuthIndex = null;
                        break;
                    default:
                }
            }
        }
    };
    xhr.send(formData);
}, 1000);


form['emailSend'].addEventListener('click', () => {
    if (form['email'].value === '') {
        form.querySelector('[rel="warning-email"]').innerText = '이메일을 입력해 주세요.'
        form['email'].focus();
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', form['email'].value);
    xhr.open('POST', './userPasswordReset');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case'success':
                        alert("입력하신 이메일로 인증을 진행할 수 잇는 링크를 전송하였습니다." +
                            " 해당 링크 확인 후 해당 페이지로 돌아와 주세요.");
                        emailAuthIndex = responseObject['index'];
                        form['email'].setAttribute('disabled', 'disabled');
                        form['emailSend'].setAttribute('disabled', 'disabled');
                        form['password'].removeAttribute('disabled');
                        form['passwordCheck'].removeAttribute('disabled');
                        form['passwordSend'].removeAttribute('disabled');
                        break;
                    default:
                        alert("해당 이메일을 사용하는 계정을 찾을 수 없습니다.")
                        form['email'].focus();
                        form['email'].select();
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.')
            }
        }
    };
    xhr.send(formData);
});

form['passwordSend'].addEventListener('click', () => {
    if (form['password'].value !== form['passwordCheck'].value) {
        form.querySelector('[rel="warning-passwordCheck"]').innerText = '비밀번호가 일치하지 않습니다.'
        form['passwordCheck'].focus();
        form['passwordCheck'].select();
        return;
    }
    if (form['password'].value === '') {
        Warning.show('새로운 비밀번호를 입력해 주세요.');
        form.querySelector('[rel="warning-password"]').innerText = '비밀번호을 입력해 주세요.'
        return;
    }
    if (!new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$').test(form['password'].value)) {
        form.querySelector('[rel="warning-password"]').innerText = '비밀번호는 8자이상, 숫자, 대문자, 소문자, 특수문자들 모두 포함해야합니다.'
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', form['email'].value);
    formData.append('code', form['code'].value);
    formData.append('salt', form['salt'].value);
    formData.append('password', form['password'].value);
    xhr.open('PATCH', './userPasswordReset');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case'success':
                        alert('비밀번호를 성공적으로 재설정하였습니다.\n\n확인을 누르면 로그인 페이지로 이동합니다.')
                        window.location.href = 'login';
                        break;
                    default:
                      alert('비밀번호를 재설정하지 못하였습니다. 세션이 만료되었을 수도 있습니다. 잠시 후 다시 시도해주세요.')
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.')
            }
        }
    };
    xhr.send(formData);
});
