"use strict";
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-nuevo-juego").addEventListener('submit', modalGame); 
  });
 
/** @type {CanvasRenderingContext2D} */

class Game{
	static #defaultLine = 4;
	static #defaultColumns = 7;
	static #defaultRows = 6;
	#defaultCoinSize = 40;
	#validAreas;
	#padding = 20;
	#player1;
	#player2;
	#playerTurn;
	#board;
	#chipSelected;
	#ctx;

	constructor(tam, player1Name, player2Name, player1Profile, player2Profile, player1Img, player2Img, context){
		console.log(tam);
		console.log(player1Name);
		console.log(player2Name);
		console.log(player1Profile);
		console.log(player2Profile); 
		console.log(player1Img); 
		console.log(player2Img);

		this.#ctx = context;
		this.#board = new Board(Game.#defaultColumns+tam, Game.#defaultRows+tam, Game.#defaultLine+tam, this.#ctx, this.#defaultCoinSize);
		let playerDrawingSize = {x:(((this.#ctx.canvas.clientWidth-this.#board.getSize().x)/2)-this.#padding), y:this.#ctx.canvas.clientHeight};
		//this.#player1 = new Player("Juancito", "../img/img-games/img-imperio/Resistencia.png", player1Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:0,y:0}, playerDrawingSize);
		//this.#player2 = new Player("Pedrito", "../img/img-games/img-imperio/StormTrooper.png", player2Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:(this.#ctx.canvas.clientWidth-playerDrawingSize.x),y:0}, playerDrawingSize);
		this.#player1 = new Player(player1Name, player1Profile, player1Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:0,y:0}, playerDrawingSize);
		this.#player2 = new Player(player2Name, player2Profile, player2Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:(this.#ctx.canvas.clientWidth-playerDrawingSize.x),y:0}, playerDrawingSize);
		this.#playerTurn = this.#player1;
		this.#chipSelected = null;
		this.defineValidAreas(Game.#defaultColumns+tam);
		//this.draw();

		initEvents();
		setTimeout(() => this.draw(),500);
		timer();
	}

	defineValidAreas(nCols){
		let origin = {
			x: this.#board.getcOrigin().x + (this.#board.getSize().tileSize-this.#defaultCoinSize)/2,
			y:this.#board.getcOrigin().y - this.#board.getSize().tileSize,
		};
		this.#validAreas = {origin: origin, nCols: nCols};
	}

	drawValidAreas(){
		for (let i = 0; i < this.#validAreas.nCols; i++){
			this.#ctx.beginPath();
			this.#ctx.strokeStyle = "white";
			this.#ctx.fillStyle = "rgba(158, 158, 158, 0.4)";
			let tileSize = this.#board.getSize().tileSize;
			this.#ctx.strokeRect(this.#validAreas.origin.x + tileSize*i, this.#validAreas.origin.y, this.#defaultCoinSize, this.#defaultCoinSize);
			this.#ctx.fillRect(this.#validAreas.origin.x + tileSize*i, this.#validAreas.origin.y, this.#defaultCoinSize, this.#defaultCoinSize);
		}
	}

	addChip(chip){
		let success = false;
		let pos = chip.getPosition();
		let tileSize = this.#board.getSize().tileSize;
		let startY = this.#validAreas.origin.y;
		let endY = startY + this.#defaultCoinSize;
		for (let i = 0, startX, endX; i < this.#validAreas.nCols && !success; i++){
			startX = this.#validAreas.origin.x + tileSize*i;
			endX = startX + this.#defaultCoinSize;
			if ((pos.x > startX) && (pos.x < endX) && (pos.y > startY) && (pos.y < endY)){
				success = this.#board.addChip(chip, i);
			}
		}
		if (success){
			chip.getPlayer().removeChip(chip);
			this.changeTurn();
		}
		if (success && this.#board.getWinner()){
			this.showWinner(this.#board.getWinner());
		}
		return success;
	}

	changeTurn(){
		switch (this.#playerTurn) {
			case this.#player1:
				this.#playerTurn = this.#player2;
				break;
			case this.#player2:
				this.#playerTurn = this.#player1;
				break;
		}
	}

	showWinner(winner){
		console.log("jugador: " + winner.getName());
		let winnerChart = new PlayButton(this.#ctx);
		//clearCanvas();
		winnerChart.roundedRect(0, 0, 200,200,20,"#7B5BCD");
		this.#playerTurn = null;	
		//document.querySelector('.modalContainerMensaje').classList.remove('ocultar');
		//document.querySelector('.modalContainerMensaje').classList.add('mostrar');
		//setTimeout(() => {document.querySelector('.modalContainerMensaje').classList.remove('mostrar');
		//document.querySelector('.modalContainerMensaje').classList.add('ocultar');
		//drawPlayButton();}, 1000);
		
	}
	
	getChipSelected(){
		return this.#chipSelected;
	}

	selectChip(x, y){
		if (this.#playerTurn != null){
			this.#chipSelected = this.#playerTurn.getSelected(x, y);
		}
	}

	deselectChip(){
		this.#chipSelected.setSelected(false);
		this.#chipSelected = null;
	}

	draw(){
		this.clearCanvas();
		this.#board.draw();
		this.#player1.draw();
		this.#player2.draw();
		this.drawValidAreas();
	}

	clearCanvas(){
		ctx.clearRect(0, 0, this.#ctx.canvas.clientWidth, this.#ctx.canvas.clientHeight);
	}
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let currentGame;

function init(gameType, player1name, player2name, player1Profile, player2Profile, player1Img, player2Img, ctx){
	currentGame = new Game(gameType, player1name, player2name, player1Profile, player2Profile, player1Img, player2Img, ctx);
	//currentGame = new Game (0, "juan", "pedro", null, null, "../img/img-games/img-imperio/FichaResistencia-1.png","../img/img-games/img-imperio/FichaImperio-1.png",ctx);
	initEvents();
	setTimeout(() => currentGame.draw(),500);
	timer();
}


function initEvents(){
	ctx.canvas.onmousedown = mouseDown;
	ctx.canvas.onmousemove = mouseMove;
	document.onmouseup = mouseUp;
}
	
function mouseDown(event){
	event.preventDefault();
	let x = event.pageX - event.currentTarget.offsetLeft;
	let y = event.pageY - event.currentTarget.offsetTop;
	currentGame.selectChip(x, y);
	currentGame.draw();
}

function mouseMove(event){
	if ((currentGame.getChipSelected() != null)){
		event.preventDefault();
		let x = event.pageX - event.currentTarget.offsetLeft;
		let y = event.pageY - event.currentTarget.offsetTop;
		currentGame.getChipSelected().move(x, y);
		currentGame.draw();
	}
}

function mouseUp(event){
	if (currentGame.getChipSelected() != null){
		event.preventDefault();
		if (!currentGame.addChip(currentGame.getChipSelected())){
			currentGame.getChipSelected().resetPos();
		}
		currentGame.deselectChip();
		currentGame.draw();
	}
}
	
function timer(){
	var date = new Date('2022-01-01 00:05');
    var canvas = document.getElementById('timerCanvas');
    var ctx = canvas.getContext('2d'); 
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	
    // Función para rellenar con ceros

    var padLeft = n => "00".substring(0, "00".length - n.length) + n;
	
	// Asignar el intervalo a una variable para poder eliminar el intervale cuando llegue al limite
	var interval = setInterval(() => {
        // Asignar el valor de minutos
        var minutes = padLeft(date.getMinutes() + "");
        // Asignar el valor de segundos
        var seconds = padLeft(date.getSeconds() + "");  
		// Variable para imprimir por pantalla      
        var timer = `${minutes} : ${seconds}`;
		ctx.font = "30px Star Jedi Rounded";
    	ctx.fillStyle = "#F1F1F1";
		ctx.textAlign = 'center';
    	ctx.textBaseline = 'middle';
		// Se resetea el canvas para que se haga el efecto de cambio en los contadores
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        ctx.fillText(timer, ctx.canvas.clientWidth / 2,ctx.canvas.clientHeight / 2);
        
        // Restarle a la fecha actual 1000 milisegundos
        date = new Date(date.getTime() - 1000);
            
        // Si llega a 0:00, eliminar el intervalo		
        if(minutes == '00' && seconds == '00' ){
            clearInterval(interval); 
        }    
    }, 1000);
	
}

function clearCanvas(){
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
} 


 
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

    /*player1Img = `"${player1Img}"`;
    player2Img = `"${player2Img}"`;
    player1Profile = `"${player1Profile}"`;
    player2Profile = `"${player2Profile}"`;*/


   //init(gameType, player1name, player2name, player1Profile, player2Profile, player1Img, player2Img, ctx);
}

function cerrarModalGame(){
    document.querySelector('.ModalContainerConfigGame').classList.remove('mostar');
    document.querySelector('.ModalContainerConfigGame').classList.add('ocultar');
}


