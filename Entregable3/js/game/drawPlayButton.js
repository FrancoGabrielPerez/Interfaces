var button;
function drawButton(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d'); 
    button = new PlayButton(ctx);
    var fillColor = "#EA7400";
    button.drawNewButton(fillColor);
}

function initEvent(){
    console.log("init button");
    canvas.onmousedown = mouseDownButton;
    canvas.onmousemove = mouseMoveButton;
}

function mouseDownButton(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    if(button.checkSelected(x,y)){
        document.querySelector('.ModalContainerConfigGame').classList.remove('ocultar');
        document.querySelector('.ModalContainerConfigGame').classList.add('mostrar');
        button.setSelected(true);
        //clearCanvas();
    }else{
        button.setSelected(false);       
    }
}

function mouseMoveButton(event){
    let x = event.pageX - event.currentTarget.offsetLeft;
    let y = event.pageY - event.currentTarget.offsetTop;
    if(button.checkSelected(x,y)){
        var fillColor = "#7CD600";
        button.drawNewButton(fillColor);
    }
    else {
        var fillColor = "#EA7400";
        button.drawNewButton(fillColor);
    }
}

function drawBackImage() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");                
    var img=new Image();
    img.src = "../img/img-games/img-imperio/StarWars.png";
    img.onload = function() {
		var w = canvas.width;
		var h = canvas.height;
        ctx.globalAlpha = 0.4;
		ctx.drawImage( img, 0, 0 ,w, h);
        drawButton();
    }

}

function clearCanvas(){
    ctx.clearRect(0,0,900,500);
}

function initDrawButton(){
    drawBackImage();
    //setTimeout(drawButton,100);
    initEvent();
}

initDrawButton();