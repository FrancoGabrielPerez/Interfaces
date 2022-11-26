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
      // console.log(relativepos);
      // console.log(posParagraph);
    }

    document.querySelector()

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
  },
  false
);