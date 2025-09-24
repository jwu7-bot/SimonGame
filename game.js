var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// track of whether if the game has started or not
var started = false;

var level = 0;

//  detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).on("keypress", function() {
  if (!started) {
    // h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0"
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})


$(".btn").on("click", function() {
    var userChosenColor = this.id;

    userClickedPattern.push(userChosenColor);

    // play sound when button pressed
    playSound(userChosenColor);

    // animate the button when pressed
    animatePress(userChosenColor);

    //  index of the last answer to check
    var lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
});

// function to check the answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    
    console.log("success");

    // check if user has finished the full sequence
    if (userClickedPattern.length === gamePattern.length) {
      // call nextSequence after 1 second
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");

    // play wrong audio when wrong
    playSound("wrong")

    // add the game over effect 
    $("body").addClass("game-over");

    // remove game over effect after 200 milliseconds 
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // change the h1 to game over
    $("#level-title").text("Game Over, Press Any Key to Restart")

    // call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

// function that will give the next sequence
function nextSequence() {
  userClickedPattern = []; 
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //0-3
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColor);  
}

// function to play the audio of each button
function playSound(name) {
  // use Javascript to play the sound for the button colour 
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// function to animate the button when pressed
function animatePress(currentColour) {
  // add the press style to the button
  $("#" + currentColour).addClass("pressed");

  // remove the press style after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// function to reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
