document.querySelector('#nav-icon-left').addEventListener('click', hamButton);
document.querySelector('#nav-icon-right').addEventListener('click', hamButton);

/**ANIMACION BOTON HAMBURGESA*/
function hamButton(e){
	e.currentTarget.classList.toggle('open');
}