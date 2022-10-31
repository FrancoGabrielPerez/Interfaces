var button;
function drawButton(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d'); 
    button = new PlayButton();
    var fillColor = "#EA7400";
    button.drawNewCuadrado(ctx, fillColor);
}

function initEvent(){
    canvas.onmousedown = mouseDown;
    canvas.onmousemove = mouseMove;
}

function mouseDown(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    console.log(x);
    console.log(y);
    if(button.checkSelected(x,y)){
        document.querySelector('.modalContainerMensaje').classList.remove('ocultar');
        document.querySelector('.modalContainerMensaje').classList.add('mostrar');
        button.setSelected(true);
    }else{
        button.setSelected(false);
        console.log("no selected");
       
    }
}

function mouseMove(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d'); 
    console.log("x "+x);
    console.log("y "+y);
    if(button.checkSelected(x,y)){
        var fillColor = "#7CD600";
        button.drawNewCuadrado(ctx, fillColor);
    }
    else {
        var fillColor = "#EA7400";
        button.drawNewCuadrado(ctx, fillColor);
    }
}

function drawBackImage() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");                
    var img=new Image();
    img.src = "../img/img-games/img-imperio/CuatroEstrellaPNG.png";
    img.onload = function() {
		var w = canvas.width;
		var h = canvas.height;
        ctx.globalAlpha = 0.4;
		ctx.drawImage( img, 0, 0 ,w, h);
    }
}

function clearCanvas(){
    ctx.clearRect(0,0,500,500);
}

function init(){
    drawBackImage();
    setTimeout(drawButton,100);
    initEvent();
}

init();