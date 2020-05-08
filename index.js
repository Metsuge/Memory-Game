const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector('.play');
const buttonCheck = document.querySelector('.check')
const messagePlay = document.getElementById('message');


let lockBoard = false;
let randomListOfCards = [];
let playerListOfCards = [];
let gameIsOn = false;
let score = 0;

function makeRandomList(){ //nera pasikartojanciu kortu
  while (randomListOfCards.length < 3) {
    let randomNr = Math.floor(Math.random() * cards.length);
    let randomCard = cards[randomNr];
    if(!randomListOfCards.includes(randomCard)){
      randomListOfCards.push(randomCard); 
    } 
  }
}


function flipCardsAuto(i){
  let randomCard = randomListOfCards[i]
  lockBoard = true;
  randomCard.classList.add('flip') 
  if (i<randomListOfCards.length){
    setTimeout(function(){
      i++; 
      flipCardsAuto(i);
    }, 500);    
  }

  setTimeout(function(){
    randomCard.classList.remove('flip')
    lockBoard = false;
  }, 2000); 
  gameIsOn = true;
} 
  
function generateRandomSequence(){
  makeRandomList();
  flipCardsAuto(0);
};

// function disableCards(){
//   firstCard.removeEventListener('click', flipCard);
//   secondCard.removeEventListener('click', flipCard);
//   resetBoard()
// }

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random()*cards.length);
    card.style.order = randomPos;
    document.getElementById("score").innerHTML = "Score: " + score;
  });
})();

function flipCard(){ //zaidejas flippina
  if(lockBoard) return; //jei lenta uzrakinta, nk negali spaust

  this.classList.add('flip'); 
  setTimeout(()=>{
    this.classList.remove('flip');
    lockBoard = false;
  }, 1000)

  let playerCard = this;

  playerListOfCards.push(playerCard)
}

function checkAnswer(){
  if(!gameIsOn) return messagePlay.style.visibility = 'visible';
  let answer = false;
  for (i=0;i<randomListOfCards.length;i++){
    let pcCard = randomListOfCards[i];
    let gamerCard = playerListOfCards[i]
    if(pcCard.dataset.framework === gamerCard.dataset.framework){
      answer = true
    } 
  }

  if(answer){
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
    
  } else {
    if(score>0){
      score--;
    }
    document.getElementById("score").innerHTML = "Score: " + score;
  }

  randomListOfCards=[];
  playerListOfCards = [];
}


buttonCheck.addEventListener('click', checkAnswer)
button.addEventListener('click', generateRandomSequence);
cards.forEach(card => card.addEventListener('click', flipCard));

