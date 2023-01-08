const container = window.document.getElementById('container');

const xhr = new XMLHttpRequest();
const formData = new FormData();
formData.append('id', container.querySelector('[rel="id"]'));
formData.append('password', container.querySelector('[rel="password"]'));
xhr.open('POST', './myPage');
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
            const responseObject = JSON.parse(xhr.responseText);
            switch (responseObject['result']) {
                case 'success':
                    break;
                case 'no_user':
                    alert('로그인이 필요한 서비스입니다.');
                    window.location.href = './login';
                    break;
                case 'failure':
                    break;
                default:
                    break;
            }
        }
    } else {

    }
}
xhr.send();

