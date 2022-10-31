function drawBackImage() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");                
    var img=new Image();
    img.src = "../img/img-games/img-imperio/CuatroEstrellaPNG.png";
    img.onload = function() {
		var w = canvas.width;
		var h = canvas.height;
        ctx.globalAlpha = 0.2;
		ctx.drawImage( img, 0, 0 ,w, h);
    }
}

