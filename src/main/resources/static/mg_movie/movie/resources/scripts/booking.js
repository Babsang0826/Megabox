const nextBtn = window.document.getElementById('nextBtn'); // 다음버튼
const previousBtn = window.document.getElementById('previousBtn'); // 이전버튼
const timeBox = window.document.querySelector('.time-box'); // 보여줘야 할 칸

let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // utc 표준시 도출
let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)\

// 위의 동적인 달력에 의한 임의 날짜 고르는 로직
let dateTwo = new Date();
let year = dateTwo.getFullYear();
let month = ('0' + (1 + dateTwo.getMonth())).slice(-2);


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

function alertTwo() {
    swal("알림", "해당 일자에 상영 시간표가 없습니다.");
}


function alertOne() {
    swal("알림", "극장은 최대 3개까지 선택이 가능합니다.");
}


// 날짜 클릭시 나타나는 영화 및 날짜 클릭 관련 이벤트
const movieDay = window.document.querySelectorAll('.day'); // 날짜 클릭
const listBox = window.document.querySelectorAll('.list-box'); // 영화 클릭
for (let j = 0; j < listBox.length; j++) {
    for (let i = 0; i < movieDay.length; i++) {
        listBox[j].style.cursor = 'default';
        listBox[j].style.opacity = '40%';
        movieDay[0].style.backgroundColor = 'rgb(235,235,235)';
        movieDay[i].addEventListener('click', e => {
            e.preventDefault();

            if (listBox[j].querySelector('[rel="release-date"]').value > thisMonthArr[i]) {
                listBox[j].style.pointerEvents = 'none';
                listBox[j].style.opacity = '40%';
            }
            if (listBox[j].querySelector('[rel="release-date"]').value <= thisMonthArr[i]) {
                listBox[j].style.cursor = 'pointer';
                listBox[j].style.opacity = '100%';
            }
            if (listBox[j].querySelector('[rel="end-date"]').value < thisMonthArr[i]) {
                listBox[j].style.pointerEvents = 'none';
                listBox[j].style.opacity = '40%';
            } else if (listBox[j].querySelector('[rel="end-date"]').value <= thisMonthArr[i]) {
                listBox[j].style.cursor = 'pointer';
                listBox[j].style.opacity = '100%';
            }


            if (listBox[j].querySelector('[rel="release-date"]').value > nextMonthArr[i - (thisMonthArr.length)]) {
                listBox[j].style.pointerEvents = 'none';
                listBox[j].style.opacity = '40%';
            } else if (listBox[j].querySelector('[rel="release-date"]').value <= nextMonthArr[i - (thisMonthArr.length)]) {
                listBox[j].style.cursor = 'pointer';
                listBox[j].style.opacity = '100%';
            }
            if (listBox[j].querySelector('[rel="end-date"]').value < nextMonthArr[i - (thisMonthArr.length)]) {
                listBox[j].style.pointerEvents = 'none';
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
            movieDay[0].addEventListener('click', e => {
                e.preventDefault();
                movieDay[0].style.backgroundColor = 'rgb(235, 235, 235)';
            })
        });
    }
    listBox[j].addEventListener('click', e => {
        e.preventDefault();
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


const region = window.document.querySelector('.region'); // 대구 클릭시
const quickCity = window.document.querySelector('.quick-city'); // 상영지점 자체의 div
let city = window.document.querySelectorAll('.city'); // 실제 상영지점

const selectMovieTime = window.document.querySelector('.select-movie-time');

let allScreenInfos = []; // xhr에서 받는 response값
let branches = []; // xhr에서 받는 response값 및 drawBranch사용

// Branch 정보 입력 함수
const drawBranches = () => {
    quickCity.innerHTML = '';
    branches.forEach(branch => {
        const branchElement = window.document.createElement('div');
        branchElement.classList.add('city');
        branchElement.dataset.value = branch['index'];
        branchElement.innerText = branch['text'];
        branchElement.addEventListener('click', e => {
            e.preventDefault();
            branchElement.classList.toggle('on');
            let count = 0;
            let tmp = 0;
            if (branchElement.classList.contains('on')) {
                count++;
                cp
                console.log(count)
            } else {
                count--;
            }
            if (count > 3) {
                alertOne('극장은 최대 3개까지 선택이 가능합니다.');
                branchElement.classList.remove('on');
                count = 3;
            }
        })
        quickCity.append(branchElement);
    });
};

// 최초 예매사이트 접속시 한번 SELECT
const xhr = new XMLHttpRequest();
xhr.open('PATCH', './booking');
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
            const responseJson = JSON.parse(xhr.responseText);
            allScreenInfos = responseJson['allScreenInfo'];
            branches = responseJson['branch'];
        } else {
            alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
        }
    }
};
xhr.send();


let movieScreenInfos = []; // 영화 보여줄 div 배열
region.addEventListener('click', e => {
    e.preventDefault();
    region.classList.toggle('on');
    quickCity.classList.toggle('on');
    drawBranches();
});


const setSelectedBranch = (index) => {
    quickCity
        .querySelectorAll(':scope > .city')
        .forEach(x => x.removeAttribute('selected'));
    quickCity
        .querySelector(`:scope > .city[data-value="${index}"]`)
        .setAttribute('selected', 'selected');
};
//
const drawScreenInfo = (branch) => {
    selectMovieTime.innerHTML = '';
    movieScreenInfos
        .filter(x => x['screenInfoBranchIndex'] === branch['index'])
        .forEach(screenInfo => {
            const subElement = window.document.createElement('div');
            subElement.classList.add('select-movie-time');
            const screenInfoElement = window.document.createElement('div');
            screenInfoElement.classList.add('movie-time-cover');
            screenInfoElement.dataset.value = screenInfo['value'];
            screenInfoElement.innerText = screenInfo['text'];
            // screenInfoElement.addEventListener('click', e => {
            //     setSelectedCountry(e.target.dataset.value);
            // });
            subElement.append(screenInfoElement);
            selectMovieTime.append(subElement);
        });
};
//
// const getSelectedScreenInfo = () => {
//     const selectedBranch = getSelectedBranch();
//     const selectedScreenInfoElement = selectMovieTime.querySelector('.movie-time-cover[data-value][selected]');
//     return movieScreenInfos.find(x => x['screenInfoBranchIndex'] === selectedBranch['index'] && x['index'] === selectedScreenInfoElement.dataset.value);
// }


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
