const form = window.document.getElementById('form');

const Warning = {
    show: (text) => {
        form.querySelector('[rel="warningText"]').innerText = text;
        form.querySelector('[rel="warning"]').classList.add('visible');
    },
    hide: () => {
        form.querySelector('[rel="warning"]').classList.remove('visible');
    }
}
const EmailWarning = {
    show: (text) => {
        const emailWarning = form.querySelector('[rel="emailWarning"]');
        emailWarning.innerText = text;
        emailWarning.classList.add('visible')
    },
    hide: () => {
        form.querySelector('[rel="emailWarning"]').classList.remove('visible');
    }
};


const chkAll = document.querySelector('.chkAll');
const chkBox = document.querySelectorAll('.chkBox');
// 전체 체크박스 선택/해제
chkAll.onclick = function () {
    if (chkAll.checked === true) {
        for (let i = 0; i < 2; i++) {
            chkBox[i].checked = true;
            document.getElementById('btnClauAgree').removeAttribute("disabled");
        }
    } else {
        for (let i = 0; i < 2; i++) {
            chkBox[i].checked = false;
            document.getElementById('btnClauAgree').setAttribute('disabled', 'disabled');
        }
    }
};

// 하위 체크박스 선택시 전체 체크박스 선택/ 해제 시 전체 체크박스 해제
function checkSelectAll() {
    // 전체 체크박스
    const checkboxes
        = document.querySelectorAll('input[name="chkBox"]');
    // 선택된 체크박스
    const checked
        = document.querySelectorAll('input[name="chkBox"]:checked');
    // select all 체크박스
    const selectAll
        = document.querySelector('input[name="chkAll"]');

    if (checkboxes.length === checked.length) {
        selectAll.checked = true;
        document.getElementById('btnClauAgree').removeAttribute("disabled");
    } else {
        selectAll.checked = false;
        document.getElementById('btnClauAgree').setAttribute('disabled', 'disabled');
    }
}

function checkSelect() {
    const chkBox = document.querySelectorAll('input[name="receive"]');

    const chk = document.querySelectorAll('input[name="receive"]:checked');

    const chkAll = document.getElementById('agree');

    const chkNotAll = document.getElementById('notagree');

    if (chkBox.length > 1) {
        chkAll.checked = true;
        document.getElementById('marketAgree').removeAttribute("disabled");
    } else {
        chkAll.checked = false;
    }
}


const checkAll = document.querySelector('.checkAll');
const checkCancel = document.querySelector('.checkCancel');
const checkBox = document.querySelectorAll('.checkBox');


// 동의 체크 시 하위 체크박스 전체 선택
checkAll.onclick = function () {
    if (checkAll.checked === true) {
        for (let i = 0; i < 3; i++) {
            checkBox[i].checked = true;
            document.getElementById('marketAgree').removeAttribute("disabled");
        }
    }
};
// 미동의 체크 시 하위 체크박스 전체 해제
checkCancel.onclick = function () {
    if (checkCancel.checked === true) {
        for (let i = 0; i < 3; i++) {
            checkBox[i].checked = false;
            document.getElementById('marketAgree').removeAttribute("disabled");
        }
    }
}


form.querySelector('[rel="emailAuth"]').addEventListener('click', () => {
    form.querySelector('[rel="emailAuthPopUp"]').classList.add('on');
});
form.querySelector('[rel="closeButton"]').addEventListener('click', () => {
    form.querySelector('[rel="emailAuthPopUp"]').classList.remove('on');
});


form['addressFind'].addEventListener('click', () => {
    new daum.Postcode({
        oncomplete: e => {
            form.querySelector('[rel="addressFindPanel"]').classList.remove('visible');
            form['addressPostal'].value = e['zonecode'];
            form['addressPrimary'].value = e['address'];
            form['addressSecondary'].value = '';
            form['addressSecondary'].focus();
        },
        width: '100%',
        height: '100%'
    }).embed(form.querySelector('[rel="addressFindPanelDialog"]'));
    form.querySelector('[rel="addressFindPanel"]').classList.add('visible');
});

form.querySelector('[rel="addressFindPanel"]').addEventListener('click', () => {
    form.querySelector('[rel="addressFindPanel"]').classList.remove('visible');
});


// 이메일 인증
form.querySelector('.email-send').addEventListener('click', () => {
    if (form['email'].value === '') {
        EmailWarning.show('이메일 주소를 입력해 주세요.');
        form['email'].focus();
        return;
    }
    if (!new RegExp('^(?=.{7,50})([\\da-zA-Z_.]{4,})@([\\da-z\\-]{2,}\\.)?([\\da-z\\-]{2,})\\.([a-z]{2,10})(\\.[a-z]{2})?$').test(form['email'].value)) {
        EmailWarning.show('올바른 이메일 주소를 입력해 주세요.');
        form['email'].focus();
        return;
    }

    let time = 299;
    let min = '';
    let sec = '';
    Cover.show('인증번호를 전송하고 있습니다.\n잠시만 기다려주세요.');
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', form['email'].value);
    xhr.open('POST', './email');
    xhr.onreadystatechange = () => {
        Cover.hide()
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
                                EmailWarning.show('시간이 만료되었습니다. 다시 시도해주세요.');
                                clearInterval(x);
                            }
                        }, 1000);
                        EmailWarning.show('인증 번호를 전송하였습니다. 전송된 인증 번호는 5분간만 유효합니다.');
                        form['email'].setAttribute('disabled', 'disabled');
                        form['emailSend'].setAttribute('disabled', 'disabled');
                        form['emailAuthCode'].removeAttribute('disabled');
                        form['emailAuthCode'].focus();
                        form['emailAuthSalt'].value = responseObject['salt'];
                        form['emailVerify'].removeAttribute('disabled');
                        break;
                    case 'email_duplicated':
                        EmailWarning.show('해당 이메일은 이미 사용 중입니다.');
                        break;
                    default:
                        EmailWarning.show('알 수 없는 이유로 인증 번호를 전송하지 못 하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            } else {
                EmailWarning.show('서버와 통신하지 못하였습니다.잠시후 다시 시도해 주세요.');
            }
        }
    }
    xhr.send(formData);
});

form['emailVerify'].addEventListener('click', () => {
    if (form['emailAuthCode'].value === '') {
        EmailWarning.show('인증번호를 입력해 주세요.');
        form['emailAuthCode'].focus();
        return;
    }
    if (!new RegExp('^(\\d{6})$').test(form['emailAuthCode'].value)) {
        EmailWarning.show('올바른 인증 번호를 입력해 주세요.');
        form['emailAuthCode'].focus();
        form['emailAuthCode'].select();
        return;
    }
    Cover.show('인증 번호를 확인하고 있습니다. \n\n잠시만 기다려 주세요.');
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('email', form['email'].value);
    formData.append('code', form['emailAuthCode'].value);
    formData.append('salt', form['emailAuthSalt'].value);
    xhr.open('PATCH', 'email');
    xhr.onreadystatechange = () => {
        Cover.hide();
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'expired':
                        EmailWarning.show('인증 정보가 만료되었습니다. 다시 시도해 주세요.');
                        form['email'].removeAttribute('disabled');
                        form['email'].focus();
                        form['email'].select();
                        form['emailSend'].removeAttribute('disabled');
                        form['emailAuthCode'].value = '';
                        form['emailAuthCode'].setAttribute('disabled', 'disabled');
                        form['emailAuthSalt'].value = '';
                        form['emailVerify'].setAttribute('disabled', 'disabled');
                        break;
                    case 'success':
                        EmailWarning.show('이메일이 정상적으로 인증되었습니다.');
                        form['emailAuthCode'].setAttribute('disabled', 'disabled');
                        form['emailVerify'].setAttribute('disabled', 'disabled');
                        form['emailAuthComplete'].removeAttribute('disabled');
                        form['loginEmailCheck'].value = responseObject['email'];
                        form['loginEmailCheck'].setAttribute('disabled', 'disabled');
                        break;
                    default:
                        EmailWarning.show('인증번호가 올바르지 않습니다.');
                        form['emailAuthCode'].focus();
                        form['emailAuthCode'].select();
                }
            } else {
                EmailWarning.show('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    }
    xhr.send(formData);
});

form.querySelector('[rel="registerButton"]').addEventListener('click', () => {

        if (form['name'].value === '') {
            form.querySelector('[rel="warning-name"]').innerText = '이름를 입력해 주세요'
            form['name'].focus();
            return;
        } else {
            form.querySelector('[rel="warning-name"]').innerText = ''
        }
        if (form['birthday'].value === '') {
            form.querySelector('[rel="warning-birthday"]').innerText = '생년월일을 입력해 주세요'
            form['birthday'].focus();
            return
        } else {
            form.querySelector('[rel="warning-birthday"]').innerText = ''
        }

        if (!new RegExp('^(19[0-9][0-9]|20\\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$').test(form['birthday'].value)) {
            form.querySelector('[rel="warning-birthday"]').innerText = '생년월일 양식이 맞지않습니다.'
            form['birthday'].focus();
            return;
        } else {
            form.querySelector('[rel="warning-birthday"]').innerText = ''

        }
        if (form['contact'].value === '') {
            form.querySelector('[rel="warning-contact"]').innerText = '연락처를 입력해 주세요.'
            form['contact'].focus();
            return;
        } else {
            form.querySelector('[rel="warning-contact"]').innerText = ''
        }

        if (!new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$').test(form['pwd'].value)) {
            form.querySelector('[rel="warning-password"]').innerText = '비밀번호는 8자이상, 숫자, 대문자, 소문자, 특수문자들 모두 포함해야합니다.'
            form['pwd'].focus();
            return;
        } else {
            form.querySelector('[rel="warning-password"]').innerText = ''

        }
        if (form['pwd'].value !== form['passwordCheck'].value) {
            form.querySelector('[rel="warning-passowrdCheck"]').innerText = '비밀번호가 일치하지 않습니다.'
            form['passwordCheck'].focus();
            return;
        } else {
            form.querySelector('[rel="warning-passowrdCheck"]').innerText = ''

        }
        if (form['addressPostal'].value === '' || form['addressPrimary'].value === '' || form['addressSecondary'].value === '') {
            form.querySelector('[rel="warning-address"]').innerText = '주소를 입력해 주세요.'
            form['addressPostal'].focus();
            return;
        } else {
            form.querySelector('[rel="warning-address"]').innerText = ''
        }
        if (!form['overlappingButton'].disabled) {
            alert("아이디 중복검사를 해주세요.");
            form['loginId'].focus();
            return;
        }
    Cover.show('회원가입을 진행중입니다.\n\n잠시만 기다려 주세요.');
    const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('email', form['email'].value);
        formData.append('name', form['name'].value);
        formData.append('birthday', form['birthday'].value);
        formData.append('contact', form['contact'].value);
        formData.append('id', form['loginId'].value);
        formData.append('password', form['pwd'].value);
        formData.append('addressPostal', form['addressPostal'].value);
        formData.append('addressPrimary', form['addressPrimary'].value);
        formData.append('addressSecondary', form['addressSecondary'].value);
        xhr.open('POST', './register');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                Cover.hide();
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);
                    switch (responseObject['result']) {
                        case 'success':
                            alert("회원가입이 완료되었습니다.");
                            document.getElementById("step step3").style.display = "none";
                            document.getElementById("step step4").style.display = "block";
                            document.getElementById("three").style.border = "none"
                            document.getElementById("four").style.borderBottom = "1px solid #503396";
                            // window.location.href = "http://localhost:8080/member/login"
                            break;
                        case 'contact':
                            // alert("이미 등록된 연락처 입니다.");
                            form.querySelector('[rel="warning-contact"]').innerText = '연락처가 중복 되었습니다.';

                            break;
                        case 'failure':
                            alert("이미 등록된 사용자 입니다.");
                            break;
                        default:
                            alert("알 수 없는 이유로 회원가입을 하지 못하였습니다. 잠시 후 다시 시도해주세요.");
                    }
                } else {
                    alert("로그인 실패입니다.");
                }
            }
        }
        ;
        xhr.send(formData);
    }
)
;

form.querySelector('[rel="overlappingButton"]').addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('id', form['loginId'].value);
    xhr.open('PATCH', './register');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        if (form['loginId'].value !== '') {
                            alert("사용 가능한 아이디입니다.");
                            form['overlappingButton'].setAttribute('disabled', 'disabled');
                        }
                        break;
                    case 'id_duplicated':
                        alert("중복된 아이디 입니다.")
                        form['loginId'].focus();
                        form['loginId'].select();
                        break;
                    default:
                        alert("알 수 없는 이유로 오류가 발생하였습니다.")
                }
            } else {
            }
        }
    }
    ;
    xhr.send(formData);
});

// 넘기기
form.querySelector('[rel="nextButton"]').addEventListener('click', () => {
    document.getElementById("step step1").style.display = "none";
    document.getElementById("step step2").style.display = "block";
    document.getElementById("one").style.border = "none"
    document.getElementById("two").style.borderBottom = "1px solid #503396";
});

form.querySelector('[rel="emailAuthComplete"]').addEventListener('click', () => {
    document.getElementById("step step2").style.display = "none";
    document.getElementById("step step3").style.display = "block";
    document.getElementById("emailAuthPopUp").style.display = "none";
    document.getElementById("two").style.border = "none"
    document.getElementById("three").style.borderBottom = "1px solid #503396";
});






