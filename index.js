const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector('.play');

const messagePlay = document.getElementById('score');

let lockBoard = true;

let randomListOfCards = [];
let playerListOfCards = [];

let score = 4;
let answer = false;

let cardNumber = 3;

function makeRandomList(){ //nera pasikartojanciu kortu
  while (randomListOfCards.length < cardNumber) {
    let randomNr = Math.floor(Math.random() * cards.length);
    let randomCard = cards[randomNr];
    if(!randomListOfCards.includes(randomCard)){
      randomListOfCards.push(randomCard); 
    } 
  }
}

function flipCardsAuto(i){//press Play, random sequence is flipping

  let randomCard = randomListOfCards[i]
 

  randomCard.classList.add('flip') 
  if (i<randomListOfCards.length){
    setTimeout(function(){
      i++; 
      flipCardsAuto(i);
    }, 500); 
    setTimeout(() => {
    randomCard.classList.remove('flip')
    }, 1500); 
  }
  lockBoard = false;
} 
 
function play(){
  makeRandomList();
  flipCardsAuto(0);
};

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random()*cards.length);
    card.style.order = randomPos;

  });
})();

function flipCard(){ //zaidejas flippina ir kai pasirenka 3 kortas is kart tikrina
  if(lockBoard) return; //jei lenta uzrakinta, nk negali spaust
  
  this.classList.add('flip'); 
  setTimeout(()=>{
    this.classList.remove('flip');
    
  }, 1000)

  let playerCard = this;
  playerListOfCards.push(playerCard);

  if(playerListOfCards.length === randomListOfCards.length){
    checkAnswer();
  } 
}

function checkAnswer() {  
  let correctNrOfCards = 0
  for (i=0;i<randomListOfCards.length;i++){
    let pcCard = randomListOfCards[i];
    let gamerCard = playerListOfCards[i]
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
      }

  if(answer){
    score++;
    messagePlay.style.visibility = 'visible'; 
  } else if (!answer){
    if(score>0){
      score--;      
    }
  }
  document.getElementById("score").innerHTML = "Score: " + score;
  randomListOfCards=[];
  playerListOfCards = [];
  levelUp()
}

function levelUp(){
  if(score === 5){
    cardNumber++
  }
}


button.addEventListener('click', play);
cards.forEach(card => card.addEventListener('click', flipCard));

