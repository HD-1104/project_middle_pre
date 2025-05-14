function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("config.json", function(text){
    var data_config = JSON.parse(text);
    const API_KEY = data_config.apiKey;

    // 2. 스크립트 태그를 동적으로 생성
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // 3. initMap 함수를 전역(window)으로 등록
    window.initMap = function () {
        const center = { lat: 37.5665, lng: 126.9780 }; // 서울 좌표
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: center
        });

        new google.maps.Marker({
            position: center,
            map: map,
            title: '서울'
        });
    };
});
