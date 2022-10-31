"use strict"
///** @type {CanvasRenderingContext2D} */

class Tablero{
	#Matriz;
	#Ancho;
	#Alto;
	#EnLinea;
	#Ganador;

	constructor(ancho, alto){
		this.#EnLinea = 4;
		this.#Ganador = false;
		this.#Ancho = ancho;
		this.#Alto = alto;
		this.#Matriz = new Array(this.#Ancho);
		for (let i = 0; i < this.#Ancho; i++){
			this.#Matriz[i] = new Array(this.#Alto);
		}
	}

	agregarFicha(ficha, X){
		let agregada = false;
		if (X < this.#Matriz.length)
			for (let i = this.#Matriz[X].length-1; i>=0 && !agregada; i--) {
				if (this.#Matriz[X][i] == undefined ) {
					this.#Matriz[X][i] = ficha;
					agregada = true;
					if (this.checkGanador(ficha.getJugador(), X, i))
						this.#Ganador = ficha.getJugador();
				}
			}
		return agregada;
	}

	getAt(X,Y){
		return this.#Matriz[X][Y];
	}

	checkGanador(jugador, X,Y){
		let cant = 1;
		for (let j=Y-1, corte=false; j>=0 && j>(Y-this.#EnLinea) && !corte; j--){
			if ((this.#Matriz[X][j]!=undefined) && (this.#Matriz[X][j].getJugador() == jugador))
				cant++;
			else
			corte=true;
		}
		for (let j=Y+1, corte=false; j<this.#Matriz[X].length && j<(Y+this.#EnLinea) && !corte; j++){
			if ((this.#Matriz[X][j]!=undefined) && (this.#Matriz[X][j].getJugador() == jugador))
				cant++;
			else
				corte=true;
		}
		return (cant >= 4);
	}

	printConsole(){
		let first = "   ";
		for (let i=0; i<this.#Matriz.length; i++)
			first += " " + (i+1) + " ";
		console.log(first);
		for (let j=0, row=""; j<this.#Matriz[0].length; j++, row=""){
			row = j+1 + "| "
			for (let i=0; i<this.#Matriz.length; i++){
				if (this.#Matriz[i][j] == undefined)
					row += "00 ";
				else
					row += this.#Matriz[i][j].getJugador() + " ";
			}
			console.log(row);
		}
	}

	getMatriz(){
		return this.#Matriz;
	}

	getGanador(){
		return this.#Ganador;
	}
}

let tablero = new Tablero(7, 6);
let ficha1 = new Ficha("J1",0,0,null);
let ficha2 = new Ficha("J1",0,0,null);
let ficha3 = new Ficha("J1",0,0,null);
let ficha4 = new Ficha("J1",0,0,null);
let ficha5 = new Ficha("J1",0,0,null);
let ficha6 = new Ficha("J2",0,0,null);
let ficha7 = new Ficha("J2",0,0,null);
let ficha8 = new Ficha("J2",0,0,null);
let ficha9 = new Ficha("J2",0,0,null);
let ficha10 = new Ficha("J2",0,0,null);
let ficha11 = new Ficha("J2",0,0,null);

tablero.agregarFicha(ficha8, 0);
tablero.printConsole();
tablero.agregarFicha(ficha9, 0);
tablero.printConsole();
tablero.agregarFicha(ficha10, 0);
tablero.printConsole();
tablero.agregarFicha(ficha11, 0);
tablero.printConsole();
tablero.agregarFicha(ficha1, 0);
tablero.printConsole();
tablero.agregarFicha(ficha2, 1);
tablero.printConsole();
tablero.agregarFicha(ficha3, 2);
tablero.printConsole();
tablero.agregarFicha(ficha4, 3);
tablero.printConsole();
tablero.agregarFicha(ficha5, 4);
tablero.printConsole();
tablero.agregarFicha(ficha6, 5);
tablero.printConsole();
tablero.agregarFicha(ficha7, 6);
tablero.printConsole();

//console.log(tablero.getMatriz());

tablero.printConsole();
console.log(tablero.getGanador());