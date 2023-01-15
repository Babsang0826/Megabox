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
    const emptyDiv3 = document.createElement('div');
    const emptyDiv5 = document.createElement('div');
    const emptyDiv6 = document.createElement('div');
    const emptyDiv4 = document.createElement('div');
    const emptyP = document.createElement('p');
    const emptyP2 = document.createElement('p');
    const emptyP3 = document.createElement('p');
    const emptyP4 = document.createElement('p');
    // emptyDiv2.innerText = '좌석 : ';
    emptyDiv.classList.add('item', 'column');
    emptyDiv3.classList.add('item', 'column');
    emptyDiv5.classList.add('item', 'column');
    // emptyDiv6.classList.add('item');
    emptyP.innerText = '관람인원';
    emptyP2.innerText = '관람좌석';
    emptyP3.innerText = '적립포인트';
    seatContainer.append(emptyDiv, emptyDiv2, emptyDiv3, emptyDiv4, emptyDiv5, emptyDiv6);
    emptyDiv.append(emptyP);
    emptyDiv3.append(emptyP2);
    emptyDiv5.append(emptyP3);

    seats.forEach(seat => {
        const payment = seat.dataset.payment;
        const seatColRow = seat.dataset.seat;
        paymentObject[payment].push(seatColRow);

        const p = document.createElement('p');
        p.innerText = `${seatColRow} `;
        emptyDiv4.append(p);
        // emptyDiv2.style.paddingTop = '7px';
    });

    ['12000', '9000', '5000'].forEach(price => {
        const p = document.createElement('p');
        p.innerText = `${price === '12000' ? '성인' : price === '9000' ? '청소년' : '우대'} ${paymentObject[price].length + ' '}`;
        if (paymentObject[price].length !== 0) {
            emptyDiv2.append(p);
        }
    });



    let point = ((paymentObject['12000'].length * 12000) + (paymentObject['9000'].length * 9000) + (paymentObject['5000'].length * 5000)) * 0.005;

    emptyP4.innerText = `${point}P`;
    emptyDiv6.append(emptyP4)

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
                            swal('알림', '예매 취소 완료');
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000);
                            break;
                        case 'failure':
                            swal('알림', '예매 취소 실패');
                            break;
                    }
                }
            } else {
            }
        }
        xhr.send(formData);
    })
}





