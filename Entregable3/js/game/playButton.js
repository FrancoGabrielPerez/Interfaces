class PlayButton{
    static #ancho = 200;
    static #alto = 100; 
    static #textButton = "Jugar";
    static #buttonFontConfig = "30px Star Jedi Rounded";
    static #textButtonFillStyle = "#270977";
    static #radiousCornerButton = 20;
    static #ctxGlobalAlpha = 1;
    static #textAlign = 'center';
    static #textBaseline = 'middle';
    #posX;
    #posY;
    #ctx;
    #active;
    
    constructor(ctx){
        this.#ctx = ctx;
        this.#posX = (this.#ctx.canvas.clientWidth / 2) - PlayButton.#ancho / 2;
        this.#posY = (this.#ctx.canvas.clientHeight / 2) - PlayButton.#alto / 2;        
        this.selected = false;  
        this.#active = true;      
    }

    roundedRect(x, y, width, height, radius, fillColor){
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
            this.roundedRect(this.#posX, this.#posY, PlayButton.#ancho, PlayButton.#alto, PlayButton.#radiousCornerButton, fillColor);
            this.#ctx.fillStyle = PlayButton.#textButtonFillStyle;
            this.#ctx.font = PlayButton.#buttonFontConfig;
            this.#ctx.textAlign = PlayButton.#textAlign;
            this.#ctx.textBaseline = PlayButton.#textBaseline;
            this.#ctx.fillText (PlayButton.#textButton, this.#ctx.canvas.clientWidth / 2, this.#ctx.canvas.clientHeight / 2);
        }
    }

    checkSelected(x, y){
        return (x > this.#posX && x < this.#posX + PlayButton.#ancho) && (y > this.#posY && y < this.#posY + PlayButton.#alto);
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