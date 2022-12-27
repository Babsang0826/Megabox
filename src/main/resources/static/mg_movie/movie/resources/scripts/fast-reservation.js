const nextBtn = window.document.getElementById('nextBtn'); // 다음버튼
const previousBtn = window.document.getElementById('previousBtn'); // 이전버튼
const timeBox = window.document.querySelector('.time-box'); // 보여줘야 할 칸

//

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
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current" style="color: red">' + i + '•' + thisWeek + '</div>';
    } else if (thisWeek === '토') {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current" style="color: blue">' + i + '•' + thisWeek + '</div>';
    } else if (thisWeek !== '토' && thisWeek !== '일' && i !== currentDay) {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current">' + i + '•' + thisWeek + '</div>';
    } else {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current">' + i + '•' + thisWeek + '</div>';
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

// 에약 Day클릭 로직
const movieDay = window.document.querySelectorAll('.day');
const listBox = window.document.querySelectorAll('.list-box');
for (let j = 0; j < listBox.length; j++) {
    for (let i = 0; i < movieDay.length; i++) {
        listBox[j].style.cursor = 'default';
        listBox[j].style.opacity = '40%';
        movieDay[0].style.backgroundColor = 'rgb(235,235,235)';
        movieDay[i].addEventListener('click', () => {
            if (listBox[j].querySelector('[rel="release-date"]').value > thisMonthArr[i]) {
                listBox[j].style.cursor = 'default';
                listBox[j].style.opacity = '40%';
            }
            if (listBox[j].querySelector('[rel="release-date"]').value <= thisMonthArr[i]) {
                listBox[j].style.cursor = 'pointer';
                listBox[j].style.opacity = '100%';
            }
            if (listBox[j].querySelector('[rel="end-date"]').value < thisMonthArr[i]) {
                listBox[j].style.cursor = 'default';
                listBox[j].style.opacity = '40%';
            } else if (listBox[j].querySelector('[rel="end-date"]').value <= thisMonthArr[i]) {
                listBox[j].style.cursor = 'pointer';
                listBox[j].style.opacity = '100%';
            }


            if (listBox[j].querySelector('[rel="release-date"]').value > nextMonthArr[i - (thisMonthArr.length)]) {
                listBox[j].style.cursor = 'default';
                listBox[j].style.opacity = '40%';
            } else if (listBox[j].querySelector('[rel="release-date"]').value <= nextMonthArr[i - (thisMonthArr.length)]) {
                listBox[j].style.cursor = 'pointer';
                listBox[j].style.opacity = '100%';
            }
            if (listBox[j].querySelector('[rel="end-date"]').value < nextMonthArr[i - (thisMonthArr.length)]) {
                listBox[j].style.cursor = 'default';
                listBox[j].style.opacity = '40%';
            } else if (listBox[j].querySelector('[rel="end-date"]').value <= nextMonthArr[i - (thisMonthArr.length)]) {
                listBox[j].style.cursor = 'pointer';
                listBox[j].style.opacity = '100%';
            }
            movieDay[0].style.backgroundColor = 'rgb(255, 255, 255)';
            if (movieDay[i].classList[0] === 'on') {
                movieDay[i].classList.remove('on');
            } else {
                for (let i = 0; i < movieDay.length; i++) {
                    movieDay[i].classList.remove('on');
                }
                movieDay[i].classList.add('on');
            }
            movieDay[0].addEventListener('click', () => {
                    movieDay[0].style.backgroundColor = 'rgb(235, 235, 235)';
            })
        });
    }
    listBox[j].addEventListener('click', () => {
        if (listBox[j].classList[0] === 'on') {
            listBox[j].classList.remove('on');
        } else {
            for (let i = 0; i < listBox.length; i++) {
                listBox[i].classList.remove('on');
            }
            listBox[j].classList.add('on');
        }
    });

}


const regionSeoul = window.document.querySelector('.region-seoul');
const regionGyeonggi = window.document.querySelector('.region-gyeonggi');
const regionIncheon = window.document.querySelector('.region-incheon');
const regionDaejeon = window.document.querySelector('.region-daejeon');
const regionGyeongsang = window.document.querySelector('.region-gyeongsang');
const regionJeonla = window.document.querySelector('.region-jeonla');
const regionGangwon = window.document.querySelector('.region-gangwon');

const seoulCity = window.document.querySelector('.seoul-city');
const gyeonggiCity = window.document.querySelector('.gyeonggi-city');
const incheonCity = window.document.querySelector('.incheon-city');
const daejeonCity = window.document.querySelector('.daejeon-city');
const gyeongsangCity = window.document.querySelector('.gyeongsang-city');
const jeonlaCity = window.document.querySelector('.jeonla-city');
const gangwonCity = window.document.querySelector('.gangwon-city');

const seoulLi = window.document.querySelectorAll('.seoul');
const gyeonggiLi = window.document.querySelectorAll('.gyeonggi');
const incheonLi = window.document.querySelectorAll('.incheon');
const daejeonLi = window.document.querySelectorAll('.daejeon');
const gyeongsangLi = window.document.querySelectorAll('.gyeongsang');
const jeonlaLi = window.document.querySelectorAll('.jeonla');
const gangwonLi = window.document.querySelectorAll('.gangwon');


function alert() {
    swal("알림", "극장은 최대 3개까지 선택이 가능합니다.");
}

regionSeoul.addEventListener('click', () => {
    regionSeoul.style.backgroundColor = 'rgb(235, 235, 235)';
    regionIncheon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionJeonla.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeonggi.style.backgroundColor = 'rgb(255, 255, 255)';
    regionDaejeon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGangwon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeongsang.style.backgroundColor = 'rgb(255, 255, 255)';
    seoulCity.classList.add('on');
    gyeonggiCity.classList.remove('on');
    incheonCity.classList.remove('on');
    daejeonCity.classList.remove('on');
    jeonlaCity.classList.remove('on');
    gyeongsangCity.classList.remove('on');
    gangwonCity.classList.remove('on');
    let count = 0;
    for (let i = 0; i < seoulLi.length; i++) {
        seoulLi[i].addEventListener('click', () => {
            seoulLi[i].classList.toggle('on');
            if (seoulLi[i].classList.contains('on')) {
                count++;
            } else {
                count--;
            }
            if (count > 3) {
                alert('극장은 최대 3개까지 선택이 가능합니다.');
                seoulLi[i].classList.remove('on');
                count = 3;
            }
        });
    }
});


regionGyeonggi.addEventListener('click', () => {
    regionGyeonggi.style.backgroundColor = 'rgb(235, 235, 235)';
    regionSeoul.style.backgroundColor = 'rgb(255,255,255)';
    regionJeonla.style.backgroundColor = 'rgb(255, 255, 255)';
    regionDaejeon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGangwon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeongsang.style.backgroundColor = 'rgb(255, 255, 255)';
    regionIncheon.style.backgroundColor = 'rgb(255, 255, 255)';
    gyeonggiCity.classList.add('on');
    seoulCity.classList.remove('on');
    incheonCity.classList.remove('on');
    daejeonCity.classList.remove('on');
    jeonlaCity.classList.remove('on');
    gyeongsangCity.classList.remove('on');
    gangwonCity.classList.remove('on');
    let count = 0;
    for (let i = 0; i < gyeonggiLi.length; i++) {
        gyeonggiLi[i].addEventListener('click', () => {
            gyeonggiLi[i].classList.toggle('on');
            if (gyeonggiLi[i].classList.contains('on')) {
                count++;
            } else {
                count--;
            }
            if (count > 3) {
                alert('극장은 최대 3개까지 선택이 가능합니다.');
                gyeonggiLi[i].classList.remove('on');
                count = 3;
            }
        });
    }
});

regionIncheon.addEventListener('click', () => {
    regionIncheon.style.backgroundColor = 'rgb(235, 235, 235)';
    regionSeoul.style.backgroundColor = 'rgb(255, 255, 255)';
    regionJeonla.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeonggi.style.backgroundColor = 'rgb(255, 255, 255)';
    regionDaejeon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGangwon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeongsang.style.backgroundColor = 'rgb(255, 255, 255)';
    incheonCity.classList.add('on');
    seoulCity.classList.remove('on');
    gyeonggiCity.classList.remove('on');
    daejeonCity.classList.remove('on');
    jeonlaCity.classList.remove('on');
    gyeongsangCity.classList.remove('on');
    gangwonCity.classList.remove('on');
    let count = 0;
    for (let i = 0; i < incheonLi.length; i++) {
        incheonLi[i].addEventListener('click', () => {
            incheonLi[i].classList.toggle('on');
            if (incheonLi[i].classList.contains('on')) {
                count++;
            } else {
                count--;
            }
            if (count > 3) {
                alert('극장은 최대 3개까지 선택이 가능합니다.');
                incheonLi[i].classList.remove('on');
                count = 3;
            }
        });
    }
});

regionDaejeon.addEventListener('click', () => {
    regionDaejeon.style.backgroundColor = 'rgb(235, 235, 235)';
    regionSeoul.style.backgroundColor = 'rgb(255,255,255)';
    regionJeonla.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeonggi.style.backgroundColor = 'rgb(255, 255, 255)';
    regionIncheon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGangwon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeongsang.style.backgroundColor = 'rgb(255, 255, 255)';
    daejeonCity.classList.add('on');
    seoulCity.classList.remove('on');
    gyeonggiCity.classList.remove('on');
    incheonCity.classList.remove('on');
    jeonlaCity.classList.remove('on');
    gyeongsangCity.classList.remove('on');
    gangwonCity.classList.remove('on');
    let count = 0;
    for (let i = 0; i < daejeonLi.length; i++) {
        daejeonLi[i].addEventListener('click', () => {
            daejeonLi[i].classList.toggle('on');
            if (daejeonLi[i].classList.contains('on')) {
                count++;
            } else {
                count--;
            }
            if (count > 3) {
                alert('극장은 최대 3개까지 선택이 가능합니다.');
                daejeonLi[i].classList.remove('on');
                count = 3;
            }
        });
    }
});

regionGyeongsang.addEventListener('click', () => {
    regionGyeongsang.style.backgroundColor = 'rgb(235, 235, 235)';
    regionSeoul.style.backgroundColor = 'rgb(255,255,255)';
    regionJeonla.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeonggi.style.backgroundColor = 'rgb(255, 255, 255)';
    regionIncheon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGangwon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionDaejeon.style.backgroundColor = 'rgb(255, 255, 255)';
    gyeongsangCity.classList.add('on');
    seoulCity.classList.remove('on');
    gyeonggiCity.classList.remove('on');
    incheonCity.classList.remove('on');
    daejeonCity.classList.remove('on');
    jeonlaCity.classList.remove('on');
    gangwonCity.classList.remove('on');
    let count = 0;
    for (let i = 0; i < gyeongsangLi.length; i++) {
        gyeongsangLi[i].addEventListener('click', () => {
            gyeongsangLi[i].classList.toggle('on');
            if (gyeongsangLi[i].classList.contains('on')) {
                count++;
            } else {
                count--;
            }
            if (count > 3) {
                alert('극장은 최대 3개까지 선택이 가능합니다.');
                gyeongsangLi[i].classList.remove('on');
                count = 3;
            }
        });
    }
});

regionJeonla.addEventListener('click', () => {
    regionJeonla.style.backgroundColor = 'rgb(235, 235, 235)';
    regionSeoul.style.backgroundColor = 'rgb(255,255,255)';
    regionDaejeon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeonggi.style.backgroundColor = 'rgb(255, 255, 255)';
    regionIncheon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGangwon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeongsang.style.backgroundColor = 'rgb(255, 255, 255)';
    jeonlaCity.classList.add('on');
    seoulCity.classList.remove('on');
    gyeonggiCity.classList.remove('on');
    incheonCity.classList.remove('on');
    daejeonCity.classList.remove('on');
    gyeongsangCity.classList.remove('on');
    gangwonCity.classList.remove('on');
    let count = 0;
    for (let i = 0; i < jeonlaLi.length; i++) {
        jeonlaLi[i].addEventListener('click', () => {
            jeonlaLi[i].classList.toggle('on');
            if (jeonlaLi[i].classList.contains('on')) {
                count++;
            } else {
                count--;
            }
            if (count > 3) {
                alert('극장은 최대 3개까지 선택이 가능합니다.');
                jeonlaLi[i].classList.remove('on');
                count = 3;
            }
        });
    }
});

regionGangwon.addEventListener('click', () => {
    regionGangwon.style.backgroundColor = 'rgb(235, 235, 235)';
    regionSeoul.style.backgroundColor = 'rgb(255,255,255)';
    regionDaejeon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeonggi.style.backgroundColor = 'rgb(255, 255, 255)';
    regionIncheon.style.backgroundColor = 'rgb(255, 255, 255)';
    regionGyeongsang.style.backgroundColor = 'rgb(255, 255, 255)';
    regionJeonla.style.backgroundColor = 'rgb(255, 255, 255)';
    gangwonCity.classList.add('on');
    seoulCity.classList.remove('on');
    gyeonggiCity.classList.remove('on');
    incheonCity.classList.remove('on');
    daejeonCity.classList.remove('on');
    gyeongsangCity.classList.remove('on');
    jeonlaCity.classList.remove('on');
    let count = 0;
    for (let i = 0; i < gangwonLi.length; i++) {
        gangwonLi[i].addEventListener('click', () => {
            gangwonLi[i].classList.toggle('on');
            if (gangwonLi[i].classList.contains('on')) {
                count++;
            } else {
                count--;
            }
            if (count > 3) {
                alert('극장은 최대 3개까지 선택이 가능합니다.');
                gangwonLi[i].classList.remove('on');
                count = 3;
            }
        });
    }
});

const timeWrap = window.document.querySelector('.time-wrap');

const previousTimeBtn = window.document.getElementById('previousTimeBtn');
const nextTimeBtn = window.document.getElementById('nextTimeBtn');

// time 시간표
for (let i = 0; i <= 28; i++) {
    if (i < 10) {
        timeWrap.innerHTML = timeWrap.innerHTML + '<div class="time" style="width: 1.2rem " >' + '0' + i + '</div>';
    } else {
        timeWrap.innerHTML = timeWrap.innerHTML + '<div class="time" style="width: 1.2rem " >' + i + '</div>';
    }
}

let currentTimeIdx = 0;
let slideTimeWidth = 1.2;
let slideTimeMargin = 1.2;
let slideTimeSpeed = 500;

nextTimeBtn.addEventListener('click', function () {
    moveTimeSlide(currentTimeIdx + 1);
    if (currentTimeIdx > 19) {
        timeWrap.style.left = '-45.5rem';
        currentTimeIdx = 19;
    }
});

previousTimeBtn.addEventListener('click', function () {
    moveTimeSlide(currentTimeIdx - 1);
    if (currentTimeIdx < 0) {
        timeWrap.style.left = '0rem';
        currentTimeIdx = 0;
    }
});

function moveTimeSlide(num) {
    timeWrap.style.left = -num * (slideTimeWidth + slideTimeMargin) + 'rem';
    timeWrap.style.transition = slideTimeSpeed + 'ms';
    currentTimeIdx = num;
}
