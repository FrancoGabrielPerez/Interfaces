"use strict";

let scrollPosition = 0;
let historyList = document.querySelectorAll(".his-par");

window.addEventListener(
  "scroll",
  () => {
    scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    scrollPosition = scrollPosition.toFixed(3);
    for (let i = 0; i < historyList.length; i++) {
      const paragraph = historyList[i];
      changeParagraph(paragraph, i+1);
    }
    
    function changeParagraph(paragraph, n){
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