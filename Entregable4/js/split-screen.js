"use strict";

let scrollST = 0;
let scrollDirection = null;
var lastScrollTop = 0;
let scrollPosition = 0;
let scrollHorTitle = 1000;
let scrollVerTitle = 100;
window.addEventListener(
  "scroll",
  () => {
    scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    let scrollPos = scrollPosition.toFixed(2);
    scrollPosition = scrollPosition.toFixed(3);
    console.log(scrollPosition);
  //Credits: https://stackoverflow.com/questions/31223341/detecting-scroll-direction
    
    let st = window.pageYOffset || document.documentElement.scrollTop; 
    scrollST = st;
    /* console.log("st ",st); */
    if (st >= lastScrollTop){
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
      if (relativepos < 0.1){
        document.querySelector('#scrollimg').setAttribute('src', `../img/img-games/hero-section/hero-history-${p}.png`);
      }
      console.log(relativepos);
      console.log(posParagraph);
    }

    // featuresAnimation(1);
    // /* featuresAnimation(2);
    // featuresAnimation(3); */
    // function featuresAnimation(data){
    //   let featureDiv = document.querySelector(`.container-features-${data}`);
    //   console.log(featureDiv);
    //   let div1 = featureDiv.querySelector(`.div-1`);
    //   let titleDiv1 = div1.querySelector('.feature-title');
    //   let posTitleDiv1 = titleDiv1.getBoundingClientRect().top + titleDiv1.clientHeight/2;
    //   console.log("posTitleDiv1 ",posTitleDiv1);    
    //   if (scrollDirection == 'down' && scrollHorTitle > 0){
    //     // titleDiv1.style = `transform: translate(${scrollHorTitle}px, ${scrollVerTitle}px); opacity:1};`;        
    //     scrollHorTitle -= 100;
    //     scrollVerTitle -= 10;
    //   } 
    //   console.log(div1);
    //   console.log(titleDiv1);

    // }
    /* function heroTitleAnimation(){
      let title = document.querySelector(".hero-title");
      let posTitle = title.getBoundingClientRect().top + title.clientHeight/2;
      let initialPosTitle = posTitle;
      let relativepos =(window.innerHeight/2-posTitle)/window.innerHeight;
    
      console.log("titlescrollup ",titleScrollUp); 
      console.log("titlescrolldown ",titleScrollDown); 
      console.log("relativapos ",relativepos);    
      if (scrollDirection == 'down' && titleScrollDown < 400){
        title.style = `transform: translateY(${titleScrollDown}px); opacity: ${1-(titleScrollDown/400)};`;        
        console.log(titleScrollDown/400);
        titleScrollDown += 15;
        titleScrollUp += 15;
      } 
      if (scrollDirection == 'up' && titleScrollDown > 0){
        title.style = `transform: translateY(${titleScrollDown}px); opacity: ${1-(titleScrollDown/400)};`;         
        console.log("opacity "+titleScrollDown/400);
        titleScrollUp -= 15;
        titleScrollDown -= 15;
      } 
    }

    heroTitleAnimation();
 */
    // Animacion cards de personajes.
   
    // let cards = document.querySelectorAll('.juego-character');
    // let charactersChart = document.querySelector('.carrusel-characters');
  
    // if (scrollPosition <= 0.50 || scrollPosition >= 0.77){
    //   cards.forEach(card => {card.style = 'opacity: 0';});
    // }

    // if (scrollPos == 0.60 /*  && scrollPosition < 0.650  */){
    //   for(let i = 0; i < 4; i++){
    //     if (i % 2 != 0)
    //       cards[i].classList.add(`layer${i+1}`);
    //     else
    //       cards[i].classList.add(`layer${i+1}`);
    //   }
    // }    
    // if (scrollPosition == 0.70 /* && scrollPosition < 0.750 */){
    //   for(let i = 4; i < 8; i++){
        
    //     if (i % 2 != 0)
    //       cards[i].classList.add(`layer${i+1}`);
    //     else
    //       cards[i].classList.add(`layer${i+1}`);
    //   }
    // } 
    // cards.forEach(card => card.addEventListener('animationend', () =>{
    //   card.classList = 'juego-character';
    //   card.style = 'opacity: 1';
    // }));
    
  },
  false
);