"use strict"
/** @type {CanvasRenderingContext2D} */

class Player{
	#buttonFontConfig;
    static #textButtonFillStyle = "#F1F1F1";
	static #textAlign = 'center';
    static #textBaseline = 'middle';
	#name;
	#avatar;
	#chips;
	#ctx;
	#origin;
	#size;
	#currentState;

	constructor(name, profilePic, chipImg, chipSize, amtChips, context, origin, size){
		this.#name = name;
		this.#avatar = profilePic;
		this.#ctx = context;
		this.#origin = origin;
		this.#size = size;
		this.#buttonFontConfig = "30px Distant Galaxy";
		this.#currentState = {chipImg:chipImg, chipSize:chipSize, amtChips:amtChips}
		this.generateChips(chipImg, chipSize, amtChips);
	}

	generateChips(img, chipSize, amount){
		this.#chips = [];
		let firstPosX = this.#origin.x + this.#size.x - chipSize/2;
		let firstPosY = this.#size.y - chipSize/2;
		for(let i=0, posX=firstPosX, posY=firstPosY; i<amount; i++){
			if (posX-chipSize/2 < this.#origin.x){
				posY -= chipSize+10;
				posX = firstPosX;
			}
			this.#chips.push(new Chip(this, posX, posY, this.#ctx, img, chipSize));
			posX -= 10;
		}
	}

	reset(){
		this.generateChips(this.#currentState.chipImg, this.#currentState.chipSize, this.#currentState.amtChips);
	}
	//genera las fichas verticalmente
	/* generateChips(img, size, amount){
		this.#chips = [];
		let posX = this.#origin.x + size/2;
		let posY = this.#size.y - size/2;
		for(let i = 0; i < amount; i++){
			if ((i % 10 == 0) && (i>0)){
				posX += size+10;
				posY = this.#size.y - size/2;
			}
			this.#chips.push(new Chip(this, posX, posY, this.#ctx, img, size));
			posY -= 20;
		}
	} */

	hasChips(){
		return this.#chips.length;
	}

	isOverChip(posX, posY){
		for(let i=this.#chips.length-1; i>=0; i--){
			if (this.#chips[i].isInside(posX, posY)){
				return this.#chips[i];
			}
		}
	}

	getSelected(posX, posY){
		let chipSelected = this.isOverChip(posX, posY);
		if (chipSelected){
			chipSelected.setSelected(true);
			this.#chips.splice(this.#chips.indexOf(chipSelected),1);
			this.#chips.push(chipSelected);
			return chipSelected;
		}
		return false;
	}

	getProfilePic(){
		return this.#avatar;
	}

	removeChip(chip){
		let index = this.#chips.indexOf(chip);
		this.#chips.splice(index,1);
	}

	getName(){
		return this.#name;
	}

	draw(){
		let img = new Image();
		img.src = this.#avatar;
		this.roundedRect(this.#origin.x, this.#origin.y, this.#size.x, this.#size.y, 20,"rgba(158, 158, 158, .4)");
		this.#ctx.drawImage(img, this.#origin.x + this.#size.x / 2 - 150/2, this.#origin.y + 20, 150,150);
		
		this.#ctx.font = this.#buttonFontConfig;
		this.#ctx.fillStyle = Player.#textButtonFillStyle;
		this.#ctx.textAlign = Player.#textAlign;
        this.#ctx.textBaseline = Player.#textBaseline;
		if (this.#ctx.measureText(this.#name).width > this.#size.x)
			this.#buttonFontConfig = "20px Distant Galaxy";
        this.#ctx.fillText (this.#name, this.#origin.x + this.#size.x / 2, this.#origin.y + 200);
		this.#chips.forEach(chip => {
			chip.draw();
		});
	}

	roundedRect(x, y, width, height, radius, fillColor){
        this.#ctx.beginPath();
        this.#ctx.fillStyle = fillColor;
        this.#ctx.moveTo(x, y + radius);
        this.#ctx.lineTo(x, y + height - radius);
        this.#ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        this.#ctx.lineTo(x + width - radius, y + height);
        this.#ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        this.#ctx.lineTo(x + width, y + radius);
        this.#ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        this.#ctx.lineTo(x + radius, y);
        this.#ctx.quadraticCurveTo(x , y, x, y + radius);
        this.#ctx.fill();
     }
}