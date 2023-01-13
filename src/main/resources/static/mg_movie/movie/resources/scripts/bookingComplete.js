const drawCompleteBookingInfo = () => {
    const selectedTitleArea = window.document.querySelector('.title-area');
    const selectedInfoArea = window.document.querySelector('.info-area');

    const postAreaElement = window.document.createElement('div');
    postAreaElement.classList.add('post-area');
    const ticketNumberElement = window.document.createElement('p');
    ticketNumberElement.classList.add('ticket-number');
    const reservNumberElement = window.document.createElement('span');
    reservNumberElement.classList.add('reserv-number');
    const bookingNumElement = window.document.createElement('span');
    bookingNumElement.classList.add('booking-num');
    ticketNumberElement.append(reservNumberElement, bookingNumElement);
    const posterImgElement = window.document.createElement('img');
    posterImgElement.setAttribute('src', '');
    postAreaElement.append(ticketNumberElement, posterImgElement);
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



    const infoAreaElement = window.document.createElement('div');
    infoAreaElement.classList.add('info-area');
    const infoTopElement = window.document.createElement('div');
    infoTopElement.classList.add('info-top');
    const titleElement = window.document.createElement('p');
    titleElement.classList.add('title');
    const completeTextElement = window.document.createElement('strong');
    completeTextElement.innerText = '예매가 완료되었습니다!';
    titleElement.append(completeTextElement);
    const generalSpanElement = window.document.createElement('span');
    const iconElement = window.document.createElement('i');
    const secGeneralSpanElement = window.document.createElement('span');
    secGeneralSpanElement.innerText = '고객님의 적립예정 포인트는';
    const emElement = window.document.createElement('em');
    emElement.classList.add('point');
    emElement.innerText = '';
    const thirdGeneralSpanElement = window.document.createElement('span');
    thirdGeneralSpanElement.innerText = '입니다.';
    generalSpanElement.append(iconElement, secGeneralSpanElement, emElement, thirdGeneralSpanElement);
    infoTopElement.append(titleElement, generalSpanElement);

    const infoMiddleElement = window.document.createElement('div');
    infoMiddleElement.classList.add('info-middle');
    const ulElement = window.document.createElement('ul');
    const firstLiElement = window.document.createElement('li');
    firstLiElement.innerText = '아바타: 물의길 / 2D(자막)';
    const reservationMovieElement = window.document.createElement('span');
    reservationMovieElement.innerText = '예매영화';
    firstLiElement.append(reservationMovieElement);
    const secondLiElement = window.document.createElement('li');
    secondLiElement.innerText = '북대구(칠곡) / 4관';
    const branchElement = window.document.createElement('span');
    branchElement.innerText = '관람극장/상영관';
    secondLiElement.append(branchElement);
    const thirdLiElement = window.document.createElement('li');
    thirdLiElement.innerText = '2023-01-08 20:00';
    const bookingDateElement = window.document.createElement('span');
    bookingDateElement.innerText = '관람일시';
    thirdLiElement.append(bookingDateElement);
    const fourthLiElement = window.document.createElement('li');
    fourthLiElement.innerText = '성인 1명';
    const previewPersonElement = window.document.createElement('span');
    previewPersonElement.innerText = '관람인원';
    fourthLiElement.append(previewPersonElement);
    const fifthLiElement = window.document.createElement('li');
    fifthLiElement.innerText = 'A1';
    const seatNumberElement = window.document.createElement('span');
    seatNumberElement.innerText = '좌석번호';
    fifthLiElement.append(seatNumberElement);
    const sixthLiElement = window.document.createElement('li');
    sixthLiElement.innerText = '010-6811-0753';
    const numberElement = window.document.createElement('span');
    numberElement.innerText = '전화번호';
    sixthLiElement.append(numberElement);
    const seventhElement = window.document.createElement('li');
    const priceValueElement = window.document.createElement('span');
    priceValueElement.innerText = '결제정보';
    const strongElement = window.document.createElement('strong');
    strongElement.innerText = '12,000';
    seventhElement.append(priceValueElement, strongElement);
    ulElement.append(firstLiElement, secondLiElement, thirdLiElement, fourthLiElement, fifthLiElement, sixthLiElement, seventhElement);
    infoMiddleElement.append(ulElement);
    infoAreaElement.append(infoTopElement, infoMiddleElement);
}