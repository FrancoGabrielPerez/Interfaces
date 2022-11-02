"use strict";
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-nuevo-juego").addEventListener('submit', modalGame); 
  });
  
let cuatroEnLinea;

function modalGame(event){
    event.preventDefault();
    let tipoJuego = document.querySelector('input[name="game-type"]:checked').value;
    let playerOne = document.querySelector('input[name="name-jug-1"]').value;
    let playerTwo = document.querySelector('input[name="name-jug-2"]').value;
    let coinPlayerOne = document.querySelector('input[name="game-type-1"]:checked').value;
    let coinPlayerTwo = document.querySelector('input[name="game-type-2"]:checked').value;
    let avatarPlayerOne = document.querySelector('.img-jugador-1 img').getAttribute("src");
    let avatarPlayerTwo = document.querySelector('.img-jugador-2 img').getAttribute("src");
    
    cerrarModalGame();
    let formulario = document.getElementById("form-nuevo-juego");
    formulario.reset();

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d'); 

    cuatroEnLinea = new Game(tipoJuego, playerOne, playerTwo, avatarPlayerOne, avatarPlayerTwo, coinPlayerOne, coinPlayerTwo, ctx);
}

function cerrarModalGame(){
    document.querySelector('.ModalContainerConfigGame').classList.remove('mostar');
    document.querySelector('.ModalContainerConfigGame').classList.add('ocultar');
}