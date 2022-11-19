"use strict";

window.addEventListener(
  "scroll",
  () => {
    let scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    scrollPosition = scrollPosition.toFixed(3);
    //console.log(scrollPosition);
    console.log(window.pageYOffset );

    //Animacion de history section
    if (scrollPosition >= 0.300  && scrollPosition < 0.400){
        document.querySelector('#scrollimg').setAttribute('src', "../img/img-games/hero-section/El Mono.png");
        if(scrollPosition == 0.30){
          document.querySelector('.history-paragraph-2').classList.add('history-paragraph-animation');
          document.querySelector('#scrollimg').classList.add('history-img-animation');
          document.querySelector(`.history-paragraph-3`).style = "opcity: 0";
        }
          let paragrapAnimation = document.querySelector('.history-paragraph-2');
          paragrapAnimation.addEventListener('animationend', () => {
            document.querySelector(`.history-paragraph-2`).classList.remove('history-paragraph-animation');
          });
          let imgAnimation =  document.querySelector('#scrollimg');
          imgAnimation.addEventListener('animationend', () => {
            document.querySelector('#scrollimg').classList.remove('history-img-animation');
          });

       
    } else if (scrollPosition >= 0.400 && scrollPosition <= 0.540){
          document.querySelector('#scrollimg').setAttribute('src', "../img/img-games/hero-section/Billy.png");
          if(scrollPosition == 0.40){
            document.querySelector('.history-paragraph-3').classList.add('history-paragraph-animation');
            document.querySelector('#scrollimg').classList.add('history-img-animation');
          }
            let paragrapAnimation = document.querySelector('.history-paragraph-3');
            paragrapAnimation.addEventListener('animationend', () => {
              document.querySelector(`.history-paragraph-3`).classList.remove('history-paragraph-animation');
              document.querySelector(`.history-paragraph-3`).style = "opcity: 0";
            });
            let imgAnimation =  document.querySelector('#scrollimg');
            imgAnimation.addEventListener('animationend', () => {
              document.querySelector('#scrollimg').classList.remove('history-img-animation');
            });
          
    } else if (scrollPosition >= 0.040 && scrollPosition <= 0.180){      
          document.querySelector('#scrollimg').setAttribute('src', "../img/img-games/hero-section/El Juez.png");
          if(scrollPosition == 0.15){
            document.querySelector('.history-paragraph-1').classList.add('history-paragraph-animation');
            document.querySelector('#scrollimg').classList.add('history-img-animation');
            document.querySelector(`.history-paragraph-1`).style = "opcity: 0";
          }
          let paragrapAnimation = document.querySelector('.history-paragraph-1');
          paragrapAnimation.addEventListener('animationend', () => {
            document.querySelector(`.history-paragraph-1`).classList.remove('history-paragraph-animation');
          });
          let imgAnimation =  document.querySelector('#scrollimg');
          imgAnimation.addEventListener('animationend', () => {
            document.querySelector('#scrollimg').classList.remove('history-img-animation');
          });
    }
     
    

    // Animacion cards de personajes
    let cards = document.querySelectorAll('.juego-character');
    let charactersChart = document.querySelector('.carrusel-characters');
  
    if (scrollPosition <= 0.50 || scrollPosition >= 0.77){
      cards.forEach(card => {card.style = 'opacity: 0';});
    }

    if (scrollPosition >= 0.600  && scrollPosition < 0.650 ){
      for(let i = 0; i < 4; i++){
        if (i % 2 != 0)
          cards[i].classList.add(`layer${i+1}`);
        else
          cards[i].classList.add(`layer${i+1}`);
      }
    }    
    if (scrollPosition >= 0.710 && scrollPosition < 0.750){
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
  },
  false
);
