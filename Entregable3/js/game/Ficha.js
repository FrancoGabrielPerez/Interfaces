"use strict"

class Ficha{
	#centerX;
	#centerY;
	#radius;
	#selected;
	#ctx;
	#jugador;

	constructor(jugador,x,y,contexto){
		this.#jugador=jugador;
		this.#centerX=x;
		this.#centerY=y;
		this.#radius=20;
		this.#selected=false;
		this.#ctx=contexto;
	}

	drawDefault(){
		if (this.#jugador == "J1")
			this.drawColor("red");
		else
			this.drawColor("blue");
	}

	drawColor(color){
		this.#ctx.beginPath();
    	this.#ctx.fillStyle = color;
    	this.#ctx.arc(this.#centerX, this.#centerY, this.#radius, 0, 2 * Math.PI, false);
    	this.#ctx.fill();
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
        this.#centerX = x;
        this.#centerY = y;
    }

	getJugador(){
		return this.#jugador;
	}
}