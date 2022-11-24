'use strict';
document.addEventListener("DOMContentLoaded", timer);

function timer(){
    // Se setea el tiempo inicial en 5 minutos
    var date = new Date('2022-01-01 09:05');   
    // Función para rellenar con ceros
    var padLeft = n => "00".substring(0, "00".length - n.length) + n;	
    // Asignar el intervalo a una variable para poder eliminar el intervale cuando llegue al limite
    timerID = setInterval(() => {
        var hours = padLeft(date.getHours() + "");        
        // Asignar el valor de minutos
        var minutes = padLeft(date.getMinutes() + "");
        // Asignar el valor de segundos
        var seconds = padLeft(date.getSeconds() + "");  
        // Variable para imprimir por pantalla      
        var timer = `${minutes} : ${seconds}`;
        // Restarle a la fecha actual 1000 milisegundos
        document.querySelector('#countdown').innerHTML = `${hours} : ${minutes} : ${seconds}`;
        date = new Date(date.getTime() - 1000);         
        // Si llega a 0:00, se detiene el contador, y se envia el mensaje para que se muestre
        // un aviso de que el tiempo se acabo. Se termina el juego actual como haya quedado.		
        if(minutes == '00' && seconds == '00' ){
            clearInterval(timer);
        }    
    }, 1000);
}