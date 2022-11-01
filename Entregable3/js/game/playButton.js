class PlayButton{
    #posX;
    #posY;
    #ancho;
    #alto;
    #ctx;
    
    constructor(ctx){
        this.#ctx= this.ctx;
        this.#posX = ctx.width /2;
        this.#posY = ctx.height / 2;
        this.#ancho = 200;
        this.#alto = 100;
        this.selected = false;
        
    }

    roundedRect(x,y,width,height,radius,ctx,fillColor){
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.moveTo(x,y+radius);
        ctx.lineTo(x,y+height-radius);
        ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
        ctx.lineTo(x+width-radius,y+height);
        ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
        ctx.lineTo(x+width,y+radius);
        ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
        ctx.lineTo(x+radius,y);
        ctx.quadraticCurveTo(x,y,x,y+radius);
        ctx.fill();
     }

    drawNewButton(fillColor){
        this.#ctx.beginPath();  
        this.#ctx.globalAlpha = 1;        
        this.roundedRect(this.#posX, this.#posY, this.#ancho, this.#alto, 20, this.#ctx, fillColor);
        this.#ctx.fillStyle = "#F1F1F1";
        this.#ctx.font = "30px Arial";
        this.#ctx.fillText ("Jugar", 510, 210);
    }

    checkSelected(x, y){
        return (x > this.#posX && x < this.#posX + this.#ancho) && (y > this.#posY && y < this.#posY + this.#alto);
    }

    isSelected(){
        return this.selected;
    }

    setSelected(selected){
        this.selected = selected;
    }

}