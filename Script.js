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
    let session;
    if(o['status'] === 'OK') {
       let thsArray=o['treasureHunts'];
        for(let i in thsArray){
            let th=thsArray[i];
            session=th['session'];
            html+='<li><a href="Question.html"+<li></a>';
        }
        html += '</ul>';
        let thisDiv=document.getElementById('th-start');
        thisDiv.innerHTML=html;

    } else {o['errors'][0];
        let errorMessage = o['errorMessages']
        let errorDiv = document.getElementByI[0];
        errorDiv.innerHTML = alert(errorMessage);
    }
}

function getParameter(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}
//QUESTION-------------------------------------------------
function triggerQuestion(session){
    questionStart(session);
}

function questionStart(session){
    let url=API_PREFIX+'question';
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload=handleQuestion;
    xmlHttpRequest.open('GET',url,true);
    xmlHttpRequest.send();
}

function handleQuestion(){
    console.log(this.responseText);
    let o=JSON.parse(this.responseText);
    let html='<ul>';
    if(o[status]==='OK'){
        let thsArray=o['treasureHunts'];
        for(let i in thsArray) {
            let th = thsArray[i];
            html+='<li><a href="Question.html?player='+th['player']+'&app='+app+'&treasure-hunt-id='+th['uuid'];
        }
        html+='</ul>';
        thisDiv.innerHTML=html;
    }
}
let thisDiv=document.getElementById('th-question');


//ANSWER--------------------------------------------------
// function triggerAnswer(session){
//     let answer=document.getElementById('answer'.value);
//     AnswerStart(session,answer);
// }
//
// function answerStart(session,answer){
//     let url=API_PREFIX+'answer?session='+session;
//     let xmlHttpRequest = new XMLHttpRequest();
//     xmlHttpRequest.onload=handleAnswer;
//     xmlHttpRequest.open('GET',url,true);
//     xmlHttpRequest.send();
// }
//
// function handleAnswer(){
//     console.log(this.responseText);
//     let o=JSON.parse(this.responseText);
//     let html='<ul>';
//     if(o[status]==='OK'){
//         let thsArray=o['treasureHunts'];
//         for(let i in thsArray){
//             let th=thsArray[i];
//          //not sure   html+='<li><a onclick="triggerQuestion(session)" href="Question.html?player='+th['player']+'&app='+app+'&treasure-hunt-id='+th['uuid'];
//         }
//         html+='</ul>';
//         let thisDiv=document.getElementById('th-answer');
//         thisDiv.innerHTML=html;
//     }else{
//         let errorFix=document.getElementById('errors');
//         let errorMessage = o['errorMessages'][0];
//         errorDiv.innerHTML = alert(errorMessage);
//     }
// }

//COOKIES----------------------------------------------------
// function setCookie(session) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }
//
// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
//
// function checkCookie() {
//     var user = getCookie("username");
//     if (user != "") {
//         alert("Welcome again " + user);
//     } else {
//         user = prompt("Please enter your name:", "");
//         if (user != "" && user != null) {
//             setCookie("username", user, 365);
//         }
//     }
// }
