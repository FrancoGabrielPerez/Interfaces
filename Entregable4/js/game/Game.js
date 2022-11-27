"use strict";
/** @type {CanvasRenderingContext2D} */

class Game{
	static #defaultLine = 4;
	static #defaultColumns = 7;
	static #defaultRows = 6;
	#defaultCoinSize = 40;
	#padding = 20;
	#validAreas;
	#board;
	#player1;
	#player2;
	#gameState;
	#drawWinner;
	#chipSelected;
	#ctx;
	#imgTie;

	constructor(tam, player1Name, player2Name, player1Profile, player2Profile, player1Img, player2Img, context){
		this.#imgTie = new Image();	
		this.#imgTie.src = '../img/img-games/img-imperio/DeathStar.png';
		this.#ctx = context;
		tam = parseInt(tam);
		this.#board = new Board(Game.#defaultColumns+tam, Game.#defaultRows+tam, Game.#defaultLine+tam, this.#ctx, this.#defaultCoinSize);
		let playerDrawingSize = {x:(((this.#ctx.canvas.clientWidth-this.#board.getSize().x)/2)-this.#padding), y:this.#ctx.canvas.clientHeight};
		this.#player1 = new Player(player1Name, player1Profile, player1Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:0,y:0}, playerDrawingSize);
		this.#player2 = new Player(player2Name, player2Profile, player2Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:(this.#ctx.canvas.clientWidth-playerDrawingSize.x),y:0}, playerDrawingSize);
		this.#gameState = this.#player1;
		this.#drawWinner = false;
		this.#chipSelected = null;	
		this.defineValidAreas(Game.#defaultColumns+tam);
		this.draw();
	}

	defineValidAreas(nCols){
		let origin = {
			x: this.#board.getcOrigin().x + (this.#board.getSize().tileSize-this.#defaultCoinSize)/2,
			y: this.#board.getcOrigin().y - this.#board.getSize().tileSize,
		};
		this.#validAreas = {origin: origin, nCols: nCols};
	}

	drawValidAreas(){
		for (let i = 0; i < this.#validAreas.nCols; i++){
			this.#ctx.beginPath();
			this.#ctx.strokeStyle = "white";
			this.#ctx.fillStyle = "rgba(158, 158, 158, 0.4)";
			this.#ctx.font = "Normal 30px Lucida Sans Unicode";			
			let tileSize = this.#board.getSize().tileSize;	
			this.#ctx.strokeRect(this.#validAreas.origin.x + tileSize*i, this.#validAreas.origin.y, this.#defaultCoinSize, this.#defaultCoinSize);
			this.#ctx.fillRect(this.#validAreas.origin.x + tileSize*i, this.#validAreas.origin.y, this.#defaultCoinSize, this.#defaultCoinSize);
			this.#ctx.fillStyle = "#F1F1F1";
			this.#ctx.fillText('▼', this.#validAreas.origin.x + tileSize*i+20, this.#validAreas.origin.y+20);
		}
	}

	/*
	Recibe una ficha, toma la posicion de la misma y chequea en que columna la solataron.
	Si la ficha esta en una posion valida se la pasa al tablero junto con la columna correspondiente para que el mismo la agregue.
	Si el tablero la pudo agregar, cambia el turno y elimina la ficha del jugador. Ademas se fija si hay un ganador o empate.
	*/
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
			this.changeState(this.#gameState);
			if (!this.#gameState.hasChips()){
				this.changeState("tie");
				this.draw();
			}
			this.draw();
		}
		if (this.#board.getWinner()){
			this.changeState("win");
			this.draw();
			
		}
		return success;
	}

	// Metodo que se encarga de cambiar el estado del juego, si recice un jugador cambia el turno al otro jugador.
	changeState(currentState){
		switch (currentState) {
			case "tie":
				this.#gameState = currentState;
				this.#drawWinner = true;
				break;
			case "win":
				this.#gameState = currentState;
				this.#drawWinner = true;
				break;
			case "noTime":
				this.#gameState = currentState;
				this.#drawWinner = true;
				break;
			case this.#player1:
				this.#gameState = this.#player2;
				break;
			case this.#player2:
				this.#gameState = this.#player1;
				break;	
			default:
				this.#gameState = null;
				break;
		}
	}
	
	/* 
	Metodo que devuelve si el jugo esta en un estado final
	*/
	ended(){
		return ((this.#gameState != this.#player1) && (this.#gameState != this.#player2))
	}

	getChipSelected(){
		return this.#chipSelected;
	}

	/* 
	Metodo que selecciona un ficha a partir de una posicion x,y. Le delega la responsabilidad de buscar la ficha al jugador de turno.
	*/
	selectChip(x, y){
		if (!this.ended()){
			this.#chipSelected = this.#gameState.getSelected(x, y);
		}
	}

	/* 
	Metodo que devuleve si una posicion x,y esta sobre una ficha del jugador de turno
	*/
	isOverChip(x, y){
		if (!this.ended()){
			return !!this.#gameState.isOverChip(x, y);
		}
	}

	deselectChip(){
		this.#chipSelected.setSelected(false);
		this.#chipSelected = null;
	}

	/* 
	Metodo que cambia entre dibujar al ganador o no. Se usa en caso que se quiera ocultar 
	el panel de ganador para ver el estado final del tablero
	*/
	toggleDrawWinner(){
		if (this.ended()){
			this.#drawWinner = !this.#drawWinner;
			this.draw();
		}
	}

	/* 
	Metodo que resetear el juego mateniendo los parametros que tiene seteados
	*/
	reset(){
		this.#board.reset();
		this.#player1.reset();
		this.#player2.reset();
		this.#gameState = this.#player1;
		this.#drawWinner = false;
		clearInterval(timerID);
		timer();
		this.draw();
	}

	/* 
	Metodo que dibuja el juego; limpia el canvas y llama a los metodos de dibujado de sus componentes.
	*/
	draw(){
		this.clearCanvas();
		this.#board.draw();
		this.drawValidAreas();
		this.#player1.draw();
		this.#player2.draw();
		if ((this.ended()) && (this.#drawWinner)){
			this.#showWinner();
		}
	}

	clearCanvas(){
		this.#ctx.clearRect(0, 0, this.#ctx.canvas.clientWidth, this.#ctx.canvas.clientHeight);
	}

	// Metodo encargado de dibujar el aviso del ganador o empate.
	#showWinner(){
		let winner = this.#board.getWinner();
		// Se crea un elemento de tipo PlayButton al que se le asignan luego los atributos deseados para mostar.
		let winnerChart = new PlayButton(this.#ctx);
		// Se detiene el temporizador.
		clearInterval(timerID);
		var ancho = 600;
		var alto = 300; 
		var posX = (this.#ctx.canvas.clientWidth / 2) - ancho/2;
		var posY = (this.#ctx.canvas.clientHeight / 2)  - alto/2;
		var textPosX = this.#ctx.canvas.clientWidth/2;
		var textPosY = (this.#ctx.canvas.clientHeight / 2);
		// Se dibuja el cuadro donde va a estar los datos.
		winnerChart.roundedRect(posX, posY, ancho,alto,20,"#7B5BCD");
		// Se configuran los estilos que se va a aplicar al texto mostrado.
		this.#ctx.fillStyle = "#F1F1F1";
		this.#ctx.font = "Normal 23px Arial";
		this.#ctx.textAlign = 'center';
		this.#ctx.textBaseline = 'middle';	
		// Depenediendo quien gane, se va a mostrar determinado texto. Idem, si se caba el tiempo o hay empate.	
		if (this.#gameState == "win"){
			var img = new Image();
			img.src = winner.getProfilePic();				
			var winnerName = winner.getName();
			if (winner.getProfilePic().includes('Resistencia')){
				var winnerText1 = "¡El Imperio ha sido derrotado!";
				var winnerText2 = "Larga vida a nuestro heroe...";
			} else {
				var winnerText1 = "¡La Resistencia ha sido derrotada!";
				var winnerText2 = "Larga vida a nuestro heroe...";
			}
		} else if (this.#gameState == "noTime") {
			var img = this.#imgTie;			
			var winnerText1 = "El tiempo se acabo...";
			var winnerText2 = "Ningun bando resulto ganador...";
			var winnerName = "Aunque, siempre habra revancha...";

		} else {
			var img = this.#imgTie;			
			var winnerText1 = "La batalla ha sido dura...";
			var winnerText2 = "Ningun bando resulto ganador...";
			var winnerName = "Aunque, siempre habra revancha...";
		}
		// Se dibuja el avatar en el cuadro.
		this.#ctx.drawImage(img, posX + posX / 4, posY + posY / 2, 200, 200);
		// Se toman las medidas de los textos a mostar para poder calcular la ubicacion de cada uno.
		let winnerText1Width = this.#ctx.measureText(winnerText1).width;
		let winnerText2Width = this.#ctx.measureText(winnerText2).width;
		let winnerNameWidth =  this.#ctx.measureText(winnerName).width;
		this.#ctx.fillText(winnerText1, textPosX + winnerText1Width/3, textPosY - 40 );
		this.#ctx.fillText(winnerText2, textPosX + winnerText2Width/3, textPosY);
		if((winner != false) || (winner == "timerEnd")){
			this.#ctx.fillText(winnerName, (textPosX + ((ancho+150)-textPosX)/3) - winnerNameWidth/2 , textPosY + 40);		
		} else {
			this.#ctx.fillText(winnerName, textPosX + winnerText2Width/3, textPosY + 40);
		}
	}
}