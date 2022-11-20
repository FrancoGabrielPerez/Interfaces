"use strict";

window.addEventListener(
  "scroll",
  () => {
    let scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    let scrollPos = scrollPosition.toFixed(2);
    scrollPosition = scrollPosition.toFixed(3);
    console.log(scrollPosition);
    /* console.log(window.pageYOffset );
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    console.log("Scrollheigth: "+scrollHeight); */
    

    //Animacion de history section
    if(scrollPosition < 0.300 || scrollPosition > 0.800){
      document.querySelector('.history-paragraph-1').style = "opacity: 1";
      document.querySelector('.history-paragraph-2').style = "opacity: 1";
      document.querySelector('.history-paragraph-3').style = "opacity: 1";
    }
    
    if (scrollPosition >= 0.300  && scrollPosition < 0.400){
        document.querySelector('#scrollimg').setAttribute('src', "../img/img-games/hero-section/El Mono.png");
        
        if(scrollPos == 0.35){
          document.querySelector('.history-paragraph-2').classList.add('history-paragraph-animation');
          document.querySelector('#scrollimg').classList.add('history-img-animation');
        }
      
        let paragrapAnimation = document.querySelector('.history-paragraph-2');
        paragrapAnimation.addEventListener('animationend', () => {
          document.querySelector(`.history-paragraph-2`).classList.remove('history-paragraph-animation');
          document.querySelector(`.history-paragraph-2`).style = "opacity: 0";
        });

        let imgAnimation =  document.querySelector('#scrollimg');
        imgAnimation.addEventListener('animationend', () => {
          document.querySelector('#scrollimg').classList.remove('history-img-animation');
        });

       
    } else if (scrollPosition >= 0.400 && scrollPosition <= 0.500){
          document.querySelector('#scrollimg').setAttribute('src', "../img/img-games/hero-section/Billy.png");
          if(scrollPos == 0.45){
            document.querySelector('.history-paragraph-3').classList.add('history-paragraph-animation');
            document.querySelector('#scrollimg').classList.add('history-img-animation');
          }

          let paragrapAnimation = document.querySelector('.history-paragraph-3');
          paragrapAnimation.addEventListener('animationend', () => {
            document.querySelector(`.history-paragraph-3`).classList.remove('history-paragraph-animation');
            document.querySelector(`.history-paragraph-3`).style = "opacity: 0";
          });

          let imgAnimation =  document.querySelector('#scrollimg');
          imgAnimation.addEventListener('animationend', () => {
            document.querySelector('#scrollimg').classList.remove('history-img-animation');
          });
          
    } else if (scrollPosition >= 0.100 && scrollPosition <= 0.300){      
          document.querySelector('#scrollimg').setAttribute('src', "../img/img-games/hero-section/El Juez.png");
          if(scrollPos == 0.15){
            document.querySelector('.history-paragraph-1').classList.add('history-paragraph-animation');
            document.querySelector('#scrollimg').classList.add('history-img-animation');
            
          }

          let paragrapAnimation = document.querySelector('.history-paragraph-1');
          paragrapAnimation.addEventListener('animationend', () => {
            document.querySelector(`.history-paragraph-1`).classList.remove('history-paragraph-animation');
            document.querySelector(`.history-paragraph-1`).style = "opacity: 0";
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
