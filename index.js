const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  if (lockBoard) return; //if true, all stops, you CAN'T flip cards
  if (this === firstCard) return;
  // jeigu paspaudi korta(this) ir this === firstCard, reiskia firstCard jau
  // pries tai buvo priskirta kaip this ir tai yra antras paspaudimas, tai bus
  // false ir eina zemyn i 22 eilute
  //jeigu this !=== firstCard, reiskias firstCard nebuvo panaudota, reiskias tai yra pirmas 
  //paspaudimas ir reikia ji issaugoti, eina normaliai prie f-jos eiluteje 11

  this.classList.add('flip');

  if(!hasFlippedCard){
      //this is first click
    hasFlippedCard = true;
    firstCard=this;

    return;
  } 
    //this is second click
    
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

  resetBoard()
}

function unflipCards() {
  lockBoard = true; //first lock board
  setTimeout(() => { //the flip cards
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard(); //after they flipped back, unlock board
  }, 1000);
  
}


function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random()*12);
    card.style.order = randomPos;
  });
})();






cards.forEach(card => card.addEventListener('click', flipCard));

