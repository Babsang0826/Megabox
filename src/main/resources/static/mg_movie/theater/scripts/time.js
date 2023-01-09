const nextBtn = window.document.getElementById('nextBtn'); // 다음버튼
const previousBtn = window.document.getElementById('previousBtn'); // 이전버튼
const timeBox = window.document.querySelector('.time-box'); // 보여줘야 할 칸

const ListBox = window.document.getElementById('theaterListBox');

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
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current">' + i + '<br>' + thisWeek + '</div>';
    } else {
        timeBox.innerHTML = timeBox.innerHTML + '<div class="day current">' + i + '<br>' + thisWeek + '</div>';
    }
}
const days = year + '-' + month + '-' + day;

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

const movieDay = window.document.querySelectorAll('.day');
for (let i = 0; i < movieDay.length; i++) {
    movieDay[i].addEventListener('click', e => {
        alert("갑좀")
        e.preventDefault();
    })
}


const url = new URL(window.location.href);
const searchParams = url.searchParams;
const xhr = new XMLHttpRequest();
const branchId = searchParams.get('branchId');
xhr.open('PATCH', `./time?branchId=${branchId}`);
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
            const domParser = new DOMParser();
            const appendMovieInfo = (screens) => {
                const theaterHtmlText = `
                <div class="theater-list-box" id="theaterContainer" rel="theaterContainer">
                    <div class="text-form" rel="textForm">
                        <input type="hidden" ${screens[0]['screenInfoDate']}>
                        <div class="theater-tit">
                            <p class="movie-grade age-12"></p>
                            <p><a href="#">${screens[0]['screenInfoMovieTitle']}</a></p>
                            <p class="information">
                                <span>${screens[0]['movieState']} /</span>
                                <span style="color: #0f0f0f">상영시간${screens[0]['runningTime']}분</span></p>
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
                    <div class="theater-type-box" rel="aud">
                        <div class="theater-type">
                            <p class="theater-name">${key}</p>
                            <p class="chair">64석</p>
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
                                    <a href="#">
                                        <div class="ico-box">
                                            <i class="iconset ico-off"></i>
                                        </div>
                                        <p class="time" rel="timeValue">${movie['screenInfoMovieStartTime']}</p>
                                        <p class="chair">84석</p>
                                    </a>
                                </div>
                            </div>
                        </td>
                        </tr>
                        </tbody>`;
                        const timeDom = domParser.parseFromString(timeHtml, 'text/html');
                        const timeCellElement = timeDom.querySelector('[rel="timeCell"]');
                        timeContainerElement.append(timeCellElement);
                    }

                    textFormElement.append(audElement);
                }
                //

                //
                // const timeContainer = theaterDom.querySelector('[rel="timeContainer"]');
                // for (let screen of screens) {
                //     const timeDom = domParser.parseFromString(timeHtml, 'text/html');
                //     const timeElement = timeDom.querySelector('[rel="timeCell"]');
                //     timeElement.querySelector('[rel="timeValue"]').innerText = screen['screenInfoMovieStartTime'];
                //     timeContainer.append(timeElement);
                // }

                ListBox.append(theaterDom.getElementById('theaterContainer'));
            }
            const responseArray = JSON.parse(xhr.responseText);
            let screenObject = {};
            for (let screen of responseArray) {
                let screenIdentifier = `${screen['screenInfoMovieIndex']}`;
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



