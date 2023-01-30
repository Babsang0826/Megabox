window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById('pageUtil').classList.add('fixed');
        document.getElementById('movieDetail').classList.add('fixed');
        document.getElementById('tabList').classList.add('fixed');
        document.getElementById('contentData').classList.add('fixed');
    } else {
        document.getElementById('pageUtil').classList.remove('fixed');
        document.getElementById('movieDetail').classList.remove('fixed')
        document.getElementById('tabList').classList.remove('fixed')
        document.getElementById('contentData').classList.remove('fixed');
    }
}

const contents = window.document.getElementById('contents');

contents.querySelector('[rel="moreBtn"]').addEventListener('click', () => {
    contents.querySelector('[rel="movieSummary"]').classList.toggle('on');
});

contents.querySelector('[rel="textWrite"]').addEventListener('click', () => {
    if (document.querySelector('[rel="hiddenUser"]').value === '') {
        swal('알림', '로그인이 필요한 서비스입니다.');
        return false;
    }

    contents.querySelector('[rel="writeForm"]').classList.add('on');
});

contents.querySelector('[rel="commentClose"]').addEventListener('click', () => {
    contents.querySelector('[rel="writeForm"]').classList.remove('on');
});


const mainInfoLi = contents.querySelector('[rel="mainInfoLi"]');
const commentScoreLi = contents.querySelector('[rel="commentScoreLi"]');
const moviePostLi = contents.querySelector('[rel="moviePostLi"]');

mainInfoLi.addEventListener('click', () => {
    moviePostLi.classList.remove('on');
    commentScoreLi.classList.remove('on');
    mainInfoLi.classList.add('on');
    let location = contents.querySelector('.movie-summary').offsetTop - 160;
    window.scrollTo({top: location, behavior: 'smooth'});
});

commentScoreLi.addEventListener('click', () => {
    moviePostLi.classList.remove('on');
    mainInfoLi.classList.remove('on');
    commentScoreLi.classList.add('on');
    let location = contents.querySelector('.comment-info').offsetTop - 130;
    window.scrollTo({top: location, behavior: 'smooth'});
});

moviePostLi.addEventListener('click', () => {
    swal('알림', '서비스 준비중 입니다.');
    mainInfoLi.classList.add('on');
    commentScoreLi.classList.remove('on');
});

const writeForm = window.document.getElementById('writeForm');
const commentContainer = window.document.getElementById('commentContainer');

const loadComments = (commentObject) => {

    commentContainer.innerHTML = '';
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const xhr = new XMLHttpRequest();
    const mid = searchParams.get('mid');
    xhr.open('GET', `./comment?mid=${mid}`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseArray = JSON.parse(xhr.responseText);

                function writtenTime(commentObject) {
                    const today = new Date();
                    const timeValue = new Date(`${commentObject['writtenOn']}`);

                    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
                    if (betweenTime < 1) {
                        return '방금전';
                    }
                    if (betweenTime < 60) {
                        return `${betweenTime}분전`;
                    }

                    const betweenTimeHour = Math.floor(betweenTime / 60);
                    if (betweenTimeHour < 24) {
                        return `${betweenTimeHour}시간전`;
                    }

                    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
                    if (betweenTimeDay < 365) {
                        return `${betweenTimeDay}일전`;
                    }

                    return `${Math.floor(betweenTimeDay / 365)}년전`;
                }

                const appendComment = (commentObject) => {
                    const commentHtmlText = `
                        <div class="comment-container" rel="commentContainer">
                            <li class="text-form" rel="textForm">
                                <div class="text-area">
                                    <div class="user-profile">
                                        <div class="profile-img">
                                            <img src="https://www.megabox.co.kr/static/pc/images/mypage/bg-photo.png"
                                                 alt="프로필 사진" title="프로필 사진">
                                        </div>
                                        <p class="user-id">${commentObject['userId'].replace(/.{2}$/, "**")}</p>
                                    </div>
                                    <div class="text-box">
                                        <div class="text-wrap review">
                                            <div class="title">관람평</div>
                                            <div class="text-content">
                                                <div class="point">
                                                    <span>${commentObject['score']}</span>
                                                </div>
                                                <div class="recommend">
                                                    <em>${commentObject['recommendPoint']}</em>
                                                </div>
                                                <div class="text-story">
                                                    ${commentObject['content']}
                                                </div>
                                            </div>
                                            <div class="text-write"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="story-date">
                                    <div class="written-on">
<!--                                        <span>${commentObject['writtenOn']}</span>-->
                                        <span>${writtenTime(commentObject)}</span>
                                    </div>
                                </div>
                            </li>
                        </div>`;

                    const domParser = new DOMParser();
                    const dom = domParser.parseFromString(commentHtmlText, 'text/html');
                    const commentElement = dom.querySelector('[rel="commentContainer"]');
                    const textElement = dom.querySelector('[rel="textForm"]');

                    commentContainer.append(textElement);
                }

                for (let commentObject of responseArray) {
                    appendComment(commentObject);
                }


            } else {

            }
        }
    }
    xhr.send();
};

loadComments();


writeForm.onsubmit = e => {
    e.preventDefault();

    if (writeForm['content'].value === '') {
        swal('알림', '한줄평을 입력해 주세요.');
        writeForm['content'].focus();
        return false;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('content', writeForm['content'].value);
    formData.append('recommendPoint', writeForm['recommend'].value);
    formData.append('score', writeForm['score'].value);
    formData.append('mid', writeForm['mid'].value);
    xhr.open('POST', `./movie-detail`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case 'success':
                        swal('알림', '한줄평 작성 완료');
                        // loadComments();
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                        break;
                    case 'failure' :
                        swal('알림', '로그인 후 이용가능합니다.');
                        break;
                    default:
                        swal('알림', '알 수 없는 이유로 한줄평을 작성하지 못하였습니다.\n\n잠시 후 다시 시도해 주세요.');
                }
            } else {
                swal('알림', '서버와 통신하지 못하였습니다.\n\n잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);
}

function addDays(date, days) {
    const clone = new Date(date);
    clone.setDate(date.getDate() + days)
    return clone;
}

let today = new Date();
let days = [];

for (let i = 4; i > -1; i--) {
    const yesterday =
        ((addDays(today, -i).getMonth() + 1) / 10 >= 1
            ? addDays(today, -i).getMonth() + 1
            : ('0' + (addDays(today, -i).getMonth() + 1))) + '.' +
        ((addDays(today, -i).getDate()) / 10 >= 1
            ? addDays(today, -i).getDate()
            : ('0' + (addDays(today, -i).getDate())));
    days.push(yesterday);
}

const v_data = {
    labels: days,
    datasets: [
        {
            label: '일별 관객수',
            data: amounts,
            borderColor: '#a0cdeb',
            borderWidth: 1,
            backgroundColor: '#a9d1df',
            yAxisID: 'y',
            xAxisID: 'x',
        },
    ]
};

const v_config = {
    type: 'line',
    data: v_data,

    options: {
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {
                position: 'left',
                suggestedMin: 0,
                suggestedMax: 15,
                grid: {
                    display: false,
                    borderDash: [5, 5]
                },
                ticks: {
                    display: false,
                },
            },
            x: {
                grid: {
                    borderColor: '#444',
                    borderWidth: 1.5,
                    borderDash: [3, 5],
                    color: '#888'
                },
            },
        },
    }
};


document.addEventListener('DOMContentLoaded', function () {
    new Chart(document.getElementById('chart'), v_config);
});





