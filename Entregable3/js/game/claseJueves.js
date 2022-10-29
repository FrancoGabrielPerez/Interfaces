let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let shapes = [];



function addCirculo(params){
    let circle = new Circulo(50,50,10,0,ctx);
    shapes.push(circle);
}

function drawShapes(ctx){
    clearCanvas();
    shapes.forEach(shape => {
        shape.draw(ctx);
    });
}

function initEvents(){
    canvas.onmousedown = mouseDown;
    canvas.onmousemove = mouseMove;
    canvas.onmouseup = mouseUp;
}

function mouseDown(event){
    let x = event.clientX + event.currentTarget.offsetLeft;
    let y = event.clientY + event.currentTarget.offsetTop;
    if(shapes[0].checkSelected(x,y)){
        shapes[0].setSelected(true);
        
    }else{
        shapes[0].setSelected(false);
       
    }
}

function mouseMove(event){
    let x = event.clientX + event.currentTarget.offsetLeft;
    let y = event.clientY + event.currentTarget.offsetTop;
    if(shapes[0].isSelected){
        shapes[0].move(x,y);    
    }
}

function mouseUp(event){
    shapes[0].setSelected(false);
}

function clearCanvas(){
    ctx.clearRect(0,0,500,500);
}

function init(){
    addCirculo();
    drawShapes(ctx);
    initEvents();
    clearCanvas();
    setInterval(drawShapes(ctx),10);
}
init();