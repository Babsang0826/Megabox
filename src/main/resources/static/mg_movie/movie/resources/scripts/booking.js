const form = window.document.getElementById('form');
const nextBtn = window.document.getElementById('nextBtn');
const previousBtn = window.document.getElementById('previousBtn');
const timeBox = window.document.querySelector('.time-box');
const timeContainer = window.document.querySelector('.reservation-container');
const paymentContainer = window.document.querySelector('.body-wrap');
const seatContainer = window.document.querySelector('.seat-select');

const region = window.document.querySelector('.region');
const quickCity = window.document.querySelector('.quick-city');
const beforeSelectMovieTime = window.document.querySelector('.before-select-movie-time');
const selectMovieTime = window.document.querySelector('.select-movie-time');
const listCollect = window.document.querySelector('.list-collect');

let allScreenInfos = [];
let branches = [];
let movieTitles = [];
let screenInfoSeats = [];
let screenInfoSeatColumns = [];
let completeSeatBooking = [];
let allSeat = [];
let count = 0;
let value = 0;

//
let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
let utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // utc 표준시 도출
let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

let currentMonth = ((today.getMonth()) + 1); // 1월
let currentYear = today.getFullYear(); // 현재 년도
let currentDay = today.getDate(); // 현재 날짜
let thisMonthEndDay = new Date(currentYear, currentMonth, 0); // 현재달 마지막 날짜 전체(1월 31일)
let endDay = new Date(currentYear, currentMonth + 1, 0); // 다음달의 마지막 날짜전체(2월 28일)
// let NextMonthLast = endDay.getDate(); // 다음달 마지막 날짜(28일)
let thisMonthLast = thisMonthEndDay.getDate(); // 이번달 마지막날짜 (31일을 나타냄)
let nextStartDay = new Date(currentYear, today.getMonth() + 1, 1); // ???
let nextMonthStartWeek = nextStartDay.getDay(); // 1월을 기준 2월이 수요일부터이기 때문에 인덱스 3이 맞음


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
    let week = new Date(today.setDate(i)).getDay();
    thisWeek = WEEKDAY[week];
    const dayElement = window.document.createElement('div');
    dayElement.classList.add('day', 'current');
    dayElement.dataset.value = thisMonthDate;
    dayElement.innerText = i + '•' + thisWeek;
    timeBox.append(dayElement);
    let day = window.document.querySelectorAll('.day');
    if (i === currentDay) {
        dayElement.setAttribute('selected', 'selected');
    }
    if (thisWeek === '토') {
        dayElement.style.color = 'blue';
    } else if (thisWeek === '일') {
        dayElement.style.color = 'red';
    }
    if (dayElement.getAttribute('selected')) {
        dayElement.style.backgroundColor = 'rgb(235, 235, 235)'
    }
    for (let j = 0; j < day.length; j++) {
        day[0].addEventListener('click', () => {
            day[0].setAttribute('selected', 'selected');
            day[0].style.backgroundColor = 'rgb(235, 235, 235)';
            day[0].classList.add('on');
            drawSubs();
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
            drawSubs();
            Cover.hide();
        });
    }
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
        nextMonthDate = currentYear + '-' + nextMonth + '-' + i;
    }
    nextMonthArrCode = nextMonthDate;
    nextMonthArr.push(nextMonthArrCode);
    let WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    let week = new Date(today.setDate(nextMonthStartWeek + i)).getDay();
    nextWeek = WEEKDAY[week];
    const dayElement = window.document.createElement('div');
    dayElement.classList.add('day', 'next');
    dayElement.dataset.date = nextMonthDate;
    dayElement.innerText = i + '•' + nextWeek;
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
            drawSubs();
        });
    }
}

// movieTitle(영화제목) 함수
const drawListBox = () => {
    movieTitles.forEach(movie => {
        const listBoxElement = window.document.createElement('div');
        listBoxElement.classList.add('list-box');
        listBoxElement.dataset.value = movie['movieTitle'];
        listBoxElement.dataset.date = movie['movieReleaseDate'];
        const ageLimitElement = window.document.createElement('div');
        ageLimitElement.classList.add(movie['movieAgeLimit']);
        const movieTitleElement = window.document.createElement('span');
        movieTitleElement.classList.add('movie-title');
        movieTitleElement.innerText = movie['movieTitle'];
        listBoxElement.append(ageLimitElement, movieTitleElement);
        listCollect.append(listBoxElement);
        listBoxElement.addEventListener('click', () => {
            listBoxElement.classList.toggle('on');
            if (listBoxElement.classList.contains('on')) {
                value++;
                listBoxElement.setAttribute('selected', 'selected');
            } else {
                value--;
                listBoxElement.removeAttribute('selected');
            }
            if (value > 3) {
                swal("알림", "영화는 최대 3개까지 선택이 가능합니다.");
                listBoxElement.classList.remove('on');
                listBoxElement.removeAttribute('selected');
                value = 3;
            }
            if (!(listBoxElement.classList.contains('on'))) {
                drawSubs();
            } else {
                drawSubs();
            }
        });
    });
}


// Branch 클릭시 작동 함수
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
            if (branchElement.classList.contains('on')) {
                count++;
                region.addEventListener('click', () => {
                    selectMovieTime.innerHTML = '';
                    count = 0;
                });
                branchElement.setAttribute('selected', 'selected');
            } else {
                count--;
                branchElement.removeAttribute('selected');
            }
            if (count > 3) {
                swal("알림", "극장은 최대 3개까지 선택이 가능합니다.");
                branchElement.classList.remove('on');
                branchElement.removeAttribute('selected');
                count = 3;
            }
            beforeSelectMovieTime.classList.add('off');
            drawSubs();
            const listBox = window.document.querySelectorAll('.list-box');
            const listBoxOn = window.document.querySelectorAll('.list-box.on');
            listBox.forEach(x => {
                x.addEventListener('click', () => {
                    if (listBoxOn.length < 1) {
                        selectMovieTime.innerHTML = '';
                        drawSubs();
                    }
                })
            });
        });
        quickCity.append(branchElement);
    });
};

// Branch에 따른 sub함수
const drawSubs = () => {
    if (quickCity.classList.contains('on')) {
        selectMovieTime.innerHTML = '';
        const citySelected = Array.from(quickCity.querySelectorAll('.city[selected]'));
        const selectedCityIndexes = citySelected.map(x => parseInt(x.dataset.value));
        const listTitle = Array.from(window.document.querySelectorAll('.list-box[selected]'));
        const selectListTitle = listTitle.map(x => x.innerText);
        const deleteListBox = window.document.querySelectorAll('.list-box.on');
        const deleteCity = window.document.querySelectorAll('.city.on');
        const daySelected = Array.from(timeBox.querySelectorAll('.day[selected]'));
        const selectedDayValue = daySelected.map(x => x.dataset.value);
        if (deleteListBox.length < 1 && deleteCity.length > 0) {
            allScreenInfos
                .filter(allScreenInfo => selectedCityIndexes.indexOf(allScreenInfo['screenInfoBranchIndex']) > -1 &&
                    selectedDayValue.indexOf(allScreenInfo['screenInfoDate']) > -1)
                .forEach(allScreenInfo => {
                    const movieTimeCoverElement = window.document.createElement('div');
                    movieTimeCoverElement.classList.add('movie-time-cover');
                    movieTimeCoverElement.dataset.value = allScreenInfo['screenInfoBranchIndex'];
                    movieTimeCoverElement.dataset.date = allScreenInfo['screenInfoDate'];
                    movieTimeCoverElement.dataset.time = allScreenInfo['screenInfoMovieTime'];
                    movieTimeCoverElement.dataset.mvStartTime = allScreenInfo['screenInfoMovieStartTime'];
                    movieTimeCoverElement.dataset.mvEndTime = allScreenInfo['screenInfoMovieEndTime'];
                    movieTimeCoverElement.dataset.audIndex = allScreenInfo['screenInfoAuditoriumIndex'];
                    movieTimeCoverElement.dataset.screenInfoIndex = allScreenInfo['screenInfoIndex'];

                    const movieTimeInfoBoxElement = window.document.createElement('div');
                    movieTimeInfoBoxElement.classList.add('movie-time-info-box');

                    const movieTimeElement = window.document.createElement('div');
                    movieTimeElement.classList.add('movie-time');
                    const timeIconElement = window.document.createElement('div');
                    timeIconElement.classList.add('time-icon');
                    const timeBoxElement = window.document.createElement('div');
                    timeBoxElement.classList.add('time-box');
                    const screenDateElement = window.document.createElement('span');
                    screenDateElement.classList.add('screen-date');
                    screenDateElement.setAttribute('rel', 'screen-date');
                    screenDateElement.innerText = allScreenInfo['screenInfoMovieStartTime'];
                    const screenEndDateElement = window.document.createElement('span');
                    screenEndDateElement.classList.add('screen-end-date');
                    screenEndDateElement.innerText = '~' + allScreenInfo['screenInfoMovieEndTime'];
                    timeBoxElement.append(screenDateElement, screenEndDateElement);
                    timeIconElement.append(timeBoxElement);
                    movieTimeElement.append(timeIconElement, timeBoxElement);

                    const movieTitleStateElement = window.document.createElement('div');
                    movieTitleStateElement.classList.add('movie-title-state');
                    const movieTitleElement = window.document.createElement('span');
                    movieTitleElement.classList.add('movie-title');
                    movieTitleElement.innerText = allScreenInfo['screenInfoMovieTitle'];
                    const movieStateElement = window.document.createElement('span');
                    movieStateElement.classList.add('movie-state');
                    movieStateElement.innerText = allScreenInfo['screenInfoMovieState'];
                    movieTitleStateElement.append(movieTitleElement, movieStateElement);

                    const moviePlaceElement = window.document.createElement('div');
                    moviePlaceElement.classList.add('movie-place');
                    const movieBranchElement = window.document.createElement('span');
                    movieBranchElement.classList.add('movie-branch');
                    movieBranchElement.innerText = allScreenInfo['screenInfoBranchText'];
                    const movieAuditoriumElement = window.document.createElement('span');
                    movieAuditoriumElement.classList.add('movie-auditorium');
                    movieAuditoriumElement.innerText = allScreenInfo['screenInfoAuditoriumText'];
                    const seatBoxElement = window.document.createElement('div');
                    seatBoxElement.classList.add('seat-box');

                    const remainSeatElement = window.document.createElement('span');
                    remainSeatElement.classList.add('remain-seat');
                    remainSeatElement.innerText = allScreenInfo['screenInfoSeatCountAll'];
                    completeSeatBooking.forEach(complete => {
                        if (complete['bookingSeatScreenInfoIndex'] === allScreenInfo['screenInfoIndex']) {
                            remainSeatElement.innerText = parseInt(allScreenInfo['screenInfoSeatCountAll']) - parseInt(allScreenInfo['screenInfoSeatRemain']);
                        }
                    })
                    allSeat.forEach(allSeat => {
                        if (allSeat['seatAudIndex'] === allScreenInfo['screenInfoAuditoriumIndex']) {
                            const allSeatElement = window.document.createElement('span');
                            allSeatElement.classList.add('all-seat');
                            allSeatElement.innerText = '/' + allSeat['seatCountAll'];
                            seatBoxElement.append(remainSeatElement, allSeatElement);
                        }
                    });
                    moviePlaceElement.append(movieBranchElement, movieAuditoriumElement, seatBoxElement);
                    movieTimeInfoBoxElement.append(movieTimeElement, movieTitleStateElement, moviePlaceElement);
                    movieTimeCoverElement.append(movieTimeInfoBoxElement);
                    selectMovieTime.append(movieTimeCoverElement);
                    movieTimeCoverElement.classList.add('on');
                    if (selectedCityIndexes.length === 0) {
                        selectMovieTime.innerHTML = '';
                    }
                    region.addEventListener('click', () => {
                        drawBranches();
                        drawSubs();
                    });
                    const readScreenInfo = window.document.querySelectorAll('.movie-time-cover.on');
                    readScreenInfo.forEach(x => {
                        x.addEventListener('click', () => {
                            if (hiddenEmail === null) {
                                window.location.href = '/member/login';
                                return false;
                            }
                            timeContainer.classList.add('off');
                            paymentContainer.classList.remove('off');
                            seatContainer.classList.add('on');
                        })
                    });
                    movieTimeCoverElement.addEventListener('click', () => {
                        movieTimeCoverElement.setAttribute('selected', 'selected');
                        drawSeatResult();
                        drawSeat();
                    });
                });
        }
        if (deleteListBox.length > 0 && deleteCity.length > 0) {
            allScreenInfos
                .filter(allScreenInfo => selectedCityIndexes.indexOf(allScreenInfo['screenInfoBranchIndex']) > -1 &&
                    selectListTitle.indexOf(allScreenInfo['screenInfoMovieTitle']) > -1 &&
                    selectedDayValue.indexOf(allScreenInfo['screenInfoDate']) > -1)
                .forEach(allScreenInfo => {
                    const movieTimeCoverElement = window.document.createElement('div');
                    movieTimeCoverElement.classList.add('movie-time-cover');
                    movieTimeCoverElement.dataset.value = allScreenInfo['screenInfoBranchIndex'];
                    movieTimeCoverElement.dataset.date = allScreenInfo['screenInfoDate'];
                    movieTimeCoverElement.dataset.time = allScreenInfo['screenInfoMovieTime'];
                    movieTimeCoverElement.dataset.mvStartTime = allScreenInfo['screenInfoMovieStartTime'];
                    movieTimeCoverElement.dataset.mvEndTime = allScreenInfo['screenInfoMovieEndTime'];
                    movieTimeCoverElement.dataset.audIndex = allScreenInfo['screenInfoAuditoriumIndex'];
                    movieTimeCoverElement.dataset.screenInfoIndex = allScreenInfo['screenInfoIndex'];
                    const movieTimeInfoBoxElement = window.document.createElement('div');
                    movieTimeInfoBoxElement.classList.add('movie-time-info-box');

                    const movieTimeElement = window.document.createElement('div');
                    movieTimeElement.classList.add('movie-time');
                    const timeIconElement = window.document.createElement('div');
                    timeIconElement.classList.add('time-icon');
                    const timeBoxElement = window.document.createElement('div');
                    timeBoxElement.classList.add('time-box');
                    const screenDateElement = window.document.createElement('span');
                    screenDateElement.classList.add('screen-date');
                    screenDateElement.setAttribute('rel', 'screen-date');
                    screenDateElement.innerText = allScreenInfo['screenInfoMovieStartTime'];
                    const screenEndDateElement = window.document.createElement('span');
                    screenEndDateElement.classList.add('screen-end-date');
                    screenEndDateElement.innerText = '~' + allScreenInfo['screenInfoMovieEndTime'];
                    timeBoxElement.append(screenDateElement, screenEndDateElement);
                    timeIconElement.append(timeBoxElement);
                    movieTimeElement.append(timeIconElement, timeBoxElement);
                    const movieTitleStateElement = window.document.createElement('div');
                    movieTitleStateElement.classList.add('movie-title-state');
                    const movieTitleElement = window.document.createElement('span');
                    movieTitleElement.classList.add('movie-title');
                    movieTitleElement.innerText = allScreenInfo['screenInfoMovieTitle'];
                    const movieStateElement = window.document.createElement('span');
                    movieStateElement.classList.add('movie-state');
                    movieStateElement.innerText = allScreenInfo['screenInfoMovieState'];
                    movieTitleStateElement.append(movieTitleElement, movieStateElement);

                    const moviePlaceElement = window.document.createElement('div');
                    moviePlaceElement.classList.add('movie-place');
                    const movieBranchElement = window.document.createElement('span');
                    movieBranchElement.classList.add('movie-branch');
                    movieBranchElement.innerText = allScreenInfo['screenInfoBranchText'];
                    const movieAuditoriumElement = window.document.createElement('span');
                    movieAuditoriumElement.classList.add('movie-auditorium');
                    movieAuditoriumElement.innerText = allScreenInfo['screenInfoAuditoriumText'];
                    const seatBoxElement = window.document.createElement('div');
                    seatBoxElement.classList.add('seat-box');
                    const remainSeatElement = window.document.createElement('span');
                    remainSeatElement.classList.add('remain-seat');
                    remainSeatElement.innerText = allScreenInfo['screenInfoSeatCountAll'];
                    completeSeatBooking.forEach(complete => {
                        if (complete['bookingSeatScreenInfoIndex'] === allScreenInfo['screenInfoIndex']) {
                            remainSeatElement.innerText = parseInt(allScreenInfo['screenInfoSeatCountAll']) - parseInt(allScreenInfo['screenInfoSeatRemain']);
                        }
                    })
                    allSeat.forEach(allSeat => {
                        if (allSeat['seatAudIndex'] === allScreenInfo['screenInfoAuditoriumIndex']) {
                            const allSeatElement = window.document.createElement('span');
                            allSeatElement.classList.add('all-seat');
                            allSeatElement.innerText = '/' + allSeat['seatCountAll'];
                            seatBoxElement.append(remainSeatElement, allSeatElement);
                        }
                    });
                    moviePlaceElement.append(movieBranchElement, movieAuditoriumElement, seatBoxElement);
                    movieTimeInfoBoxElement.append(movieTimeElement, movieTitleStateElement, moviePlaceElement);
                    movieTimeCoverElement.append(movieTimeInfoBoxElement);
                    selectMovieTime.append(movieTimeCoverElement);
                    movieTimeCoverElement.classList.add('on');
                    if (selectedCityIndexes.length === 0) {
                        selectMovieTime.innerHTML = '';
                    }
                    region.addEventListener('click', () => {
                        drawBranches();
                        drawSubs();
                    });
                    const readScreenInfo = window.document.querySelectorAll('.movie-time-cover.on');
                    readScreenInfo.forEach(x => {
                        x.addEventListener('click', () => {
                            if (hiddenEmail === null) {
                                // localStorage.setItem('sessionValue', )
                                window.location.href = '/member/login';
                                return false;
                            }
                            timeContainer.classList.add('off');
                            paymentContainer.classList.remove('off');
                            seatContainer.classList.add('on');
                        })
                    });
                    movieTimeCoverElement.addEventListener('click', () => {
                        movieTimeCoverElement.setAttribute('selected', 'selected');
                        drawSeatResult();
                        drawSeat();
                    });
                });
        }
    }
}

const seatResultContainer = window.document.querySelector('.seat-result');
const drawSeatResult = () => {
    const citySelected = Array.from(quickCity.querySelectorAll('.city[selected]'));
    const selectedCityIndexes = citySelected.map(x => parseInt(x.dataset.value));
    const listTitle = Array.from(window.document.querySelectorAll('.list-box[selected]'));
    const deleteListBox = window.document.querySelectorAll('.list-box.on');
    const deleteCity = window.document.querySelectorAll('.city.on');
    const selectListTitle = listTitle.map(x => x.innerText);
    const daySelected = Array.from(timeBox.querySelectorAll('.day[selected]'));
    const selectedDayValue = daySelected.map(x => x.dataset.value);
    const movieTimeSelected = Array.from(window.document.querySelectorAll('.movie-time-cover[selected]'));
    const selectedMvStartTime = movieTimeSelected.map(x => x.dataset.mvStartTime);
    const selectedMvEndTime = movieTimeSelected.map(x => x.dataset.mvEndTime);
    const wrapContainer = window.document.querySelector('.wrap');
    const titleAreaElement = window.document.createElement('div');
    titleAreaElement.classList.add('title-area');
    if (deleteListBox.length > 0 && deleteCity.length > 0) {
        allScreenInfos
            .filter(allScreenInfo => selectListTitle.indexOf(allScreenInfo['screenInfoMovieTitle']) > -1 && selectedDayValue.indexOf(allScreenInfo['screenInfoDate']) > -1 && selectedCityIndexes.indexOf(allScreenInfo['screenInfoBranchIndex']) > -1 && selectedMvStartTime.indexOf(allScreenInfo['screenInfoMovieStartTime']) > -1 && selectedMvEndTime.indexOf(allScreenInfo['screenInfoMovieEndTime']) > -1)
            .forEach(allScreenInfo => {
                const ageLimitElement = window.document.createElement('span');
                ageLimitElement.classList.add(allScreenInfo['screenInfoMovieAgeLimit']);
                const titleElement = window.document.createElement('p');
                titleElement.classList.add('title');
                titleElement.innerText = allScreenInfo['screenInfoMovieTitle'];
                const movieTypeElement = window.document.createElement('p');
                movieTypeElement.classList.add('movie-type');
                movieTypeElement.innerText = allScreenInfo['screenInfoMovieState'];
                titleAreaElement.append(ageLimitElement, titleElement, movieTypeElement);
                const infoAreaElement = window.document.createElement('div');
                infoAreaElement.classList.add('info-area');
                const branchElement = window.document.createElement('p');
                branchElement.classList.add('branch');
                branchElement.innerText = allScreenInfo['screenInfoBranchText'];
                const auditoriumElement = window.document.createElement('p');
                auditoriumElement.classList.add('auditorium');
                auditoriumElement.innerText = allScreenInfo['screenInfoAuditoriumText'];
                const dateElement = window.document.createElement('p');
                dateElement.classList.add('date');
                const dateDetailSpanElement = window.document.createElement('span');
                dateDetailSpanElement.innerText = allScreenInfo['screenInfoDate'];
                const dateDetailEmElement = window.document.createElement('em');
                dateElement.append(dateDetailSpanElement, dateDetailEmElement);
                const timeElement = window.document.createElement('p');
                timeElement.classList.add('time');
                timeElement.innerText = allScreenInfo['screenInfoMovieStartTime'] + '~' + allScreenInfo['screenInfoMovieEndTime'];
                const posterElement = window.document.createElement('p');
                posterElement.classList.add('poster');
                const imageElement = window.document.createElement('img');
                imageElement.setAttribute('src', allScreenInfo['screenInfoMoviePoster']);
                posterElement.append(imageElement);
                infoAreaElement.append(branchElement, auditoriumElement, dateElement, timeElement, posterElement);
                wrapContainer.prepend(titleAreaElement, infoAreaElement);
                seatResultContainer.append(wrapContainer);
            });
    } else if (deleteListBox.length < 1 && deleteCity.length > 0) {
        allScreenInfos
            .filter(allScreenInfo => selectedDayValue.indexOf(allScreenInfo['screenInfoDate']) > -1 && selectedCityIndexes.indexOf(allScreenInfo['screenInfoBranchIndex']) > -1 && selectedMvStartTime.indexOf(allScreenInfo['screenInfoMovieStartTime']) > -1 && selectedMvEndTime.indexOf(allScreenInfo['screenInfoMovieEndTime']) > -1)
            .forEach(allScreenInfo => {
                const ageLimitElement = window.document.createElement('span');
                ageLimitElement.classList.add(allScreenInfo['screenInfoMovieAgeLimit']);
                const titleElement = window.document.createElement('p');
                titleElement.classList.add('title');
                titleElement.innerText = allScreenInfo['screenInfoMovieTitle'];
                const movieTypeElement = window.document.createElement('p');
                movieTypeElement.classList.add('movie-type');
                movieTypeElement.innerText = allScreenInfo['screenInfoMovieState'];
                titleAreaElement.append(ageLimitElement, titleElement, movieTypeElement);
                const infoAreaElement = window.document.createElement('div');
                infoAreaElement.classList.add('info-area');
                const branchElement = window.document.createElement('p');
                branchElement.classList.add('branch');
                branchElement.innerText = allScreenInfo['screenInfoBranchText'];
                const auditoriumElement = window.document.createElement('p');
                auditoriumElement.classList.add('auditorium');
                auditoriumElement.innerText = allScreenInfo['screenInfoAuditoriumText'];
                const dateElement = window.document.createElement('p');
                dateElement.classList.add('date');
                const dateDetailSpanElement = window.document.createElement('span');
                dateDetailSpanElement.innerText = allScreenInfo['screenInfoDate'];
                const dateDetailEmElement = window.document.createElement('em');
                dateElement.append(dateDetailSpanElement, dateDetailEmElement);
                const timeElement = window.document.createElement('p');
                timeElement.classList.add('time');
                timeElement.innerText = allScreenInfo['screenInfoMovieStartTime'] + '~' + allScreenInfo['screenInfoMovieEndTime'];
                const posterElement = window.document.createElement('p');
                posterElement.classList.add('poster');
                const imageElement = window.document.createElement('img');
                imageElement.setAttribute('src', allScreenInfo['screenInfoMoviePoster']);
                posterElement.append(imageElement);
                infoAreaElement.append(branchElement, auditoriumElement, dateElement, timeElement, posterElement);
                wrapContainer.prepend(titleAreaElement, infoAreaElement);
                seatResultContainer.append(wrapContainer);
            });
    }
}

const seatPayWrap = window.document.querySelector('[rel="seatPayWrap"]');
const drawPaySeatResult = () => {
    const citySelected = Array.from(quickCity.querySelectorAll('.city[selected]'));
    const selectedCityIndexes = citySelected.map(x => parseInt(x.dataset.value));
    const listTitle = Array.from(window.document.querySelectorAll('.list-box[selected]'));
    const deleteListBox = window.document.querySelectorAll('.list-box.on');
    const deleteCity = window.document.querySelectorAll('.city.on');
    const selectListTitle = listTitle.map(x => x.innerText);
    const daySelected = Array.from(timeBox.querySelectorAll('.day[selected]'));
    const selectedDayValue = daySelected.map(x => x.dataset.value);
    const movieTimeSelected = Array.from(window.document.querySelectorAll('.movie-time-cover[selected]'));
    const selectedMvStartTime = movieTimeSelected.map(x => x.dataset.mvStartTime);
    const selectedMvEndTime = movieTimeSelected.map(x => x.dataset.mvEndTime);
    if (deleteListBox.length > 0 && deleteCity.length > 0) {
        allScreenInfos
            .filter(allScreenInfo => selectListTitle.indexOf(allScreenInfo['screenInfoMovieTitle']) > -1 && selectedDayValue.indexOf(allScreenInfo['screenInfoDate']) > -1 && selectedCityIndexes.indexOf(allScreenInfo['screenInfoBranchIndex']) > -1 && selectedMvStartTime.indexOf(allScreenInfo['screenInfoMovieStartTime']) > -1 && selectedMvEndTime.indexOf(allScreenInfo['screenInfoMovieEndTime']) > -1)
            .forEach(allScreenInfo => {
                const titleAreaElement = window.document.createElement('div');
                titleAreaElement.classList.add('title-area', 'pay');
                const ageLimitElement = window.document.createElement('span');
                ageLimitElement.classList.add(allScreenInfo['screenInfoMovieAgeLimit']);
                const titleElement = window.document.createElement('p');
                titleElement.classList.add('title');
                titleElement.innerText = allScreenInfo['screenInfoMovieTitle'];
                const movieTypeElement = window.document.createElement('p');
                movieTypeElement.classList.add('movie-type');
                movieTypeElement.innerText = allScreenInfo['screenInfoMovieState'];
                const branchElement = window.document.createElement('p');
                branchElement.classList.add('branch');
                branchElement.innerText = allScreenInfo['screenInfoBranchText']
                const dateElement = window.document.createElement('p');
                dateElement.classList.add('date');
                const dateSpanElement = window.document.createElement('span');
                dateSpanElement.innerText = allScreenInfo['screenInfoDate'];
                const dateEmElement = window.document.createElement('em');
                const timeElement = window.document.createElement('span');
                timeElement.classList.add('time');
                timeElement.innerText = allScreenInfo['screenInfoMovieStartTime'] + '~' + allScreenInfo['screenInfoMovieEndTime'];
                const clockIconElement = window.document.createElement('i');
                clockIconElement.classList.add('fa-regular', 'fa-clock');
                clockIconElement.append(timeElement);
                dateElement.append(dateSpanElement, dateEmElement, clockIconElement);
                titleAreaElement.append(ageLimitElement, titleElement, movieTypeElement, branchElement, dateElement);
                seatPayWrap.prepend(titleAreaElement);
            });
    }
    if (deleteListBox.length < 1 && deleteCity.length > 0) {
        allScreenInfos
            .filter(allScreenInfo => selectedDayValue.indexOf(allScreenInfo['screenInfoDate']) > -1 && selectedCityIndexes.indexOf(allScreenInfo['screenInfoBranchIndex']) > -1 && selectedMvStartTime.indexOf(allScreenInfo['screenInfoMovieStartTime']) > -1 && selectedMvEndTime.indexOf(allScreenInfo['screenInfoMovieEndTime']) > -1)
            .forEach(allScreenInfo => {
                const titleAreaElement = window.document.createElement('div');
                titleAreaElement.classList.add('title-area', 'pay');
                const ageLimitElement = window.document.createElement('span');
                ageLimitElement.classList.add(allScreenInfo['screenInfoMovieAgeLimit']);
                const titleElement = window.document.createElement('p');
                titleElement.classList.add('title');
                titleElement.innerText = allScreenInfo['screenInfoMovieTitle']
                const movieTypeElement = window.document.createElement('p');
                movieTypeElement.classList.add('movie-type');
                movieTypeElement.innerText = allScreenInfo['screenInfoMovieState'];
                const branchElement = window.document.createElement('p');
                branchElement.classList.add('branch');
                branchElement.innerText = allScreenInfo['screenInfoBranchText']
                const dateElement = window.document.createElement('p');
                dateElement.classList.add('date');
                const dateSpanElement = window.document.createElement('span');
                dateSpanElement.innerText = allScreenInfo['screenInfoDate'];
                const dateEmElement = window.document.createElement('em');
                const timeElement = window.document.createElement('span');
                timeElement.classList.add('time');
                timeElement.innerText = allScreenInfo['screenInfoMovieStartTime'] + '~' + allScreenInfo['screenInfoMovieEndTime'];
                const clockIconElement = window.document.createElement('i');
                clockIconElement.classList.add('fa-regular', 'fa-clock');
                clockIconElement.append(timeElement);
                dateElement.append(dateSpanElement, dateEmElement, clockIconElement);
                titleAreaElement.append(ageLimitElement, titleElement, movieTypeElement, branchElement, dateElement);
                seatPayWrap.prepend(titleAreaElement);
            });
    }
}
//좌석 클릭 시 //
const seatArea = container.querySelector('[rel="seatArea"]');
let selectedSeats = container.querySelectorAll('[rel="selectedSeat"]');
const seatsContainer = window.document.querySelector('.seats');
const drawSeat = () => {
    const audIndexSelected = Array.from(window.document.querySelectorAll('.movie-time-cover[selected]'));
    const selectedAudIndex = audIndexSelected.map(x => parseInt(x.dataset.audIndex));
    const selectedScreenInfoIndex = audIndexSelected.map(x => x.dataset.screenInfoIndex);
    const seatColumnElement = window.document.createElement('div');
    seatColumnElement.classList.add('seat-column');
    screenInfoSeatColumns
        .forEach(seatColumn => {
            const columnElement = window.document.createElement('button');
            columnElement.classList.add('column');
            columnElement.setAttribute('rel', 'column');
            columnElement.setAttribute('type', 'button');
            columnElement.innerText = seatColumn['seatColumnText'];
            seatColumnElement.append(columnElement);
        });
    const seatRowElement = window.document.createElement('div');
    seatRowElement.classList.add('seat-row');
    screenInfoSeats
        .filter(seat => selectedAudIndex.indexOf(seat['seatAuditoriumIndex']) > -1)
        .forEach(seat => {
            const rowElement = window.document.createElement('button');
            rowElement.classList.add('row');
            rowElement.setAttribute('rel', 'row');
            rowElement.setAttribute('value', seat['seatCode']);
            rowElement.setAttribute('type', 'button');
            rowElement.innerText = seat['seatRow'];
            rowElement.dataset.audIndex = seat['seatAuditoriumIndex'];
            rowElement.dataset.seatIndex = seat['seatIndex'];
            rowElement.dataset.seatCode = seat['seatCode'];
            seatRowElement.append(rowElement);
            seatsContainer.append(seatColumnElement, seatRowElement);
            completeSeatBooking.forEach(complete => {
                if (parseInt(complete['bookingSeatComplete']) === parseInt(rowElement.dataset.seatIndex) && parseInt(complete['bookingSeatScreenInfoIndex']) === parseInt(selectedScreenInfoIndex)) {
                    rowElement.setAttribute('disabled', 'disabled');
                    rowElement.classList.add('finish');
                    rowElement.innerText = '';
                }
            });
        })
    const seats = seatArea.querySelectorAll('[rel="row"]');
    for (let i = 0; i < seats.length; i++) {
        const seat = seats[i];
        seat.addEventListener('click', () => {
            if (totalCnt === '0') {
                swal('알림', '인원을 먼저 선택해주세요.');
                return;
            }
            let chosenSeatCnt = seatArea.querySelectorAll('.row.on').length
            chosenSeatTotalCnt = chosenSeatCnt + 1
            if (chosenSeatCnt + 1 > totalCnt && !seat.classList.contains('on')) {
                swal('알림', '좌석선택이 완료되었습니다.');
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
}


//좌석 정렬 함수
const sortSelections = () => {
    const selections = Array.from(selectedSeats);
    for (let selection of selections) {
        if (!selection.classList.contains('choice')) {
            selection.style.order = '999';
        } else {
            const row = selection.textContent.slice(0, 1).codePointAt(0);
            const col = parseInt(selection.textContent.slice(1, 2));
            const order = (row * 10) + col;
            selection.style.order = order;
        }
    }
}

let chosenSeatTotalCnt = 0;

//좌석 선택에서 다음 클릭 시
const seatNext = container.querySelector('.next');
seatNext.addEventListener('click', () => {
    let selectedSeat = container.querySelectorAll('.seat.choice').length;
    if (totalCnt > selectedSeat) {
        swal('알림', '인원 수에 맞게 좌석을 선택해주세요.');
        return;
    }
    if (chosenSeatTotalCnt === 0) {
        swal('알림', '인원 및 좌석 선택을 먼저 해주세요.');
        return;
    }
    seatSelectPayment.classList.add('on');
    seatSelect.classList.remove('on');
    drawPaySeatResult();
});

Cover.show('');
// 최초 예매사이트 접속시 한번 SELECT
const xhr = new XMLHttpRequest();
xhr.open('PATCH', './booking');
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
            Cover.hide();
            const responseJson = JSON.parse(xhr.responseText);
            allScreenInfos = responseJson['allScreenInfo'];
            branches = responseJson['branch'];
            movieTitles = responseJson['movieTitle'];
            screenInfoSeats = responseJson['seat'];
            screenInfoSeatColumns = responseJson['seatColumn'];
            completeSeatBooking = responseJson['seatComplete'];
            allSeat = responseJson['seatAll'];
            drawListBox();
            drawBranches();
        } else {
            swal('알림', '서버와 통신하지 못하였습니다. 잠시 후 다시 시도해주세요.');
        }
    }
};
xhr.send();


region.addEventListener('click', e => {
    e.preventDefault();
    region.classList.toggle('on');
    quickCity.classList.toggle('on');
    const city = window.document.querySelectorAll('.city.on');
    if (!region.classList.contains('on')) {
        selectMovieTime.innerHTML = '';
        city.forEach(x => x.classList.remove('on'));
        drawSubs();
    }
});

form.onsubmit = e => {
    const selectBooking = Array.from(window.document.querySelectorAll('.row.on'));
    const movieTimeSelected = Array.from(window.document.querySelectorAll('.movie-time-cover[selected]'));
    let adultTotalCount = `${parseInt(adultCount.innerText)}`;
    let teenagerTotalCount = `${parseInt(teenagerCount.innerText)}`;
    let etcTotalCount = `${parseInt(etcCount.innerText)}`;
    let priceArray = [adultPrice, teenagerPrice, etcPrice];
    let priceCountArray = [adultTotalCount, teenagerTotalCount, etcTotalCount];
    for (let i = 0; i < selectBooking.length; i++) {
        const seatCodes = selectBooking.map(x => x.value); // A7
        const seatIndexs = selectBooking.map(x => x.dataset.seatIndex);
        const seatScreenInfoIndexs = movieTimeSelected.find(x => x.dataset.screenInfoIndex);
        const seatPrices = priceArray.map(x => parseInt(x.innerText));
        let lastCountArray = [];
        for (let j = 0; j < priceCountArray.length; j++) {
            for (let z = 0; z < priceCountArray[j]; z++) {
                lastCountArray.push(seatPrices[j] / (priceCountArray[j]));
            }
        }
        let seatIndex = seatIndexs[i];
        let seatCode = seatCodes[i];
        let seatPrice = lastCountArray[i];
        let screenInfoIndex = seatScreenInfoIndexs.dataset.screenInfoIndex;
        Cover.show('');
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('screenInfoIndex', screenInfoIndex);
        formData.append('seatIndex', seatIndex);
        formData.append('seatSumCode', seatCode);
        formData.append('payment', seatPrice);
        xhr.open('POST', './booking');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);
                    switch (responseObject['result']) {
                        case 'success':
                            window.location.href = '/movie/bookingComplete';
                            break;
                        default:
                            swal('알림', '결제가 실패하였습니다. 잠시 후 다시 시도해 주세요.');
                            break;
                    }
                } else {
                    swal("알림", "알 수 없는 이유로 결제에 실패하였습니다. 잠시 후 다시 시도해 주세요.");
                }
            }
            Cover.hide();
        };
        xhr.send(formData);
    }
    const totalPriceSend = {
        totalPriceSend: (parseInt(adultPrice.innerText) + parseInt(teenagerPrice.innerText) + parseInt(etcPrice.innerText))
    }
    localStorage.setItem("total-price", JSON.stringify(totalPriceSend));
}


const timeWrap = window.document.querySelector('.time-wrap');
const previousTimeBtn = window.document.getElementById('previousTimeBtn');
const nextTimeBtn = window.document.getElementById('nextTimeBtn');


// time 시간표
for (let i = 0; i <= 28; i++) {
    if (i < 10) {
        const timeElement = window.document.createElement('div');
        timeElement.classList.add('time');
        timeElement.innerText = '0' + i;
        timeElement.style.width = '3rem';
        timeElement.style.color = 'rgb(0, 0, 0)';
        timeWrap.append(timeElement);
        const time = window.document.querySelectorAll('.time');
        for (let j = 0; j < time.length; j++) {
            time[j].addEventListener('click', () => {
                if (time[j].classList[0] === 'on') {
                    time[j].classList.remove('on');
                } else {
                    for (let e = 0; e < time.length; e++) {
                        time[e].classList.remove('on');
                    }
                    time[j].classList.add('on');
                }
            });
        }
    } else {
        const timeElement = window.document.createElement('div');
        timeElement.classList.add('time');
        timeElement.innerText = i;
        timeElement.style.width = '3rem';
        timeElement.style.color = 'rgb(0, 0, 0)';
        timeWrap.append(timeElement);
        const time = window.document.querySelectorAll('.time');
        for (let j = 0; j < time.length; j++) {
            time[j].addEventListener('click', () => {
                if (time[j].classList[0] === 'on') {
                    time[j].classList.remove('on');
                } else {
                    for (let e = 0; e < time.length; e++) {
                        time[e].classList.remove('on');
                    }
                    time[j].classList.add('on');
                }
            });
        }
    }
}

let currentTimeIdx = 0;
let slideTimeWidth = 3;
let slideTimeSpeed = 500;

nextTimeBtn.addEventListener('click', function () {
    moveTimeSlide(currentTimeIdx + 1);
    if (currentTimeIdx > 19) {
        timeWrap.style.left = '-60rem';
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
    timeWrap.style.left = -num * (slideTimeWidth) + 'rem';
    timeWrap.style.transition = slideTimeSpeed + 'ms';
    currentTimeIdx = num;
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

const movie = JSON.parse(localStorage.getItem('movie'));

if (movie.screenInfoIndex !== null) {
    timeContainer.classList.add('off');
    paymentContainer.classList.remove('off');
    seatContainer.classList.add('on');
    const wrapContainer = window.document.querySelector('.wrap');
    const titleAreaElement = window.document.createElement('div');
    titleAreaElement.classList.add('title-area', 'pay');

    const ageLimitElement = window.document.createElement('span');
    ageLimitElement.classList.add('age12');
    const titleElement = window.document.createElement('p');
    titleElement.classList.add('title');
    titleElement.innerText = movie.screenInfoMovieTitle
    const movieTypeElement = window.document.createElement('p');
    movieTypeElement.classList.add('movie-type');
    movieTypeElement.innerText = movie.screenInfoMovieState
    titleAreaElement.append(ageLimitElement, titleElement, movieTypeElement);
    const infoAreaElement = window.document.createElement('div');
    infoAreaElement.classList.add('info-area');
    const branchElement = window.document.createElement('p');
    branchElement.classList.add('branch');
    branchElement.innerText = movie.screenInfoBranchText
    const auditoriumElement = window.document.createElement('p');
    auditoriumElement.classList.add('auditorium');
    auditoriumElement.innerText = movie.screenInfoAuditoriumText
    const dateElement = window.document.createElement('p');
    dateElement.classList.add('date');
    const dateDetailSpanElement = window.document.createElement('span');
    dateDetailSpanElement.innerText = movie.screenInfoDate
    const dateDetailEmElement = window.document.createElement('em');
    dateElement.append(dateDetailSpanElement, dateDetailEmElement);
    const timeElement = window.document.createElement('p');
    timeElement.classList.add('time');
    timeElement.innerText = movie.screenInfoMovieStartTime + '~' + movie.screenInfoMovieEndTime
    const posterElement = window.document.createElement('p');
    posterElement.classList.add('poster');
    const imageElement = window.document.createElement('img');
    imageElement.setAttribute('src', movie.moviePoster);
    posterElement.append(imageElement);
    infoAreaElement.append(branchElement, auditoriumElement, dateElement, timeElement, posterElement);
    wrapContainer.prepend(titleAreaElement, infoAreaElement);
    seatResultContainer.append(wrapContainer);

    const seatColumnElement = window.document.createElement('div');
    seatColumnElement.classList.add('seat-column');
    movie.seatColumnVo.forEach(seatColumn => {
        const columnElement = window.document.createElement('button');
        columnElement.classList.add('column');
        columnElement.setAttribute('rel', 'column');
        columnElement.setAttribute('type', 'button');
        columnElement.innerText = seatColumn['seatVoNumOfColumn'];
        seatColumnElement.append(columnElement);
    });
    const seatRowElement = window.document.createElement('div');
    seatRowElement.classList.add('seat-row');
    movie.seatVos
        .forEach(seat => {
            const rowElement = window.document.createElement('button');
            rowElement.classList.add('row');
            rowElement.setAttribute('rel', 'row');
            rowElement.setAttribute('value', seat['seatVoSeatCode']);
            rowElement.setAttribute('type', 'button');
            rowElement.innerText = seat['seatVoRow'];
            rowElement.dataset.audIndex = seat['seatVoAuditoriumIndex'];
            rowElement.dataset.seatIndex = seat['seatVoIndex'];
            rowElement.dataset.seatCode = seat['seatVoSeatCode'];
            movie.bookingVo.forEach(complete => {
                if (parseInt(complete['bookingIndex']) === parseInt(rowElement.dataset.seatIndex) && parseInt(complete['bookingScreenInfoIndex']) === parseInt(movie.screenInfoIndex)) {
                    rowElement.setAttribute('disabled', 'disabled');
                    rowElement.classList.add('finish');
                    rowElement.innerText = '';
                }
            });
            seatRowElement.append(rowElement);
            seatsContainer.append(seatColumnElement, seatRowElement);
        });
    const seats = seatArea.querySelectorAll('[rel="row"]');
    for (let i = 0; i < seats.length; i++) {
        const seat = seats[i];
        seat.addEventListener('click', () => {
            if (totalCnt === '0') {
                swal('알림', '인원을 먼저 선택해주세요.');
                return;
            }
            let chosenSeatCnt = seatArea.querySelectorAll('.row.on').length
            chosenSeatTotalCnt = chosenSeatCnt + 1
            if (chosenSeatCnt + 1 > totalCnt && !seat.classList.contains('on')) {
                swal('알림', '좌석선택이 완료되었습니다.');
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

    const seatNext = container.querySelector('.next');
    seatNext.addEventListener('click', () => {
        let selectedSeat = container.querySelectorAll('.seat.choice').length;
        if (totalCnt > selectedSeat) {
            swal('알림', '인원 수에 맞게 좌석을 선택해주세요.');
            return;
        }
        if (chosenSeatTotalCnt === 0) {
            swal('알림', '인원 및 좌석 선택을 먼저 해주세요.');
            return;
        }
        seatSelectPayment.classList.add('on');
        seatSelect.classList.remove('on');
        const titleAreaElement = window.document.createElement('div');
        titleAreaElement.classList.add('title-area', 'pay');
        const ageLimitElement = window.document.createElement('span');
        ageLimitElement.classList.add(movie.infoMovieAgeLimit);
        const titleElement = window.document.createElement('p');
        titleElement.classList.add('title');
        titleElement.innerText = movie.screenInfoMovieTitle;
        const movieTypeElement = window.document.createElement('p');
        movieTypeElement.classList.add('movie-type');
        movieTypeElement.innerText = movie.screenInfoMovieState;
        const branchElement = window.document.createElement('p');
        branchElement.classList.add('branch');
        branchElement.innerText = movie.screenInfoBranchText;
        const dateElement = window.document.createElement('p');
        dateElement.classList.add('date');
        const dateSpanElement = window.document.createElement('span');
        dateSpanElement.innerText = movie.screenInfoDate;
        const dateEmElement = window.document.createElement('em');
        const timeElement = window.document.createElement('span');
        timeElement.classList.add('time');
        timeElement.innerText = movie.screenInfoMovieStartTime + '~' + movie.screenInfoMovieEndTime;
        const clockIconElement = window.document.createElement('i');
        clockIconElement.classList.add('fa-regular', 'fa-clock');
        clockIconElement.append(timeElement);
        dateElement.append(dateSpanElement, dateEmElement, clockIconElement);
        titleAreaElement.append(ageLimitElement, titleElement, movieTypeElement, branchElement, dateElement);
        seatPayWrap.prepend(titleAreaElement);
    });
    form.onsubmit = e => {
        e.preventDefault();
        const selectBooking = Array.from(window.document.querySelectorAll('.row.on'));
        let adultTotalCount = `${parseInt(adultCount.innerText)}`;
        let teenagerTotalCount = `${parseInt(teenagerCount.innerText)}`;
        let etcTotalCount = `${parseInt(etcCount.innerText)}`;
        let priceArray = [adultPrice, teenagerPrice, etcPrice];
        let priceCountArray = [adultTotalCount, teenagerTotalCount, etcTotalCount];
        for (let i = 0; i < selectBooking.length; i++) {
            const seatCodes = selectBooking.map(x => x.value); // A7
            const seatIndexs = selectBooking.map(x => x.dataset.seatIndex);
            const seatPrices = priceArray.map(x => parseInt(x.innerText));
            let lastCountArray = [];
            for (let j = 0; j < priceCountArray.length; j++) {
                for (let z = 0; z < priceCountArray[j]; z++) {
                    lastCountArray.push(seatPrices[j] / (priceCountArray[j]));
                }
            }
            let seatIndex = seatIndexs[i];
            let seatCode = seatCodes[i];
            let seatPrice = lastCountArray[i];
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('screenInfoIndex', movie.screenInfoIndex);
            formData.append('seatIndex', seatIndex);
            formData.append('seatSumCode', seatCode);
            formData.append('payment', seatPrice);
            xhr.open('POST', './booking');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const responseObject = JSON.parse(xhr.responseText);
                        switch (responseObject['result']) {
                            case 'success':
                                window.location.href = '/movie/bookingComplete';
                                break;
                            default:
                                swal('알림', '결제가 실패하였습니다. 잠시 후 다시 시도해 주세요.');
                                break;
                        }
                    } else {
                        swal("알림", "알 수 없는 이유로 결제에 실패하였습니다. 잠시 후 다시 시도해 주세요.");
                    }
                }
            };
            xhr.send(formData);
        }
        const totalPriceSend = {
            totalPriceSend: (parseInt(adultPrice.innerText) + parseInt(teenagerPrice.innerText) + parseInt(etcPrice.innerText))
        }
        localStorage.setItem("total-price", JSON.stringify(totalPriceSend));
    }

}
localStorage.clear();








