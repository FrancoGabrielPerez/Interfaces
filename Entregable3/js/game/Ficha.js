"use strict"

class Ficha{
	#centerX;
	#centerY;
	#radius;
	#selected;
	#ctx;

	constructor(x,y,r,contexto){
		this.#centerX=x;
		this.#centerY=y;
		this.#radius=r;
		this.#selected=false;
		this.#ctx=contexto;
	}

	drawDefault(){
		this.drawColor('red');
	}

	drawColor(color){
		this.#ctx.beginPath();
    	this.#ctx.arc(this.#centerX, this.#centerY, this.#radius, 0, 2 * Math.PI, false);
    	this.#ctx.fillStyle = color;
    	this.#ctx.fill();
		this.#ctx.stroke();
	}

	isInside(posX, posY){
		return (Math.sqrt(Math.pow(posX - this.#centerX,2) + Math.pow(posY - this.#centerY,2)) < this.#radius);
	}

	isSelected(){
        return this.#selected;
    }

    setSelected(selected){
        this.#selected = selected;
    }

	move(x,y){
        this.posX = x;
        this.posY = y; 
    }
}