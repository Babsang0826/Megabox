const seatContainers = document.querySelectorAll('[rel="seatContainer"]');
const personContainer = document.querySelector('[rel="personContainer"]');
const priceContainer = document.querySelector('[rel="priceContainer"]');
const pointContainer = document.querySelector('[rel="pointContainer"]');

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

const { totalPriceSend } = JSON.parse(localStorage.getItem("total-price"));
// localStorage.removeItem("total-price");
console.log(totalPriceSend);

const span = document.createElement('span');
const strong = document.createElement('strong');
const p = document.createElement('p');
span.innerText = '결제금액';
strong.innerText = totalPriceSend;
p.innerText = '원'

priceContainer.append(span, strong, p);

const span1 = document.createElement('span');
const em = document.createElement('em');
const span2 = document.createElement('span');
span1.innerText = '고객님의 적립 예정 포인트는';
em.innerText = `${totalPriceSend * 0.005}P`;
em.classList.add('point');
span2.innerText = '입니다.';
pointContainer.append(span1, em, span2);




