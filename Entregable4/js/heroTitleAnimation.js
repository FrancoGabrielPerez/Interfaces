'use strict';

let title = document.querySelector('.hero-title');
window.addEventListener("scroll", heroTitleAnimation);

function heroTitleAnimation(){
   let scroll = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
  if (scroll <= 0){
     title.classList.remove('hide-title');
   } else {    
      title.classList.add('hide-title');
   }
}

