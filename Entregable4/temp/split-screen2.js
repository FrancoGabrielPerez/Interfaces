"use strict";

window.addEventListener(
  "scroll",
  () => {
    console.log(window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    let scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    if (scrollPosition >= 0.30  && scrollPosition < 0.40)
        document.querySelector('#scrollLogo').setAttribute('src', "../img/img-games/hero-section/El Mono.png");
    else if (scrollPosition >= 0.40)
          document.querySelector('#scrollLogo').setAttribute('src', "../img/img-games/hero-section/Billy.png");
        else      
          document.querySelector('#scrollLogo').setAttribute('src', "../img/img-games/hero-section/El Juez.png");   
    
    let cards = document.querySelectorAll('.juego-character');
    let charactersChart = document.querySelector('.carrusel-characters');
    if (scrollPosition >= 0.45  && scrollPosition < 0.80){
      for(let i=0;i<9;i++){
        if (i % 2 == 0)
          cards[i].classList.add('cards-movement-left');
        else
          cards[i].classList.add('cards-movement-right');
      }
      //charactersChart.classList.add('cards-movement');
      charactersChart.style = 'transform: translateX(0px)';
    } else {
      for(let i=0;i<9;i++){
        if (i % 2 == 0)
          cards[i].classList.remove('cards-movement-left');
        else
          cards[i].classList.remove('cards-movement-right');
      }
      //charactersChart.classList.remove('cards-movement');
    }
  },
  false
);
