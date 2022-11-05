"use strict";

function modalWindow(imgJuego){
    document.querySelector('.modalContainerMensaje').classList.remove('ocultar');
    document.querySelector('.img-compra').innerHTML = `<img src="./img/img-games/img-cards-small/${imgJuego}" alt="Batalla Star Wars.">`;
    document.querySelector('.modalContainerMensaje').classList.add('mostrar');
}

function cerrarModalWindow(){
    document.querySelector('.modalContainerMensaje').classList.remove('mostar');
    document.querySelector('.modalContainerMensaje').classList.add('ocultar');
}