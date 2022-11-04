class PlayButton{
     
   
    static #buttonFontConfig = "30px Star Jedi Rounded";
    static #textButtonFillStyle = "#270977";
    static #radiousCornerButton = 20;
    static #ctxGlobalAlpha = 1;
    static #textAlign = 'center';
    static #textBaseline = 'middle';
    #posX;
    #posY;
    #textPosX;
    #textPosY;
    #ctx;
    #active;
    #alto;
    #ancho;
    #textButton;
    
    constructor(ctx, posX, posY, ancho, alto, textPosX, textPosY, textButton){
        this.#ctx = ctx;
        this.#ancho = ancho;
        this.#alto = alto;   
        this.#posX = posX;
        this.#posY = posY; 
        this.#textPosX = textPosX;
        this.#textPosY = textPosY;       
        this.selected = false;  
        this.#active = true;           
        this.#textButton = textButton;
    }

    roundedRect(x, y, width, height, radius, fillColor){
       // console.log("dibuaja ", fillColor);
        this.#ctx.beginPath();
        this.#ctx.fillStyle = fillColor;
        this.#ctx.moveTo(x, y + radius);
        this.#ctx.lineTo(x, y + height - radius);
        this.#ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        this.#ctx.lineTo(x + width - radius, y + height);
        this.#ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        this.#ctx.lineTo(x + width, y + radius);
        this.#ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        this.#ctx.lineTo(x + radius, y);
        this.#ctx.quadraticCurveTo(x , y, x, y + radius);
        this.#ctx.fill();
     }

    drawNewButton(fillColor){
        if (this.#active){
            this.#ctx.beginPath();  
            this.#ctx.globalAlpha = PlayButton.#ctxGlobalAlpha;
           /*  console.log('x ', this.#posX);
            console.log('y ', this.#posY);
            console.log('alto ', this.#alto);
            console.log('ancho ', this.#ancho); */
            this.roundedRect(this.#posX, this.#posY, this.#ancho, this.#alto, PlayButton.#radiousCornerButton, fillColor);
            this.#ctx.fillStyle = PlayButton.#textButtonFillStyle;
            this.#ctx.font = PlayButton.#buttonFontConfig;
            this.#ctx.textAlign = PlayButton.#textAlign;
            this.#ctx.textBaseline = PlayButton.#textBaseline;
            this.#ctx.fillText (this.#textButton, this.#textPosX, this.#textPosY);
        }
    }

    checkSelected(x, y){
        return (x > this.#posX && x < this.#posX + this.#ancho) && (y > this.#posY && y < this.#posY + this.#alto);
    }

    isSelected(){
        return this.selected;
    }

    enable(){
        this.#active = true;
    }

    disable(){
        this.#active = false;
    }

    setSelected(selected){
        this.selected = selected;
    }

}