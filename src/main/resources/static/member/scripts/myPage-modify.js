const container = window.document.getElementById('container');

//휴대폰번호 변경 클릭 시
const mobile = container.querySelector('[rel="mobile"]');
const changeBtn = mobile.querySelector('[rel="changeBtn"]');
const changeMobileDiv = mobile.querySelector('.change-mobile');
// const mobileModifyBtn = mobile.querySelector('[rel="mobileModifyBtn"]');
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
    // if (mobile.querySelector('.new-mobile').value === '') {
    //     mobile.querySelector('.new-mobile').focus();
    //     alert('변경할 내용이 존재하지 않습니다.');
    //     return false;
    // }
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

container.querySelector('.delete-account')?.addEventListener('click', e => {
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
})

//등록 버튼 클릭 시
// const submitBtn = container.querySelector('[rel="submitBtn"]');
//
// submitBtn.addEventListener('click', () => {
//     alert('수정이 완료되었습니다.');
//     return window.location.href = 'http://localhost:8080/movie/myPage';
// });







