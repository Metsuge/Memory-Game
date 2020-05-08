const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector('.button');
const buttonCheck = document.querySelector('.buttoncheck')


let lockBoard = false;
let randomListOfCards = [];
// let listOfCardsClicked = [];
let playerListOfCards = [];

function makeRandomList(){ //nera pasikartojanciu kortu
  while (randomListOfCards.length < 3) {
    let randomNr = Math.floor(Math.random() * cards.length);
    let randomCard = cards[randomNr];
    if(!randomListOfCards.includes(randomCard)){
      randomListOfCards.push(randomCard); 
    } 
  }
}


// function flipCardsAuto(){
//   lockBoard = true;
//   // let cardFinishedFlipping = true;
  
//   for (i=0;i<randomListOfCards.length;i++){
//     let aCard = randomListOfCards[i]
//     setTimeout(()=>{
//       console.log(aCard);
//     }, 1000)
    
//   }
let finished = false;
function flipCardsAuto(i){
  let randomCard = randomListOfCards[i]

  randomCard.classList.add('flip') 
  if (i<randomListOfCards.length){
    setTimeout(function(){
      i++; 
      flipCardsAuto(i);
      finished = true;
    }, 500);    
    
  }
  setTimeout(function(){
  randomCard.classList.remove('flip')
}, 2000); 
} 

// function flipCardsAuto(){
//   randomListOfCards.forEach(
//     card => {

//       card.classList.add('flip') 
      
//       setTimeout(()=>{
//         card.classList.remove('flip');
//         randomListOfCards=[];
//         lockBoard = false;
//       }, 1000) 
//     }
//   )
// }
  
function generateRandomSequence(){
  makeRandomList();
  flipCardsAuto(0)
}

// function disableCards(){
//   firstCard.removeEventListener('click', flipCard);
//   secondCard.removeEventListener('click', flipCard);
//   resetBoard()
// }

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random()*8);
    card.style.order = randomPos;

  });
})();

function flipCard(){ //zaidenas flippina
  if(lockBoard) return; //jei lenta uzrakinta, nk negali spaust

  this.classList.add('flip'); 
  setTimeout(()=>{
    this.classList.remove('flip');
    randomListOfCards=[];
    lockBoard = false;
  }, 1000)

  let playerCard = this;

  playerListOfCards.push(playerCard)
  console.log(playerListOfCards);
  
}

function checkAnswer(){
 
  for (i=0;i< randomListOfCards.length;i++){
    console.log(playerListOfCards[i]);
    
      if(randomListOfCards.includes(playerListOfCards[i]) ){
        console.log(playerListOfCards[i]);
        
      } else console.log("no");
      
    
  }
    
  
  
}


buttonCheck.addEventListener('click', checkAnswer)
button.addEventListener('click', generateRandomSequence);
cards.forEach(card => card.addEventListener('click', flipCard));

