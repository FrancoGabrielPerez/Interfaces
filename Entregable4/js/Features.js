"use strict";

let featuresList = document.querySelectorAll(".feature");
let snappingThreshold = 5;

window.addEventListener(
  "scroll",
  () => {
	for (let i = 0; i < featuresList.length; i++) {
		const feature = featuresList[i];
		changeFeature(feature, !( i & 1 ));
	}
	// changeFeature(featuresList[3],false);
    
    function changeFeature(feature, even){
		let posFeature = feature.getBoundingClientRect().top + feature.clientHeight/2;
		// console.log('posFeature ', posFeature);
		let translate = Math.abs(window.innerHeight/2-posFeature)/window.innerHeight*100;
		if (translate==undefined){
			translate=0;
		}
		// console.log(`pos${n}: `, posFeature);
		// console.log(`tr${n}: `, translate);
		// console.log(window.scrollY);
		// console.log(feature.offsetTop+feature.clientHeight/2);
		let snap = Boolean(parseInt(feature.dataset.snap));
		if (snap && (translate <= snappingThreshold)) {
			// feature.scrollIntoView({behavior: "smooth", block: "start"});
			window.scrollTo( 0, feature.offsetTop);
			snap = false;
		}
		if (!snap && (translate > snappingThreshold)){
			snap = true;
		} 
		feature.dataset.snap = snap ? 1 : 0;
		if (even){
			if(!snap){
				// console.log(`trans${n}: `, translate);
			}
			feature.querySelector(".feature-img").style.transform = `translate(-${translate}vw, 0vh)`;
			feature.querySelector(".feature-text h3").style.transform = `translate(${translate}vw, -${translate}vh)`;
			feature.querySelector(".feature-text p").style.transform = `translate(${translate}vw, ${translate}vh)`;
		} else {
			if(!snap){
				// console.log(`trans${n}: `, translate);
			}
			feature.querySelector(".feature-img").style.transform = `translate(${translate}vw, 0vh)`;
			feature.querySelector(".feature-text h3").style.transform = `translate(-${translate}vw, -${translate}vh)`;
			feature.querySelector(".feature-text p").style.transform = `translate(-${translate}vw, ${translate}vh)`;
		}
	}
  },
  false
);