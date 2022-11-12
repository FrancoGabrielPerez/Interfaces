"use strict"
/** @type {CanvasRenderingContext2D} */

class Chip{
	#startingPos;
	#centerX;
	#centerY;
	#diameter;
	#selected;
	#ctx;
	#player;
	#img;

	constructor(player,x,y,contexto, imgSrc, size){
		this.#player=player;
		this.#img = new Image();
		this.#img.src=imgSrc;
		this.#startingPos = {x:x, y:y};
		this.#centerX=x;
		this.#centerY=y;
		this.#diameter=size;
		this.#selected=false;
		this.#ctx=contexto;
	}

	draw(){
		this.#ctx.beginPath();
		this.#ctx.drawImage(this.#img, this.#centerX-this.#diameter/2, this.#centerY-this.#diameter/2, this.#diameter, this.#diameter);
	}

	isInside(posX, posY){
		return (Math.sqrt(Math.pow(posX - this.#centerX,2) + Math.pow(posY - this.#centerY,2)) < (this.#diameter/2));
	}

	isSelected(){
		return this.#selected;
	}

	setSelected(selected){
		this.#selected = selected;
	}

	move(x,y){
		this.#centerX = x;
		this.#centerY = y; 
	}

	resetPos(){
		this.#centerX = this.#startingPos.x;
		this.#centerY = this.#startingPos.y; 
	}

	getPosition(){
		return {x: this.#centerX,
		y: this.#centerY};
	}

	getPlayer(){
		return this.#player;
	}
}