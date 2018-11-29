const app = 'team6';
const API_PREFIX = 'https://codecyprus.org/th/api/';
//LIST-------------------------------------------------------------
function showList() {
    apiList();
}

function apiList() {
    let url = API_PREFIX + 'list';
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = handleList;
    xmlHttpRequest.open('GET', url, true);
    xmlHttpRequest.send();
}

function handleList() {
    console.log(this.responseText);
    let o = JSON.parse(this.responseText);
    let thsArray = o['treasureHunts'];
    let html = '<ul>';
    for(let i in thsArray) {
        let th = thsArray[i];
        console.log(th);
        html += '<li><a href="sampleTreasureHunt.html?uuid=' + th['uuid'] + '">' + th['name'] + '</a>' + '</li>';
    }
    html += '</ul>';
    let thListDiv = document.getElementById('th-list');
    thListDiv.innerHTML = '<h1>Treasure Hunts:</h1>' + html;
}

function getParameter(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}



// //LOCATION--------------------------------------------------------
// function apiLocation(session, lat, lng) {
//     let url = API_PREFIX + 'location?session=' + session + '&latitude=' + lat + '&longitude=' + lng;
//     let xmlHttpRequest = new XMLHttpRequest();
//     xmlHttpRequest.open('GET', url, true);
//     xmlHttpRequest.send();
// }
// apiLocation();
//
//
//
//
//
//START------------------------------------------------------------
function triggerStart() {
    let player = document.getElementById('player').value;
    let uuid = getParameter('uuid');
    apiStart(player,app,uuid);
}

//https://codecyprus.org/th/api/start?player=Homer&app=simpsons-app&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw
function apiStart(player,app,uuid) {
    let url = API_PREFIX +'start?player='+player+'&app='+app+'&treasure-hunt-id='+uuid;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = handleStart;
    xmlHttpRequest.open('GET', url, true);
    xmlHttpRequest.send();
}
function handleStart() {
   console.log(this.responseText);
    let o = JSON.parse(this.responseText);
    let html='<ul>';
    if(o['status'] === 'OK') {
       let thsArray=o['treasureHunts'];
        for(let i in thsArray){
            let th=thsArray[i];
            html+='<li><a href="sampleTreasureHunt.html?player='+th['player']+'&app='+app+'&treasure-hunt-id='+th['uuid'];
        }
        html += '</ul>';
        let thisDiv=document.getElementById('th-start');
        thisDiv.innerHTML=html;
    } else {
        let errorDiv = document.getElementById('errors');
        let errorMessage = o['errorMessages'][0];
        errorDiv.innerHTML = alert(errorMessage);
    }
}

function getParameter(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}
// //-------------------------------------------------------------
// function triggerQuestion(){
//     let session=document.getElementById('session'.value);
//     questionStart(session);
// }
//
// function questionStart(session){
//     let url=API_PREFIX+player+'&app='+app+'&treasure-hunt-id='+uuid+'&session='+session;
//     let xmlHttpRequest = new XMLHttpRequest();
//     xmlHttpRequest.onload=handleQuestion;
//     xmlHttpRequest.open('GET',url,true);
//     xmlHttpRequest.send();
// }
//
//    thListDiv.innerHTML = '<h1>Treasure Hunts</h1>' + html;
// function handleQuestion(){
//     console.log(this.responseText);
//     let o=JSON.parse(this.responseText);
//     if(o['completed']===true){
//
//     }
// }