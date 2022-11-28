"use strict";

//let scrollST = 0;
let scrollDirection = null;
var lastScrollTop = 0;
let scrollPosition = 0;
let historyList = document.querySelectorAll(".his-par");

window.addEventListener(
  "scroll",
  () => {
    scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    let scrollPos = scrollPosition.toFixed(2);
    scrollPosition = scrollPosition.toFixed(3);
   //Credits: https://stackoverflow.com/questions/31223341/detecting-scroll-direction
    //console.log('scrollposition ',scrollPosition);
    // let st = window.pageYOffset || document.documentElement.scrollTop; 
    // scrollST = st;
    // if (st >= lastScrollTop){
    //   scrollDirection = 'down';
    // } else {
    //   scrollDirection = 'up';
    // }
    // lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    for (let i = 0; i < historyList.length; i++) {
      const paragraph = historyList[i];
      changeParagraph(paragraph, i+1);
    }
    // changeParagraph(1);
    // changeParagraph(2);
    // changeParagraph(3);
    
    function changeParagraph(paragraph, n){
      // let paragraph = document.querySelector(`.history-paragraph-${p}`);
      let posParagraph = paragraph.getBoundingClientRect().top + paragraph.clientHeight/2;
      let relativepos = Math.abs(window.innerHeight/2-posParagraph)/window.innerHeight;
      let opacity = Math.pow(1-Math.abs(window.innerHeight/2-posParagraph)/window.innerHeight, 5);
      paragraph.style = `opacity: ${opacity}`;
      if (relativepos < 0.1){
        document.querySelector('#scrollimg').setAttribute('src', `../img/img-games/hero-section/hero-history-${n}.png`);
      }
    }
   },
  false
);