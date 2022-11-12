"use strict";
/**FUNCION DE MOVIMIENTO DEL CARRUSEL*/
function movimientoCarrusel(e){
    const lado = e.currentTarget.classList[0];
    const variable = e.currentTarget.parentNode.id;
    const fila = document.querySelector(`.contenedor-carrusel-${variable}`);   
    const indicadorActivo = document.querySelector(`.indicadores-${variable} .activo`);
    if (lado === "flecha-der") {
        fila.scrollLeft += fila.offsetWidth;           
        if(indicadorActivo.nextSibling != null){
            indicadorActivo.nextSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }       
    } else if (lado === "flecha-izq")   
        {
            fila.scrollLeft -= fila.offsetWidth;
            if(indicadorActivo.previousSibling != null){
                indicadorActivo.previousSibling.classList.add('activo');
                indicadorActivo.classList.remove('activo');
            }
        }        
}

/**PAGINACION */
const variables = document.querySelectorAll('.contenedor-categoria'); /**SE SELECCIONAN TODOS LOS CONTENEDORES CON ID CONTENEDOR-CATEGORIA*/
variables.forEach(variable => paginacion(variable.id));
function paginacion(variable){  
    if (variable != "character"){  
        const fila = document.querySelector(`.contenedor-carrusel-${variable}`);    
        const juegos = document.querySelectorAll(`.juego-${variable}`);        
        let cantCards = 0;
        if (variable === "recomendado") //SI LA FLECHA CLICKEADA ESTA EN EL CARRUSEL DE RECOMENDADOS, LA DIVISION SE HACE POR UNO, YA QUE SE VA
            cantCards = 2;              //A MOSTRAR UNA SOLA IMAGEN.
        else
            cantCards = 5;
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
}


/**HOVER: POR CADA JUEGO SE ASIGNA UN EVENLISTENER PARA SABER CUANDO EL MOUSE ESTA SOBRE EL */
variables.forEach(variable => hover(variable.id));
function hover(variable){
    const juegos = document.querySelectorAll(`.juego-${variable}`);
    const fila = document.querySelector(`.contenedor-carrusel-${variable}`); 
    juegos.forEach((juego)=>{
        juego.addEventListener('mouseenter', (e)=>{
            let elemento = e.currentTarget;
            console.log(e);
            setTimeout(() => { /**DESPUES DEL TIEMPO SETEADO SE APLICA LA CLASE HOVER */
                juegos.forEach(juego => juego.classList.remove('hover'));
                elemento.classList.add('hover');
                let subElemento = elemento.childNodes[1].childNodes[1];
                if ((subElemento.childNodes[1].classList == "indicador-estado-gratis") 
                    || (subElemento.childNodes[1].classList == "indicador-estado-agregado")) {
                    subElemento.style.background = "#7CD600";
                    subElemento.style.borderRadius = "8px";
                    let auxURL = subElemento.childNodes[5].childNodes[1].id;
                    subElemento.childNodes[5].style.display = "none";
                    subElemento.childNodes[7].style.display = "flex";
                    subElemento.childNodes[7].innerHTML = "<h3>Jugar</h3>";
                    juego.addEventListener('click', (e)=>{
                        /*La siguiente linea funcionaria cuando esten todos los juegos, por ahora se carga a mano solo el que
                        /*queremos ejecutar*/
                        //subElemento.childNodes[7].innerHTML = `<a href="./pages/${auxURL}.html"><h1>Jugar</h1></a>`; 
                        if (auxURL == "las-cuatro-estrellas-de-la-muerte"){
                            location.href="./pages/las-cuatro-estrellas-de-la-muerte.html";
                        } else {
                            subElemento.childNodes[7].innerHTML = `<h3>Jugar</h3>`;
                        }
                    });
                }
                else if (subElemento.childNodes[1].classList != "indicador-estado-character") {
                    subElemento.style.background = "#AE5600";
                    subElemento.style.borderRadius = "8px";
                    subElemento.childNodes[5].style.display = "none";
                    subElemento.childNodes[7].style.display = "flex";
                    let imgJuego = subElemento.childNodes[3].id;
                    console.log(imgJuego);
                    subElemento.childNodes[7].innerHTML = `<a href='javascript:modalWindow("${imgJuego}")'><h3>Comprar</h3></a>`;
                }
            }, 300);
        });
        juego.addEventListener('mouseleave', (e) => { /**CUANDO EL MOUSE SALE, SE QUITA LA CLASE HOVER */
            juegos.forEach(juego => juego.classList.remove('hover'));
            let elemento = e.currentTarget.childNodes[1].childNodes[1];
            elemento.style.backgroundColor = "";
            elemento.childNodes[5].style.display = "";
            elemento.childNodes[7].innerHTML = "";
            elemento.childNodes[7].style.display = "none";
        });
    });            
}
   

/** FUNCION PARA CONSEGUIR LOS LISTENER DE LAS FLECHAS DE ACCION DE LOS CARRUSELES */
const flechas = document.querySelectorAll('.flecha-carrusel');
flechas.forEach(flecha => {        
    //Agregar listener
    flecha.addEventListener("click", movimientoCarrusel);
});

