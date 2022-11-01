'use strict'

let canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext('2d');
let shapes = [];



function addCoin(){
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
}

function drawShapes(){
    clearCanvas();
    shapes.forEach(shape => {
        shape.draw();
    });
}

function initEvents(){
    canvas.onmousedown = mouseDown;
    canvas.onmousemove = mouseMove;
    canvas.onmouseup = mouseUp;
}

function mouseDown(event){
    event.preventDefault();
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    shapes.forEach(shape => {
        if(shape.checkSelected(x,y)){
            shape.setSelected(true);
            let CoinAux = new Coin();
            CoinAux = shape;
            shapes.push(CoinAux);
            //console.log("selected");
        
        }else{
            shape.setSelected(false);
            //console.log(shape);
            
        }
    });
}

function mouseMove(event){
    event.preventDefault();
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    shapes.forEach(shape => {
        if(shape.isSelected()){
            shape.move(x,y);
            //console.log(shapes[0]);   
            drawShapes();
        }
    });
}

function mouseUp(event){
    event.preventDefault();
    shapes.forEach(shape => {
    if (shape.isSelected)
        shape.setSelected(false);
        //console.log("soltado");
    });
}

function clearCanvas(){
    ctx.clearRect(0,0,500,500);
}

function init(){
    initEvents();
    addCoin();
    drawShapes();   
    clearCanvas();
    setInterval(drawShapes,100);
    let playerOne = new Player();
    let coinsPlayerOner = playerOne.addCoin();
    console.log(coinsPlayerOner);
}
init();