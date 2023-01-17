const form = window.document.getElementById('form');

const chkAll = document.querySelector('.chkAll');
const chkBox = document.querySelectorAll('.chkBox');
// 전체 체크박스 선택/해제
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

const chk = document.querySelectorAll('.chkBox input[type="checkbox"]:checked');
for (let chkElement of chk) {
    console.log(chkElement.value
    )
}

const cancelButton = window.document.querySelector('[rel="cancel"]');

cancelButton.addEventListener('click', () => {
    if (!confirm('정말로 회원을 탈퇴시키겠습니까?')) {
        return;
    }
    // const chk = document.querySelectorAll('.chkBox input[type="checkbox"]:checked');
    const arr = [];
    const check = document.getElementsByName("chk");
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked === true) {
            arr.push(check[i].value);
            console.log(check[i])
        }
    }
    for (let i = 0; i < arr.length; i++){
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('email', arr[i]);
        xhr.open('DELETE', './modify');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);
                    switch (responseObject['result']) {
                        case 'success':
                            if (i === arr.length - 1) {
                                alert('탈퇴 완료되었습니다.');
                                window.location.reload();
                                break;
                            }
                            // alert('탈퇴 완료되었습니다.');
                            break;
                        case 'failure':
                            swal('알림', '알 수 없는 이유로 회원 탈퇴를 못하였습니다.');
                            break;
                        default:
                            swal('알림','회원 탈퇴 실패');
                    }
                }
            } else {

            }
        }
        xhr.send(formData);
    }
});

