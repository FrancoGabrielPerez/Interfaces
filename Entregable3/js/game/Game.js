"use strict"
/** @type {CanvasRenderingContext2D} */

class Game{
	static #defaultLine = 4;
	static #defaultColumns = 7;
	static #defaultRows = 6;
	#defaultCoinSize = 40;
	#player1;
	#player2;
	#playerTurn;
	#board;
	#context;

	constructor(tam, player1Name, player2Name, player1Profile, player2Profile, player1Img, player2Img, context){
		this.#context = context;
		this.#board = new Tablero(Game.#defaultColumns+tam, Game.#defaultRows+tam, Game.#defaultLine+tam, this.#context, this.#defaultCoinSize);
		this.#player1 = new Jugador(player1Name, player1Profile, player1Img, this.#defaultCoinSize, this.#board.getSize()/2, this.#context, {x:0,y:0});
		this.#player2 = new Jugador(player2Name, player2Profile, player2Img, this.#defaultCoinSize, this.#board.getSize()/2, this.#context, {x:,y:0});
		this.#playerTurn = this.#player1;
	}
}

let canvas = document.querySelector("#canvas");
let context = canvas.getContext('2d');

let tablero = new Tablero(7, 6, 4, context, 50);
let ficha1 = new Ficha("J1",0,0,context);
let ficha2 = new Ficha("J1",0,0,context);
let ficha3 = new Ficha("J1",0,0,context);
let ficha4 = new Ficha("J1",0,0,context);
let ficha5 = new Ficha("J1",0,0,context);
let ficha6 = new Ficha("J1",0,0,context);
let ficha7 = new Ficha("J1",0,0,context);
let ficha8 = new Ficha("J1",0,0,context);
let ficha9 = new Ficha("J1",0,0,context);
let ficha10 = new Ficha("J1",0,0,context);
let ficha11 = new Ficha("J2",0,0,context);
let ficha12 = new Ficha("J2",0,0,context);
let ficha13 = new Ficha("J2",0,0,context);
let ficha14 = new Ficha("J2",0,0,context);
let ficha15 = new Ficha("J2",0,0,context);
let ficha16 = new Ficha("J2",0,0,context);
let ficha17 = new Ficha("J2",0,0,context);
let ficha18 = new Ficha("J2",0,0,context);
let ficha19 = new Ficha("J2",0,0,context);
let ficha20 = new Ficha("J2",0,0,context);

tablero.printConsole();
tablero.draw();

tablero.agregarFicha(ficha1, 0);
tablero.agregarFicha(ficha11, 3);
tablero.agregarFicha(ficha2, 0);
tablero.agregarFicha(ficha12, 0);
tablero.agregarFicha(ficha3, 1);
tablero.agregarFicha(ficha13, 0);
tablero.agregarFicha(ficha4, 1);
tablero.agregarFicha(ficha14, 1);
tablero.agregarFicha(ficha5, 3);
tablero.agregarFicha(ficha15, 2);
tablero.agregarFicha(ficha6, 4);
tablero.agregarFicha(ficha16, 2);

function mostrarGanador(){
	console.log("---------------------------");
	console.log("Ganador");
	console.log("jugador: " + tablero.getGanador());
	tablero.printConsole();
}

function drawPoint(x, y,){
	context.beginPath();
	context.arc(x, y, 10, 0, 2 * Math.PI, false);
	context.fillStyle = "green";
	context.fill();
}