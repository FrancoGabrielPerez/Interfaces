"use strict"
/** @type {CanvasRenderingContext2D} */

class Player{
	#name;
	#avatar;
	#chips;
	#ctx;
	#origin;
	#size;

	constructor(name, profilePic, chipImg, chipSize, amtChips, context, origin, size){
		this.#name = name;
		this.#avatar = profilePic;
		this.#ctx = context;
		this.#origin = origin;
		this.#size = size;
		this.generateChips(chipImg, chipSize, amtChips);
	}

	generateChips(img, chipSize, amount){
		this.#chips = [];
		let firstPosX = this.#origin.x + this.#size.x - chipSize/2;
		let firstPosY = this.#size.y - chipSize/2;
		for(let i = 0, posX = firstPosX, posY = firstPosY; i < amount; i++){
			if (posX-chipSize/2 < this.#origin.x){
				posY -= chipSize+10;
				posX = firstPosX;
			}
			this.#chips.push(new Chip(this, posX, posY, this.#ctx, img, chipSize));
			posX -= 30;
		}
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

	draw(){
		this.#ctx.beginPath();
		this.#ctx.strokeStyle = "white";
		this.#ctx.strokeRect(this.#origin.x, this.#origin.y, this.#size.x, this.#size.y);
		this.#chips.forEach(chip => {
			chip.draw();
		});
	}
}