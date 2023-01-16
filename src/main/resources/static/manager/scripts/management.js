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




const cancelButton = window.document.querySelector('[rel="cancel"]');

cancelButton.addEventListener('click', () => {
    const arr = [];
    const color = document.getElementsByName("color");
    for (let i = 0; i < color.length; i++) {
        if (color[i].checked === true) {
            arr.push(color[i].value);
            console.log(color[i])
        }
    }
    for (let arrElement of arr) {
        console.log(arrElement);
    }
})

cancelButton.addEventListener('click', e => {
   e.preventDefault();
    alert("씨발");
    const arr = [];
    const color = document.getElementsByName("color");
    for (let i = 0; i < color.length; i++) {
        if (color[i].checked === true) {
            arr.push(color[i].value);
        }
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    for (let email of arr) {
        formData.append('email', email);
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
    }
});

