"use strict"
/** @type {CanvasRenderingContext2D} */

class Game{
	static #defaultLine = 4;
	static #defaultColumns = 7;
	static #defaultRows = 6;
	#defaultCoinSize = 40;
	#padding = 20;
	#player1;
	#player2;
	#playerTurn;
	#board;
	#ctx;

	constructor(tam, player1Name, player2Name, player1Profile, player2Profile, player1Img, player2Img, context){
		this.#ctx = context;
		this.#board = new Board(Game.#defaultColumns+tam, Game.#defaultRows+tam, Game.#defaultLine+tam, this.#ctx, this.#defaultCoinSize);
		let playerDrawingSize = {x:(((this.#ctx.canvas.clientWidth-this.#board.getSize().x)/2)-this.#padding), y:this.#ctx.canvas.clientHeight};
		this.#player1 = new Player(player1Name, player1Profile, player1Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:0,y:0}, playerDrawingSize);
		this.#player2 = new Player(player2Name, player2Profile, player2Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:(this.#ctx.canvas.clientWidth-playerDrawingSize.x),y:0}, playerDrawingSize);
		this.#player1.draw();
		this.#player2.draw();
		this.#playerTurn = this.#player1;
	}

	test(){
		this.#board.printConsole();
		let imgSrc1 = "../img/img-games/img-imperio/FichaResistencia-1.png";
		let imgSrc2 = "../img/img-games/img-imperio/FichaImperio-1.png";
		let ficha1 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha2 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha3 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha4 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha5 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha6 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha7 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha8 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha9 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha10 = new Chip("J1", 0, 0, this.#ctx, imgSrc1, 40);
		let ficha11 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);
		let ficha12 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);
		let ficha13 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);
		let ficha14 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);
		let ficha15 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);
		let ficha16 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);
		let ficha17 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);
		let ficha18 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);
		let ficha19 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);
		let ficha20 = new Chip("J2", 0, 0, this.#ctx, imgSrc2, 40);

		this.#board.addChip(ficha1, 0);
		this.#board.addChip(ficha11, 3);
		this.#board.addChip(ficha2, 0);
		this.#board.addChip(ficha12, 0);
		this.#board.addChip(ficha3, 1);
		this.#board.addChip(ficha13, 0);
		this.#board.addChip(ficha4, 1);
		this.#board.addChip(ficha14, 1);
		this.#board.addChip(ficha5, 3);
		this.#board.addChip(ficha15, 2);
		this.#board.addChip(ficha6, 4);
		this.#board.addChip(ficha16, 2);

		mostrarGanador(this.#board);

		function mostrarGanador(tablero){
			console.log("---------------------------");
			console.log("Ganador");
			console.log("jugador: " + tablero.getWinner());
			tablero.printConsole();
		}
	}
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d'); 

let game = new Game(3, "J1", "J2", null, null, "../img/img-games/img-imperio/FichaResistencia-1.png", "../img/img-games/img-imperio/FichaImperio-1.png", ctx);
game.test();