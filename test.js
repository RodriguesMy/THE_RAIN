const URL ='https://codecyprus.org/th/test-api/leaderboard?sorted&size=';

function leaderTest() {
    let limit = document.getElementById("answer").value;

    let http = new XMLHttpRequest();
    http.open("GET", URL + limit, true);

    http.onload = function(){
        let object = JSON.parse(this.responseText);
        console.log(object);
        let thsArray = object['leaderboard'];
        let html = '<ul>';
        for (let i in thsArray) {
            let th = thsArray[i];
            html += '<li>Player: ' + th['player'];
        }
        html += '</ul>';
        document.getElementById('showLeaderboard').innerHTML = html;

    };
    http.send();
}

// function handleLeaderboard() {
//     console.log(this.responseText);
//     let o = JSON.parse(this.responseText);
//     let thsArray = o['leaderboard'];
//     for (let i in thsArray) {
//         let th = thsArray[i];
//         let html = '<ul>';
//         html += '<li>Player: ' + th['player'];
//         html += '</ul>';
//         document.getElementById('showLeaderboard').innerHTML = html;
//     }
// }