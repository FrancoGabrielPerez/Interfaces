"use strict"
/** @type {CanvasRenderingContext2D} */

class Tablero{
	#Matriz;
	#Ancho;
	#Alto;

	constructor(ancho, alto){
		this.#Ancho=ancho;
		this.#Alto=alto;
		this.#Matriz=new Array(this.#Ancho);
		for (let i=0; i<this.#Ancho; i++){
			this.#Matriz[i] = new Array(this.#Alto);
		}
	}

	agregarFicha(ficha, X, Y){
		this.#Matriz[X][Y]=ficha;
	}

	getAt(X,Y){
		return this.#Matriz[X][Y];
	}
}

let cosa = new Tablero(10, 6);

cosa.agregarFicha("ficha", 3, 4);

console.log(cosa.getAt(1,2));
console.log(cosa.getAt(3,4));