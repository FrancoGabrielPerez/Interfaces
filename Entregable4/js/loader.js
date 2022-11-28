"use strict";

window.scrollTo( 0, 0);
document.querySelector("header").classList.add("hidden");
setTimeout(()=>{   
    document.querySelector("header").classList.remove("hidden");
    document.body.style = "overflow-y:scroll;"; 
    document.querySelector('.loader').style.display = "none";   
},5000);
