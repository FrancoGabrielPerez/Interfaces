"use strict"
/** @type {CanvasRenderingContext2D} */

class Player{
	static #buttonFontConfig = "30px Star Jedi Rounded";
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
			//console.log(i);
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

	getSelected(posX, posY){
		for(let i=this.#chips.length-1; i>=0; i--){
			if (this.#chips[i].isInside(posX, posY)){
				let chipSelected = this.#chips[i];
				chipSelected.setSelected(true);
				this.#chips.splice(i,1);
				this.#chips.push(chipSelected);
				return chipSelected;
			}
		}
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
		this.#ctx.drawImage(img, this.#origin.x + this.#size.x / 2 - 150/2, this.#origin.y + 20, 150,150);
		this.#chips.forEach(chip => {
			chip.draw();
		});
		this.#ctx.font = Player.#buttonFontConfig;
		this.#ctx.fillStyle = Player.#textButtonFillStyle;
		this.#ctx.textAlign = Player.#textAlign;
        this.#ctx.textBaseline = Player.#textBaseline;
        this.#ctx.fillText (this.#name, this.#origin.x + this.#size.x / 2, this.#origin.y + 200);
	}
}