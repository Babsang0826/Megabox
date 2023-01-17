const form = window.document.getElementById('form');

form['findId'].addEventListener('click', () => {
    if (form['name'].value === '') {
        form['name'].focus();
        form.querySelector('[rel="warning-name"]').innerText = '이름를 입력해 주세요'
        return;
    } else {
        form.querySelector('[rel="warning-name"]').innerText = ''
    }
    if (form['birthday'].value === '') {
        form['birthday'].focus();
        form.querySelector('[rel="warning-birthday"]').innerText = '생년월일 앞8자리를 입력해 주세요.'
        return;
    } else {
        form.querySelector('[rel="warning-birthday"]').innerText = ''
    }
    if (!new RegExp('^(19[0-9][0-9]|20\\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$').test(form['birthday'].value)) {
        form.querySelector('[rel="warning-birthday"]').innerText = '생년월일 양식이 맞지않습니다.'
        return;
    } else {
        form.querySelector('[rel="warning-birthday"]').innerText = ''
    }
    if(form['contact'].value === '') {
        form['contact'].focus();
        form.querySelector('[rel="warning-contact"]').innerText = '전화번호를 입력해 주세요.'
        return;
    } else {
        form.querySelector('[rel="warning-contact"]').innerText = ''
    }
    if (!new RegExp('^(01[016789]{1})[0-9]{3,4}[0-9]{4}$').test(form['contact'].value)) {
        form.querySelector('[rel="warning-contact"]').innerText = '전화번호 양식에 맞지않습니다.'
        return;
    } else {
        form.querySelector('[rel="warning-contact"]').innerText = ''
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('name', form['name'].value);
    formData.append('birthday', form['birthday'].value);
    formData.append('contact', form['contact'].value);
    xhr.open('POST', './userIdFind')
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        let id = responseObject['id'];
                        let name = responseObject['name'];
                        alert("성공입니다.\n" +name + "님의 ID는 " + id + "입니다." );
                        form['name'].setAttribute('disabled', 'disabled');
                        form['birthday'].setAttribute('disabled', 'disabled');
                        form['contact'].setAttribute('disabled', 'disabled');
                        break;
                    default:
                        swal("알림", "입력하신 정보와 일치하는 회원이 없습니다.")
                        form.querySelector('[rel="messageRow"]').classList.remove('visible');
                        form['goLogin'].classList.remove('visible');
                }
            } else {
                Warning.show('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);
});