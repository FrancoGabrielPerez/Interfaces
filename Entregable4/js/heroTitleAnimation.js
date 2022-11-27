'use strict';

let titleScroll=0;
window.addEventListener(
  "scroll", heroTitleAnimation);

function heroTitleAnimation(){
    let title = document.querySelector(".hero-title");
   /*  let posTitle = title.getBoundingClientRect().top + title.clientHeight/2;
    let initialPosTitle = posTitle; */
    if((scrollST <= 6 && scrollST >=0) && titleScroll > 0){
        title.style = `transform: translateY(0px); transition: all ease linear; opacity: 1; scroll-behavior:smooth;`;
        titleScroll = 0;   
    }
    
    if (scrollDirection == 'down' && titleScroll < 500){
      title.style = `transform: translateY(${titleScroll}px); transition: all linear; opacity: ${1-(titleScroll/500)}; scroll-behavior:smooth;`;        
     
      titleScroll += 15;     
    } 
    if (scrollDirection == 'up' && titleScroll > 0 && scrollST < 470){
      title.style = `transform: translateY(${titleScroll}px); transition: all linear; opacity: ${1-(titleScroll/500)}; scroll-behavior:smooth;`;  
      titleScroll -= 15;
    } 
    
  }
