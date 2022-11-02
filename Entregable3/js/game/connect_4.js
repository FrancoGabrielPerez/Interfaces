"use strict";
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-nuevo-juego").addEventListener('submit', modalGame); 
  });
  
let cuatroEnLinea;

function modalGame(event){
    event.preventDefault();
    let gameType = document.querySelector('input[name="game-type"]:checked').value;
    let player1name = document.querySelector('input[name="name-jug-1"]').value;
    let player2name = document.querySelector('input[name="name-jug-2"]').value;
    let player1Img = document.querySelector('input[name="game-type-1"]:checked').value;
    let player2Img = document.querySelector('input[name="game-type-2"]:checked').value;
    let player1Profile = document.querySelector('.img-jugador-1 img').getAttribute("src");
    let player2Profile = document.querySelector('.img-jugador-2 img').getAttribute("src");
    
    cerrarModalGame();
    let formulario = document.getElementById("form-nuevo-juego");
    formulario.reset();

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d'); 

    cuatroEnLinea = new Game(gameType, player1name, player2name, player1Profile, player2Profile, player1Img, player2Img, ctx);
}

function cerrarModalGame(){
    document.querySelector('.ModalContainerConfigGame').classList.remove('mostar');
    document.querySelector('.ModalContainerConfigGame').classList.add('ocultar');
}