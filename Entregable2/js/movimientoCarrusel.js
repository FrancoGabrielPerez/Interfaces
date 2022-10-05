document.addEventListener("DOMContentLoaded", carrusel);

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
const variables = document.querySelectorAll('#contenedor-categoria'); /**SE SELECCIONAN TODOS LOS CONTENEDORES CON ID CONTENEDOR-CATEGORIA*/
variables.forEach(variable => paginacion(variable.attributes.name.nodeValue));
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
    /**HOVER: POR CADA JUEGO SE ASIGNA UN EVENLISTENER PARA SABER CUANDO EL MOUSE ESTA SOBRE EL 
    juegos.forEach((juego)=>{
        juego.addEventListener('mouseenter', (e)=>{
            const elemento = e.currentTarget;
            setTimeout(() => { /**DESPUES DEL TIEMPO SETEADO SE APLICA LA CLASE HOVER 
                juegos.forEach(juego => juego.classList.remove('hover'));
                elemento.classList.add('hover');
            }, 300);
        });
    });
    console.log(fila);
    //fila = "carruseles-categorias-recomendado";
    fila.addEventListener('mouseleave', () => { /**CUANDO EL MOUSE SALE, SE QUITA LA CLASE HOVER 
        juegos.forEach(juego => juego.classList.remove('hover'));
    });*/
}

/** FUNCION PARA CONSEGUIR LOS LISTENER DE LAS FLECHAS DE ACCION DE LOS CARRUSELES */
function carrusel(){
    const flechas = document.querySelectorAll('.flecha-carrusel');
    flechas.forEach(flecha => {        
        //Agregar listener
        flecha.addEventListener("click", movimientoCarrusel);
    });
 }
