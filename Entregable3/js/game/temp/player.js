'use strict'

class Player{
    #shapes;
    Constructor(){
        playing = false;
        this.#shapes= this.generateCoins();
    }

    isPlaying(){
        return this.playing;
    }

    setIsPlaying(valor){
        this.playing = valor;
    }

    generateCoins(){
        let shapes = [];
        let posX = 20;
        let posY = 350;
        for(let j = 0; j < 4; j++){
            for(let i = 0; i < 3; i++){
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