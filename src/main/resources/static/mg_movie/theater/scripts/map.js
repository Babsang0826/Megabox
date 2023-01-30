let container = document.getElementById('map');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

let mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(`${latitude.value}`, `${longitude.value}`),
        level: 1,
        mapTypeId : kakao.maps.MapTypeId.ROADMAP
    };

let map = new kakao.maps.Map(mapContainer, mapOption);

let mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

let zoomControl = new kakao.maps.ZoomControl();

map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

kakao.maps.event.addListener(map, 'drag', function () {
    let message = '지도를 드래그 하고 있습니다. ' +
        '지도의 중심 좌표는 ' + map.getCenter().toString() +' 입니다.';
});

let marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(`${latitude.value}`, `${longitude.value}`),
    map: map
});

