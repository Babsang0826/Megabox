const form = window.document.getElementById('form');


form['findPassword'].addEventListener('click', () => {
    if (form['loginId'].value === '') {
        form['loginId'].focus();
        form.querySelector('[rel="warning-id"]').innerText = '아이디를 입력해 주세요'
        return;
    } else {
        form.querySelector('[rel="warning-id"]').innerText = ''
    }
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
        form['birthday'].focus();
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
        form['contact'].focus();
        return;
    } else {
        form.querySelector('[rel="warning-contact"]').innerText = ''
    }
    // if (form['email'].value === '') {
    //     form.querySelector('[rel="warning-email"]').innerText = '이메일을 입력해 주세요.'
    //     form['email'].focus();
    //     return;
    // } else {
    //     form.querySelector('[rel="warning-email"]').innerText = ''
    // }
    // if (!new RegExp('^(?=.{7,50})([\\da-zA-Z_.]{4,})@([\\da-z\\-]{2,}\\.)?([\\da-z\\-]{2,})\\.([a-z]{2,10})(\\.[a-z]{2})?$').test(form['email'].value)) {
    //     form.querySelector('[rel="warning-email"]').innerText = '올바른 이메일을 입력해 주세요.'
    //     form['email'].focus();
    //     return;
    // } else {
    //     form.querySelector('[rel="warning-email"]').innerText = ''
    // }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('id', form['loginId'].value);
    formData.append('name', form['name'].value);
    formData.append('birthday', form['birthday'].value);
    formData.append('contact', form['contact'].value);
    // formData.append('email', form['email'].value);
    xhr.open('POST', './userPasswordFind');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                console.log(responseObject);
                switch (responseObject['result']) {
                    case 'success':
                        alert("본인인증에 성공하였습니다. 비밀번호 재설정 페이지로 이동합니다.");
                        window.location.href = "http://localhost:8080/member/userPasswordReset"
                        // let password = responseObject['password'];
                        // let name = responseObject['name'];
                        // alert("성공입니다.\n" +name + "님의 Password는 " + password + "입니다." );
                        form['loginId'].setAttribute('disabled', 'disabled');
                        form['name'].setAttribute('disabled', 'disabled');
                        form['birthday'].setAttribute('disabled', 'disabled');
                        form['contact'].setAttribute('disabled', 'disabled');
                        break;
                    default:
                        alert("입력하신 정보와 일치하는 회원이 없습니다.")
                }
            } else {
                alert("서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.")
            }
        }
    };
    xhr.send(formData);
});


// form['passwordSend'].addEventListener('click', () => {
//     if (form['password'].value !== form['passwordCheck'].value) {
//         form.querySelector('[rel="warning-passwordCheck"]').innerText = '비밀번호가 일치하지 않습니다.'
//         form['passwordCheck'].focus();
//         form['passwordCheck'].select();
//         return;
//     }
//     if (form['password'].value === '') {
//         Warning.show('새로운 비밀번호를 입력해 주세요.');
//         form['password'].focus();
//         return;
//     }
//     const xhr = new XMLHttpRequest();
//     const formData = new FormData();
//     formData.append('id', form['loginId'].value);
//     formData.append('code', form['code'].value);
//     formData.append('salt', form['salt'].value);
//     formData.append('password', form['password'].value);
//     xhr.open('PATCH', './userPasswordFind');
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             Cover.hide();
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 const responseObject = JSON.parse(xhr.responseText);
//                 switch (responseObject['result']) {
//                     case'success':
//                         alert('비밀번호를 성공적으로 재설정하였습니다.\n\n확인을 누르면 로그인 페이지로 이동합니다.')
//                         window.location.href = 'login';
//                         break;
//
//                     default:
//                         Warning.show('비밀번호를 재설정하지 못하였습니다. 세션이 만료되었을 수도 있습니다. 잠시 후 다시 시도해주세요.')
//                 }
//             } else {
//                 Warning.show('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.')
//             }
//         }
//     };
//     xhr.send(formData);
// });

