"use strict";
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-nuevo-juego").addEventListener('submit', modalGame); 
  });
  
  
function modalGame(event){
    event.preventDefault();
    let tipoJuego = document.querySelector('input[name="game-type"]:checked').value;
    let playerOne = document.querySelector('input[name="name-jug-1"]').value;
    let playerTwo = document.querySelector('input[name="name-jug-2"]').value;
    let coinPlayerOne = document.querySelector('input[name="game-type-1"]:checked').value;
    let coinPlayerTwo = document.querySelector('input[name="game-type-2"]:checked').value;
    cerrarModalGame();
    let formulario = document.getElementById("form-nuevo-juego");
    formulario.reset();
}

function cerrarModalGame(){
    document.querySelector('.ModalContainerConfigGame').classList.remove('mostar');
    document.querySelector('.ModalContainerConfigGame').classList.add('ocultar');
}