const enrollForm = window.document.getElementById('form');
const enrollMent = window.document.querySelector('.enrollment');
const selectScreen = window.document.querySelector('.select-screen');
const titleOption = window.document.querySelector('.select.title');
const auditoriumOption = window.document.querySelector('.select.auditorium');
const dateInput = window.document.querySelector('.date');
const deleteBtn = window.document.querySelector('.delete-btn');

const startTime = window.document.getElementById('startTime');
const endTime = window.document.getElementById('endTime');

const chkAll = document.querySelector('.chkAll');
const chkBox = document.querySelectorAll('.chkBox');

chkAll.onclick = function () {
    if (chkAll.checked === true) {
        for (let i = 0; i < chkBox.length; i++) {
            chkBox[i].checked = true;
        }
    } else {
        for (let i = 0; i < chkBox.length; i++) {
            chkBox[i].checked = false;
        }
    }
};

const modifyList = document.querySelector('[rel="modifyList"]');
const uploadList = document.querySelector('[rel="uploadList"]');

modifyList.addEventListener('click', () => {
    enrollMent.classList.add('off');
    selectScreen.classList.remove('off');
    modifyList.classList.add('on');
    uploadList.classList.remove('on');
});

uploadList.addEventListener('click', () => {
    swal('알림', '영화시간표를 등록하시기 전 다시 한번 확인하시기 바랍니다.');
    enrollMent.classList.remove('off');
    selectScreen.classList.add('off');
    modifyList.classList.remove('on');
    uploadList.classList.add('on');
});

const screenInfoBox = window.document.querySelectorAll('.screen-info-box');
const audText = window.document.querySelectorAll('.aud-text');
const movieTitle = window.document.querySelectorAll('.movie-title');
const screenDate = window.document.querySelectorAll('.screen-date');
const movieStartTime = window.document.querySelectorAll('.movie-start-time');
const movieEndTime = window.document.querySelectorAll('.movie-end-time');
const detailContainer = window.document.querySelectorAll('.detail-container');

for (let i = 0; i < screenInfoBox.length; i++) {
    audText[i].addEventListener('click', () => {
        if (detailContainer[i].classList[0] === 'on') {
            detailContainer[i].classList.remove('on');
        } else {
            for (let e = 0; e < screenInfoBox.length; e++) {
                detailContainer[e].classList.remove('on');
            }
            detailContainer[i].classList.toggle('on');
        }
    });
    movieTitle[i].addEventListener('click', () => {
        if (detailContainer[i].classList[0] === 'on') {
            detailContainer[i].classList.remove('on');
        } else {
            for (let e = 0; e < screenInfoBox.length; e++) {
                detailContainer[e].classList.remove('on');
            }
            detailContainer[i].classList.toggle('on');
        }
    });
    screenDate[i].addEventListener('click', () => {
        if (detailContainer[i].classList[0] === 'on') {
            detailContainer[i].classList.remove('on');
        } else {
            for (let e = 0; e < screenInfoBox.length; e++) {
                detailContainer[e].classList.remove('on');
            }
            detailContainer[i].classList.toggle('on');
        }
    });
    movieStartTime[i].addEventListener('click', () => {
        if (detailContainer[i].classList[0] === 'on') {
            detailContainer[i].classList.remove('on');
        } else {
            for (let e = 0; e < screenInfoBox.length; e++) {
                detailContainer[e].classList.remove('on');
            }
            detailContainer[i].classList.toggle('on');
        }
    });
    movieEndTime[i].addEventListener('click', () => {
        if (detailContainer[i].classList[0] === 'on') {
            detailContainer[i].classList.remove('on');
        } else {
            for (let e = 0; e < screenInfoBox.length; e++) {
                detailContainer[e].classList.remove('on');
            }
            detailContainer[i].classList.toggle('on');
        }
    });
}

const updateBtn = window.document.querySelectorAll('.update-btn');
const modifyTitleOption = window.document.querySelectorAll('.select.modify-title');
const modifyAuditoriumOption = window.document.querySelector('.select.modify-aud');
const modifyDate = window.document.querySelectorAll('.date-modify');
const modifyEndTime = window.document.querySelectorAll('.modify-end-time');
const modifyStartTime = window.document.querySelectorAll('.modify-start-time');
const screenInfoContainer = window.document.querySelectorAll('.screen-info-container');
const hiddenModifyIndex = window.document.querySelectorAll('[rel="hiddenIndex"]');
for (let i = 0; i < screenInfoContainer.length; i++) {
    updateBtn[i].addEventListener('click', e => {
        e.preventDefault();
        if (modifyTitleOption.options[modifyTitleOption.selectedIndex].value === '시간표에 등록할 영화를 선택해 주세요.') {
            swal('알림', '수정하실 영화 제목을 선택해 주세요.');
            return;
        }
        if (modifyAuditoriumOption.options[modifyAuditoriumOption.selectedIndex].value === '상영할 지점과 상영관을 선택해 주세요.') {
            swal('알림', '수정하실 상영관을 선택해 주세요.');
            return;
        }
        if (modifyDate[i].value === '') {
            swal('알림', '수정하실 날짜를 선택해 주세요.');
            return;
        }
        if (modifyStartTime[i].value === '') {
            swal('알림', '수정하실 영화 시작 시간을 선택해 주세요.');
            return;
        }
        if (modifyEndTime[i].value === '') {
            swal('알림', '수정하실 영화 끝 시간을 선택해 주세요.');
            return;
        }
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("index", hiddenModifyIndex[i].value);
        formData.append('movieIndex', modifyTitleOption.options[modifyTitleOption.selectedIndex].value);
        formData.append('auditoriumIndex', modifyAuditoriumOption.options[modifyAuditoriumOption.selectedIndex].value);
        formData.append('modifyScreenDateStr', modifyDate[i].value);
        formData.append('modifyMvStartTimeStr', modifyStartTime[i].value);
        formData.append('modifyMvEndTimeStr', modifyEndTime[i].value);
        xhr.open('PATCH', './screenInfoManagement');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);
                    switch (responseObject['result']) {
                        case 'success':
                            window.location.href = '/myPage/screenInfoManagement';
                            window.location.reload();
                            break;
                        default:
                            swal('알림', '영화 시간표 수정이 실패하였습니다. 잠시 후 다시 시도해 주세요.');
                            break;
                    }
                } else {
                    swal("알림", "알 수 없는 이유로 영화 시간표 수정에 실패하였습니다. 잠시 후 다시 시도해 주세요.");
                }
            }
        };
        xhr.send(formData);
    })
}

const enrollBtn = window.document.querySelector('.enroll-button');
enrollBtn.addEventListener('click', e => {
    e.preventDefault();
    if (titleOption.options[titleOption.selectedIndex].value === '시간표에 등록할 영화를 선택해 주세요.') {
        swal('알림', '영화 제목을 선택해 주세요.');
        return;
    }
    if (auditoriumOption.options[auditoriumOption.selectedIndex].value === '상영할 지점과 상영관을 선택해 주세요.') {
        swal('알림', '상영관을 선택해 주세요.');
        return;
    }
    if (enrollForm['date'].value === '') {
        swal('알림', '날짜를 선택해 주세요.');
        return;
    }
    if (enrollForm['startTime'].value === '') {
        swal('알림', '영화 시작 시간을 선택해 주세요.');
        return;
    }
    if (enrollForm['endTime'].value === '') {
        swal('알림', '영화 끝 시간을 선택해 주세요.');
        return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('movieIndex', titleOption.options[titleOption.selectedIndex].value);
    formData.append('auditoriumIndex', auditoriumOption.options[auditoriumOption.selectedIndex].value);
    formData.append('screenDateStr', dateInput.value);
    formData.append('mvStartTimeStr', startTime.value);
    formData.append('mvEndTimeStr', endTime.value);
    xhr.open('POST', './screenInfoManagement');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        window.location.href = '/myPage/screenInfoManagement';
                        break;
                    default:
                        swal('알림', '영화 시간표 등록이 실패하였습니다. 잠시 후 다시 시도해 주세요.');
                        break;
                }
            } else {
                swal("알림", "알 수 없는 이유로 영화 시간표 등록에 실패하였습니다. 잠시 후 다시 시도해 주세요.");
            }
        }
    };
    xhr.send(formData);
});

deleteBtn.addEventListener('click', () => {
    const chkArr = [];
    const check = document.getElementsByName("chk");
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked === true) {
            chkArr.push(check[i].value);
        }
    }
    let flag;
    swal = swal({
        title: "알림",
        text: "선택하신 시간표를 삭제하시겠습니까?",
        buttons: ["NO", "YES"]
    }).then((YES) => {
        if (YES) {
            flag = true;
            for (let i = 0; i < chkArr.length; i++) {
                const xhr = new XMLHttpRequest();
                const formData = new FormData();
                formData.append('index', chkArr[i]);
                xhr.open('DELETE', './screenInfoManagement');
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            const responseObject = JSON.parse(xhr.responseText);
                            switch (responseObject['result']) {
                                case 'success':
                                    if (i === chkArr.length - 1) {
                                        window.location.reload();
                                        break;
                                    }
                                    break;
                                case 'failure':
                                    swal('알림', '시간표를 삭제할 수 없습니다. 잠시 후 다시 시도해 주세요.');
                                    break;
                                default:
                                    swal('알림', '알 수 없는 이유로 시간표를 삭제할 수 없습니다. 잠시 후 다시 시도해 주세요.');
                            }
                        }
                    }
                }
                xhr.send(formData);
            }
        } else {
            flag = false;
            return window.location.reload();
        }
    });
});




