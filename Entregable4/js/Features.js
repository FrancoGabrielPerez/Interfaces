"use strict";

let featuresList = document.querySelectorAll(".feature");
let snappingThreshold = 3;
let featureHeight = 40;

window.addEventListener(
  "scroll",
  () => {
	for (let i = 0; i < featuresList.length; i++) {
		const feature = featuresList[i];
		changeFeature(feature, !( i & 1 ));
	}

    function changeFeature(feature, even){
		let posFeature = feature.getBoundingClientRect().top + feature.clientHeight/2;
		if (posFeature < window.innerHeight/2){
			return;
		}
		let translate = Math.abs(window.innerHeight/2-posFeature)/window.innerHeight*featureHeight;
		let opacity = Math.pow(1-Math.abs(window.innerHeight/2-posFeature)/window.innerHeight, 5);
		if (translate==undefined){
			translate=0;
		}
		let snap = Boolean(parseInt(feature.dataset.snap));
		if (snap && (translate <= snappingThreshold)) {
			window.scrollTo( 0, (feature.offsetTop-(window.innerHeight*(100-featureHeight)/2/100)));
			snap = false;
		}
		if (!snap && (translate > snappingThreshold)){
			snap = true;
		} 
		feature.dataset.snap = snap ? 1 : 0;
		feature.style.opacity = opacity;
		if (even){
			feature.querySelector(".feature-img").style.transform = `translate(-${translate}vw, 0vh)`;
			feature.querySelector(".feature-text h3").style.transform = `translate(${translate}vw, -${translate}vh)`;
			feature.querySelector(".feature-text p").style.transform = `translate(${translate}vw, ${translate}vh)`;
		} else {
			feature.querySelector(".feature-img").style.transform = `translate(${translate}vw, 0vh)`;
			feature.querySelector(".feature-text h3").style.transform = `translate(-${translate}vw, -${translate}vh)`;
			feature.querySelector(".feature-text p").style.transform = `translate(-${translate}vw, ${translate}vh)`;
		}
	}
  },
  false
);