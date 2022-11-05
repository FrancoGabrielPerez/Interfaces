"use strict";
document.addEventListener("DOMContentLoaded", initDrawButton);

let button;

// Funcion encargada de dibujar el boton de jugar en el menu principal.
function drawButton(ctx){
    var ancho = 200;
    var alto = 100; 
    var posX = (ctx.canvas.clientWidth / 2) - ancho / 2;
    var posY =(ctx.canvas.clientHeight / 2) - alto / 2; 
    var textPosX = (ctx.canvas.clientWidth / 2);
    var textPosY = (ctx.canvas.clientHeight / 2);
    button = new PlayButton(ctx, posX, posY, ancho, alto, textPosX, textPosY, "Jugar");
    var fillColor = "#EA7400";
    button.drawNewButton(fillColor);
}

// Inicio de escucha de eventos del mouse.
function initEvent(){
    canvas.onmousedown = mouseDownButton;
    canvas.onmousemove = mouseMoveButton;
}   

// Esta funcion se encarga de escucha el evento onmousedown en el DOM.
function mouseDownButton(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    // Si las coordenadas del click coinciden con las del boton dibujado, se despliega el modal
    // para la configuracion del juego.
    if(button.checkSelected(x,y)){
        document.querySelector('.ModalContainerConfigGame').classList.remove('ocultar');
        document.querySelector('.ModalContainerConfigGame').classList.add('mostrar');
        button.setSelected(true);
    } else {
        button.setSelected(false);       
    }
}

// Esta funcion, hace que cambie el color del boton si el mouse pasa por sobre las coordenadas 
// donde se encuentra dibujado.
function mouseMoveButton(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    if(button.checkSelected(x,y)){
        var fillColor = "#7CD600";
        button.drawNewButton(fillColor);
    } else {
        var fillColor = "#EA7400";
        button.drawNewButton(fillColor);
    }
}

// Metodo que dibuja la imagen del fondo del canvas.
function drawBackImage() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");                
    var img=new Image();
    img.src = "../img/img-games/img-imperio/StarWars.png";
    // Una vez cargada la imagen se manda a dibujar y posterirormente el boton de jugar.
    img.onload = function() {
		var w = canvas.width;
		var h = canvas.height;
        ctx.globalAlpha = 0.4;
		ctx.drawImage( img, 0, 0 ,w, h);
        drawButton(ctx);
    }
}

// Metodo para borrar el canvas.
function clearCanvas(){
    ctx.clearRect(0,0,900,500);
}

// Main function, llama a los metodos de dibujado de back image e inicio de eventos.
function initDrawButton(){
    drawBackImage();
    initEvent();
}

initDrawButton();