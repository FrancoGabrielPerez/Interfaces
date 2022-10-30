"use strict"
/** @type {CanvasRenderingContext2D} */

class Tablero{
	#Matriz;
	#Tamaño;

	constructor(tamaño){
		this.#Tamaño=tamaño;
		this.#Matriz=new Array(tamaño);
		for (let i=0; i<this.#Tamaño; i++){
			this.#Matriz[i] = new Array(tamaño);
		}
	}

	agregarFicha(ficha, X, Y){
		this.#Matriz[X][Y]=ficha;
	}

	getAt(X,Y){
		return this.#Matriz[X][Y];
	}
}

let cosa = new Tablero(15);

cosa.agregarFicha("ficha", 3, 4);

console.log(cosa.getAt(1,2));
console.log(cosa.getAt(3,4));