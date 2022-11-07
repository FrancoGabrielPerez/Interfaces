"use strict";
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-nuevo-juego").addEventListener('submit', modalGame); 
  });
  


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let upperCanvas = document.getElementById('upperCanvas');
let upperCtx = upperCanvas.getContext('2d');
let currentGame;
let timerID;
let resetButton;
let exitButton;

// Funcion desde donde se cargan los datos de jugadores y juego para pasarlos como parametro al juego.
function modalGame(event){
    event.preventDefault();
    let gameType = document.querySelector('input[name="game-type"]:checked').value;
    let player1name = document.querySelector('input[name="name-jug-1"]').value;
    let player2name = document.querySelector('input[name="name-jug-2"]').value;
    let player1Img = document.querySelector('input[name="game-type-1"]:checked').value;
    let player2Img = document.querySelector('input[name="game-type-2"]:checked').value;
    let player1Profile = document.querySelector('.img-jugador-1 img').getAttribute("src");
    let player2Profile = document.querySelector('.img-jugador-2 img').getAttribute("src");
    button.disable();
    cerrarModalGame();
    let formulario = document.getElementById("form-nuevo-juego");
    formulario.reset();
    // Se inicia un nuevo juego con los datos cargados.
    init( new Game(gameType, player1name, player2name, player1Profile, player2Profile, player1Img, player2Img, ctx));

}

function init(game){
    currentGame = game;
    initEvents();
    setTimeout(() => currentGame.draw(),500);
    timer();
}

// Funcion encargada de iniciar los eventos.
function initEvents(){
    canvas.onmousedown = mouseDown;
    canvas.onmousemove = mouseMove;
    upperCanvas.onmousemove = changePointerButton;
    upperCanvas.onmousedown = resetOrExitMouseDown;
    document.onmouseup = mouseUp;
}

// Funcion que responde ante el evento onmousedown sobre el boton reset o exit.
function resetOrExitMouseDown(event){
    event.preventDefault();
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    if (resetButton.checkSelected(x,y)){
        currentGame.reset();
    }
    if (exitButton.checkSelected(x,y)){
        upperCtx.clearRect(0, 0, upperCanvas.clientWidth, upperCanvas.clientHeight);
        currentGame.reset();
        clearCanvas();
		clearInterval(timerID);
		initDrawButton();
    }
}

function mouseDown(event){
    event.preventDefault();
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    currentGame.selectChip(x, y);
    currentGame.draw();
}

function mouseMove(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    if ((currentGame.getChipSelected())){
        event.preventDefault();
        canvas.style.cursor = "grabbing";
        currentGame.getChipSelected().move(x, y);
        currentGame.draw();
        return;
    }
    if ((!currentGame.ended()) && (currentGame.isOverChip(x, y))){
        canvas.style.cursor = "grab";
        return;
    }
    canvas.style.cursor = "default";
}

function mouseUp(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    let chipSelected = currentGame.getChipSelected();
    if (currentGame.ended()){
        currentGame.toggleDrawWinner();
    }
    if (chipSelected){
        event.preventDefault();
        let result = currentGame.addChip(chipSelected);
        if (result == false){
            chipSelected.resetPos();
        }
        currentGame.deselectChip();
        currentGame.draw();
        canvas.style.cursor = "default";
    }
}


// Funcion que detecta el movimiento del mouse sobre alguno de los botones creados
// y cambia el puntero del mouse.
function changePointerButton(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    if (resetButton.checkSelected(x, y) || exitButton.checkSelected(x, y)){
        upperCanvas.style.cursor = "pointer";
        return;
    }
    upperCanvas.style.cursor = "default";
}

// Similar a la anterior, pero esta se activa cuando el mouse se encuentra sobre alguna ficha.
function changePointerChip(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    if (currentGame.getChipSelected()){
        return;
    }
    if (currentGame.isOverChip(x, y)){
        canvas.style.cursor = "grab";
        return;
    }
    canvas.style.cursor = "default";
}


// Funcion encargada de crear los botones de exit y reset.
function drawUpperButton(buttonPosX, buttonTextPosX, buttonText, buttonFillStyle){	
    var posX = buttonPosX;
    var posY = upperCtx.canvas.clientHeight / 2 - 25;
    var alto = 150;
    var ancho = 50;
    var textPosX = buttonTextPosX;
    var textPosY = upperCtx.canvas.clientHeight / 2;
    var buttonText = buttonText;
    if (buttonText == "Reset") {
        resetButton = new PlayButton(upperCtx, posX, posY, alto, ancho, textPosX, textPosY, buttonText);
        resetButton.drawNewButton(buttonFillStyle);
    } else {
        exitButton = new PlayButton(upperCtx, posX, posY, alto, ancho, textPosX, textPosY, buttonText);
        exitButton.drawNewButton(buttonFillStyle);
    }
}
    
//Funcion que crea un contador de tiempo
function timer(){
    // Se setea el tiempo inicial en 5 minutos
    var date = new Date('2022-01-01 00:05');   
    // Función para rellenar con ceros
    var padLeft = n => "00".substring(0, "00".length - n.length) + n;	
    // Asignar el intervalo a una variable para poder eliminar el intervale cuando llegue al limite
    timerID = setInterval(() => {        
        // Asignar el valor de minutos
        var minutes = padLeft(date.getMinutes() + "");
        // Asignar el valor de segundos
        var seconds = padLeft(date.getSeconds() + "");  
        // Variable para imprimir por pantalla      
        var timer = `${minutes} : ${seconds}`;
        upperCtx.font = "Normal 30px Distant Galaxy";
        upperCtx.fillStyle = "#F1F1F1";
        upperCtx.textAlign = 'center';
        upperCtx.textBaseline = 'middle';
        // Se resetea el canvas para que se haga el efecto de cambio en los contadores
        upperCtx.clearRect(0, 0, upperCtx.canvas.clientWidth, upperCtx.canvas.clientHeight);
        // Se dibujan los numeros del contador a medida que avanza el tiempo
        upperCtx.fillText(timer, upperCtx.canvas.clientWidth / 2, upperCtx.canvas.clientHeight / 2);
        //Se dibujan tambien los botones "exit" y "reset"
        var resetButtonPosX = upperCtx.canvas.clientWidth - 150;
        var resetButtonTextPosX = upperCtx.canvas.clientWidth - 75;
        var resetButtonText = "Reset";
        var resetButtonFillStyle = "#7CD600";
        drawUpperButton(resetButtonPosX, resetButtonTextPosX, resetButtonText, resetButtonFillStyle);        
        var exitButtonPosX = 0;
        var exitButtonTextPosX = 70;;
        var exitButtonText = "Exit";
        var exitButtonFillStyle = "#7B5BCD";
        drawUpperButton(exitButtonPosX, exitButtonTextPosX, exitButtonText, exitButtonFillStyle);
        // Restarle a la fecha actual 1000 milisegundos
        date = new Date(date.getTime() - 1000);         
        // Si llega a 0:00, se detiene el contador, y se envia el mensaje para que se muestre
        // un aviso de que el tiempo se acabo. Se termina el juego actual como haya quedado.		
        if(minutes == '00' && seconds == '00' ){
            clearInterval(timerID);
            currentGame.changeState("noTime");
            currentGame.draw();
        }    
    }, 1000);
}

// Funcion encargada de borrar el canvas.
function clearCanvas(){
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

function cerrarModalGame(){
    document.querySelector('.ModalContainerConfigGame').classList.remove('mostar');
    document.querySelector('.ModalContainerConfigGame').classList.add('ocultar');
}