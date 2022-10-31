"use strict"

let tablero = new Tablero(7, 6, 5);
let ficha1 = new Ficha("J1",0,0,null);
let ficha2 = new Ficha("J1",0,0,null);
let ficha3 = new Ficha("J1",0,0,null);
let ficha4 = new Ficha("J1",0,0,null);
let ficha5 = new Ficha("J1",0,0,null);
let ficha6 = new Ficha("J1",0,0,null);
let ficha7 = new Ficha("J1",0,0,null);
let ficha8 = new Ficha("J1",0,0,null);
let ficha9 = new Ficha("J1",0,0,null);
let ficha10 = new Ficha("J1",0,0,null);
let ficha11 = new Ficha("J2",0,0,null);
let ficha12 = new Ficha("J2",0,0,null);
let ficha13 = new Ficha("J2",0,0,null);
let ficha14 = new Ficha("J2",0,0,null);
let ficha15 = new Ficha("J2",0,0,null);
let ficha16 = new Ficha("J2",0,0,null);
let ficha17 = new Ficha("J2",0,0,null);
let ficha18 = new Ficha("J2",0,0,null);
let ficha19 = new Ficha("J2",0,0,null);
let ficha20 = new Ficha("J2",0,0,null);

tablero.printConsole();

/* tablero.agregarFicha(ficha1, 0);
tablero.printConsole();
tablero.agregarFicha(ficha11, 1);
tablero.printConsole();
tablero.agregarFicha(ficha2, 2);
tablero.printConsole();
tablero.agregarFicha(ficha12, 3);
tablero.printConsole();
tablero.agregarFicha(ficha3, 4);
tablero.printConsole();
tablero.agregarFicha(ficha13, 5);
tablero.printConsole();
tablero.agregarFicha(ficha4, 1);
tablero.printConsole();
tablero.agregarFicha(ficha14, 2);
tablero.printConsole();
tablero.agregarFicha(ficha15, 3);
tablero.printConsole();
tablero.agregarFicha(ficha16, 4);
tablero.printConsole();
tablero.agregarFicha(ficha17, 3);
tablero.printConsole();
tablero.agregarFicha(ficha5, 3);
tablero.printConsole();
tablero.agregarFicha(ficha17, 3);
tablero.printConsole();
tablero.agregarFicha(ficha6, 2);
tablero.printConsole();
tablero.agregarFicha(ficha18, 2);
tablero.printConsole();
tablero.agregarFicha(ficha7, 1);
tablero.printConsole();
tablero.agregarFicha(ficha8, 1);
tablero.printConsole();
tablero.agregarFicha(ficha19, 1);
tablero.printConsole(); */

function mostrarGanador(){
	console.log("---------------------------");
	console.log("Ganador");
	console.log("jugador: " + tablero.getGanador());
	tablero.printConsole();
}