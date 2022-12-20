const form = window.document.getElementById('form');

const checkAll = document.querySelector('.checkAll');
const chkBox = document.querySelectorAll('.chkBox');

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
})


const loginPassword = document.getElementById('loginPassword').value;

if (loginPassword === '') {
    form.querySelector('[rel="error"]').innerText = '비밀번호를 입력해주세요';
} else {
    form.querySelector('[rel="error"]').innerText = '';
}



// if (loginPassword === "") {
//     document.getElementById("password-error-text").innerText = "비밀번호를 입력해주세요."
//     if (!new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$").test(loginPassword)) {
//         document.getElementById("password-error-text").innerText = "영어나 특수기호 ㄱㄱ"
//     } else {
//         document.getElementById("password-error-text").innerText = ""
//     }
// }
