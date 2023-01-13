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

const seatContainers = document.querySelectorAll('[rel="seatContainer"]');
seatContainers.forEach(seatContainer => {
    const seats = seatContainer.querySelectorAll('[rel="seat"]');
    const paymentObject = {
        '12000': [],
        '9000': [],
        '5000': []
    };

    const emptyDiv = document.createElement('div');
    const emptyDiv2 = document.createElement('div');
    emptyDiv2.innerText = '좌석 : ';
    seatContainer.append(emptyDiv);
    seatContainer.append(emptyDiv2);

    seats.forEach(seat => {
        const payment = seat.dataset.payment;
        const seatColRow = seat.dataset.seat;
        paymentObject[payment].push(seatColRow);

        const span = document.createElement('span');
        span.innerText = `${seatColRow} `;
        emptyDiv2.append(span);
        emptyDiv2.style.paddingTop = '7px';

    });

    ['12000', '9000', '5000'].forEach(price => {
        const span = document.createElement('span');
        // const span = document.createElement('span');
        // div.innerText = `${price === '12000' ? '성인' : price === '9000' ? '청소년' : '우대'} ${paymentObject[price].length}명 ${paymentObject[price].join(', ')}`;
        span.innerText = `${price === '12000' ? '성인' : price === '9000' ? '청소년' : '우대'} ${paymentObject[price].length + ' '}`;
        if (paymentObject[price].length !== 0) {
            emptyDiv.append(span);
        }
    });
});

const bookingCancels = document.querySelectorAll('.book-cancel');

for (let bookingCancel of bookingCancels) {
    bookingCancel.addEventListener('click', () => {
        if (!confirm('정말로 예매를 취소하시겠습니까?')) {
            return;
        }
        const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('screenInfoIndex', bookingCancel.parentNode.parentNode.querySelector('[rel="hiddenSid"]').value);
            xhr.open('DELETE', './myPage');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const responseObject = JSON.parse(xhr.responseText);
                        switch (responseObject['result']) {
                            case 'success':
                                alert('예매 취소 완료');
                                window.location.reload();
                                break;
                            case 'failure':
                                alert('예매 취소 실패');
                                break;
                        }
                    }
                } else {
                }
            }
            xhr.send(formData);
    })
}


const userInfo = {
    name: 'chltmdaud',
    id : "choi4349",
    pw : "1234"
}

const aTag = document.querySelector('[rel="aa"]');
aTag.addEventListener('click', () => {
    localStorage.setItem("user-info", JSON.stringify(userInfo));
    alert('보냄');
})
