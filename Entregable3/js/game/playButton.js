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
    
    constructor(ctx){
        this.#ctx = ctx;
        this.#posX = (this.#ctx.canvas.clientWidth / 2) - PlayButton.#ancho / 2;
        this.#posY = (this.#ctx.canvas.clientHeight / 2) - PlayButton.#alto / 2;        
        this.selected = false;        
    }

    roundedRect(x, y, width, height, radius, ctx, fillColor){
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x , y, x, y + radius);
        ctx.fill();
     }

    drawNewButton(fillColor){
        this.#ctx.beginPath();  
        this.#ctx.globalAlpha = PlayButton.#ctxGlobalAlpha;
        this.roundedRect(this.#posX, this.#posY, PlayButton.#ancho, PlayButton.#alto, PlayButton.#radiousCornerButton, this.#ctx, fillColor);
        this.#ctx.fillStyle = PlayButton.#textButtonFillStyle;
        this.#ctx.font = PlayButton.#buttonFontConfig;
        this.#ctx.textAlign = PlayButton.#textAlign;
        this.#ctx.textBaseline = PlayButton.#textBaseline;
        this.#ctx.fillText (PlayButton.#textButton, this.#ctx.canvas.clientWidth / 2, this.#ctx.canvas.clientHeight / 2);
    }

    checkSelected(x, y){
        return (x > this.#posX && x < this.#posX + PlayButton.#ancho) && (y > this.#posY && y < this.#posY + PlayButton.#alto);
    }

    isSelected(){
        return this.selected;
    }

    setSelected(selected){
        this.selected = selected;
    }

}