const container = window.document.getElementById('container');

// 인원 선택
const cell = container.querySelectorAll('[rel="cell"]');
const counts = container.querySelectorAll('[rel="cnt"]');
const texts = container.querySelectorAll('[rel="text"]');
const plusBtns = container.querySelectorAll('[rel="upBtn"]');
const minusBtns = container.querySelectorAll('[rel="downBtn"]');
let totalCnt;

for (let i = 0; i < cell.length; i++) {
    const plusBtn = plusBtns[i]
    const minusBtn = minusBtns[i];
    const count = counts[i];
    const text = texts[i];
    let number = count.innerText;


    totalCnt = parseInt(number);

    plusBtn.addEventListener('click', () => {
        number = parseInt(number) + 1;
        totalCnt = parseInt(totalCnt) + 1;

        if (totalCnt === 9) {
            alert('최대 8명까지 가능합니다');
            totalCnt = 8;
            number = number - 1;
            return;
        }
        count.innerText = number;
    });

    totalCnt = number;

    minusBtn.addEventListener('click', () => {
        number = parseInt(number) - 1;
        if (number < 0) {
            number = 0;
        }
        totalCnt -= 1;
        let chosenSeatCnt = seatArea.querySelectorAll('.row.on').length;

        //인원의 총 합이 선택된 좌석 수 보다 적을 시
        if (totalCnt < chosenSeatCnt) {
            if (!confirm('좌석을 초기화하시겠습니까?')) {
                return;
            }
            return window.location.reload();
        }
        count.innerText = number;
    });
}

// const payArea = container.querySelector('[rel="payArea"]');
// const personType = payArea.querySelector('.type');
// const personCnt = payArea.querySelector('.p-cnt');
//
// for (let i = 0; i < personType.length; i++) {
//     console.log(personType[i]);
//     console.log(personCnt[i]);
// }

//초기화 버튼 클릭
const resetBtn = container.querySelectorAll('.reset-button');

for (let i = 0; i < resetBtn.length; i++) {
    resetBtn[i].addEventListener('click', () => {
        if (!confirm('정말로 초기화 하시겠습니까?')) {
            return;
        }
        return window.location.reload();
    })
}

//좌석 클릭 시
const seatArea = container.querySelector('[rel="seatArea"]');
const seats = seatArea.querySelectorAll('[rel="row"]');
let selectedSeats = container.querySelectorAll('[rel="selectedSeat"]');
// const selections = Array.from(selectedSeats);


//좌석 선택시
const sortSelections = () => {
    const selections = Array.from(selectedSeats);
    let lastOrder = 0;
    for (let selection of selections) {
        if (!selection.classList.contains('choice')) {
            selection.style.order = '999';
        } else {
            const row = selection.textContent.slice(0,1).codePointAt(0);
            const col = parseInt(selection.textContent.slice(1,2));
            const order = (row * 10) + col;
            selection.style.order = order;
        }
    }
}

for (let i = 0; i < seats.length; i++) {
    const seat = seats[i];
    seat.addEventListener('click', () => {
        if (totalCnt === '0') {
            alert('인원을 먼저 선택해주세요.');
            return;
        }
        let chosenSeatCnt = seatArea.querySelectorAll('.row.on').length

        if (chosenSeatCnt + 1 > totalCnt && !seat.classList.contains('on')) {
            alert('좌석 선택이 완료되었습니다.');
            return;
        }

        if (seat.classList.contains('on')) {
            seat.classList.remove('on');
            const selections = Array.from(selectedSeats);
            const selection = selections.filter(x => x.textContent === seat.value)[0];
            selection.classList.remove('choice');
            selection.innerText = '-';
        } else {
        seat.classList.add('on');
        const selections = Array.from(selectedSeats);
            for (let selection of selections) {
                if (!selection.classList.contains('choice')) {
                    selection.classList.add('choice');
                    selection.innerText = `${seat.value}`;
                    break;
                }
            }
        }
        sortSelections();
    });
}

//인원 선택시
const payArea = container.querySelector('[rel="payArea"]');
let person = Array.from(texts);


//seat 버튼 이벤트
const seatNext = container.querySelector('.next');
const seatSelect = container.querySelector('[rel="seatSelect"]');
const seatSelectPayment = container.querySelector('[rel="seatSelectPayment"]');
seatNext.addEventListener('click', () => {
    seatSelectPayment.classList.add('on');
    seatSelect.classList.remove('on');
});

//payment 버튼 이벤트
const seatPrev = container.querySelector('.prev');
seatPrev.addEventListener('click', () => {
    seatSelectPayment.classList.remove('on');
    seatSelect.classList.add('on');
})


//할인 박스 클릭시
const discountTitles = container.querySelectorAll('.discount-title');
const point = container.querySelectorAll('.point');

for (let i = 0; i < discountTitles.length; i++) {
    const discountTitle = discountTitles[i];
    discountTitle.addEventListener('click', () => {
        point[i].classList.toggle('on');
    })
}

//결제 수단
const paymentChecks = container.querySelectorAll('input[name = radio]');
const payment = container.querySelectorAll('.payments');

for (let i = 0; i < paymentChecks.length; i++) {
    const paymentCheck = paymentChecks[i];

    paymentCheck.addEventListener('click', () => {
        for (let k = 0; k < payment.length; k++) {
            if (paymentChecks[k].checked) {
                payment[i].classList.add('on');
            } else {
                payment[k].classList.remove('on')
            }
        }
    });
}





