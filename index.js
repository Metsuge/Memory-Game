const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector('.button');
const buttonCheck = document.querySelector('.buttoncheck')



let lockBoard = false;
let randomListOfCards = [];
let playerListOfCards = [];

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
    let randomPos = Math.floor(Math.random()*8);
    card.style.order = randomPos;
    document.getElementById("score").innerHTML = "score: " + score;
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
    console.log("Yssss ... Score: " + score);
    document.getElementById("score").innerHTML = "score: " + score;
    
  } else {
    score--;
    console.log("NNNNNo... Score: " + score);
    document.getElementById("score").innerHTML = "score: " + score;
    
  }

  randomListOfCards=[];
  playerListOfCards = [];
}


buttonCheck.addEventListener('click', checkAnswer)
button.addEventListener('click', generateRandomSequence);
cards.forEach(card => card.addEventListener('click', flipCard));

