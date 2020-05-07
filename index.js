const cards = document.querySelectorAll('.memory-card');
const button = document.querySelector('.button');


let lockBoard = false;
let randomListOfCards = [];
let listOfCardsClicked = [];

function makeRandomList(){
  while (randomListOfCards.length < 4) {
    let randomNr = Math.floor(Math.random() * cards.length);
    randomListOfCards.push(cards[randomNr]);
  }
  console.log(randomListOfCards);
}

function flipCardsAuto(){ //flips random cards and flips them back
  lockBoard = true;
  randomListOfCards.forEach(
    card => {
      card.classList.add('flip') 
      setTimeout(()=>{
        card.classList.remove('flip');
        randomListOfCards=[];
        lockBoard = false;
      }, 1000) 
    }
  )
}
  
function generateRandomSequence(){
  makeRandomList();
  flipCardsAuto()
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

function flipCard(){ 
  if(lockBoard) return;
  this.classList.add('flip'); 
}



button.addEventListener('click', generateRandomSequence);
cards.forEach(card => card.addEventListener('click', flipCard));

