const form = window.document.getElementById('form');

// let region = [
//     {v: "", t: "지역 선택"},
//     {v: "1", t: "부산/대구/경상"},
//     {v: "2", t: "서울"},
//     {v: "3", t: "경기"},
//     {v: "4", t: "인천"},
//     {v: "5", t: "대전/충청/세종"},
//     {v: "6", t: "광주/전라"},
//     {v: "7", t: "강원"}
// ];
//
// let theater_1 = [
//     {v: "", t: "극장 선택"},
//     {v: "11", t: "경북도청"},
//     {v: "12", t: "경산하양"},
//     {v: "13", t: "경주"},
//     {v: "14", t: "구미강동"},
//     {v: "15", t: "김천"},
// ];
//
// let theater_2 = [
//     {v: "", t: "극장 선택"},
//     {v: "21", t: "강남"},
//     {v: "22", t: "강남대로"},
//     {v: "23", t: "강남강동"},
//     {v: "24", t: "군자"},
//     {v: "25", t: "동대문"},
// ];
//
// let theater_3 = [
//     {v: "", t: "극장 선택"},
//     {v: "31", t: "고양스타필드"},
//     {v: "32", t: "광명AK플라자"},
//     {v: "33", t: "광명소하"},
//     {v: "34", t: "금정AK플라자"},
//     {v: "35", t: "김포한강신도시"},
// ];
//
// let theater_4 = [
//     {v: "", t: "극장 선택"},
//     {v: "41", t: "검단"},
//     {v: "42", t: "송도"},
//     {v: "43", t: "영종"},
//     {v: "44", t: "인천논현"},
//     {v: "45", t: "청라지겔"},
// ];
//
// let theater_5 = [
//     {v: "", t: "극장 선택"},
//     {v: "51", t: "공주"},
//     {v: "52", t: "논산"},
//     {v: "53", t: "대전"},
//     {v: "54", t: "대전신세계 아트앤사이언스"},
//     {v: "55", t: "대전유성"},
// ];
//
// let theater_6 = [
//     {v: "", t: "극장 선택"},
//     {v: "61", t: "광주상무"},
//     {v: "62", t: "광주하남"},
//     {v: "63", t: "목포하(포르모)"},
//     {v: "64", t: "순천"},
//     {v: "65", t: "여수웅천"},
// ];
//
// let theater_7 = [
//     {v: "", t: "극장 선택"},
//     {v: "71", t: "남춘천"},
//     {v: "72", t: "속초"},
//     {v: "73", t: "원주"},
//     {v: "74", t: "원주센트럴"},
//     {v: "75", t: "춘천석사"},
// ];
//
//
// function loadRegion() {
//     let h = [];
//     region.forEach(item => {
//         h.push('<option value="' + item.v + '">' + item.t + '</option>');
//     });
//
//     document.getElementById("region").innerHTML = h.join("");
// }
//
// loadRegion();
//
// function loadTheater() {
//     let regionSelect = document.getElementById("region").value;
//     let h = [];
//     if (regionSelect === "") {
//
//     } else {
//         if (regionSelect === "1") {
//             theater_1.forEach(item => {
//                 h.push('<option value="' + item.v + '">' + item.t + '</option>');
//             })
//         } else if (regionSelect === "2") {
//             theater_2.forEach(item => {
//                 h.push('<option value="' + item.v + '">' + item.t + '</option>');
//             });
//         } else if (regionSelect === "3") {
//             theater_3.forEach(item => {
//                 h.push('<option value="' + item.v + '">' + item.t + '</option>');
//             });
//         } else if (regionSelect === "4") {
//             theater_4.forEach(item => {
//                 h.push('<option value="' + item.v + '">' + item.t + '</option>');
//             });
//         } else if (regionSelect === "5") {
//             theater_5.forEach(item => {
//                 h.push('<option value="' + item.v + '">' + item.t + '</option>');
//             });
//         } else if (regionSelect === "6") {
//             theater_6.forEach(item => {
//                 h.push('<option value="' + item.v + '">' + item.t + '</option>');
//             });
//         } else if (regionSelect === "7") {
//             theater_7.forEach(item => {
//                 h.push('<option value="' + item.v + '">' + item.t + '</option>');
//             });
//         }
//     }
//     document.getElementById("theater").innerHTML = h.join("");
// }

let editor;
ClassicEditor
    .create(form['content'], {
        simpleUpload: {
            uploadUrl: './image'
        }
    })
    .then(e => editor = e);

form['back'].addEventListener('click', () =>
    window.history.length < 2 ? window.close() : window.history.back());

form.onsubmit = e => {
    e.preventDefault();
    // Warning.hide();

    if (form['title'].value === '') {
        alert("제목을 작성해주세요.")
        // Warning.show('제목을 입력해 주세요.');
        form['title'].focus();
        return false;
    }

    if (editor.getData() === '') {
        alert("내용을 입력해 주세요.")
        editor.focus();
        return false;
    }
    alert('게시글을 작성하고 있습니다.\n잠시만 기다려 주세요.');
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('title', form['title'].value);
    formData.append('content', editor.getData());
    formData.append('bid', form['bid'].value);
    formData.append('sort', form['sort'].value);
    formData.append('region', form['region'].value);
    formData.append('branch', form['branch'].value);
    xhr.open('POST', './write');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject['result']) {
                    case'not_allowed':
                        alert('게시글을 작성할 수 있는 권한이 없거나 로그아웃되었습나다. 확인 후 다시 시도해 주세요.');
                        break;
                    case'success':
                        alert('작성되었습니다.');
                        // const aid = responseObject['aid'];
                        // window.location.href = `notice?aid=${aid}`;
                        window.location.href = 'http://localhost:8080/bbs/notice?bid=' + responseObject['bid'];
                        break;
                    default:
                      alert('알 수 없는 이유로 게시글을 작성하지 못하였습니다. 잠시 후 다시 시도해 주새요.');
                }
            } else {
                alert('서버와 통신하지 못하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);

}