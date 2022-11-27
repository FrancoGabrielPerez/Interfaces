"use strict"

let header = document.querySelector("header");
let smallHeaderPos = 0.0001;

window.addEventListener(
	"scroll",
	() => {
		
	  let scrollPosition = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
	  let scrollPos = scrollPosition.toFixed(4);
	  if (scrollPos > smallHeaderPos && !header.classList.contains("smallheader")){
		toogleSmallHeader();
	} else if (scrollPos <= smallHeaderPos && header.classList.contains("smallheader")){
		toogleSmallHeader();
	  }
	}
	
);

function toogleSmallHeader(){
	//close hamburger menu
	document.querySelector('#nav-icon-left').classList.remove('open');
	document.querySelector("#nav-menu").classList.add("hiddenn");
	//rezise elements
	document.querySelector(".usr-name").classList.toggle("hidden");
	document.querySelector("header").classList.toggle("smallheader");
	document.querySelectorAll(".nav-icon").forEach( element => element.classList.toggle("nav-icon-small"));
	document.querySelector(".container-nav-bar").classList.toggle("container-nav-bar-small");
	document.querySelector(".input-buscar").classList.toggle("input-buscar-small");
	document.querySelector(".logo").classList.toggle("logo-small");
}