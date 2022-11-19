"use strict";

window.addEventListener(
  "scroll",
  () => {
    let scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    scrollPosition = scrollPosition.toFixed(2);
    console.log(scrollPosition);

    if (scrollPosition >= 0.30  && scrollPosition < 0.40){
        document.querySelector('#scrollLogo').setAttribute('src', "../img/img-games/hero-section/El Mono.png");
        if(scrollPosition == 0.30){
          document.querySelector('.history-paragraph-2').classList.add('history-animation');
          document.querySelector('#scrollLogo').classList.add('history-animation');
        }
          let animacion = document.querySelector('.history-paragraph-2');
          animacion.addEventListener('animationend', () => {
            document.querySelector(`.history-paragraph-2`).classList.remove('history-animation');
            document.querySelector('#scrollLogo').classList.remove('history-animation');
          });
       
    } else if (scrollPosition >= 0.40 && scrollPosition <= 0.54){
          document.querySelector('#scrollLogo').setAttribute('src', "../img/img-games/hero-section/Billy.png");
          if(scrollPosition == 0.40){
            document.querySelector('.history-paragraph-3').classList.add('history-animation');
            document.querySelector('#scrollLogo').classList.add('history-animation');
          }
            let animacion = document.querySelector('.history-paragraph-3');
            animacion.addEventListener('animationend', () => {
              document.querySelector(`.history-paragraph-3`).classList.remove('history-animation');
              document.querySelector('#scrollLogo').classList.remove('history-animation');
            });
          
    } else {      
          document.querySelector('#scrollLogo').setAttribute('src', "../img/img-games/hero-section/El Juez.png");
          if(scrollPosition == 0.15){
            document.querySelector('.history-paragraph-1').classList.add('history-animation');
            document.querySelector('#scrollLogo').classList.add('history-animation');
          }
            let animacion = document.querySelector('.history-paragraph-1');
            animacion.addEventListener('animationend', () => {document.querySelector(`.history-paragraph-1`).classList.remove('history-animation');
            document.querySelector('#scrollLogo').classList.remove('history-animation');
          });
    }
     
    

    // Animacion cards de personajes
    let cards = document.querySelectorAll('.juego-character');
    let charactersChart = document.querySelector('.carrusel-characters');
    if (scrollPosition >= 0.45  && scrollPosition < 0.60){
      for(let i=1;i<5;i++){
        if (i % 2 == 0)
          cards[i].classList.add(`layer${i}`);
        else
          cards[i].classList.add(`layer${i}`);
      }
      charactersChart.style = 'transform: translateX(0px)';
    } else {
      for(let i=1;i<5;i++){
        if (i % 2 == 0)
          cards[i].classList.remove(`layer${i}`);
        else
          cards[i].classList.remove(`layer${i}`);
      }
    }
    if (scrollPosition >= 0.61  && scrollPosition < 0.80){
      for(let i=4;i<8;i++){
        if (i % 2 == 0)
          cards[i].classList.add(`layer${i+1}`);
        else
          cards[i].classList.add(`layer${i+1}`);
      }
      charactersChart.style = 'transform: translateX(0px)';
    } else {
      for(let i=4;i<8;i++){
        if (i % 2 == 0)
          cards[i].classList.remove(`layer${i+1}`);
        else
          cards[i].classList.remove(`layer${i+1}`);
      }
    }
  },
  false
);

function animationRemove(i){
      setTimeout(() => {document.querySelector(`.history-paragraph-${i}`).classList.remove('history-logo-animation');},5000 );
}