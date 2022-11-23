"use strict";

var lastScrollTop = 0; 
window.addEventListener(
  "scroll",
  () => {
    let scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    let scrollPos = scrollPosition.toFixed(2);
    scrollPosition = scrollPosition.toFixed(3);
    //console.log(scrollPosition);
   
  //Credits: https://stackoverflow.com/questions/31223341/detecting-scroll-direction
   let scrollDirection;
   let st = window.pageYOffset || document.documentElement.scrollTop; 
   if (st > lastScrollTop){
      scrollDirection = 'down';
   } else {
      scrollDirection = 'up';
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
   
   console.log(scrollDirection);
   console.log(scrollPos);


    //Animacion de history section
    /* if(scrollPosition < 0.010 || scrollPosition > 0.500){
      document.querySelector('.history-paragraph-1').style = "opacity: 1";
      document.querySelector('.history-paragraph-2').style = "opacity: 1";
      document.querySelector('.history-paragraph-3').style = "opacity: 1";
    } */

    // Animacion transicion imagenes split screen.    
    if (scrollPosition >= 0.300  && scrollPosition < 0.400){
        document.querySelector('#scrollimg').setAttribute('src', "../img/img-games/hero-section/hero-history-2.png");
        document.querySelector('#scrollimg').classList.add('history-img-animation');
        let imgAnimation =  document.querySelector('#scrollimg');
        imgAnimation.addEventListener('animationend', () => {
          //document.querySelector('#scrollimg').classList.remove('history-img-animation');
          //document.querySelector('#scrollimg').style = 'opacity: 0';
        });       
    } else if (scrollPosition >= 0.400 && scrollPosition <= 0.500){
          document.querySelector('#scrollimg').setAttribute('src', "../img/img-games/hero-section/hero-history-7.png");
          document.querySelector('#scrollimg').classList.add('history-img-animation');
          let imgAnimation =  document.querySelector('#scrollimg');
          imgAnimation.addEventListener('animationend', () => {
            //document.querySelector('#scrollimg').classList.remove('history-img-animation');
            //document.querySelector('#scrollimg').style = 'opacity: 0';
          });          
    } else if (scrollPosition >= 0.100 && scrollPosition <= 0.300){      
          document.querySelector('#scrollimg').setAttribute('src', "../img/img-games/hero-section/hero-history-9.png");
          document.querySelector('#scrollimg').classList.add('history-img-animation');
          let imgAnimation =  document.querySelector('#scrollimg');
          imgAnimation.addEventListener('animationend', () => {
            //document.querySelector('#scrollimg').classList.remove('history-img-animation');
            //document.querySelector('#scrollimg').style = 'opacity: 0';
          });
    }
     
    // Animacion parrafos split screen.
    let posParagraph1 = 0.16;
    let posParagraph2 = 0.34;
    let posParagraph3 = 0.52;
    if (scrollPos>posParagraph1){
      setOpacity(posParagraph1, 1);
      setOpacity(posParagraph2, 2);
      setOpacity(posParagraph3, 3);
    }

    function setOpacity(pos, paragraph){
      let opacity =Math.pow(1-Math.abs(scrollPos-pos), 30);
      document.querySelector(`.history-paragraph-${paragraph}`).style = `opacity: ${opacity}`;
    }
    let viewportHeight = window.innerHeight;
    posParagraph1 = getBoundingClientRect().top;
    // console.log(opacity);
    /* if((scrollPos == 0.35 && scrollDirection == 'down') || (scrollPos == 0.35 && scrollDirection == 'up')) {         
      document.querySelector('.history-paragraph-2').classList.add('history-paragraph-animation');
      let paragrapAnimation = document.querySelector('.history-paragraph-2');
      paragrapAnimation.addEventListener('animationend', () => {
        document.querySelector('.history-paragraph-2').classList.remove('history-paragraph-animation');
        document.querySelector('.history-paragraph-2').style = "opacity: 0";
      });
    } else if((scrollPos == 0.45 && scrollDirection == 'down') || (scrollPos == 0.45 && scrollDirection == 'up')) {         
      document.querySelector('.history-paragraph-3').classList.add('history-paragraph-animation');
      let paragrapAnimation = document.querySelector('.history-paragraph-3');
      paragrapAnimation.addEventListener('animationend', () => {
        document.querySelector('.history-paragraph-3').classList.remove('history-paragraph-animation');
        document.querySelector('.history-paragraph-3').style = "opacity: 0";
      });
    } else if((scrollPos == 0.21 && scrollDirection == 'down') || (scrollPos == 0.05 && scrollDirection == 'up')) {         
      document.querySelector('.history-paragraph-1').classList.add('history-paragraph-animation');
      let paragrapAnimation = document.querySelector('.history-paragraph-1');
      paragrapAnimation.addEventListener('animationend', () => {
        document.querySelector('.history-paragraph-1').classList.remove('history-paragraph-animation');
        document.querySelector('.history-paragraph-1').style = "opacity: 0";
      });
    }
 */


    // Animacion cards de personajes.
    let cards = document.querySelectorAll('.juego-character');
    let charactersChart = document.querySelector('.carrusel-characters');
  
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
  },
  false
);


