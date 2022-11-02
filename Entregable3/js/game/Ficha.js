"use strict"
/** @type {CanvasRenderingContext2D} */

class Ficha{
	#centerX;
	#centerY;
	#diameter;
	#selected;
	#ctx;
	#jugador;
	#img;

	constructor(jugador,x,y,contexto, img, tam){
		this.#jugador=jugador;
		this.#img.src=img;
		this.#centerX=x;
		this.#centerY=y;
		this.#diameter=tam;
		this.#selected=false;
		this.#ctx=contexto;
	}

	draw(){
		this.#ctx.beginPath();
    	this.#ctx.drawImage(img, this.#centerX-this.#diameter/2, this.#centerY-this.#diameter/2, this.#diameter, this.#diameter);
		//this.#ctx.stroke();
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

	getJugador(){
		return this.#jugador;
	}
}