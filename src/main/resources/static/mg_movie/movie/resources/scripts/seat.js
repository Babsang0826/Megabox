const container = window.document.getElementById('container');
const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

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
            swal('알림', '최대 8명까지 가능합니다.');
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

        let adultTotalPrice = `${parseInt(adultCount.innerText) * 12000}`;
        let adultTotalCount = `${parseInt(adultCount.innerText)}`;
        let teenagerTotalPrice = `${parseInt(teenagerCount.innerText) * 9000}`;
        let teenagerTotalCount = `${parseInt(teenagerCount.innerText)}`;
        let etcTotalPrice = `${parseInt(etcCount.innerText) * 5000}`;
        let etcTotalCount = `${parseInt(etcCount.innerText)}`;
        let sumPrice = parseInt(adultTotalPrice) + parseInt(teenagerTotalPrice) + parseInt(etcTotalPrice);
        price.innerText = sumPrice;
        totalPrice.innerText = sumPrice;
        finalPrice.innerText = sumPrice;
        adultPrice.innerText = adultTotalPrice;
        adultPrice.dataset.value = adultTotalCount;
        teenagerPrice.innerText = teenagerTotalPrice;
        teenagerPrice.dataset.value = teenagerTotalCount;
        etcPrice.innerText = etcTotalPrice;
        etcPrice.dataset.value = etcTotalCount;
    });

    totalCnt = number;

    minusBtn.addEventListener('click', () => {
//
        number = parseInt(number) - 1;
        if (number < 0) {
            number = 0;
        }
        totalCnt -= 1;
        let chosenSeatCnt = seatArea.querySelectorAll('.row.on').length;

        //인원의 총 합이 선택된 좌석 수 보다 적을 시
        if (totalCnt < chosenSeatCnt) {
            if (!confirm('좌석을 초기화하시겠습니까?')) {
                totalCnt += 1;
                number += 1;
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

const homeReloadPrev = container.querySelector('.home-reload-button');
// const reloadSeatResultTitle = window.document.querySelector('.title-area')
// const reloadSeatResultInfo = window.document.querySelector('.info-area');
homeReloadPrev.addEventListener('click', e => {
    timeContainer.classList.remove('off');
    paymentContainer.classList.add('off');

})

//payment 버튼 이벤트
const seatSelect = container.querySelector('[rel="seatSelect"]');
const seatSelectPayment = container.querySelector('[rel="seatSelectPayment"]');

const seatPrev = container.querySelector('.prev');
seatPrev.addEventListener('click', () => {
    seatSelectPayment.classList.remove('on');
    seatSelect.classList.add('on');
    drawCompleteBookingInfo();
});


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





