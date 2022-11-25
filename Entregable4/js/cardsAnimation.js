const cardContainer = document.querySelector('.')

function cardsAnimation(){
  
    let charactersChart = document.querySelector('.carrusel-characters');
    let cards = document.querySelectorAll('.juego-character');
    if (scrollPosition <= 0.50 || scrollPosition >= 0.77){
      cards.forEach(card => {card.style = 'opacity: 0';});
    }

    if (scrollPos == 0.60 /*  && scrollPosition < 0.650  */){
      for(let i = 0; i < 4; i++){
        if (i % 2 != 0)
          cards[i].classList.add(`layer${i+1}`);
        else
          cards[i].classList.add(`layer${i+1}`);
      }
    }    
    if (scrollPosition == 0.70 /* && scrollPosition < 0.750 */){
      for(let i = 4; i < 8; i++){
        
        if (i % 2 != 0)
          cards[i].classList.add(`layer${i+1}`);
        else
          cards[i].classList.add(`layer${i+1}`);
      }
    } 
    cards.forEach(card => card.addEventListener('animationend', () =>{
      card.classList = 'juego-character';
      card.style = 'opacity: 1';
    }));
  }

  const observador = new IntersectionObserver(cardsAnimation,{
    root: null,
    rootMargin: '100px',
    threshold: 1.0
  });

  cards.forEach(card =>{observador.observe(car)})

