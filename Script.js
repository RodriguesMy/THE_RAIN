const app = 'team6';
const API_PREFIX = 'https://codecyprus.org/th/api/';

//LIST---------------------------------------

function showList(){
    apiList();
}

function apiList(){
    let url=API_PREFIX+'list';
    let xmlHttpRequest=new XMLHttpRequest();
    xmlHttpRequest.onload=handleList;
    xmlHttpRequest.open('GET',url,true);
    xmlHttpRequest.send();
}

function handleList(){
    console.log(this.responseText);
    let o=JSON.parse(this.responseText);
    let thsArray=o['treasureHunts'];
    let html='<ul>';
    for(let i in thsArray){
        let th=thsArray[i];
        console.log(th);
        html+='<li><a href="Start.html?uuid=' + th['uuid'] + '">' + th['name'] + '</a>' + '</li>';
    }
    html+='</ul>';
    let thsListDiv=document.getElementById('th-list');
    thsListDiv.innerHTML='<h1>Treasure Hunts:</h1>'+html;
}

function getParameter(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}


//LOCATION--------------------------------------------------------
function apiLocation(session, lat, lng) {
    let url = API_PREFIX + 'location?session=' + session + '&latitude=' + lat + '&longitude=' + lng;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', url, true);
    xmlHttpRequest.send();
}
apiLocation();

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
let thisDiv=document.getElementById['errorsDiv'];
function handleStart() {
    console.log(this.responseText);
    let o = JSON.parse(this.responseText);
    if (o['status'] === 'OK') {
        window.location.href = 'Question.html?session=' + o['session'];
    } else {
        console.log('errorMessages: ' + o['errorMessages'][0]);
        thisDiv.innerHTML = o['errorMessages'][0];
    }
}



function getParameter(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}
//QUESTION-------------------------------------------------
function triggerQuestion(){
    let session=getParameter('session');
    questionStart(session);
}
function questionStart(session){
    let url=API_PREFIX+'question?session='+session;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload=handleQuestion;
    xmlHttpRequest.open('GET',url,true);
    xmlHttpRequest.send();
}

function handleQuestion(){
    console.log(this.responseText);
    let o=JSON.parse(this.responseText);
    //if(o[status]==='OK'){
        document.getElementById('th-question').innerHTML='Question:</br>'+o['questionText'];
   // }else{
       // let thisDiv=document.getElementById['error'];
       // thisDiv.innerHTML = o['errorMessages'][0];
   // }
}


//ANSWER--------------------------------------------------
function triggerAnswer(){
    let answer=document.getElementById('answer').value;
    let session=getParameter('session');
    answerStart(session,answer);
}

function answerStart(session,answer){
    let url=API_PREFIX+'answer?session='+session+'&answer='+answer;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload=handleAnswer;
    xmlHttpRequest.open('GET',url,true);
    xmlHttpRequest.send();
}

function handleAnswer(){
    let o=JSON.parse(this.responseText);
   //if(o[status]==='OK'){
        document.getElementById('result').innerHTML='Result: '+o['correct'];
        if(o['numOfQuestions']===0){
            triggerQuestion();
        }else{
            triggerScore();
        }
    // }else{
    //     let errorFix=document.getElementById('errors');
    //     let errorMessage = o['errorMessages'][0];
    //     errorDiv.innerHTML = alert(errorMessage);
    // }
}

function triggerScore(){
    let session=getParameter('session');
}
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
