var playing = false;
var score;
var trialsLeft;
var fruits = ['pinnaple', 'apple', 'banana', 'lemon', 'cherry', 'pinnaple2', 'vaisius', 'watermellon'];
var step;
var action;

$(function(){
    // click on start reset button
   $("#startReset").click(function(){
       //are we playin?
       if(playing == true){ //yes
           //reload page
           location.realod();
           //no
       } else {
           playing = true;
           //set score to 0
           score = 0; 
           $("#scoreValue").html(score);
           //show trials left
           $("#trialsLeft").show();
           trialsLeft = 3;
           addHearts();
           //change button text to reset game
           $("#gameOver").hide();
           $("#startReset").html("Reset game");
           //start sending fruits
           startAction();
       }
   }); 

    $("#fruit1").mouseover(function(){
        score++;
        $("#scoreValue").html(score);
//        document.getElementById("sliceSound").play();
        $("#sliceSound")[0].play(); // sound efect
        //stop fruit when sliced
        clearInterval(action);
        //die fruit
        $("#fruit1").hide("explode", 500);
        //send new fruit
        setTimeout(startAction, 500);
    });
    //functions
    function addHearts(){
        $("#trialsLeft").empty();
        for(i = 0; i < trialsLeft; i++){
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }
    }
    //start sending fruits
    function startAction(){
        $("#fruit1").show();
        chooseFruit(); //choose random fruit
        $("#fruit1").css({'left': Math.round(580*Math.random()), 'top' : -50}); //random position
        //generate random step
        step = 1*Math.round(5*Math.random());
        //move fruit down by one step
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step); 
            //check if fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                //check if we have any trials left
                if(trialsLeft > 1){
                    $("#fruit1").show();
                    chooseFruit();
                    $("#fruit1").css({'left': Math.round(580*Math.random()), 'top' : -50});
                    step = 1+Math.round(5*Math.random());
                    trialsLeft --; //reduce trials
                    addHearts(); //populate trialsLeft box
                } else { //game over
                    playing = false;
                    $("#startReset").html("start game");
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
                    $("#trialsleft").hide();
                    stopAction();
                }
            }
        }, 10);
    }
    //generate random fruit
    function chooseFruit(){
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(7*Math.random())] +'.png');
    }
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});