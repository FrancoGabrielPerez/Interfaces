"use strict";

function modalGame(){
    document.querySelector('.ModalContainerConfigGame').classList.remove('ocultar');
    document.querySelector('.ModalContainerConfigGame').classList.add('mostrar');
}

function cerrarModalGame(){
    document.querySelector('.ModalContainerConfigGame').classList.remove('mostar');
    document.querySelector('.ModalContainerConfigGame').classList.add('ocultar');
}