$(".animal-img").hover(function() {
    $(this).addClass( "hover" );
}, function() {
    $(this).removeClass("hover");
});


let correctSequence = [];
let userPositionInSequence = 0;
let levelNumber = 0;
let gameHasStarted = false;
let isUpsideDown = false;

//User clicks any key, game begins
$(document).on("keydown", decideIfGameBegins);

function decideIfGameBegins(){
    if(!gameHasStarted){
        if(isUpsideDown){
            $('.animal-img').animate(
                { deg: 0 },
                {
                  duration: 100,
                  step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                  }
                }
          );
          setTimeout(gameBegins, 500);
        }else{
            gameBegins();
        } 
    } 
    
}

//Computer randomly selects a button
function gameBegins(){
    computerRandomAnimalSelection();

    //Turn on the event listeners
    $(".animal-box").on("click", userAnimalSelection);

    gameHasStarted = true;
}

function computerRandomAnimalSelection(){
    levelNumber++;
    updateH1(levelNumber);
    let animalOptions = ["cat", "chick", "turtle", "bunny"];
    let randomPosition = Math.floor(Math.random()*4);
    let computerSelectedAnimal = animalOptions[randomPosition];
    computerSelectionAnimalAnimation(computerSelectedAnimal);
    correctSequence.push(computerSelectedAnimal);
    animalSound(computerSelectedAnimal);
}

function updateH1(levelNumber){
    $("h1").text("Level " + levelNumber);
}


function userAnimalSelection(event){
    let clickedAnimal = event.target.classList[0];
    if(clickedAnimal != correctSequence[userPositionInSequence]){
        //Turn off the event listeners
        $(".animal-box").off("click");
        resetGame();
    }else{
        userAnimalSelectionAnimation(clickedAnimal);
        animalSound(clickedAnimal);
        userPositionInSequence++;
        if(userPositionInSequence == correctSequence.length){
            setTimeout(computerRandomAnimalSelection, 1000);
            userPositionInSequence = 0;
        }
    }
}

function userAnimalSelectionAnimation(animalType){
    $("." + animalType + ".animal-box").addClass("pressed");
    $('.' + animalType).animate(
          { deg: 10 },
          {
            duration: 200,
            step: function(now) {
              $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
          }
    ).animate(
        { deg: 0 },
        {
          duration: 200,
          step: function(now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
  );
    
    setTimeout(function(){$("." + animalType).removeClass("pressed");}, 100);
}

function computerSelectionAnimalAnimation(animalType){
    $("." + animalType).fadeOut(100).fadeIn(100);
}

function resetGame(){
    gameHasStarted = false;
    correctSequence = [];
    userPositionInSequence = 0;
    $("h1").text("Game Over, Press Any Key to Restart");
    levelNumber = 0;
    $(".container").addClass("container-failed");
    setTimeout(function() {$(".container").removeClass("container-failed");}, 2000);
    animalSound('failure');
    $('.animal-img').animate(
        { deg: 180 },
        {
          duration: 500,
          step: function(now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
    );
    isUpsideDown = true;
}

function animalSound(animalType){
    var audio = new Audio('./sounds/bell.wav');

    switch (animalType) {
        case 'bunny':
            audio = new Audio("./sounds/cowbell.wav");
            break;

        case 'cat':
            audio = new Audio("./sounds/sparkle.wav");
            break;

        case 'turtle':
            audio = new Audio("./sounds/drum.wav");
            break;

        case 'chick':
            audio = new Audio("./sounds/bell.wav");
            break;

        case 'failure':
            audio = new Audio("./sounds/gameOver.wav")
            break;
    
        default: console.log(animalType);
            break;
    }
    audio.play();
}