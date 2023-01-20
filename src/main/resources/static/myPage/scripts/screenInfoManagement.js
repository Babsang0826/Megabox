const enrollForm = window.document.getElementById('form');
const enrollBtn = window.document.querySelector('.enroll-btn');
const enrollMent = window.document.querySelector('.enrollment');
const selectScreen = window.document.querySelector('.select-screen');
const titleOption = window.document.querySelector('.select.title');
const auditoriumOption = window.document.querySelector('.select.auditorium')
const dateInput = window.document.querySelector('.date');
const deleteBtn = window.document.querySelector('.delete-btn');
const updateBtn = window.document.querySelector('.update-btn');
const startTime = window.document.getElementById('startTime');
const endTime = window.document.getElementById('endTime');

const chkAll = document.querySelector('.chkAll');
const chkBox = document.querySelectorAll('.chkBox');
// 전체 체크박스 선택/해제
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

updateBtn.addEventListener('click', e => {
    e.preventDefault();
    enrollMent.classList.remove('off');
    selectScreen.classList.add('off');
    // const audText = window.document.querySelector('.aud-text');
    // const movieTitle = window.document.querySelector('.movie-title');
    // const screenDate = window.document.querySelector('.screen-date');
    // const date = window.document.querySelector('.date');
    // console.log(date.innerText)
    let chkArr = [];
    const check = document.getElementsByName("chk");
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked === true) {
            // chkArr.push(check[i].value);
            // date.value = screenDate.value;
        }
    }
})

enrollForm.onsubmit = e => {
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
    Cover.hide()
    xhr.send(formData);
};

deleteBtn.addEventListener('click', () => {
    const chkArr = [];
    const check = document.getElementsByName("chk");
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked === true) {
            chkArr.push(check[i].value);
        }
        if(chkArr.length === 0) {
            swal('알림', '삭제할 시간표를 선택해 주세요.')
            return;
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




