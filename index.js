$(".animal-img").hover(function() {
    $(this).addClass( "hover" );
}, function() {
    $(this).removeClass("hover");
});


let correctSequence = [];
let userPositionInSequence = 0;
let levelNumber = 0;
let gameHasStarted = false;

//User clicks any key, game begins
$(document).on("keydown", decideIfGameBegins);

function decideIfGameBegins(){
    if(!gameHasStarted){
        gameBegins();
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
    userAnimalSelectionAnimation(clickedAnimal);
    animalSound(clickedAnimal);
    console.log(clickedAnimal);
    if(clickedAnimal == correctSequence[userPositionInSequence]){
        userPositionInSequence++;
        if(userPositionInSequence == correctSequence.length){
            setTimeout(computerRandomAnimalSelection, 1000);
            userPositionInSequence = 0;
        }
    }else{
        resetGame();
    }
}

function userAnimalSelectionAnimation(animalType){
    $("." + animalType).addClass("pressed");
    setTimeout(function(){$("." + animalType).removeClass("pressed");}, 100);
}

function computerSelectionAnimalAnimation(animalType){
    $("." + animalType).fadeOut(100).fadeIn(100);
}

function resetGame(){
    //Turn off the event listeners
    $(".animal-box").off("click");
    correctSequence = [];
    userPositionInSequence = 0;
    levelNumber = 0;
    $("body").addClass("game-over")
    setTimeout(function() {$("body").removeClass("game-over")}, 250);
    animalSound('failure');
    $("h1").text("Game Over, Press Any Key to Restart");
    gameHasStarted = false;
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