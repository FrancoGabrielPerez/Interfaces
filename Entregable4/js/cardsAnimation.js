
window.addEventListener("scroll", main);

const cardContainer = document.querySelectorAll('.juego-character');

function cardsAnimation(cards, elementsIntersected){
    cards.forEach((card) =>{
      if (card.isIntersecting){       
        let clase = card.target.classList[1];
        card.target.classList.add(`layer${clase}`);
        card.target.style = 'opacity: 1';
      } 
    });
  }

function classRestore(){    
  let cards = document.querySelectorAll('.juego-character');
  if (scrollPosition <= 0.500 || scrollPosition >= 0.750){
    for(let i = 0, j = 1; i < 8; i++, j++){
      cards[i].classList = `juego-character ${j}`;
      cards[i].style = 'opacity: 0';
    }
  }
}

function main(){
  const observador = new IntersectionObserver(cardsAnimation,{
    root: null,
    rootMargin: '10px',
    threshold: 0.5,
  });
  cardContainer.forEach(card => {observador.observe(card)});
  classRestore();
}
  
