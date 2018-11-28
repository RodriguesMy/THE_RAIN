function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}
function showPosition(position){
alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
}
showPosition();
getLocation();












const app = 'team6';

function triggerStart() {
    let player = document.getElementById('player').value;
    let uuid = getParameter('uuid');
    apiStart(player, app, uuid);
}

function apiStart(player, app, uuid) {
    let url = 'https://codecyprus.org/th/api/start?player=' + player + '&app=' + app + '&treasure-hunt-id=' + uuid;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = handleStart;
    xmlHttpRequest.open('GET', url, true);
    xmlHttpRequest.send();
}

function handleStart() {
    console.log('start response: ' + this.responseText);
    let o = JSON.parse(this.responseText);
    if(o['status'] === 'OK') {
        // todo
    } else {
        let errorDiv = document.getElementById('errors');
        let errorMessage = o['errorMessages'][0];
        errorDiv = alert('<b>' + errorMessage + '</b>');
    }
}

function getParameter(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}


function handleList() {
    console.log(this.responseText);
    let o = JSON.parse(this.responseText);
    let thsArray = o['treusureHunts'];
    let html = '<ul>';
    for (let i in thsArray(i)) {
        ;
        let th = thsArray(i);
        console.log(th);
        html += '<li>' + th('name') + '</li>';
    }
    html += '</ul>';
    let theListDiv = document.getElementById('th-list');
    theListDiv.innerText = '<hi>Treusure Hunts</hi>' + html;



}