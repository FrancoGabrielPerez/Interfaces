"use strict";

window.addEventListener(
  "scroll",
  () => {
    console.log(window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    let scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    if (scrollPosition >= 0.30  && scrollPosition < 0.40)
        document.querySelector('#scrollLogo').setAttribute('src', "../img/img-games/hero-section/El Mono.png");
    else if (scrollPosition >= 0.40)
          document.querySelector('#scrollLogo').setAttribute('src', "../img/img-games/hero-section/Billy.png");
        else      
          document.querySelector('#scrollLogo').setAttribute('src', "../img/img-games/hero-section/El Juez.png");   
  },
  false
);
