"use strict"

class Ficha{
	#centerX;
	#centerY;
	#radius;

	constructor(x,y,r){
		this.centerX=x;
		this.centerY=y;
		this.radius=r;
	}

	drawDefault(context){
		this.drawFilled(context, 'red');
	}

	drawFilled(context, color){
		context.beginPath();
    	context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
    	context.fillStyle = color;
    	context.fill();
		context.stroke();
	}

	isInside(posX, posY){
		if (Math.sqrt(Math.pow(posX - this.centerX,2) + Math.pow(posY - this.centerY,2)) < this.radius)
			return true;
		else
			return false;
	}
}