'use strict';

let title = document.querySelector('.hero-title');
let heroChartFloor = document.querySelector('#hero-chart-floor');
let cowBones = document.querySelector('.cow-bones')
window.addEventListener("scroll", heroTitleAnimation);

function heroTitleAnimation(){
  const trigger = window.innerHeight/6*4;
  const top = title.getBoundingClientRect().bottom;
  console.log('trigger ',trigger);
  console.log('top ',top);
  if (trigger > top){
    title.classList.add('hide-title');
    //cowBones.classList.add('fade');

   } else {    
    title.classList.remove('hide-title');
    //cowBones.classList.remove('fade');
   }
}

