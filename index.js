let cardOnScreen = 8;


(function createDOMElements(cardOnScreen){//i = how many cards on screen
  let newCard = document.createElement('section')
  for(a=0;a<cardOnScreen;a++){
    
    let memoryCard = document.createElement('div');
    let cardImg = document.createElement('img');
    let backImg = document.createElement('img');

    newCard.className = "memory-game"
    memoryCard.className = "memory-card";
    cardImg.className = "front-face";
    backImg.className = "back-face";
    
    memoryCard.appendChild(cardImg).src = './images/aurelia.svg';
    memoryCard.appendChild(backImg).src = './images/js-badge.svg';

    //creating random nr for the id of seach card
    //so that you can compare datasets and see if the players cards are the same as the given sequence 
    let idOfCard = Math.floor(Math.random()*500);
    memoryCard.setAttribute('data-framework', idOfCard)

    document.body.appendChild(newCard);
    newCard.appendChild(memoryCard);
  }
  
})(cardOnScreen)

const cards = [...document.querySelectorAll(".memory-card")];
const button = document.querySelector('.play');
const messagePlay = document.getElementById('score');
const level3 = document.getElementsByClassName('leve3');

let randomListOfCards = [];
let playerListOfCards = [];
let lockBoard = true;
let score = 0;
let answer = false;
let speedOfFlip = 400;
let cardNumber = 3;
let nrOfCardsFlipped = 0;

function makeRandomList(){ //nera pasikartojanciu kortu
  while (randomListOfCards.length < cardNumber) {
    let randomNr = Math.floor(Math.random() * cards.length);
    let randomCard = cards[randomNr];
    if(!randomListOfCards.includes(randomCard)){
      randomListOfCards.push(randomCard); 
    }; 
  };  
};

function flipCardsAuto(i){//press Play, random sequence is flipping
  let randomCard = randomListOfCards[i];
  randomCard.classList.add('flip') 

  if (i<randomListOfCards.length){
    setTimeout(function(){
      i++; 
      flipCardsAuto(i);
     
    }, speedOfFlip); 
     nrOfCardsFlipped++;
  };
  
  if(nrOfCardsFlipped === randomListOfCards.length){
    setTimeout(function(){

      randomListOfCards.forEach(card => {
      card.classList.remove('flip') })
      lockBoard = false;
      nrOfCardsFlipped = 0;
    }, 1000);
  }
 
};

function play(){
  makeRandomList();
  flipCardsAuto(0);
};

function flipCard(){ //zaidejas flippina ir kai pasirenka 3 kortas is kart tikrina
  if(lockBoard) return; //jei lenta uzrakinta, nk negali spaust
  this.classList.add('flip');

  setTimeout(()=>{
    this.classList.remove('flip');
  }, speedOfFlip);

  let playerCard = this;
  playerListOfCards.push(playerCard);

  if(playerListOfCards.length === randomListOfCards.length){
    checkAnswer();
  };
};

function checkAnswer() {  
  let correctNrOfCards = 0;
  for (i=0;i<randomListOfCards.length;i++){
    let pcCard = randomListOfCards[i];
    let gamerCard = playerListOfCards[i];
    if(pcCard.dataset.framework === gamerCard.dataset.framework){
      correctNrOfCards++;
    }; 
  };
    
  if(correctNrOfCards === randomListOfCards.length){
    answer = true;
    correctNrOfCards = 0;
  } else {
    answer = false;
    correctNrOfCards = 0;
  };

  if(answer){
    score++;
    messagePlay.style.visibility = 'visible'; 
  } else if (!answer){
    if(score>0){
      score--;      
    }
  };

  document.getElementById("score").innerHTML = "Score: " + score;
  randomListOfCards=[];
  playerListOfCards = [];
  levelUp();
}

function levelUp(){
  switch(score){
    case 3:
      cardNumber++;
      speedOfFlip = speedOfFlip-50;
      document.getElementById("level").innerHTML = "Level 2!";
      currentScore++;
      break;
    case 5:
      cardNumber++;
      speedOfFlip = speedOfFlip+50;
      level3.style.visibility = 'visible';
      document.getElementById("level").innerHTML = "Level 3!";
      break;
    case 8:
      cardNumber++;
      speedOfFlip = speedOfFlip+50;
      level3.style.visibility = 'visible';
      document.getElementById("level").innerHTML = "Level 4!";
      break;
    case 9:
      cardNumber++;
      level3.style.visibility = 'visible';
      document.getElementById("level").innerHTML = "Level 5!";
      console.log(cardNumber);
      break;
    case 10:
      cardNumber=8;
      speedOfFlip = speedOfFlip+50;
      level3.style.visibility = 'visible';
      document.getElementById("level").innerHTML = "Final level!";
      break;
    case 11:
      document.getElementById("level").innerHTML = "WINNER!";
      button.removeEventListener('click', play);
      lockBoard = true;
  };  
};

button.addEventListener('click', play);
cards.forEach(card => card.addEventListener('click', flipCard));








