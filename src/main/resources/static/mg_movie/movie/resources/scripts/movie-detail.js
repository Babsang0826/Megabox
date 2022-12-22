// 스크롤 시 영화와 탭 리스트 변경
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById('movieDetail').classList.add('fixed');
        document.getElementById('tabList').classList.add('fixed');
        document.getElementById('contentData').classList.add('fixed');
    } else {
        document.getElementById('movieDetail').classList.remove('fixed')
        document.getElementById('tabList').classList.remove('fixed')
        document.getElementById('contentData').classList.remove('fixed');
    }
}

// 더보기 클릭 시
const contents = window.document.getElementById('contents');

contents.querySelector('[rel="moreBtn"]').addEventListener('click', () => {
    contents.querySelector('[rel="movieSummary"]').classList.toggle('on');
});

// 관람평 작성 클릭 시
contents.querySelector('[rel="textWrite"]').addEventListener('click', () => {
    contents.querySelector('[rel="writeForm"]').classList.add('on');
});

contents.querySelector('[rel="commentClose"]').addEventListener('click', () => {
    contents.querySelector('[rel="writeForm"]').classList.remove('on');
});

const changeValue = (target) => {

}


//한줄평
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
                const appendComment = (commentObject) => {
                    console.log(commentObject['userId']);
                    const commentHtmlText = `
                        <div class="comment-container" rel="commentContainer">
                            <li class="text-form" rel="textForm">
                                <div class="text-area">
                                    <div class="user-profile">
                                        <div class="profile-img">
                                            <img src="https://www.megabox.co.kr/static/pc/images/mypage/bg-photo.png"
                                                 alt="프로필 사진" title="프로필 사진">
                                        </div>
                                        <p class="user-id">${commentObject['userId']}</p>
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
                                        <span>${commentObject['writtenOn']}</span>
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
                const responseArray = JSON.parse(xhr.responseText);
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
        alert('한줄평을 입력해 주세요.');
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
                        alert('한줄평 작성 완료');
                        loadComments();
                        break;
                    default:
                        alert('알 수 없는 이유로 한줄평을 작성하지 못하였습니다.\n\n잠시 후 다시 시도해 주세요.')
                }
            } else {
                alert('서버와 통신하지 못하였습니다.\n\n잠시 후 다시 시도해 주세요.')
            }
        }
    };
    xhr.send(formData);
}







