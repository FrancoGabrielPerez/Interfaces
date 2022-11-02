"use strict"

class Board{
	#matrix;
	#nCols;
	#nRows;
	#nConnect;
	#winner;
	#ctx;
	#tileSize;

	constructor(ncols, nRows, nConnect, c, chipSize){
		this.#ctx = c;
		this.#tileSize = chipSize+10;
		this.#winner = false;
		this.#nConnect = nConnect;
		this.#nCols = ncols;
		this.#nRows = nRows;
		this.#matrix = new Array(this.#nCols);
		for (let i = 0; i < this.#nCols; i++){
			this.#matrix[i] = new Array(this.#nRows);
		}
	}

	addChip(chip, x){
		let added = false;
		if (x < this.#matrix.length){
			for (let j = this.#matrix[x].length-1; j>=0 && !added; j--) {
				if (this.#matrix[x][j] == undefined ) {
					this.#matrix[x][j] = chip;
					chip.move(this.getcOrigin().x + this.#tileSize*x + this.#tileSize/2, this.getcOrigin().y + this.#tileSize*j + this.#tileSize/2);
					added = true;
					if (this.checkWinner(chip.getPlayer(), x, j)) {
						this.#winner = chip.getPlayer();
					}
					this.draw();
				}
			}
		}
		return added;
	}

	checkWinner(player, x,y){
		return (this.#checkColumn(player, x, y) || this.#checkRow(player, x, y) || this.#checkDiagonal1(player, x, y) || this.#checkDiagonal2(player, x, y));
	}

	#checkColumn(player, x, y){
		let sum = 1;
		for (let j=y-1, halt=false; j>=0 && j>(y-this.#nConnect) && !halt; j--){
			if ((this.#matrix[x][j]!=undefined) && (this.#matrix[x][j].getPlayer() == player)) {
				sum++;
			}
			else {
				halt=true;
			}
		}
		for (let j=y+1, halt=false; j<this.#matrix[x].length && j<(y+this.#nConnect) && !halt; j++){
			if ((this.#matrix[x][j]!=undefined) && (this.#matrix[x][j].getPlayer() == player)){
				sum++;
			}
			else{
				halt=true;
			}
		}
		return (sum >= this.#nConnect);
	}

	#checkRow(player, x, y){
		let sum = 1;
		for (let i=x-1, halt=false; i>=0 && i>(x-this.#nConnect) && !halt; i--){
			if ((this.#matrix[i][y]!=undefined) && (this.#matrix[i][y].getPlayer() == player)){
				sum++;
			}
			else{
				halt=true;
			}
		}
		for (let i=x+1, halt=false; i<this.#matrix.length && i<(x+this.#nConnect) && !halt; i++){
			if ((this.#matrix[i][y]!=undefined) && (this.#matrix[i][y].getPlayer() == player)){
				sum++;
			}
			else{
				halt=true;
			}
		}
		return (sum >= this.#nConnect);
	}

	#checkDiagonal1(player, x, y){
		let sum = 1;
		for (let i=x-1, j=y-1, halt=false; i>=0 && i>(x-this.#nConnect) && j>=0 && j>(y-this.#nConnect) && !halt; i--, j--){
			if ((this.#matrix[i][j]!=undefined) && (this.#matrix[i][j].getPlayer() == player)){
				sum++;
			}
			else{
				halt=true;
			}
		}
		for (let i=x+1, j=y+1, halt=false; i<this.#matrix.length && i<(x+this.#nConnect) && j<this.#matrix[i].length && j<(y+this.#nConnect) && !halt; i++, j++){
			if ((this.#matrix[i][j]!=undefined) && (this.#matrix[i][j].getPlayer() == player)){
				sum++;
			}
			else{
				halt=true;
			}
		}
		return (sum >= this.#nConnect);
	}

	#checkDiagonal2(player, x, y){
		let sum = 1;
		for (let i=x+1, j=y-1, halt=false; i<this.#matrix.length && i<(x+this.#nConnect) && j>=0 && j>(y-this.#nConnect) && !halt; i++, j--){
			if ((this.#matrix[i][j]!=undefined) && (this.#matrix[i][j].getPlayer() == player)){
				sum++;
			}
			else{
				halt=true;
			}
		}
		for (let i=x-1, j=y+1, halt=false; i>=0 && i>(x-this.#nConnect) && j<this.#matrix[i].length && j<(y+this.#nConnect) && !halt; i--, j++){
			if ((this.#matrix[i][j]!=undefined) && (this.#matrix[i][j].getPlayer() == player)){
				sum++;
			}
			else{
				halt=true;
			}
		}
		return (sum >= this.#nConnect);
	}

	//for testing
	printConsole(){
		let first = "   ";
		for (let i=0; i<this.#nCols; i++)
			first += " " + (i) + " ";
		console.log(first);
		for (let j=0, row=""; j<this.#nRows; j++, row=""){
			row = j + "| "
			for (let i=0; i<this.#nCols; i++){
				if (this.#matrix[i][j] == undefined)
					row += "00 ";
				else
					row += this.#matrix[i][j].getPlayer() + " ";
			}
			console.log(row);
		}
	}

	getAmountTiles(){
		return this.#nCols*this.#nRows;
	}

	getSize(){
		return {x:this.#tileSize*this.#nCols, y:this.#tileSize*this.#nRows};
	}

	getWinner(){
		return this.#winner;
	}

	draw(){
		this.#ctx.clearRect(this.getcOrigin().x, this.getcOrigin().y, (this.#tileSize*this.#nCols), (this.#tileSize*this.#nRows));
		for (let i = 0; i < this.#matrix.length; i++) {
			for (let j = 0; j < this.#matrix[i].length; j++) {
				this.#ctx.beginPath();
				this.#ctx.strokeStyle = "white";
				this.#ctx.strokeRect(this.getcOrigin().x+this.#tileSize*i, this.getcOrigin().y+this.#tileSize*j, this.#tileSize, this.#tileSize);
				const chip = this.#matrix[i][j];
				if (chip != undefined)
					chip.draw();
			}
		}
	}
	
	getcOrigin(){
		return {
			x:((this.#ctx.canvas.clientWidth/2)-(this.#tileSize*this.#nCols/2)),
			y:((this.#ctx.canvas.clientHeight/2)-(this.#tileSize*this.#nRows/2)),
		};
	}

}