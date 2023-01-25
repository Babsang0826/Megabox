function resize(obj) {
    obj.style.height = '1px';
    obj.style.height = (18 + obj.scrollHeight) + 'px';
}

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


const textArea = document.querySelectorAll('#textArea');
const movies = document.querySelectorAll('[rel="hiddenMovie"]');
const cancelIcon = document.querySelectorAll('#cancelIcon');
const contentTr = document.querySelectorAll('.content-tr');
const titleKo = document.querySelectorAll('[rel="titleKo"]');
const titleEn = document.querySelectorAll('[rel="titleEn"]');

for (let i = 0; i < movies.length; i++) {
    titleKo[i].addEventListener('click', () => {
        contentTr[i].classList.toggle('on')
    });

    titleEn[i].addEventListener('click', () => {
        contentTr[i].classList.toggle('on')
    });

    cancelIcon[i].addEventListener('click', () => {
        contentTr[i].classList.remove('on');
    });

    textArea[i].addEventListener('click', () => {
        textArea[i].style.display = 'block'
    });
}

const modifyList = document.querySelector('[rel="modifyList"]');
const uploadList = document.querySelector('[rel="uploadList"]');
const modifyContent = document.querySelector('[rel="modifyContent"]');
const uploadContent = document.querySelector('[rel="uploadContent"]');


modifyList.addEventListener('click', () => {
    modifyContent.classList.add('on');
    uploadContent.classList.remove('on');
    modifyList.classList.add('on');
    uploadList.classList.remove('on');
});

uploadList.addEventListener('click', () => {
    modifyContent.classList.remove('on');
    uploadContent.classList.add('on');
    modifyList.classList.remove('on');
    uploadList.classList.add('on');
});

const uploadBtn = document.querySelector('[rel="uploadBtn"]');

uploadBtn.addEventListener('click', e => {
    const title = document.querySelector('#title');
    const titleEn2 = document.querySelector('#titleEn');
    const releaseDate = document.querySelector('#releaseDate');
    const endDate = document.querySelector('#endDate');
    const ageLimit = document.querySelector('#ageLimit');
    const screenType = document.querySelector('#screenType');
    const movieState = document.querySelector('#movieState');
    const genre = document.querySelector('#genre');
    const director = document.querySelector('#director');
    const actor = document.querySelector('#actor');
    const runningTime = document.querySelector('#runningTime');
    const moviePoster = document.querySelector('#moviePoster');
    const backgroundImage = document.querySelector('#backgroundImage');
    const summary = document.querySelector('[rel="textArea"]');

    e.preventDefault();



    if (title.value === '') {
        swal('알림', '제목을 입력해 주세요.');
        title.focus();
        return false;
    }
    if (titleEn2.value === '') {
        swal('알림', '영문 제목을 입력해 주세요.');
        titleEn2.focus();
        return false;
    }
    if (releaseDate.value === '') {
        swal('알림', '개봉일을 입력해 주세요.');
        releaseDate.focus();
        return false;
    }
    if (endDate.value === '') {
        swal('알림', '상영종료일을 입력해 주세요.');
        endDate.focus();
        return false;
    }
    if (endDate.value < releaseDate.value) {
        swal('알림', '상영종료일은 개봉일보다 빠를 수 없습니다.');
        endDate.focus();
        return false;
    }
    if (ageLimit.value === '') {
        swal('알림', '등급을 입력해 주세요.');
        return false;
    }
    if (screenType.value === '') {
        swal('알림', '상영 타입을 입력해 주세요.');
        return false;
    }
    if (movieState.value === '') {
        swal('알림', '영화 상태를을 입력해 주세요.');
        return false;
    }
    if (genre.value === '') {
        swal('알림', '장르를 입력해 주세요.');
        genre.focus();
        return false;
    }
    if (director.value === '') {
        swal('알림', '감독을 입력해 주세요.');
        director.focus();
        return false;
    }
    if (actor.value === '') {
        swal('알림', '배우를 입력해 주세요.');
        actor.focus();
        return false;
    }
    if (runningTime.value === '') {
        swal('알림', '상영시간을 입력해 주세요.');
        runningTime.focus();
        return false;
    }
    if (moviePoster.value === '') {
        swal('알림', '영화 포스터 URL을 입력해 주세요.');
        moviePoster.focus();
        return false;
    }
    if (backgroundImage.value === '') {
        swal('알림', '배경 이미지 URL을 입력해 주세요.');
        backgroundImage.focus();
        return false;
    }
    if (summary.value === '') {
        swal('알림', '줄거리를 입력해 주세요.');
        summary.focus();
        return false;
    }

    const warningText = document.createElement('span');
    const warningTextLength = document.querySelectorAll('.warningText').length;

    if (regexEn.test(titleEn2.value) === false) {
        warningText.innerText = '영문으로만 입력 가능합니다.';
        warningText.classList.add('warningText');
        warningText.style.color = 'red';
        warningText.style.fontSize = '15px';
        warningText.style.textAlign = 'left';
        warningText.style.marginLeft = '16px';
        warningText.style.display = 'flex';
        warningText.style.alignItems = 'center';
        if(warningTextLength === 0) {
            document.querySelector('[rel="inputWrap2"]').append(warningText);
        }
        titleEn2.focus();
        return false;
    }

    if (regexNum.test(runningTime.value) === false) {
        swal('알림', '상영시간은 숫자만 입력 가능힙니다.');
        runningTime.focus();
        return false;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('titleEn', titleEn2.value);
    formData.append('releaseDateStr', releaseDate.value);
    formData.append('endDateStr', endDate.value);
    formData.append('ageLimit', ageLimit.value);
    formData.append('screenType', screenType.value);
    formData.append('movieState', movieState.value);
    formData.append('genre', genre.value);
    formData.append('director', director.value);
    formData.append('actor', actor.value);
    formData.append('runningTime', runningTime.value);
    formData.append('moviePoster', moviePoster.value);
    formData.append('backgroundImage', backgroundImage.value);
    formData.append('summary', summary.value);
    xhr.open('POST', './movieManagement');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        swal('알림', '영화 등록이 완료되었습니다.');
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                        break;
                    case 'failure':
                        swal('알림', '영화 등록에 실패하였습니다.');
                        break;
                    default:
                        swal('알림', '알 수 없는 이유로 영화를 등록하지 못하였습니다.');
                        break;
                }
            }
        }
    }
    xhr.send(formData);
});

const modifyBtns = document.querySelectorAll('[rel="modifyBtn"]');

const movieIndex = document.querySelectorAll('[rel="hiddenIndex"]');
const title = document.querySelectorAll('[rel="movieTitle"]');
const titleEn2 = document.querySelectorAll('[rel="titleEn2"]');
const releaseDate = document.querySelectorAll('[rel="releaseDate"]');
const endDate = document.querySelectorAll('[rel="endDate"]');
const ageLimit = document.querySelectorAll('[rel="ageLimit"]');
const screenType = document.querySelectorAll('[rel="screenType"]');
const movieState = document.querySelectorAll('[rel="movieState"]');
const genre = document.querySelectorAll('[rel="genre"]');
const director = document.querySelectorAll('[rel="director"]');
const actor = document.querySelectorAll('[rel="actor"]');
const runningTime = document.querySelectorAll('[rel="runningTime"]');
const moviePoster = document.querySelectorAll('[rel="moviePoster"]');
const backgroundImage = document.querySelectorAll('[rel="backgroundImage"]');
const summary = document.querySelectorAll('#textArea');

const regexEn = /^[a-zA-Z0-9 ]*$/;
const regexNum = /^[0-9]+$/;

for (let i = 0; i < modifyBtns.length; i++) {
    modifyBtns[i].addEventListener('click', e => {
        e.preventDefault();

        if (title[i].value === '') {
            swal('알림', '제목을 입력해 주세요.');
            title[i].focus();
            return false;
        }
        if (titleEn2[i].value === '') {
            swal('알림', '영문 제목을 입력해 주세요.');
            titleEn2[i].focus();
            return false;
        }

        if (releaseDate[i].value === '') {
            swal('알림', '개봉일을 입력해 주세요.');
            return false;
        }
        if (endDate[i].value === '') {
            swal('알림', '상영종료일을 입력해 주세요.');
            return false;
        }
        if (endDate[i].value < releaseDate[i].value) {
            swal('알림', '상영종료일은 개봉일보다 빠를 수 없습니다.');
            return false;
        }
        if (ageLimit[i].value === '') {
            swal('알림', '등급을 입력해 주세요.');
            return false;
        }
        if (screenType[i].value === '') {
            swal('알림', '상영 타입을 입력해 주세요.');
            return false;
        }
        if (movieState[i].value === '') {
            swal('알림', '영화 상태를을 입력해 주세요.');
            return false;
        }
        if (genre[i].value === '') {
            swal('알림', '장르를 입력해 주세요.');
            genre[i].focus();
            return false;
        }
        if (director[i].value === '') {
            swal('알림', '감독을 입력해 주세요.');
            director[i].focus();
            return false;
        }
        if (actor[i].value === '') {
            swal('알림', '배우를 입력해 주세요.');
            actor[i].focus();
            return false;
        }
        if (runningTime[i].value === '') {
            swal('알림', '상영시간을 입력해 주세요.');
            runningTime[i].focus();
            return false;
        }
        if (moviePoster[i].value === '') {
            swal('알림', '영화 포스터 URL을 입력해 주세요.');
            moviePoster[i].focus();
            return false;
        }
        if (backgroundImage[i].value === '') {
            swal('알림', '배경 이미지 URL을 입력해 주세요.');
            backgroundImage[i].focus();
            return false;
        }
        if (summary[i].value === '') {
            swal('알림', '줄거리를 입력해 주세요.');
            summary[i].focus();
            return false;
        }

        const warningText = document.createElement('span');
        const warningTextLength = document.querySelectorAll('.warningText').length;

        if (regexEn.test(titleEn2[i].value) === false) {
            warningText.innerText = '영문으로만 입력 가능합니다.';
            warningText.classList.add('warningText');
            warningText.style.color = 'red';
            warningText.style.fontSize = '15px';
            warningText.style.textAlign = 'left';
            warningText.style.marginLeft = '16px';
            warningText.style.display = 'flex';
            warningText.style.alignItems = 'center';
            if(warningTextLength === 0) {
                document.querySelectorAll('[rel="inputWrap"]')[i].append(warningText);
            }
            titleEn2[i].focus();
            return false;
        }

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('index', movieIndex[i].value);
        formData.append('title', title[i].value);
        formData.append('titleEn', titleEn2[i].value);
        formData.append('releaseDateStr', releaseDate[i].value);
        formData.append('endDateStr', endDate[i].value);
        formData.append('ageLimit', ageLimit[i].value);
        formData.append('screenType', screenType[i].value);
        formData.append('movieState', movieState[i].value);
        formData.append('genre', genre[i].value);
        formData.append('director', director[i].value);
        formData.append('actor', actor[i].value);
        formData.append('runningTime', parseInt(runningTime[i].value.slice(0,-1)));
        formData.append('moviePoster', moviePoster[i].value);
        formData.append('backgroundImage', backgroundImage[i].value);
        formData.append('summary', summary[i].value);
        xhr.open('PATCH', './movieManagement');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);
                    switch (responseObject['result']) {
                        case 'success':
                            swal('알림', '영화 수정이 완료되었습니다.');
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000);
                            break;
                        case 'failure':
                            swal('알림', '영화 수정에 실패하였습니다.');
                            break;
                        default:
                            swal('알림', '알 수 없는 이유로 영화를 수정하지 못하였습니다.');
                            break;
                    }
                }
            }
        }
        xhr.send(formData);
    })
}

const deleteBtn = document.querySelectorAll('[rel="deleteBtn"]');

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', e => {
        e.preventDefault();

        if (!confirm('정말로 영화를 삭제하시겠습니까?')) {
            return;
        }
        const xhr = new XMLHttpRequest();
            const formData = new FormData();
            formData.append('index', movieIndex[i].value);
            xhr.open('DELETE', './movieManagement');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const responseObject = JSON.parse(xhr.responseText);
                        switch (responseObject['result']) {
                            case 'success':
                                swal('알림', '영화 삭제가 완료되었습니다.');
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);
                                break;
                            case 'failure':
                                swal('알림', '영화 삭제에 실패하였습니다.');
                                break;
                            default:
                                swal('알림', '알 수 없는 이유로 영화를 삭제하지 못하였습니다.');
                        }
                    }
                }
            }
            xhr.send(formData);
    })
}


const deleteEachBtn = window.document.querySelector('[rel="delete"]');

const arr = [];
const check = document.getElementsByName("chk");
for (let i = 0; i < check.length; i++) {
    if (check[i].checked === true) {
        arr.push(check[i].value);
        console.log(check[i])
    }
}

deleteEachBtn.addEventListener('click', e => {
    e.preventDefault();

    if (!confirm('정말로 영화를 삭제 하시겠습니까?')) {
        return;
    }

    const arr = [];
    const check = document.getElementsByName("chk");
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked === true) {
            arr.push(check[i].value);
        }
    }

    for (let i = 0; i < arr.length; i++){
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('index', parseInt(arr[i]));
        xhr.open('DELETE', './movieManagement');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const responseObject = JSON.parse(xhr.responseText);
                    switch (responseObject['result']) {
                        case 'success':
                            swal('알림', '영화 삭제가 완료되었습니다.');
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000);
                            break;
                        case 'failure':
                            swal('알림', '영화 삭제에 실패하였습니다.');
                            break;
                        default:
                            swal('알림', '알 수 없는 이유로 영화를 삭제하지 못하였습니다.');
                    }
                }
            } else {

            }
        }
        xhr.send(formData);
    }
});








