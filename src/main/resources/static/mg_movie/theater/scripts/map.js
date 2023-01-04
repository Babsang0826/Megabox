let container = document.getElementById('map');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
let options = {
    center: new kakao.maps.LatLng(`${latitude.value}`, `${longitude.value}`),
    level: 2
};

let map = new kakao.maps.Map(container, options);

let markerPosition  = new kakao.maps.LatLng(`${latitude.value}`, `${longitude.value}`);

let marker = new kakao.maps.Marker({
    position: markerPosition
});

marker.setMap(map);

