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
        errorDiv.innerHTML = '<b>' + errorMessage + '</b>';
    }
}

function getParameter(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}