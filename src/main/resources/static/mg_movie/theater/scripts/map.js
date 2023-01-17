let container = document.getElementById('map');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
// let options = {
//     center: new kakao.maps.LatLng(`${latitude.value}`, `${longitude.value}`),
//     level: 3,
//     mapTypeId : kakao.maps.MapTypeId.ROADMA,
//     mapTypeId : kakao.maps.MapTypeId.ROADMAP
// };
//
//
// let map = new kakao.maps.Map(container, options);
//
// let markerPosition  = new kakao.maps.LatLng(`${latitude.value}`, `${longitude.value}`);
//
// let marker = new kakao.maps.Marker({
//     position: markerPosition
// });
//
// marker.setMap(map);
// let mapTypeControl = new kakao.maps.MapTypeControl();
// // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
// let zoomControl = new kakao.maps.ZoomControl();
// // 지도의 우측에 확대 축소 컨트롤을 추가한다
// map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

let mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(`${latitude.value}`, `${longitude.value}`), // 지도의 중심좌표
        level: 1, // 지도의 확대 레벨
        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
    };

// 지도를 생성한다
let map = new kakao.maps.Map(mapContainer, mapOption);

// 지도 타입 변경 컨트롤을 생성한다
let mapTypeControl = new kakao.maps.MapTypeControl();

// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도에 확대 축소 컨트롤을 생성한다
let zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 지도 드래깅 이벤트를 등록한다 (드래그 시작 : dragstart, 드래그 종료 : dragend)
kakao.maps.event.addListener(map, 'drag', function () {
    let message = '지도를 드래그 하고 있습니다. ' +
        '지도의 중심 좌표는 ' + map.getCenter().toString() +' 입니다.';
});

// 지도에 마커를 생성하고 표시한다
let marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(`${latitude.value}`, `${longitude.value}`), // 마커의 좌표
    map: map // 마커를 표시할 지도 객체
});

