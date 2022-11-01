class Coin{
    /** @type {CanvasRenderingContext2D} */
    constructor(posX, posY, radious, posY1,ctx){
        this.posX = posX;
        this.posY = posY;
        this.posY1 = posY1;
        this.radious = radious;
        this.ctx = ctx;
        this.selected = false;
    }
 
    checkSelected(coordX, coordY){
        //console.log((Math.sqrt((coordX - this.posX )*(coordX - this.posX ) + (coordY - this.posY)*(coordY - this.posY))));
        return (((Math.sqrt(Math.pow((coordX - this.posX),2) + Math.pow((coordY - this.posY),2)))) < this.radious);
    }

    isSelected(){
        return this.selected;
    }

    setSelected(selected){
        this.selected = selected;
    }

    move(x,y){
        this.posX = x;
        this.posY = y; 
    }

    draw(){
        var img = new Image();
		img.src = "FichaResistencia-1.png";
        ctx.drawImage(img, this.posX-15, this.posY-15, 30, 30);
    }

}
