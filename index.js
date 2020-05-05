const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard(){
    this.classList.add('flip');

  if(!hasFlippedCard){
      //this is first click
    hasFlippedCard = true;
    firstCard=this;
  }else{
      //this is second click
      hasFlippedCard = false;
      secondCard = this;
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));