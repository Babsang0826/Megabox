const passwordSend = container.querySelector('[rel="passwordSend"]');
const signedPassword = container.querySelector('[rel="signedPassword"]');
const nowPassword = container.querySelector('.now-pw');
const newPassword = container.querySelector('[rel="newPassword"]');
const passwordCheck = container.querySelector('[rel="passwordCheck"]');

passwordSend.addEventListener('click', () => {
    if (nowPassword.value === '') {
        alert('현재 비밀번호를 입력해주세요.');
        nowPassword.focus();
        return;
    }
    if (newPassword.value === '') {
        alert('새로운 비밀번호를 입력해주세요.');
        newPassword.focus();
        return;
    }
    if (passwordCheck.value === '') {
        alert('새로운 비밀번호를 입력해주세요.');
        passwordCheck.focus();
        return;
    }
    if (hex_sha512(nowPassword.value) !== signedPassword.value) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }
    if (!new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$').test(newPassword.value)) {
        container.querySelector('[rel="warningText"]').style.color = 'red'
        container.querySelector('[rel="warninText"]').innerText = '비밀번호는 8자이상, 숫자, 대문자, 소문자, 특수문자들 모두 포함해야합니다.'
        newPassword.focus();
        alert('비번 형식 다름');
        return;
    }
    if (newPassword.value !== passwordCheck.value) {
        alert('비밀번호가 서로 일치하지 않습니다.');
        return;
    }
    const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('password', newPassword.value);
        xhr.open('POST', './recoverPassword');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                    switch (responseObject['result']) {
                        case 'success':
                            alert('비밀번호 변경이 완료되었습니다.\n확인을 누르시면 메인페이지로 이동합니다.');
                            window.location.href = '/'
                            break;
                        case 'failure':
                            alert('알 수 없는 이유로 비밀번호 변경에 실패하였습니다.\n잠시 후 다시 시도해주세요')
                    }
                }
            } else {
                // alert('비밀번호를 재설정하지 못하였습니다. 세션이 만료되었을 수도 있습니다.');
            }
        }
        xhr.send(formData);

});








