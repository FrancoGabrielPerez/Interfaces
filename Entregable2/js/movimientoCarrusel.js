"use strict";
/**FUNCION DE MOVIMIENTO DEL CARRUSEL*/
function movimientoCarrusel(e){
    const lado = e.currentTarget.classList[0];
    const variable = e.currentTarget.parentNode.id;
    const fila = document.querySelector(`.contenedor-carrusel-${variable}`);   
    const indicadorActivo = document.querySelector(`.indicadores-${variable} .activo`);
    

    if (lado === "flecha-der") {
        fila.scrollLeft += fila.offsetWidth; 
        if(indicadorActivo != null){
            indicadorActivo.nextSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
       
    } else if (lado === "flecha-izq")   
        {
            fila.scrollLeft -= fila.offsetWidth;
            if(indicadorActivo != null){
                indicadorActivo.previousSibling.classList.add('activo');
                indicadorActivo.classList.remove('activo');
            }
        }        
}

/**PAGINACION */
const variables = document.querySelectorAll('.contenedor-categoria'); /**SE SELECCIONAN TODOS LOS CONTENEDORES CON ID CONTENEDOR-CATEGORIA*/
variables.forEach(variable => paginacion(variable.id));
function paginacion(variable){    
    const fila = document.querySelector(`.contenedor-carrusel-${variable}`);    
    const juegos = document.querySelectorAll(`.juego-${variable}`);
    
    let cantCards = 0;
    if (variable === "recomendado") //SI LA FLECHA CLICKEADA ESTA EN EL CARRUSEL DE RECOMENDADOS, LA DIVISION SE HACE POR UNO, YA QUE SE VA
        cantCards = 1;              //A MOSTRAR UNA SOLA IMAGEN.
    else
        cantCards = 3;
    const nroPaginas = Math.ceil(juegos.length / cantCards);
    for(let i = 0; i < nroPaginas; i++){
        const indicador = document.createElement('button');
        if(i === 0){
            indicador.classList.add('activo');
        }
        document.querySelector(`.indicadores-${variable}`).appendChild(indicador);
        indicador.addEventListener('click', (e) => {
            fila.scrollLeft = i * fila.offsetWidth;
            document.querySelector(`.indicadores-${variable} .activo`).classList.remove('activo');
            e.target.classList.add('activo');
        });
    }
}


/**HOVER: POR CADA JUEGO SE ASIGNA UN EVENLISTENER PARA SABER CUANDO EL MOUSE ESTA SOBRE EL */
variables.forEach(variable => hover(variable.id));
function hover(variable){
    const juegos = document.querySelectorAll(`.juego-${variable}`);
    const fila = document.querySelector(`.contenedor-carrusel-${variable}`); 
    juegos.forEach((juego)=>{
        juego.addEventListener('mouseenter', (e)=>{
            let elemento = e.currentTarget;
            setTimeout(() => { /**DESPUES DEL TIEMPO SETEADO SE APLICA LA CLASE HOVER */
                juegos.forEach(juego => juego.classList.remove('hover'));
                elemento.classList.add('hover');
                console.log(elemento.childNodes[1].childNodes[1].childNodes[7].innerHTML);
                if ((elemento.childNodes[1].childNodes[1].childNodes[1].classList == "indicador-estado-gratis") 
                    || (elemento.childNodes[1].childNodes[1].childNodes[1].classList == "indicador-estado-agregado")) {
                    elemento.childNodes[1].childNodes[1].style.background = "#7CD600";
                    elemento.childNodes[1].childNodes[1].style.borderRadius = "20px";
                    let auxURL = elemento.childNodes[1].childNodes[1].childNodes[5].childNodes[1].id;
                    elemento.childNodes[1].childNodes[1].childNodes[5].style.display = "none";
                    elemento.childNodes[1].childNodes[1].childNodes[7].style.display = "flex";
                    elemento.childNodes[1].childNodes[1].childNodes[7].innerHTML = `<a href=./pages/las-cuatro-estrellas-de-la-muerte.html><h1>Jugar</h1></a>`;
                    //console.log( elemento.childNodes[1].childNodes[1].childNodes[7].innerHTML);
                    }
                else {
                    elemento.childNodes[1].childNodes[1].style.background = "#AE5600";
                    elemento.childNodes[1].childNodes[1].style.borderRadius = "20px";
                    elemento.childNodes[1].childNodes[1].childNodes[5].style.display = "none";
                    elemento.childNodes[1].childNodes[1].childNodes[7].style.display = "flex";
                    elemento.childNodes[1].childNodes[1].childNodes[7].innerHTML = "<h1>Comprar</h1>";
                    console.log( elemento.childNodes[1].childNodes[1].childNodes[7].innerHTML);
                }
            }, 300);
        });
        juego.addEventListener('mouseleave', (e) => { /**CUANDO EL MOUSE SALE, SE QUITA LA CLASE HOVER */
            juegos.forEach(juego => juego.classList.remove('hover'));
            let elemento = e.currentTarget;
            //console.log(elemento.childNodes[1].childNodes[1].childNodes[5]);
            elemento.childNodes[1].childNodes[1].style.backgroundColor = "";
            elemento.childNodes[1].childNodes[1].childNodes[5].style.display = "";
            elemento.childNodes[1].childNodes[1].childNodes[7].innerHTML = "";
            elemento.childNodes[1].childNodes[1].childNodes[7].style.display = "none";
        });
    });            
}
   

/** FUNCION PARA CONSEGUIR LOS LISTENER DE LAS FLECHAS DE ACCION DE LOS CARRUSELES */
const flechas = document.querySelectorAll('.flecha-carrusel');
flechas.forEach(flecha => {        
    //Agregar listener
    flecha.addEventListener("click", movimientoCarrusel);
});

