const colors = ["blue","red","yellow","green"];
let computerSequence = [];
let userSequence = [];
let level = 1;
let start = false;


$(document).keypress(()=>{
  if(!start){
    showLevel(level);
    start=true;
    nextSequence();
  }
})

$(".btn").click(function(){
  let chosenColor = $(this).attr("id");
  userSequence.push(chosenColor);
    playSound(chosenColor);
  pressAnimation(chosenColor);

  checkAnswer(userSequence.length- 1);
});



// ----------------------------- functions ----------------------------------//


const nextSequence = () => {
  userSequence = [];
  var randomNumber = Math.floor(4*Math.random());
  var randomColor = colors[randomNumber];
  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  computerSequence.push(randomColor);
}

const playSound = name => {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

const showLevel = level => {
  setTimeout(() => {
        $("#level-title").text("Level "+level);
      },1000);
  
}

const pressAnimation = chosenColor => {
  $("#"+chosenColor).addClass("pressed");
  setTimeout(()=>{
    $("#"+chosenColor).removeClass("pressed");
  },100);


}

const checkAnswer = currentLevel => {
  if(computerSequence[currentLevel] === userSequence[currentLevel]){
    if(computerSequence.length === userSequence.length){
      level++;
      setTimeout(() => {
        nextSequence();
      },1000);
      showLevel(level);
    }
  }else{
    wrongAnswer();
    startOver();
  }
}

const wrongAnswer = () => {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(() => {
    $("body").removeClass("game-over");
  },200);
}

const startOver = () => {
  level = 1;
  computerSequence = [];
  start = false;
}
