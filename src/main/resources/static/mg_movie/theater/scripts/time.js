const nextBtn = window.document.getElementById('nextBtn'); // 다음버튼
const previousBtn = window.document.getElementById('previousBtn'); // 이전버튼
const timeBox = window.document.querySelector('.time-box'); // 보여줘야 할 칸
const reservationContainer = window.document.querySelector('.reservation-container');

let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // utc 표준시 도출
let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)\

// 위의 동적인 달력에 의한 임의 날짜 고르는 로직
let dateTwo = new Date();
let year = dateTwo.getFullYear();
let month = ('0' + (1 + dateTwo.getMonth())).slice(-2);
let day = ('0' + dateTwo.getDate()).slice(-2);


let currentYear = date.getFullYear(); // 현재 년도
let currentMonth = date.getMonth(); // 현재 달
let currentDay = today.getDate(); // 현재 날짜

// 이번 달의 마지막날 날짜와 요일 구하기
let endDay = new Date(currentYear, currentMonth + 1, 0);
let thisMonthLast = endDay.getDate(); // 현재달 마지막 날짜
let thisMonthLastWeek = endDay.getDay(); // 현재달 마지막 요일(인덱스)

let thisMonthArr = [];
let thisMonthArrCode = new Array();
let thisMonthDate;
// 이번달
for (let i = currentDay; i <= thisMonthLast; i++) {
    if (i < 10) {
        thisMonthDate = year + '-' + month + '-' + '0' + i;
    } else {
        thisMonthDate = year + '-' + month + '-' + i;
    }
    thisMonthArrCode = thisMonthDate;
    thisMonthArr.push(thisMonthArrCode);
    let WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    let week = new Date(date.setDate(i)).getDay();
    let thisWeek = WEEKDAY[week];
    if (thisWeek === '일') {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current" style="color: red">' + i + '<br>' + thisWeek + '</div>';
    } else if (thisWeek === '토') {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current" style="color: blue">' + i + '<br>' + thisWeek + '</div>';
    } else if (thisWeek !== '토' && thisWeek !== '일' && i !== currentDay) {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current">' + i  + '<br>' + thisWeek + '</div>';
    } else {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current">' + i  + '<br>' + thisWeek + '</div>';
    }
}


let nextMonthArr = [];
let nextMonthArrCode = new Array();
let nextMonthDate;
// 다음달
for (let i = 1; i <= 21 - (thisMonthLast - currentDay + 1); i++) {
    if (month === '12') {
        year = (date.getFullYear() + 1);
        month = (dateTwo.getMonth() + 1) - 11;
        if (month < 10) {
            month = '0' + month;
        }
        if (i < 10) {
            nextMonthDate = year + '-' + month + '-' + '0' + i;
        }
    } else if (i < 10) {
        nextMonthDate = year + '-' + month + '-' + '0' + i;
    } else {
        nextMonthDate = year + '-' + month + '-' + i;
    }
    nextMonthArrCode = nextMonthDate;
    nextMonthArr.push(nextMonthArrCode);
    let WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    let week = new Date(date.setDate(thisMonthLastWeek + i)).getDay();
    let thisWeek = WEEKDAY[week - 3];
    if (week < 3) {
        thisWeek = WEEKDAY[week + 4];
    }
    if (thisWeek === '일') {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day next" style="color: red">' + i + '•' + thisWeek + '</div>';
    } else if (thisWeek === '토') {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day next" style="color: blue">' + i + '•' + thisWeek + '</div>';
    } else {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day next">' + i + '•' + thisWeek + '</div>';
    }
}


let currentIdx = 0;
let slideWidth = 2;
let slideMargin = 2.35;
let slideSpeed = 500;

nextBtn.addEventListener('click', function () {
    moveSlide(currentIdx + 1);
    if (currentIdx > 7) {
        timeBox.style.left = '-30.45rem';
        currentIdx = 7;
    }
});

previousBtn.addEventListener('click', function () {
    moveSlide(currentIdx - 1);
    if (currentIdx < 0) {
        timeBox.style.left = '0rem';
        currentIdx = 0;
    }
});


function moveSlide(num) {
    timeBox.style.left = -num * (slideWidth + slideMargin) + 'rem';
    timeBox.style.transition = slideSpeed + 'ms';
    currentIdx = num;
}
