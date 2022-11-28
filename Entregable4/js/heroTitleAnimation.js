'use strict';

let title = document.querySelector('.hero-title');
let cowBones = document.querySelector('.cow-bones')
window.addEventListener("scroll", heroTitleAnimation);

function heroTitleAnimation(){
  const trigger = window.innerHeight/6;
  var top = cowBones.getBoundingClientRect().top;
  top = top + top * 0.5; 
  if (trigger > top){
      title.classList.add('hide-title');
   } else {    
      title.classList.remove('hide-title');
   }
}

