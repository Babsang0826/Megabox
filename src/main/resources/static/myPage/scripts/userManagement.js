const form = window.document.getElementById('form');

window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('pageUtil').classList.add('fixed');
    } else {
        document.getElementById('pageUtil').classList.remove('fixed');
    }
}


const chkAll = document.querySelector('.chkAll');
const chkBox = document.querySelectorAll('.chkBox');
chkAll.onclick = function () {
    if (chkAll.checked === true) {
        for (let i = 0; i < chkBox.length; i++) {
            chkBox[i].checked = true;
        }
    } else {
        for (let i = 0; i < chkBox.length; i++) {
            chkBox[i].checked = false;
        }
    }
};

const deleteButton = window.document.querySelector('[rel="delete"]');


deleteButton.addEventListener('click', () => {
    const chkArr = [];
    const check = document.getElementsByName("chk");
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked === true) {
            chkArr.push(check[i].value);
        }
    }
    let flag;
    swal = swal({
        title: "알림",
        text: "정말로 회원을 탈퇴시키겠습니까?",
        buttons: ["NO", "YES"]
    }).then((YES) => {
        if (YES) {
            flag = true;
            for (let i = 0; i < chkArr.length; i++) {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('email', chkArr[i]);
                xhr.open('DELETE', './delete');
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            const responseObject = JSON.parse(xhr.responseText);
                            switch (responseObject['result']) {
                                case 'success':
                                    if (i === chkArr.length - 1) {
                                        window.location.reload();
                                        break;
                                    }
                                    break;
                                case 'failure':
                                    swal('알림', '회원을 탈퇴시킬 수 없습니다. 잠시 후 다시 시도해 주세요.');
                                    break;
                                default:
                                    swal('알림', '알 수 없는 이유로 회원 탈퇴를 못하였습니다.');
                            }
                        }
                    } else {

                    }
                }
                xhr.send(formData);
            }
        } else {
            flag = false;
            return window.location.reload();
        }
    });
})
;

