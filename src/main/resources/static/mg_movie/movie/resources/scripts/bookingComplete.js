const seatContainers = document.querySelectorAll('[rel="seatContainer"]');
// const seatContainer = document.querySelector('[rel="seatContainer"]');
const personContainer = document.querySelector('[rel="personContainer"]');
// seatContainers.forEach(seatContainer => {
//     const seats = seatContainer.querySelectorAll('[rel="seat"]');
//     const paymentObject = {
//         '12000': [],
//         '9000': [],
//         '5000': []
//     };
//
//     const emptySpan = document.createElement('span');
//     const emptyP = document.createElement('p');
//     const emptySpan2 = document.createElement('span');
//     const emptyP2 = document.createElement('p');
//     emptySpan.innerText = '관람인원';
//     emptySpan2.innerText = '좌석번호';
//     personContainer.append(emptySpan);
//     personContainer.append(emptyP);
//     seatContainer.append(emptySpan2);
//     seatContainer.append(emptyP2);
//
//     seats.forEach(seat => {
//         const payment = seat.dataset.payment;
//         const seatColRow = seat.dataset.seat;
//         paymentObject[payment].push(seatColRow);
//         emptyP2.innerText = `${seatColRow}`;
//     });
//
//     ['12000', '9000', '5000'].forEach(price => {
//         emptyP.innerText = `${price === '12000' ? '성인' : price === '9000' ? '청소년' : '우대'} ${paymentObject[price].length + '명 '}`;
//         // if (paymentObject[price].length !== 0) {
//         //     // seatContainer.append(p);
//         //     // emptyDiv.style.paddingTop = '7px';
//         // }
//     });
// });


seatContainers.forEach(seatContainer => {
    const seats = seatContainer.querySelectorAll('[rel="seat"]');
    const paymentObject = {
        '12000': [],
        '9000': [],
        '5000': []
    };

    const emptySpan = document.createElement('span');
    const emptySpan2 = document.createElement('span');
    emptySpan.innerText = '관람인원';
    emptySpan2.innerText = '좌석번호';
    personContainer.append(emptySpan);
    seatContainer.append(emptySpan2);

    seats.forEach(seat => {
        const payment = seat.dataset.payment;
        const seatColRow = seat.dataset.seat;
        paymentObject[payment].push(seatColRow);

        const emptyP2 = document.createElement('p');
        emptyP2.innerText = `${seatColRow} `;
        seatContainer.append(emptyP2);

    });

    ['12000', '9000', '5000'].forEach(price => {
        const emptyP = document.createElement('p');
        emptyP.innerText = `${price === '12000' ? '성인' : price === '9000' ? '청소년' : '우대'} ${paymentObject[price].length}`;
        if (paymentObject[price].length !== 0) {
            personContainer.append(emptyP);
        }
    });
});

const { name, id, pw } = JSON.parse(localStorage.getItem("user-info"));
localStorage.remove("user-info");
console.log(id, name, pw); // 아이디 이름 비밀번호


