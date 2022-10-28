"use strict";

function modalCompra(imgJuego){
    document.querySelector('.modalContainerMensaje').classList.remove('ocultar');
    document.querySelector('.img-compra').innerHTML = `<img src="./img/img-games/img-cards-small/${imgJuego}" alt="Batalla Star Wars.">`;
    document.querySelector('.modalContainerMensaje').classList.add('mostrar');
}

function cerrarModalCompra(){
    document.querySelector('.modalContainerMensaje').classList.remove('mostar');
    document.querySelector('.modalContainerMensaje').classList.add('ocultar');
}