const form = window.document.getElementById('form');

// form.querySelector('[rel="seoul"]').addEventListener('click', () => {
//     form.querySelector('[rel="seoul"]').style.backgroundColor = "#555";
//     form.querySelector('[rel="seoul"]').style.color = "#fff";
//     form.querySelector('[rel="daegu"]').style.backgroundColor = "#fff";
//     form.querySelector('[rel="daegu"]').style.color = "#555";
//     document.getElementById("region").style.display = "none";
//     document.getElementById("B1").style.display = "block";
// });
//
// form.querySelector('[rel="gyeonggi"]').addEventListener('click', () => {
//     form.querySelector('[rel="gyeonggi"]').style.backgroundColor = "#555";
//     form.querySelector('[rel="gyeonggi"]').style.color = "#fff";
//     form.querySelector('[rel="seoul"]').style.backgroundColor = "#fff";
//     form.querySelector('[rel="seoul"]').style.color = "#555";
//     document.getElementById("B1").style.display = "none";
//     document.getElementById("B2").style.display = "block";
// });

const regionSeoul = form.querySelector('[rel="region-seoul"]');
const regionGyeonggi = form.querySelector('[rel="region-gyeonggi"]');
const regionIncheon = form.querySelector('[rel="region-Incheon"]');
const regionDaejeon = form.querySelector('[rel="region-daejeon"]');
const regionGyeongsang = form.querySelector('[rel="region-gyeongsang"]');
const regionJeonla = form.querySelector('[rel="region-jeonla"]');
const regionGangwon = form.querySelector('[rel="region-gangwon"]');

const seoulCity = window.document.getElementById("seoul-city");
const gyeonggiCity = window.document.getElementById("gyeonggi-city");
const incheonCity = window.document.getElementById("incheon-city");
const daejeonCity = window.document.getElementById("daejeon-city");
const gyeongsangCity = window.document.getElementById("gyeongsang-city");
const jeonlaCity = window.document.getElementById("jeonla-city");
const gangwonCity = window.document.getElementById("gangwon-city");


regionSeoul.addEventListener('click', () => {
    alert("아직 준비되지 않은 서비스 입니다.");
    form['regionSeoul'].focus();
    // regionSeoul.style.backgroundColor = "#555";
    // regionSeoul.style.color = "#fff";
    // seoulCity.style.display = "block";
    // regionGyeongsang.style.backgroundColor = "#fff";
    // regionGyeongsang.style.color = "#555";
    // gyeongsangCity.style.display = "none";
    // regionGyeonggi.style.backgroundColor = "#fff";
    // regionGyeonggi.style.color = "#555";
    // gyeonggiCity.style.display = "none";
    // regionIncheon.style.backgroundColor = "#fff";
    // regionIncheon.style.color = "#555";
    // incheonCity.style.display = "none";
    // regionDaejeon.style.backgroundColor = "#fff";
    // regionDaejeon.style.color = "#555";
    // daejeonCity.style.display = "none";
    // regionJeonla.style.backgroundColor = "#fff";
    // regionJeonla.style.color = "#555";
    // jeonlaCity.style.display = "none";
    // regionGangwon.style.backgroundColor = "#fff";
    // regionGangwon.style.color = "#555";
    // gangwonCity.style.display = "none";
});

regionGyeongsang.addEventListener('click', () => {
    regionGyeongsang.style.backgroundColor = "#555";
    regionGyeongsang.style.color = "#fff";
    gyeongsangCity.style.display = "block";
    regionSeoul.style.backgroundColor = "#fff";
    regionSeoul.style.color = "#555";
    seoulCity.style.display = "none";
    regionGyeonggi.style.backgroundColor = "#fff";
    regionGyeonggi.style.color = "#555";
    gyeonggiCity.style.display = "none";
    regionIncheon.style.backgroundColor = "#fff";
    regionIncheon.style.color = "#555";
    incheonCity.style.display = "none";
    regionDaejeon.style.backgroundColor = "#fff";
    regionDaejeon.style.color = "#555";
    daejeonCity.style.display = "none";
    regionJeonla.style.backgroundColor = "#fff";
    regionJeonla.style.color = "#555";
    jeonlaCity.style.display = "none";
    regionGangwon.style.backgroundColor = "#fff";
    regionGangwon.style.color = "#555";
    gangwonCity.style.display = "none";
});

regionGyeonggi.addEventListener('click', () => {
    swal("알림", "아직 준비되지 않은 서비스 입니다.");
    form['regionSeoul'].focus();
    // regionGyeongsang.style.backgroundColor = "#fff";
    // regionGyeongsang.style.color = "#555";
    // gyeongsangCity.style.display = "none";
    // regionSeoul.style.backgroundColor = "#fff";
    // regionSeoul.style.color = "#555";
    // seoulCity.style.display = "none";
    // regionGyeonggi.style.backgroundColor = "#555";
    // regionGyeonggi.style.color = "#fff";
    // gyeonggiCity.style.display = "block";
    // regionIncheon.style.backgroundColor = "#fff";
    // regionIncheon.style.color = "#555";
    // incheonCity.style.display = "none";
    // regionDaejeon.style.backgroundColor = "#fff";
    // regionDaejeon.style.color = "#555";
    // daejeonCity.style.display = "none";
    // regionJeonla.style.backgroundColor = "#fff";
    // regionJeonla.style.color = "#555";
    // jeonlaCity.style.display = "none";
    // regionGangwon.style.backgroundColor = "#fff";
    // regionGangwon.style.color = "#555";
    // gangwonCity.style.display = "none";
});

regionIncheon.addEventListener('click', () => {
    swal("알림", "아직 준비되지 않은 서비스 입니다.");
    form['regionSeoul'].focus();
    // regionGyeongsang.style.backgroundColor = "#fff";
    // regionGyeongsang.style.color = "#555";
    // gyeongsangCity.style.display = "none";
    // regionSeoul.style.backgroundColor = "#fff";
    // regionSeoul.style.color = "#555";
    // seoulCity.style.display = "none";
    // regionGyeonggi.style.backgroundColor = "#fff";
    // regionGyeonggi.style.color = "#555";
    // gyeonggiCity.style.display = "none";
    // regionIncheon.style.backgroundColor = "#555";
    // regionIncheon.style.color = "#fff";
    // incheonCity.style.display = "block";
    // regionDaejeon.style.backgroundColor = "#fff";
    // regionDaejeon.style.color = "#555";
    // daejeonCity.style.display = "none";
    // regionJeonla.style.backgroundColor = "#fff";
    // regionJeonla.style.color = "#555";
    // jeonlaCity.style.display = "none";
    // regionGangwon.style.backgroundColor = "#fff";
    // regionGangwon.style.color = "#555";
    // gangwonCity.style.display = "none";
});

regionDaejeon.addEventListener('click', () => {
    swal("알림", "아직 준비되지 않은 서비스 입니다.");
    form['regionSeoul'].focus();
    // regionGyeongsang.style.backgroundColor = "#fff";
    // regionGyeongsang.style.color = "#555";
    // gyeongsangCity.style.display = "none";
    // regionSeoul.style.backgroundColor = "#fff";
    // regionSeoul.style.color = "#555";
    // seoulCity.style.display = "none";
    // regionGyeonggi.style.backgroundColor = "#fff";
    // regionGyeonggi.style.color = "#555";
    // gyeonggiCity.style.display = "none";
    // regionIncheon.style.backgroundColor = "#fff";
    // regionIncheon.style.color = "#555";
    // incheonCity.style.display = "none";
    // regionDaejeon.style.backgroundColor = "#555";
    // regionDaejeon.style.color = "#fff";
    // daejeonCity.style.display = "block";
    // regionJeonla.style.backgroundColor = "#fff";
    // regionJeonla.style.color = "#555";
    // jeonlaCity.style.display = "none";
    // regionGangwon.style.backgroundColor = "#fff";
    // regionGangwon.style.color = "#555";
    // gangwonCity.style.display = "none";
});

regionJeonla.addEventListener('click', () => {
    swal("알림", "아직 준비되지 않은 서비스 입니다.");
    form['regionSeoul'].focus();
    // regionGyeongsang.style.backgroundColor = "#fff";
    // regionGyeongsang.style.color = "#555";
    // gyeongsangCity.style.display = "none";
    // regionSeoul.style.backgroundColor = "#fff";
    // regionSeoul.style.color = "#555";
    // seoulCity.style.display = "none";
    // regionGyeonggi.style.backgroundColor = "#fff";
    // regionGyeonggi.style.color = "#555";
    // gyeonggiCity.style.display = "none";
    // regionIncheon.style.backgroundColor = "#fff";
    // regionIncheon.style.color = "#555";
    // incheonCity.style.display = "none";
    // regionDaejeon.style.backgroundColor = "#fff";
    // regionDaejeon.style.color = "#555";
    // daejeonCity.style.display = "none";
    // regionJeonla.style.backgroundColor = "#555";
    // regionJeonla.style.color = "#fff";
    // jeonlaCity.style.display = "block";
    // regionGangwon.style.backgroundColor = "#fff";
    // regionGangwon.style.color = "#555";
    // gangwonCity.style.display = "none";
});

regionGangwon.addEventListener('click', () => {
    swal("알림", "아직 준비되지 않은 서비스 입니다.");

    // regionGyeongsang.style.backgroundColor = "#fff";
    // regionGyeongsang.style.color = "#555";
    // gyeongsangCity.style.display = "none";
    // regionSeoul.style.backgroundColor = "#fff";
    // regionSeoul.style.color = "#555";
    // seoulCity.style.display = "none";
    // regionGyeonggi.style.backgroundColor = "#fff";
    // regionGyeonggi.style.color = "#555";
    // gyeonggiCity.style.display = "none";
    // regionIncheon.style.backgroundColor = "#fff";
    // regionIncheon.style.color = "#555";
    // incheonCity.style.display = "none";
    // regionDaejeon.style.backgroundColor = "#fff";
    // regionDaejeon.style.color = "#555";
    // daejeonCity.style.display = "none";
    // regionJeonla.style.backgroundColor = "#fff";
    // regionJeonla.style.color = "#555";
    // jeonlaCity.style.display = "none";
    // regionGangwon.style.backgroundColor = "#555";
    // regionGangwon.style.color = "#fff";
    // gangwonCity.style.display = "block";
});
window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById('pageUtil').classList.add('fixed');
    } else {
        document.getElementById('pageUtil').classList.remove('fixed');
    }
}
