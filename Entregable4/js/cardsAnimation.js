
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
  let posCards1 = cardContainer[0].getBoundingClientRect().top;
  let posCards2 = cardContainer[cardContainer.length-1].getBoundingClientRect().bottom;
  if ( posCards1 > window.innerHeight || posCards2 < 0){
    console.log("entro");
    for(let i = 0, j = 1; i < cardContainer.length; i++, j++){
      cardContainer[i].classList.remove(`layer${j}`);
      cardContainer[i].style = 'opacity: 0';
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
  
