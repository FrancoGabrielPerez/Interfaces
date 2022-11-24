"use strict";

var lastScrollTop = 0; 
window.addEventListener(
  "scroll",
  () => {
    let scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    let scrollPos = scrollPosition.toFixed(2);
    scrollPosition = scrollPosition.toFixed(3);
   
  //Credits: https://stackoverflow.com/questions/31223341/detecting-scroll-direction
    let scrollDirection;
    let st = window.pageYOffset || document.documentElement.scrollTop; 
    if (st > lastScrollTop){
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

    changeParagraph(1);
    changeParagraph(2);
    changeParagraph(3);
    
    function changeParagraph(p){
      let paragraph = document.querySelector(`.history-paragraph-${p}`);
      let posParagraph = paragraph.getBoundingClientRect().top + paragraph.clientHeight/2;
      let relativepos = Math.abs(window.innerHeight/2-posParagraph)/window.innerHeight;
      let opacity =Math.pow(1-Math.abs(window.innerHeight/2-posParagraph)/window.innerHeight, 5);
      paragraph.style = `opacity: ${opacity}`;
      console.log("relp: ", relativepos);
      if (relativepos < 0.1){
        document.querySelector('#scrollimg').setAttribute('src', `../img/img-games/hero-section/hero-history-${p}.png`);
      }
    }

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