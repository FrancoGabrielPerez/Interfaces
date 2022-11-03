"use strict"
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
		this.#ctx = context;
		this.#board = new Board(Game.#defaultColumns+tam, Game.#defaultRows+tam, Game.#defaultLine+tam, this.#ctx, this.#defaultCoinSize);
		let playerDrawingSize = {x:(((this.#ctx.canvas.clientWidth-this.#board.getSize().x)/2)-this.#padding), y:this.#ctx.canvas.clientHeight};
		this.#player1 = new Player("Juancito", "../img/img-games/img-imperio/Resistencia.png", player1Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:0,y:0}, playerDrawingSize);
		this.#player2 = new Player("Pedrito", "../img/img-games/img-imperio/StormTrooper.png", player2Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:(this.#ctx.canvas.clientWidth-playerDrawingSize.x),y:0}, playerDrawingSize);
		this.#playerTurn = this.#player1;
		this.#chipSelected = null;
		this.defineValidAreas(Game.#defaultColumns+tam);
		this.draw();
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
		this.#playerTurn = null;
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

function init(){
	currentGame = new Game(3, "J1", "J2", null, null, "../img/img-games/img-imperio/FichaResistencia-1.png", "../img/img-games/img-imperio/FichaImperio-1.png", ctx);
	initEvents();
	setTimeout(() => currentGame.draw(),500);
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
	if (currentGame.getChipSelected() != null){
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
	
/* function clearCanvas(){
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
} */

document.onload = init();