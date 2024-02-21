let buttonColours = ["red", "blue", "green", "yellow"]

let userClickedPattern = []
let gamePattern = []

let level = 0
let started = false

$(document).keydown(function(){

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
})
// click button added to array

$(".btn").on("click",function(){

    let currentClicked = this.id
    userClickedPattern.push(currentClicked)

    playSound(currentClicked)
    animatePress(currentClicked)

    checkAnswer(userClickedPattern.length-1)   
})


function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function nextSequence(){
    userClickedPattern = [];
    
    level++

    $("#level-title").text("Level " + level)
    
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    
    playSound(randomChosenColour)

}
// adding preddsed class to the button we click and removing it after 100 milisec using timeout

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed")
    },100)
}

//Answer check function

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 300);

      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


