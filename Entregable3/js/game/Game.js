"use strict";
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
	#imgTie;
	#imgBackground;

	constructor(tam, player1Name, player2Name, player1Profile, player2Profile, player1Img, player2Img, context){
		this.#imgBackground = new Image();
		this.#imgBackground.src = "../img/img-games/img-imperio/Espacio-4.png";
		this.#imgTie = new Image();	
		this.#imgTie.src = '../img/img-games/img-imperio/DeathStar.png';
		this.#ctx = context;
		tam = parseInt(tam);
		this.#board = new Board(Game.#defaultColumns+tam, Game.#defaultRows+tam, Game.#defaultLine+tam, this.#ctx, this.#defaultCoinSize);
		let playerDrawingSize = {x:(((this.#ctx.canvas.clientWidth-this.#board.getSize().x)/2)-this.#padding), y:this.#ctx.canvas.clientHeight};
		this.#player1 = new Player(player1Name, player1Profile, player1Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:0,y:0}, playerDrawingSize);
		this.#player2 = new Player(player2Name, player2Profile, player2Img, this.#defaultCoinSize, this.#board.getAmountTiles()/2, this.#ctx, {x:(this.#ctx.canvas.clientWidth-playerDrawingSize.x),y:0}, playerDrawingSize);
		this.#playerTurn = this.#player1;
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

	// Metodo que se encarga de cambiar el turno de cada jugado, si hay ganador, empate o se acaba el tiempo,
	// el turno se setea en null.
	changeTurn(turn){
		if (turn == true){
			this.#playerTurn = null;
		} else {
			switch (this.#playerTurn) {
				case this.#player1:
					this.#playerTurn = this.#player2;
					break;
				case this.#player2:
					this.#playerTurn = this.#player1;
					break;			
			}
		}
	}

	// Metodo encargado de dibujar el aviso del ganador o empate.
	showWinner(winner){
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
		if ((winner != false) && (winner != "timerEnd")){
			var img = new Image();
			img.src = winner.getProfilePic();				
			var winnerName = winner.getName();
			if (winner.getProfilePic().includes('Resistencia')){
				var winnerText1 = "¡El Imperio a sido derrotado!";
				var winnerText2 = "Larga vida a nuestro heroe...";
			} else {
				var winnerText1 = "¡La Resistencia a sido derrotada!";
				var winnerText2 = "Larga vida a nuestro heroe...";
			}
		} else if (winner == "timerEnd") {
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
		// Se pone a null al jugador en turno para que el juego se detenga.
		this.changeTurn(true);
	}
	
	getChipSelected(){
		return this.#chipSelected;
	}

	selectChip(x, y){
		if (this.#playerTurn != null){
			this.#chipSelected = this.#playerTurn.getSelected(x, y);
		}
	}

	isOverChip(x, y){
		if (this.#playerTurn != null){
			return !!this.#playerTurn.isOverChip(x, y);
		}
	}

	deselectChip(){
		this.#chipSelected.setSelected(false);
		this.#chipSelected = null;
	}

	reset(){
		this.#board.reset();
		this.#player1.reset();
		this.#player2.reset();
		this.#playerTurn = this.#player1;
		this.draw();
		clearInterval(timerID);
		timer();
	}

	exit(){
		clearCanvas();
		clearInterval(timerID);
		initDrawButton();
	}

	draw(){
		if (this.#board.getWinner()){
			return;
		}
		this.clearCanvas();
		this.#board.draw();
		this.drawValidAreas();
		this.#player1.draw();
		this.#player2.draw();
	}

	/* drawBoardBackImage() {    	
		var w = canvas.width;
		var h = canvas.height;
		this.#ctx.globalAlpha = 1;
		this.#ctx.drawImage(this.#imgBackground, 0, 0 ,this.#ctx.canvas.width, this.#ctx.canvas.height);		
	} */

	clearCanvas(){
		ctx.clearRect(0, 0, this.#ctx.canvas.clientWidth, this.#ctx.canvas.clientHeight);
	}
}

/* let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let upperCanvas = document.getElementById('upperCanvas');
let upperCtx = upperCanvas.getContext('2d');

let currentGame;
let timerID;
let resetButton;
let exitButton;

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
		currentGame.exit();
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
	if (currentGame.isOverChip(x, y)){
		canvas.style.cursor = "grab";
		return;
	}
	canvas.style.cursor = "default";
}

function mouseUp(event){
	let x = event.pageX - event.currentTarget.offsetLeft;
	let y = event.pageY - event.currentTarget.offsetTop;
	if (currentGame.getChipSelected()){
		event.preventDefault();
		let result = currentGame.addChip(currentGame.getChipSelected());
		if (result == false){
			currentGame.getChipSelected().resetPos();
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
			currentGame.changeTurn(true);
			currentGame.showWinner("timerEnd");
        }    
    }, 1000);
}

// Funcion encargada de borrar el canvas.
function clearCanvas(){
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
} */