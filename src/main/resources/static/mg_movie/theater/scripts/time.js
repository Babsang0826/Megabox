const nextBtn = window.document.getElementById('nextBtn'); // 다음버튼
const previousBtn = window.document.getElementById('previousBtn'); // 이전버튼
const timeBox = window.document.querySelector('.time-box'); // 보여줘야 할 칸

const ListBox = window.document.getElementById('theaterListBox');


let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // utc 표준시 도출
let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

// 위의 동적인 달력에 의한 임의 날짜 고르는 로직
let dateTwo = new Date();
let year = dateTwo.getFullYear();
let month = ('0' + (1 + dateTwo.getMonth())).slice(-2);
let day = ('0' + dateTwo.getDate()).slice(-2);

let currentMonth = ((today.getMonth()) + 1); // 1월
let currentYear = today.getFullYear(); // 현재 년도
let currentDay = today.getDate(); // 현재 날짜
let thisMonthEndDay = new Date(currentYear, currentMonth, 0); // 현재달 마지막 날짜 전체(1월 31일)
let endDay = new Date(currentYear, currentMonth + 1, 0); // 다음달의 마지막 날짜전체(2월 28일)
// let NextMonthLast = endDay.getDate(); // 다음달 마지막 날짜(28일)
let thisMonthLast = thisMonthEndDay.getDate(); // 이번달 마지막날짜 (31일을 나타냄)
let nextStartDay = new Date(currentYear, today.getMonth() + 1, 1); // ???
let nextMonthStartWeek = nextStartDay.getDay(); // 1월을 기준 2월이 수요일부터이기 때문에 인덱스 3이 맞음



// 이번달
let thisMonthArr = [];
let thisMonthArrCode = [];
let thisMonthDate;
let thisWeek;
if (currentMonth < 10) {
    currentMonth = '0' + currentMonth;
}
for (let i = currentDay; i <= thisMonthLast; i++) {
    if (i < 10) {
        thisMonthDate = currentYear + '-' + currentMonth + '-' + '0' + i;
    } else {
        thisMonthDate = currentYear + '-' + currentMonth + '-' + i;
    }
    thisMonthArrCode = thisMonthDate;
    thisMonthArr.push(thisMonthArrCode);
    let WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    let week = new Date(date.setDate(i)).getDay();
    let thisWeek = WEEKDAY[week];
    let timeElement = document.createElement('div');
    timeElement.classList.add('day', 'current');
    timeElement.innerHTML = `${i}<br>${thisWeek}`;
    timeElement.dataset.date = thisMonthArrCode;
    if (thisWeek === '일') {
        timeElement.style.color = 'red';
    } else if (thisWeek === '토') {
        timeElement.style.color = 'blue';
    } else if (thisWeek !== '토' && thisWeek !== '일' && i !== currentDay) {
    }
    let day = window.document.querySelectorAll('.day');
    if (i === currentDay) {
        timeElement.setAttribute('selected', 'selected');
    }
    if (thisWeek === '토') {
        timeElement.style.color = 'blue';
    } else if (thisWeek === '일') {
        timeElement.style.color = 'red';
    }
    if (timeElement.getAttribute('selected')) {
        timeElement.style.backgroundColor = 'rgb(235, 235, 235)'
    }
    //
    for (let j = 0; j < day.length; j++) {
        day[0].addEventListener('click', () => {
            day[0].setAttribute('selected', 'selected');
            day[0].style.backgroundColor = 'rgb(235, 235, 235)';
            day[0].classList.add('on');
            // drawSubs();
        });

        day[j].addEventListener('click', () => {
            let nextDay = window.document.querySelectorAll('.day.next');
            if (day[j].classList[0] === 'on') {
                day[j].classList.remove('on');
                day[j].removeAttribute('selected');
            } else {
                for (let e = 0; e < day.length; e++) {
                    day[e].classList.remove('on');
                    day[e].removeAttribute('selected');
                }
                day[j].classList.add('on');
                day[j].setAttribute('selected', 'selected');
                if (!(day[j].getAttribute('selected')) && i === currentDay) {
                    day[0].setAttribute('selected', 'selected');
                    day[0].style.backgroundColor = 'rgb(235, 235, 235)';
                    day[0].classList.add('on');
                } else {
                    day[0].removeAttribute('selected');
                    day[0].style.backgroundColor = 'rgb(255, 255, 255)';
                    day[0].classList.remove('on');
                }
            }
            nextDay.forEach(nextDay => {
                if (nextDay.classList.contains('on')) {
                    nextDay.classList.remove('on');
                }
            })
            // drawSubs();
        });
    }

    timeElement.addEventListener('click', () => {
        const theaterListBoxElement = document.getElementById('theaterListBox');
        const theaterContainers = theaterListBoxElement.querySelectorAll('[rel="theaterContainer"]');
        theaterContainers.forEach(x => {
            const dateInputElement = x.querySelector('.date-value');
            const dateInputValue = dateInputElement.value;
            x.style.display = dateInputValue === timeElement.dataset.date ? 'block' : 'none';
        });
    });
    timeBox.append(timeElement);
}


let nextMonthArr = [];
let nextMonthArrCode = [];
let nextMonthDate;
let nextWeek;
let nextMonth = (today.getMonth()) + 2;
if (currentMonth === '12') {
    currentYear = (today.getFullYear() + 1);
    nextMonth = (currentMonth - 11);
}
if (nextMonth < 10) {
    nextMonth = '0' + nextMonth;
}
for (let i = 1; i <= 21 - (thisMonthLast - currentDay + 1); i++) {
    if (i < 10) {
        nextMonthDate = currentYear + '-' + nextMonth + '-0' + i;
    } else {
        nextMonthDate = year + '-' + nextMonth + '-' + i;
    }
    nextMonthArrCode = nextMonthDate;
    nextMonthArr.push(nextMonthArrCode);
    let WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    let week = new Date(today.setDate(nextMonthStartWeek + i)).getDay();
    nextWeek = WEEKDAY[week];
    const dayElement = window.document.createElement('div');
    dayElement.classList.add('day', 'next');
    dayElement.dataset.value = nextMonthDate;
    dayElement.innerHTML = `${i}<br>${nextWeek}`;
    timeBox.append(dayElement);
    if (nextWeek === '토') {
        dayElement.style.color = 'blue';
    } else if (nextWeek === '일') {
        dayElement.style.color = 'red';
    }
    if (dayElement.getAttribute('selected')) {
        dayElement.style.backgroundColor = 'rgb(235, 235, 235)'
    }
    let day = window.document.querySelectorAll('.day.next');
    let dayCurrent = window.document.querySelectorAll('.day.current');
    for (let j = 0; j < day.length; j++) {
        day[j].addEventListener('click', () => {
            if (day[j].classList[0] === 'on') {
                day[j].classList.remove('on');
                day[j].removeAttribute('selected');
            } else {
                for (let e = 0; e < day.length; e++) {
                    day[e].classList.remove('on');
                    day[e].removeAttribute('selected');
                }
                day[j].classList.add('on');
                day[j].setAttribute('selected', 'selected');
            }
            for (let x = 0; x < dayCurrent.length; x++) {
                if (day[j].classList.contains('on')) {
                    dayCurrent[x].classList.remove('on');
                    dayCurrent[0].classList.remove('on');
                    dayCurrent[0].removeAttribute('selected');
                    dayCurrent[0].style.backgroundColor = 'rgb(255, 255, 255)';
                }
            }
            // drawSubs();
        });
    }
    dayElement.addEventListener('click', () => {
        const theaterListBoxElement = document.getElementById('theaterListBox');
        const theaterContainers = theaterListBoxElement.querySelectorAll('[rel="theaterContainer"]');
        theaterContainers.forEach(x => {
            const dateInputElement = x.querySelector('.date-value');
            const dateInputValue = dateInputElement.value;
            x.style.display = dateInputValue === dayElement.dataset.date ? 'block' : 'none';
        });
    });
    timeBox.append(dayElement);
}

const inputHiddenEmail = window.document.querySelector('[rel="hiddenEmail"]');


Cover.show("");
let payload = [];
const url = new URL(window.location.href);
const searchParams = url.searchParams;
const xhr = new XMLHttpRequest();
const branchId = searchParams.get('branchId');
xhr.open('PATCH', `./time?branchId=${branchId}`);
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
            Cover.hide();
            const domParser = new DOMParser();
            const appendMovieInfo = (screens) => {
                const date = new Date();
                const today = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
                const theaterHtmlText = `                 
                <div class="theater-list-box" id="theaterContainer" rel="theaterContainer" style="display: ${screens[0]['screenInfoDate'] === today ? 'block' : 'none'}">
                    <div class="text-form" rel="textForm">
                        <input class="date-value" type="hidden" value="${screens[0]['screenInfoDate']}">
                        <div class="theater-tit">
                            <p class="movie-grade ${screens[0]['infoMovieAgeLimit']}"></p>
                            <p><a href="/movie/movie-detail?mid=${screens[0]['movieIndex']}">${screens[0]['screenInfoMovieTitle']}</a></p>
                            <p class="information">
                                <span>${screens[0]['movieState']} /</span>
                                <span style="color: #0f0f0f">상영시간 ${screens[0]['runningTime']}분</span></p>
                        </div>
                        
                    </div>
                </div>`;
                const theaterDom = domParser.parseFromString(theaterHtmlText, 'text/html');
                const textFormElement = theaterDom.querySelector('[rel="textForm"]');
                let screenByAudObject = {};
                for (let screen of screens) {
                    let aud = screen['screenInfoAuditoriumText'];
                    if (!screenByAudObject[aud]) {
                        screenByAudObject[aud] = [];
                    }
                    screenByAudObject[aud].push(screen);
                }

                for (let key of Object.keys(screenByAudObject).sort()) {
                    const audHtmlText = `
                    <div class="theater-type-box" rel="aud" id="type-box">
                        <div class="theater-type">
                            <p class="theater-name">${key}</p>
                            <p class="chair">${screenByAudObject[key][0]['screenInfoSeatCountAll']}석</p>
                        </div>
                        <div class="theater-time">
                            <div class="theater-type-area">${screenByAudObject[key][0]['screenInfoMovieState']}</div>
                            <div class="theater-time-box" style="width:200px;">
                                <table class="time-list-table">
                                    <caption></caption>
                                    <colgroup>
                                        <col style="width:99px;">
                                        <col style="width:99px;">
                                        <col style="width:99px;">
                                        <col style="width:99px;">
                                        <col style="width:99px;">
                                        <col style="width:99px;">
                                        <col style="width:99px;">
                                        <col style="width:99px;">
                                    </colgroup>
                                    <tbody>
                                    <tr rel="timeContainer">
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>`;
                    const audDom = domParser.parseFromString(audHtmlText, 'text/html');
                    const audElement = audDom.querySelector('[rel="aud"]');
                    const timeContainerElement = audDom.querySelector('[rel="timeContainer"]');

                    for (let movie of screenByAudObject[key]) {
                        const timeHtml = `
                        <table>
                        <tbody>
                        <tr>
                        <td rel="timeCell">
                            <div class="td">
                                <div class="txt-center">
                                    <a href="#" rel="bookingPage">
                                        <div class="ico-box">
                                            <i class="iconset ico-off"></i>
                                        </div>
                                        <p class="time" rel="timeValue">${movie['screenInfoMovieStartTime']}</p>
                                        <p class="chair" 
                                        th:text="${parseInt(screenByAudObject[key][0]['screenInfoSeatCountAll']) - parseInt(movie['screenInfoSeatRemain'])}"></p>
                                        <div class="play-time">
                                         <p>${movie['screenInfoMovieStartTime']}~${movie['screenInfoMovieEndTime']}</p>
                                    </a>
                                </div>
                            </div>
                        </td>
                        </tr>
                        </tbody>`;
                        const timeDom = domParser.parseFromString(timeHtml, 'text/html');
                        const timeCellElement = timeDom.querySelector('[rel="timeCell"]');
                        const remainSeat = timeDom.querySelector('.chair');
                        let remainSeatCnt = `${parseInt(screenByAudObject[key][0]['screenInfoSeatCountAll']) - parseInt(movie['screenInfoSeatRemain'])}`
                        remainSeat.innerText = `${remainSeatCnt}석`;
                        timeCellElement.classList.add('time')
                        timeCellElement.addEventListener('click', () => {
                            if(inputHiddenEmail == null) {
                                window.location.href = '/member/login';
                                return false;
                            }
                            localStorage.setItem('movie', JSON.stringify(movie));
                            location.href = `/movie/booking`;
                            timeCellElement.setAttribute('selected', 'selected');
                            drawSeatResult();
                        })
                        timeContainerElement.append(timeCellElement);
                    }

                    textFormElement.append(audElement);

                }

                ListBox.append(theaterDom.getElementById('theaterContainer'));
            }


            const responseArray = JSON.parse(xhr.responseText);
            let screenObject = {};
            payload = responseArray;
            for (let screen of responseArray) {
                let screenIdentifier = `${screen['movieIndex']}`;
                if (!screenObject[screenIdentifier]) {
                    screenObject[screenIdentifier] = [];
                }
                screenObject[screenIdentifier].push(screen);
            }
            for (let key of Object.keys(screenObject)) {
                let screens = screenObject[key];
                appendMovieInfo(screens);
            }
        } else {
            alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
        }
    }
};
xhr.send();


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

window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById('pageUtil').classList.add('fixed');
        document.getElementById('tabList').classList.add('fixed');
    } else {
        document.getElementById('pageUtil').classList.remove('fixed');
        document.getElementById('tabList').classList.remove('fixed')
    }
}









