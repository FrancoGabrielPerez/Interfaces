"use strict"

class Tablero{
	#Matrix;
	#NCols;
	#NRows;
	#NConnect;
	#Ganador;
	#ctx;
	#CellSize;

	constructor(Ncols, NRows, NConnect, context, coinSize){
		this.#ctx = context;
		this.#CellSize = coinSize+10;
		this.#Ganador = false;
		this.#NConnect = NConnect;
		this.#NCols = Ncols;
		this.#NRows = NRows;
		this.#Matrix = new Array(this.#NCols);
		for (let i = 0; i < this.#NCols; i++){
			this.#Matrix[i] = new Array(this.#NRows);
		}
	}

	agregarFicha(ficha, X){
		let agregada = false;
		if (X < this.#Matrix.length)
			for (let j = this.#Matrix[X].length-1; j>=0 && !agregada; j--) {
				if (this.#Matrix[X][j] == undefined ) {
					this.#Matrix[X][j] = ficha;
					ficha.move(this.getContextOrigin().x + this.#CellSize*X + this.#CellSize/2, this.getContextOrigin().y + this.#CellSize*j + this.#CellSize/2);
					agregada = true;
					if (this.checkGanador(ficha.getJugador(), X, j))
						this.#Ganador = ficha.getJugador();
					this.draw();
				}
			}
		return agregada;
	}

	checkGanador(jugador, X,Y){
		return (this.#checkColumn(jugador, X, Y) || this.#checkRow(jugador, X, Y) || this.#checkDiagonal1(jugador, X, Y) || this.#checkDiagonal2(jugador, X, Y));
	}

	#checkColumn(jugador, X, Y){
		let cant = 1;
		for (let j=Y-1, corte=false; j>=0 && j>(Y-this.#NConnect) && !corte; j--){
			if ((this.#Matrix[X][j]!=undefined) && (this.#Matrix[X][j].getJugador() == jugador))
				cant++;
			else
			corte=true;
		}
		for (let j=Y+1, corte=false; j<this.#Matrix[X].length && j<(Y+this.#NConnect) && !corte; j++){
			if ((this.#Matrix[X][j]!=undefined) && (this.#Matrix[X][j].getJugador() == jugador))
				cant++;
			else
				corte=true;
		}
		return (cant >= this.#NConnect);
	}

	#checkRow(jugador, X, Y){
		let cant = 1;
		for (let i=X-1, corte=false; i>=0 && i>(X-this.#NConnect) && !corte; i--){
			if ((this.#Matrix[i][Y]!=undefined) && (this.#Matrix[i][Y].getJugador() == jugador))
				cant++;
			else
			corte=true;
		}
		for (let i=X+1, corte=false; i<this.#Matrix.length && i<(X+this.#NConnect) && !corte; i++){
			if ((this.#Matrix[i][Y]!=undefined) && (this.#Matrix[i][Y].getJugador() == jugador))
				cant++;
			else
				corte=true;
		}
		return (cant >= this.#NConnect);
	}

	#checkDiagonal1(jugador, X, Y){
		let cant = 1;
		for (let i=X-1, j=Y-1, corte=false; i>=0 && i>(X-this.#NConnect) && j>=0 && j>(Y-this.#NConnect) && !corte; i--, j--){
			if ((this.#Matrix[i][j]!=undefined) && (this.#Matrix[i][j].getJugador() == jugador))
				cant++;
			else
			corte=true;
		}
		for (let i=X+1, j=Y+1, corte=false; i<this.#Matrix.length && i<(X+this.#NConnect) && j<this.#Matrix[i].length && j<(Y+this.#NConnect) && !corte; i++, j++){
			if ((this.#Matrix[i][j]!=undefined) && (this.#Matrix[i][j].getJugador() == jugador))
				cant++;
			else
				corte=true;
		}
		return (cant >= this.#NConnect);
	}

	#checkDiagonal2(jugador, X, Y){
		let cant = 1;
		for (let i=X+1, j=Y-1, corte=false; i<this.#Matrix.length && i<(X+this.#NConnect) && j>=0 && j>(Y-this.#NConnect) && !corte; i++, j--){
			if ((this.#Matrix[i][j]!=undefined) && (this.#Matrix[i][j].getJugador() == jugador))
				cant++;
			else
			corte=true;
		}
		for (let i=X-1, j=Y+1, corte=false; i>=0 && i>(X-this.#NConnect) && j<this.#Matrix[i].length && j<(Y+this.#NConnect) && !corte; i--, j++){
			if ((this.#Matrix[i][j]!=undefined) && (this.#Matrix[i][j].getJugador() == jugador))
				cant++;
			else
				corte=true;
		}
		return (cant >= this.#NConnect);
	}

	//for testing
	printConsole(){
		let first = "   ";
		for (let i=0; i<this.#NCols; i++)
			first += " " + (i) + " ";
		console.log(first);
		for (let j=0, row=""; j<this.#NRows; j++, row=""){
			row = j + "| "
			for (let i=0; i<this.#NCols; i++){
				if (this.#Matrix[i][j] == undefined)
					row += "00 ";
				else
					row += this.#Matrix[i][j].getJugador() + " ";
			}
			console.log(row);
		}
	}

	getAmount(){
		return this.#NCols*this.#NRows;
	}

	getWinner(){
		return this.#Ganador;
	}

	draw(){
		this.#ctx.clearRect(this.getContextOrigin().x, this.getContextOrigin().y, (this.#CellSize*this.#NCols), (this.#CellSize*this.#NRows));
		// this.#ctx.beginPath();
		// this.#ctx.fillStyle = "white";
		// this.#ctx.fillRect(this.getContextOrigin().x, this.getContextOrigin().y, (this.#CellSize*this.#NCols), (this.#CellSize*this.#NRows));
		for (let i = 0; i < this.#Matrix.length; i++) {
			for (let j = 0; j < this.#Matrix[i].length; j++) {
				this.#ctx.beginPath();
				this.#ctx.strokeStyle = "white";
				this.#ctx.strokeRect(this.getContextOrigin().x+this.#CellSize*i, this.getContextOrigin().y+this.#CellSize*j, this.#CellSize, this.#CellSize);
				const celda = this.#Matrix[i][j];
				if (celda != undefined)
					celda.drawDefault();
			}
		}
	}
	
	getContextOrigin(){
		return {
			x:((this.#ctx.canvas.clientWidth/2)-(this.#CellSize*this.#NCols/2)),
			y:((this.#ctx.canvas.clientHeight/2)-(this.#CellSize*this.#NRows/2)),
		};
	}

}