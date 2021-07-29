var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = 0;

var level=0;

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).animate({
    opacity: 0.1
  }, 50).animate({
    opacity: 1
  }, 50);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  level+=1;
  $("#level-title").text("Level "+level);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (currentLevel===gamePattern.length-1){
      setTimeout(nextSequence, 1000);
      userClickedPattern=[];
    }
  }
  else{

    var audio = new Audio("sounds/wrong.mp3")
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started=0;
    level=0;
    gamePattern=[];
    userClickedPattern=[];

  }

}

$(document).keydown(function() {
  if (started === 0) {
    started = 1;
    console.log(started);
    $("#level-title").text("Level 0");
    nextSequence();
  }
  else {
    return;
  }

});



  $(".btn").click(function() {
    if (started===1){
      var userChosenColor = this.id;
      userClickedPattern.push(userChosenColor);
      console.log(userClickedPattern);
      $("#" + userChosenColor).animate({
        opacity: 0.1
      }, 50).animate({
        opacity: 1
      }, 50);
      var audio = new Audio("sounds/" + userChosenColor + ".mp3")
      audio.play();
      checkAnswer(userClickedPattern.length-1);
    }

  });
