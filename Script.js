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


//LOCATION--------------------------------------------------------
function apiLocation(session, lat, lng) {
    let url = API_PREFIX + 'location?session=' + session + '&latitude=' + lat + '&longitude=' + lng;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', url, true);
    xmlHttpRequest.send();
}



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
        setCookie(o['session']);
    } else {
        document.getElementById('errorsDiv').innerHTML = o['errorMessages'][0];
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

function handleQuestion() {
    console.log(this.responseText);
    let o = JSON.parse(this.responseText);
    if(o['completed']===false){
    document.getElementById('th-question').innerHTML = 'Question:</br>' + o['questionText'];
}
else if(o['completed']===true){
        window.location.href = 'Score.html?session=' + getParameter('session');
    }

    if (navigator.geolocation) {
        if(o['requiresLocation']===true) {
            document.getElementById('th-location').innerHTML='<div>REQUIRES LOCATION</div>';
            navigator.geolocation.getCurrentPosition(sendLocation);
        }
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    document.getElementById('skip-msg').innerHTML="";
    document.getElementById('errors').innerHTML="";
    document.getElementById('answer').innerHTML="";

}

function sendLocation(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    let session=getCookie('session');
    apiLocation(getParameter(session,lat,lng));
}

//ANSWER--------------------------------------------------
function triggerAnswer(){
    location.reload();
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

function handleAnswer() {
    console.log(this.responseText);
    let o = JSON.parse(this.responseText);
        document.getElementById('points').innerHTML = '<div>Result: ' + o['correct']+'<div>'+o['message']+'</div></div>';
        if (o['completed'] === 'true') {
            window.location.href = 'Score.html?session=' + o['session'];
        }

    }



//SKIP-------------------------------------------------------
function triggerSkip(){
    let session=getParameter('session');
    skipStart(session);
}

function skipStart(session){
    let url=API_PREFIX+'skip?session='+session;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload=handleSkip;
    xmlHttpRequest.open('GET',url,true);
    xmlHttpRequest.send();
}

function handleSkip(){
    console.log(this.responseText);
    let o=JSON.parse(this.responseText);
    if(o['status']==='OK'){
        location.reload();
    }else{
        console.log(o['errorMessages'][0])
        document.getElementById('skip-msg').innerHTML = o['errorMessages'][0];;
    }
}
function ConfirmSkip() {
    let c=confirm("Are you sure you want to skip?");
    if(c==true){
        triggerSkip();
    }

}
//SCORE-------------------------------------------
function triggerScore(){
    let session=getParameter('session');
    scoreStart(session);
}

function scoreStart(session){
    let url=API_PREFIX+'score?session='+session;
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload=handleScore;
    xmlHttpRequest.open('GET',url,true);
    xmlHttpRequest.send();
}

function handleScore() {
    console.log(this.responseText);
    let o = JSON.parse(this.responseText);
    if (o['status'] === 'OK') {
        document.getElementById('th-score').innerHTML = 'USERNAME: '+o['player']+'</br>SCORE: '+ o['score'];
    }else{
        document.getElementById('score-msg').innerHTML = o['errorMessages'][0];;
    }
}

//LEADERBOARD------------------------------------------------

// window.location.href = 'Question.html?session=' + o['session'];
function triggerLeaderboard(){
    let session=getParameter('session');
    LeaderboardStart(session);
    window.location.href="Leaderboard.html?session=" + getCookie("session");
    console.log(session);
}
function LeaderboardStart(session){
    let url=API_PREFIX+'leaderboard?session='+getCookie("session")+'&sorted&limit='+20;
    console.log("LEADERBOARD URL: " + url);
    let xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest .onreadystatechange = function() {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {

            let o = JSON.parse(this.responseText);
            let thsArray=o['leaderboard'];
            let html='<ul>';
            for(let i in thsArray){
                let th=thsArray[i];
                html+='<li>Player: '+th['player']+' scored '+th['score']+' in '+th['completionTime']+'</li>';
            }
            html+='</ul>';
            document.getElementById('showLeaderboard').innerHTML=html;
        }
        else {
            console.log("ERROR - Could not get leaderboard");
        }
    };

    xmlHttpRequest.onload=handleLeaderboard;
    xmlHttpRequest.open('GET',url,true);
    xmlHttpRequest.send();
}

function handleLeaderboard(){
    console.log(this.responseText);

}

//COOKIES---------------------------------------------------
function setCookie(session) {
    var d = new Date();
    let exdays = 365;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "session=" + session + ";" + expires + ";path=/";
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
