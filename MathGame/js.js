var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

// if we click on the startReset
document.getElementById("startReset").onclick = function () {
    // if we are playin
    if (playing == true) {
        location.reload();  //reload page
    } else { //if we are not playin
        playing = true; // change mode to playin
        score = 0;  //define score to 0 value
        document.getElementById("scoreValue").innerHTML = score;  //set html score to 0
        show("timeRemaining"); //show countdown
        timeRemaining = 60;  //starting countdown from 60
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining; //change countdown value in html
        hide("gameOver");
        document.getElementById("startReset").innerHTML = "Reset Game"; //change button to reset
        startCountdown(); //start countdown
        
        //generate new questions and answers
        generateQA();
    }
}
//Clicking on boxes
for(i=1; i<5; i++) {
    document.getElementById("box" + i).onclick = function() {
    if (playing == true) {
       if (this.innerHTML == correctAnswer) {
           score++;
           document.getElementById("scoreValue").innerHTML = score;
           hide("wrong");
           show("correct");
           setTimeout(function(){
               hide("correct")
           }, 1000);
           generateQA();
       } else {
           hide("correct");
           show("wrong");
           setTimeout(function(){
               hide("wrong");
           }, 1000);
       }
    }
}
}
//functions

//start counter
function startCountdown() {
    action = setInterval(function () {
        timeRemaining -= 1; //decreesing countdown by 1 every sec
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if (timeRemaining == 0) {
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeRemaining"); 
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    }, 1000);
}
// stop counter
function stopCountdown() {
    clearInterval(action);
}       
//hide elements
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}
//show elements
function show(Id) {
    document.getElementById(Id).style.display = "block";
}
//generate questions and multiple answers
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //filling random box with corecct answers
    //rest of it filling up with wrong
    var answers = [correctAnswer];
    for (i=1; i <5; i++) {
        if (i != correctPosition) { //used only 1 = cos need just value, not type
             var wrongAnswer;
             do {
                 wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
             }while (answers.indexOf(wrongAnswer) >-1 ) //no idea how it works
            document.getElementById("box" + i).innerHTML = wrongAnswer; 
            answers.push(wrongAnswer);
             } 
    }
}
        
