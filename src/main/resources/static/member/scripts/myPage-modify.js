const container = window.document.getElementById('container');

const warningText = container.querySelector('[rel="emailWarning"]');
const EmailWarning = {
    show: (text) => {
        const emailWarning = warningText;
        emailWarning.innerText = text;
        emailWarning.classList.add('visible')
    },
    hide: () => {
        form.querySelector('[rel="emailWarning"]').classList.remove('visible');
    }
};

//인증 요청 클릭시
const authRequest = container.querySelector('.auth-request');
const hiddenEmail = container.querySelector('[rel="hiddenEmail"]');
const authInput = container.querySelector('.authInput');
const emailAuthSalt = container.querySelector('.emailAuthSalt')

authRequest.addEventListener('click', () => {
    let time = 299;
    let min = '';
    let sec = '';
    Cover.show('인증번호를 전송하고 있습니다.\n잠시만 기다려 주세요.');
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', hiddenEmail.value);
    xhr.open('POST', './email');
    xhr.onreadystatechange = () => {
        Cover.hide();
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        let x = setInterval(function () {
                            min = parseInt(time / 60);
                            sec = time % 60;
                            document.getElementById('timer').innerHTML = min + ':' + sec;
                            time--;

                            if (time < 0) {
                                clearInterval(x);
                                warningText.style.color = 'red';
                                EmailWarning.show('시간이 만료되었습니다. 다시 시도해주세요');
                            }
                        }, 1000);
                        warningText.style.color = '#444';
                        // EmailWarning.show('인증 번호를 전송하였습니다.\n전송된 인증 번호는 5분간만 유효합니다.');
                        swal('알림', '인증 번호를 전송하였습니다.\n전송된 인증 번호는 5분간만 유효합니다.');
                        authRequest.setAttribute('disabled', 'disabled');
                        authInput.focus();
                        emailAuthSalt.value = responseObject['salt'];
                        authCheck.removeAttribute('disabled');
                        break;
                    case 'failure':
                        EmailWarning.show('인증에 실패하였습니다. 로그인이 만료되었을 수도 있습니다.');
                        break;
                    default:
                        EmailWarning.show('알 수 없는 이유로 인증 번호를 전송하지 못 하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            } else {
                // warningText.style.color = 'red';
                EmailWarning.show('서버와 통신하지 못하였습니다.잠시후 다시 시도해 주세요.');
                alert('통신 실패');
            }
        }
    }
    xhr.send(formData);
});

//인증 확인 클릭시
const authCheck = container.querySelector('.auth-check');

authCheck.addEventListener('click', () => {
    if (authInput.value === '') {
        warningText.style.color = 'red';
        EmailWarning.show('인증번호를 입력해 주세요.');
        authInput.focus();
        return;
    }
    Cover.show('인증 번호를 확인하고 있습니다. \n\n잠시만 기다려 주세요.');
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', hiddenEmail.value);
    formData.append('code', authInput.value);
    formData.append('salt', emailAuthSalt.value);
    xhr.open('PATCH', 'email');
    xhr.onreadystatechange = () => {
        Cover.hide();
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'expired':
                        EmailWarning.show('인증 정보가 만료되었습니다. 다시 시도해 주세요.');
                        authRequest.removeAttribute('disabled');
                        authInput.value = '';
                        emailAuthSalt.value = '';
                        authCheck.setAttribute('disabled', 'disabled');
                        break;
                    case 'success':
                        warningText.style.color = '#444';
                        EmailWarning.show('이메일이 정상적으로 인증되었습니다.');
                        authInput.setAttribute('disabled', 'disabled');
                        authCheck.setAttribute('disabled', 'disabled');
                        completeAuth.removeAttribute('disabled');
                        document.getElementById('timer').style.color = '#fff';
                        break;
                    default:
                        warningText.style.color = 'red';
                        EmailWarning.show('인증번호가 올바르지 않습니다.');
                        authInput.focus();
                        authInput.select();
                }
            } else {
                EmailWarning.show('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                alert('서버 통신 실패')
            }
        }
    }
    xhr.send(formData);
});

const completeAuth = container.querySelector('[rel="completeAuth"]');
const authContent = container.querySelector('#authContents');
const modifyContent = container.querySelector('#modifyContent');
completeAuth.addEventListener('click', () => {
    authContent.classList.remove('on');
    modifyContent.classList.add('on');
});


//휴대폰번호 변경 클릭 시
const mobile = container.querySelector('[rel="mobile"]');
const changeBtn = mobile.querySelector('[rel="changeBtn"]');
const changeMobileDiv = mobile.querySelector('.change-mobile');
const submitBtn = container.querySelector('[rel="submitBtn"]');

changeBtn.addEventListener('click', () => {
    changeMobileDiv.classList.toggle('on');
    if (changeMobileDiv.classList.contains('on')) {
        changeBtn.innerText = '변경취소';
    } else {
        changeBtn.innerText = '휴대폰번호 변경';
    }
});

submitBtn.addEventListener('click', () => {
    if (mobile.querySelector('.new-mobile').value === '') {
        mobile.querySelector('.new-mobile').value = mobile.querySelector('[rel="nowMobile"]').value
    }
    if (!confirm('정말로 개인정보를 수정하시겠습니까?')) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('contact', container.querySelector('.new-mobile').value);
    formData.append('name', container.querySelector('[rel="name"]').value);
    formData.append('birthday', container.querySelector('[rel="birthday"]').value);
    formData.append('email', container.querySelector('[rel="email"]').value);
    formData.append('id', container.querySelector('[rel="id"]').value);
    formData.append('addressPostal', container.querySelector('[rel="addressPostal"]').value);
    formData.append('addressPrimary', container.querySelector('[rel="addressPrimary"]').value);
    formData.append('addressSecondary', container.querySelector('[rel="addressSecondary"]').value);
    xhr.open('POST', './modify');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        alert('개인정보 수정이 완료되었습니다.\n확인을 누르시면 마이페이지로 이동합니다.');
                        window.location.href = './myPage';
                        break;
                    case 'failure':
                        alert('실패');
                        break;
                    case 'no_user':
                        alert('로그인해 주세요.');
                        break;
                    case 'duplicate':
                        alert('해당 휴대폰 번호가 존재합니다.');
                        break;
                    default:
                        alert('알 수 없는 이유로 휴대폰 번호 호 수정하지 못하였습니다.');
                }
            } else {
                alert('서버와 통신하지 못하였습니다.\n잠시후 다시 시도해주세요.');
            }
        }
    }
    xhr.send(formData);
});

container.querySelector('[rel="addressFind"]').addEventListener('click', () => {
    new daum.Postcode({
        oncomplete: e => {
            container.querySelector('[rel="addressFindPanel"]').classList.remove('visible');
            container.querySelector('[rel="addressPostal"]').value = e['zonecode'];
            container.querySelector('[rel="addressPrimary"]').value = e['address'];
            container.querySelector('[rel="addressSecondary"]').value = '';
            container.querySelector('[rel="addressSecondary"]').focus();
        }
    }).embed(container.querySelector('[rel="addressFindPanelDialog"]'));
    container.querySelector('[rel="addressFindPanel"]').classList.add('visible');
});

container.querySelector('[rel="addressFindPanel"]').addEventListener('click', () => {
    container.querySelector('[rel="addressFindPanel"]').classList.remove('visible');
});

container.querySelector('.delete-account').addEventListener('click', e => {
    e.preventDefault();
    if (!confirm('정말로 탈퇴하시겠습니까?')) {
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', container.querySelector('[rel="email"]').value);
    xhr.open('DELETE', './modify');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        alert('회원 탈퇴가 완료되었습니다.');
                        break;
                    case 'failure':
                        alert('알 수 없는 이유로 회원 탈퇴를 못하였습니다.');
                        break;
                    default:
                        alert('회원 탈퇴 실패');
                }
            }
        } else {

        }
    }
    xhr.send(formData);
});








