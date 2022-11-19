"use strict";
document.querySelector('#nav-icon-left').addEventListener('click', hamButton);
//document.querySelector('#nav-icon-right').addEventListener('click', hamButton);

/**ANIMACION BOTON HAMBURGESA*/
function hamButton(e){
	e.currentTarget.classList.toggle('open');
	document.querySelector("#nav-menu").classList.toggle("hiddenn");
}


document.querySelector("#nav-icon-right").addEventListener('click', deployUserMenu);

function deployUserMenu(e){
    document.querySelector('#nav-menu-usr').classList.toggle('hidden')
}