// Button color list
var buttonColors = ["red", "blue", "green", "yellow"];

// empty list of game patterns
var gamePattern = [];
console.log("Pattern Created");
var userClickedPattern = [];
var level = 0;
var gameOverAudio = new Audio("sounds/wrong.mp3");
var gameStart = false;
var lastLevelScore = 0;
var highestScore = 0;
var gamePlayed = 0;
var gameScore = 0;
$("#score").text("Score: " + gameScore);

//function plays the sound
function playSound(name) {
  switch (name[name.length - 1]) {
    case "yellow":
      $("#yellow").toggleClass("pressed", 50).toggleClass("pressed", 50);
      var yellowAudio = new Audio("sounds/yellow.mp3");
      yellowAudio.play();
      break;
    case "red":
      $("#red").toggleClass("pressed", 50).toggleClass("pressed", 50);
      var redAudio = new Audio("sounds/red.mp3");
      redAudio.play();
      break;
    case "green":
      $("#green").toggleClass("pressed", 50).toggleClass("pressed", 50);
      var greenAudio = new Audio("sounds/green.mp3");
      greenAudio.play();
      break;
    case "blue":
      $("#blue").toggleClass("pressed", 50).toggleClass("pressed", 50);
      var blueAudio = new Audio("sounds/blue.mp3");
      blueAudio.play();
      break;
    default:
  }
}

//function generates next sequence and play sound
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomNumber]);
  console.log("Item Added");
  playSound(gamePattern);
  console.log(gamePattern);
  level++;
  $("h1").text("Level " + level);
}

//event listener tracks the user clicks and play sound
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userClickedPattern);
  console.log("User Clicked.");
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    gameScore = Math.round(gameScore+level*1.4);
    $("#score").text("Score: " + gameScore);
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000 - (level * 10));
    }
  } else {
    console.log("wrong");
    $("h1").html("WRONG Press any key to restart.");
    gameOverAudio.play();
    $("body").toggleClass("game-over");
    startOver();
  }
}

function startOver() {
  gameStart = false;
  gamePattern = [];
  if(gamePlayed<=0){
    highestScore = gameScore;
  }else{
    lastLevelScore = gameScore;
    if(highestScore <= lastLevelScore){
      highestScore = lastLevelScore;
    }
  }
  $("#highest-score").text("Highest Game Score: " + highestScore);
  gamePlayed++;
  level = 0;
  gameScore = 0;
}


$(document).on("keypress", function() {
  if (gameStart === false) {
    $("#score").text("Score: " + gameScore);
    gameStart = true;
    $("body").removeClass("game-over");
    console.log(userClickedPattern);
    console.log(gamePattern);
    setTimeout(function() {
      nextSequence();
    }, 500);
  }
});
