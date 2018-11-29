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

var List1 = document.getElementById("divList");
function handleStart() {
console.log("START");
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let o = JSON.parse(this.responseText);
            for (let i = 0; i < object.treasureHunts.length; i++) {
                var newItem = document.createElement("li");
                var linkItem = document.createElement("a");
                listItem.innerHTML = object.treasureHunts[i].name;
                listItem.href = "https://codecyprus.org/th/api/start?player=Homer&app=simpsons&treasure-hunt-id="+object.treasureHunts[i].uuid;
                inList.appendChild(listItem);
                List1.appendChild(inList);
            }
        }
        else
            {
                let errorDiv = document.getElementById('errors');
                let errorMessage = o['errorMessages'][0];
                errorDiv.innerHTML = alert(errorMessage);
            }
        }
    };
    xhttp.open("GET", "https://codecyprus.org/th/api/list", true);
    xhttp.send();
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}