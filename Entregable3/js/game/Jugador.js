"use strict"
/** @type {CanvasRenderingContext2D} */

class Jugador{
	#name;
	#avatar;
	#coins;
	#context;
	#origin;

	constructor(name, profilePic, coinImg, coinSize, amtCoins, context, origin){
		this.#name = name;
		this.#avatar = profilePic;
		this.#coins = generateCoins(coinImg, coinSize, amtCoins);
		this.#context = context;
		this.#origin = origin;
	}

	generateCoins(img, size, amount){
        this.#coins = [];
        let posX = 20;
        let posY = 350;
        for(let i = 0; i < amount; i++){
			let coin = new Coin(posX, posY, 20, 0, ctx);
			shapes.push(coin);
			posX = posX + 40; 
        }
            posY = posY + 40;
            posX = 20;
        }
        return shapes;
    }
}