const form = window.document.getElementById('form');

const checkAll = document.querySelector('.checkAll');
const chkBox = document.querySelectorAll('.chkBox');
const chkAll = document.querySelector('.chkAll');
const checkBoxes = document.querySelectorAll('.checkBox');
const chkCancel = document.querySelector('.chkCancel')

checkAll.onclick = function () {
    if (checkAll.checked === false) {
        for (let i = 0; i < chkBox.length; i++) {
            chkBox[i].checked = false;
        }
    } else {
        for (let i = 0; i < chkBox.length; i++) {
            chkBox[i].checked = true;
        }
    }
};

for (let i = 0; i < chkBox.length; i++) {
    chkBox[i].onclick = function () {
        if (this.checked === false) {
            checkAll.checked = false;
        }
    }
}

chkAll.onclick = function () {
    if (chkAll.checked === false) {
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
        }
    } else {
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = true;
        }
    }
};

chkCancel.onclick = function () {
    if (chkCancel.checked === true) {
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
        }
    }
};

for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].onclick = function () {
        if (this.checked === false) {
            chkAll.checked = false;
        }
        if (this.checked === false) {
            chkCancel.checked = true;
        }
        if (this.checked === true) {
            chkAll.checked = true;
        }
    }
}

const checkBox = document.querySelector("input[name=chkAll]");

checkBox.addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('btnClauAgree').removeAttribute("disabled");
    } else {
        document.getElementById('btnClauAgree').setAttribute('disabled', 'disabled');
    }
});


const checkBoxTwo = document.querySelector("input[name=marketingAgree]");

checkBoxTwo.addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('marketAgree').removeAttribute("disabled");
    } else {
        document.getElementById('marketAgree').setAttribute('disabled', 'disabled');
    }
});


form.querySelector('[rel="emailAuth"]').addEventListener('click', () => {
    form.querySelector('[rel="emailAuthPopUp"]').classList.add('on');
});




const loginPassword = document.getElementById('loginPassword').value;
const loginId = document.getElementById('loginId').value;
const loginEmailCheck = document.getElementById('loginEmailCheck').value;

form.querySelector('[rel="registerButton"]').addEventListener('click', () => {
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/
    if (!reg.test(loginPassword)) {
        alert("비밀번호는 8자이상, 숫자, 대문자, 소문자, 특수문자들 모두 포함해야합니다.")
        form.querySelector('[rel="warning-password"]').innerText = '비밀번호는 8자이상, 숫자, 대문자, 소문자, 특수문자들 모두 포함해야합니다.'
    } else {
        form.querySelector('[rel="warning-password"]').innerText = ''
    }
    if (!new RegExp('^(?=.{7,50})([\\da-zA-Z_.]{4,})@([\\da-z\\-]{2,}\\.)?([\\da-z\\-]{2,})\\.([a-z]{2,10})(\\.[a-z]{2})?$').test(loginEmailCheck)) {
        alert("올바른 이메일을 입력해 주세요.")
        form.querySelector('[rel="warning-email"]').innerText = '올바른 이메일을 입력해 주세요.'
    } else {
        form.querySelector('[rel="warning-email"]').innerText = ''
    }

});

//         if (form['id'].value === '') {
//         form.querySelector('[rel="warning-id"]').innerText = '아이디 입력ㄱㄱ';
//     } else {
//         form.querySelector('[rel="warning-id"]').innerText = '';
//     }
//
//     if(form['password'].value === '') {
//         form.querySelector('[rel="warning-password"]').innerText = '비밀번 입력ㄱㄱ';
//     } else {
//         form.querySelector('[rel="warning-password"]').innerText = '';
//     }
// })












