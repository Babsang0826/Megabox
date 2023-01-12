const container = window.document.getElementById('container');
const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

console.log(korean.test('안녕'));
// 인원 선택
const cell = container.querySelectorAll('[rel="cell"]');
const counts = container.querySelectorAll('[rel="cnt"]');
const texts = container.querySelectorAll('[rel="text"]');
const plusBtns = container.querySelectorAll('[rel="upBtn"]');
const minusBtns = container.querySelectorAll('[rel="downBtn"]');
const payArea = container.querySelector('[rel="payArea"]');
const type = payArea.querySelectorAll('.type');
const dataTitle = container.querySelectorAll('[rel="dataTitle"]');
const data = container.querySelectorAll('.data');
const price = payArea.querySelector('.price');
const totalPrice = container.querySelector('.total-price');
const finalPrice = container.querySelector('[rel="finalPrice"]');
const adultPrice = container.querySelector('.adultPrice');
const teenagerPrice = container.querySelector('.teenagerPrice');
const etcPrice = container.querySelector('.etcPrice');

let person = Array.from(texts);
let totalCnt;
let personCnt = [0, 0, 0];


for (let i = 0; i < cell.length; i++) {
    const plusBtn = plusBtns[i]
    const minusBtn = minusBtns[i];
    const count = counts[i];
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

        //인원 수 카운트 시 총 결제 금액 값 변경
        personCnt[i] = number
        person[i] = texts[i]
        type[i].innerText = person[i].textContent + ' ' + personCnt[i];
        dataTitle[i].innerText = type[i].innerText;
        if (korean.test(type[i].innerText) === true) {
            type[i].style.paddingRight = '0.5rem';
        }

        if (korean.test(dataTitle[i].innerText) === true) {
            data[i].style.display = 'flex';
            data[i].style.alignItems = 'center';
            data[i].style.justifyContent = 'space-between';
        }

        let adultTotalPrice = `${parseInt(adultCount.innerText) * 12000}`
        let teenagerTotalPrice = `${parseInt(teenagerCount.innerText) * 9000}`
        let etcTotalPrice = `${parseInt(etcCount.innerText) * 5000}`
        let sumPrice = parseInt(adultTotalPrice) + parseInt(teenagerTotalPrice) + parseInt(etcTotalPrice)

        price.innerText = sumPrice;
        totalPrice.innerText = sumPrice;
        finalPrice.innerText = sumPrice;
        adultPrice.innerText = adultTotalPrice;
        teenagerPrice.innerText = teenagerTotalPrice;
        etcPrice.innerText = etcTotalPrice;


        console.log('찐 totalPrice : ' + totalPrice)
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

        personCnt[i] = number
        person[i] = texts[i]
        type[i].innerText = person[i].textContent + ' ' + personCnt[i];
        dataTitle[i].innerText = type[i].innerText;
        if (type[i].textContent === '') {
            type[i].style.padding = 0;
        }
        console.log(type[i]);

        // const price = payArea.querySelector('.price');
        let adultTotalPrice = `${parseInt(adultCount.innerText) * 12000}`
        let teenagerTotalPrice = `${parseInt(teenagerCount.innerText) * 9000}`
        let etcTotalPrice = `${parseInt(etcCount.innerText) * 5000}`

        let sumPrice = parseInt(adultTotalPrice) + parseInt(teenagerTotalPrice) + parseInt(etcTotalPrice);

        price.innerText = sumPrice;
        totalPrice.innerText = sumPrice;
        finalPrice.innerText = sumPrice;
        adultPrice.innerText = adultTotalPrice;
        teenagerPrice.innerText = teenagerTotalPrice;
        etcPrice.innerText = etcTotalPrice;

    });
}

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

//좌석 정렬 함수
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

let chosenSeatTotalCnt = 0;

for (let i = 0; i < seats.length; i++) {
    const seat = seats[i];
    seat.addEventListener('click', () => {
        if (totalCnt === '0') {
            alert('인원을 먼저 선택해주세요.');
            return;
        }
        let chosenSeatCnt = seatArea.querySelectorAll('.row.on').length
        chosenSeatTotalCnt = chosenSeatCnt + 1

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

//좌석 선택에서 다음 클릭 시
const seatNext = container.querySelector('.next');
seatNext.addEventListener('click', () => {
    let selectedSeat = container.querySelectorAll('.seat.choice').length;
    if (totalCnt > selectedSeat - 1) {
        alert('인원 수에 맞게 좌석을 선택해주세요.');
        return;
    }
    if (chosenSeatTotalCnt === 0) {
        alert('인원 및 좌석 선택을 먼저 해주세요.');
        return;
    }
    seatSelectPayment.classList.add('on');
    seatSelect.classList.remove('on');
});

//payment 버튼 이벤트
const seatSelect = container.querySelector('[rel="seatSelect"]');
const seatSelectPayment = container.querySelector('[rel="seatSelectPayment"]');

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
const paymentMethods = container.querySelectorAll('.payment-methods');
const selectedPaymentMethod = container.querySelector('.thing');

for (let i = 0; i < paymentChecks.length; i++) {
    const paymentCheck = paymentChecks[i];

    paymentCheck.addEventListener('click', () => {
        for (let k = 0; k < payment.length; k++) {
            if (paymentChecks[k].checked) {
                payment[i].classList.add('on');
                selectedPaymentMethod.innerText = paymentMethods[i].innerText
            } else {
                payment[k].classList.remove('on')
            }
        }
    });
}





