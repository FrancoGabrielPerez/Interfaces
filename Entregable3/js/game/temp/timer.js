function timer(){
	var date = new Date('2022-01-01 00:05');
    var canvas = document.getElementById('timerCanvas');
    var ctx = canvas.getContext('2d'); 
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	
    // Función para rellenar con ceros

    var padLeft = n => "00".substring(0, "00".length - n.length) + n;
	//clearInterval(interval);
	// Asignar el intervalo a una variable para poder eliminar el intervale cuando llegue al limite
	//var interval = setInterval(() => {
        // Asignar el valor de minutos
        var minutes = padLeft(date.getMinutes() + "");
        // Asignar el valor de segundos
        var seconds = padLeft(date.getSeconds() + "");  
		// Variable para imprimir por pantalla      
        var timer = `${minutes} : ${seconds}`;
		ctx.font = "30px Star Jedi Rounded";
    	ctx.fillStyle = "#F1F1F1";
		ctx.textAlign = 'center';
    	ctx.textBaseline = 'middle';
		// Se resetea el canvas para que se haga el efecto de cambio en los contadores
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        ctx.fillText(timer, ctx.canvas.clientWidth / 2,ctx.canvas.clientHeight / 2);
        
        // Restarle a la fecha actual 1000 milisegundos
        date = new Date(date.getTime() - 1000);
            
        // Si llega a 0:00, eliminar el intervalo		
        //if(minutes == '00' && seconds == '00' ){
           // clearInterval(interval); 
      //  }    
   // }, 1000);
	
}

class Timer {
	constructor(fn, t) {
		var timerObj = setInterval(fn, t);

		this.stop = function () {
			if (timerObj) {
				clearInterval(timerObj);
				timerObj = null;
			}
			return this;
		};

		// start timer using current settings (if it's not already running)
		this.start = function () {
			if (!timerObj) {
				this.stop();
				timerObj = setInterval(fn, t);
			}
			return this;
		};

		// start with new or original interval, stop current interval
		this.reset = function (newT = t) {
			t = newT;
			return this.stop().start();
		};
	}
}

var contador = new Timer(timer, 10000);
