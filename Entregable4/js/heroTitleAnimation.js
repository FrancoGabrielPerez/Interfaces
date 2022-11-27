'use strict';

let title = document.querySelector('.hero-title');
let heroChartFloor = document.querySelector('#hero-chart-floor');
window.addEventListener("scroll", heroTitleAnimation);

function heroTitleAnimation(){
  const trigger = window.innerHeight/6*4;
  const top = title.getBoundingClientRect().bottom; 
  if (trigger > top){
    title.classList.add('hide-title');
   } else {    
    title.classList.remove('hide-title');
   }
}

