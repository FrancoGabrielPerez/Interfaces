"use strict"
/** @type {CanvasRenderingContext2D} */

class Tablero{
	#Matrix;
	#NCols;
	#NRows;
	#EnLinea;
	#Ganador;

	constructor(ancho, alto){
		this.#EnLinea = 4;
		this.#Ganador = false;
		this.#NCols = ancho;
		this.#NRows = alto;
		this.#Matrix = new Array(this.#NCols);
		for (let i = 0; i < this.#NCols; i++){
			this.#Matrix[i] = new Array(this.#NRows);
		}
	}

	agregarFicha(ficha, X){
		let agregada = false;
		if (X < this.#Matrix.length)
			for (let i = this.#Matrix[X].length-1; i>=0 && !agregada; i--) {
				if (this.#Matrix[X][i] == undefined ) {
					this.#Matrix[X][i] = ficha;
					agregada = true;
					if (this.checkGanador(ficha.getJugador(), X, i))
						this.#Ganador = ficha.getJugador();
				}
			}
		return agregada;
	}

	getAt(X,Y){
		return this.#Matrix[X][Y];
	}

	checkGanador(jugador, X,Y){
		return (this.#checkColumn(jugador, X, Y) || this.#checkRow(jugador, X, Y) || this.#checkDiagonal1(jugador, X, Y) || this.#checkDiagonal2(jugador, X, Y));
	}

	#checkColumn(jugador, X, Y){
		let cant = 1;
		for (let j=Y-1, corte=false; j>=0 && j>(Y-this.#EnLinea) && !corte; j--){
			if ((this.#Matrix[X][j]!=undefined) && (this.#Matrix[X][j].getJugador() == jugador))
				cant++;
			else
			corte=true;
		}
		for (let j=Y+1, corte=false; j<this.#Matrix[X].length && j<(Y+this.#EnLinea) && !corte; j++){
			if ((this.#Matrix[X][j]!=undefined) && (this.#Matrix[X][j].getJugador() == jugador))
				cant++;
			else
				corte=true;
		}
		return (cant >= 4);
	}

	#checkRow(jugador, X, Y){
		let cant = 1;
		for (let i=X-1, corte=false; i>=0 && i>(X-this.#EnLinea) && !corte; i--){
			if ((this.#Matrix[i][Y]!=undefined) && (this.#Matrix[i][Y].getJugador() == jugador))
				cant++;
			else
			corte=true;
		}
		for (let i=X+1, corte=false; i<this.#Matrix.length && i<(X+this.#EnLinea) && !corte; i++){
			if ((this.#Matrix[i][Y]!=undefined) && (this.#Matrix[i][Y].getJugador() == jugador))
				cant++;
			else
				corte=true;
		}
		return (cant >= 4);
	}

	#checkDiagonal1(jugador, X, Y){
		let cant = 1;
		for (let i=X-1, j=Y-1, corte=false; i>=0 && i>(X-this.#EnLinea) && j>=0 && j>(Y-this.#EnLinea) && !corte; i--, j--){
			if ((this.#Matrix[i][j]!=undefined) && (this.#Matrix[i][j].getJugador() == jugador))
				cant++;
			else
			corte=true;
		}
		for (let i=X+1, j=Y+1, corte=false; i<this.#Matrix.length && i<(X+this.#EnLinea) && j<this.#Matrix[i].length && j<(Y+this.#EnLinea) && !corte; i++, j++){
			if ((this.#Matrix[i][j]!=undefined) && (this.#Matrix[i][j].getJugador() == jugador))
				cant++;
			else
				corte=true;
		}
		return (cant >= 4);
	}

	#checkDiagonal2(jugador, X, Y){
		let cant = 1;
		for (let i=X+1, j=Y-1, corte=false; i<this.#Matrix.length && i<(X+this.#EnLinea) && j>=0 && j>(Y-this.#EnLinea) && !corte; i++, j--){
			if ((this.#Matrix[i][j]!=undefined) && (this.#Matrix[i][j].getJugador() == jugador))
				cant++;
			else
			corte=true;
		}
		for (let i=X-1, j=Y+1, corte=false; i>=0 && i>(X-this.#EnLinea) && j<this.#Matrix[i].length && j<(Y+this.#EnLinea) && !corte; i--, j++){
			if ((this.#Matrix[i][j]!=undefined) && (this.#Matrix[i][j].getJugador() == jugador))
				cant++;
			else
				corte=true;
		}
		return (cant >= 4);
	}

	//for testing
	printConsole(){
		let first = "   ";
		for (let i=0; i<this.#NCols; i++)
			first += " " + (i+1) + " ";
		console.log(first);
		for (let j=0, row=""; j<this.#NRows; j++, row=""){
			row = j+1 + "| "
			for (let i=0; i<this.#NCols; i++){
				if (this.#Matrix[i][j] == undefined)
					row += "00 ";
				else
					row += this.#Matrix[i][j].getJugador() + " ";
			}
			console.log(row);
		}
	}

	//for testing
	getMatriz(){
		return this.#Matrix;
	}

	getGanador(){
		return this.#Ganador;
	}
}