const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector('.play');

const messagePlay = document.getElementById('score');

let lockBoard = true;

let randomListOfCards = [];
let playerListOfCards = [];

let score = 0;
let answer = false;

function makeRandomList(){ //nera pasikartojanciu kortu
  while (randomListOfCards.length < 3) {
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
    
  }, 2000); 
     
  }

  lockBoard = false;
 
  
} 

// function flipCardsBack() {
//   playerListOfCards.forEach(card=>{
//      card.classList.remove('flip');
//      lockBoard = false;
//      console.log("flip them back again");
//   });
 
//  }
 

  
function play(){
  makeRandomList();
  flipCardsAuto(0);
};

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random()*cards.length);
    card.style.order = randomPos;
    // document.getElementById("score").innerHTML = "Score: " + score;
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

function resetAll(){

  correctNrOfCards = 0;
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
        resetAll();
      } else {
        answer = false;
      }
      
     
 

  if(answer){
    score++;
    console.log(score);
    
    //document.getElementById("message").innerHTML = "Score: " + score;
    messagePlay.style.visibility = 'visible';
    
    
  } else if (!answer){
    if(score>0){
      score--;
      console.log(score);
      
      
    }
    
    //messagePlay.style.visibility = 'visible'
  }

 

  document.getElementById("score").innerHTML = "Score: " + score;

  randomListOfCards=[];
  playerListOfCards = [];
}



//buttonCheck.addEventListener('click', checkAnswer)
button.addEventListener('click', play);
cards.forEach(card => card.addEventListener('click', flipCard));

