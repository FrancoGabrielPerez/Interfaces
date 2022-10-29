class Circulo{
    constructor(posX, posY, posX1, posY1,ctx){
        this.posX = posX;
        this.posY = posY;
        this.posX1 = posX1;
        this.posY1 = posY1;
        this.radious = 2 * Math.PI;
        this.ctx = ctx;
        this.selected = false;
    }

 
    checkSelected(coordX, coordY){
        return ((Math.sqrt(Math.pow((this.posX - coordX),2) + Math.pow((this.posY - coordY),2))) > this.radious);
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
        ctx.beginPath();      
        ctx.arc(this.posX, this.posY, this.posX1, this.posY1, this.radious); 
        ctx.fill();          
    }

}
