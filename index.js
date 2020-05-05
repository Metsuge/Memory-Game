const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  if (lockBoard) return; //if true, all stops, and the following code won't be executed 
  this.classList.add('flip');

  if(!hasFlippedCard){
      //this is first click
    hasFlippedCard = true;
    firstCard=this;

    return;
  } 
    //this is second click
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
}

function checkForMatch(){
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
  }, 1000);
  lockBoard = false;
}


cards.forEach(card => card.addEventListener('click', flipCard));