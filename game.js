var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var gamePattern = [];
var started = false;

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").on("click",function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);

});

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");

  }, 100);

}

$(document).keypress(function() {
  if (!started) {


    // $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    for(var i=0;i<gamePattern.length;i++){
      if (userClickedPattern[i] == gamePattern[i]){
          continue;
      }
      else{
        break;
      }
    }
    if (i==gamePattern.length){
        // console.log("success");
        setTimeout(function() {
          nextSequence();

        }, 1000);
    }
  }
  else {
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 200);
    startOver();

    // console.log("wrong");
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
