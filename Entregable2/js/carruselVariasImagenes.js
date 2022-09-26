
let btnRecIzq = document.getElementById('flecha-izq-recomendado');
btnRecIzq.addEventListener('click', (e)=>{carrusel("recomendado","izq")}, paginacion("recomendado"));

let btnRecDer = document.getElementById('flecha-der-recomendado');
btnRecDer.addEventListener('click', (e)=>{carrusel("recomendado", "der")});

let btnAccIzq = document.getElementById('flecha-izq-accion');
btnAccIzq.addEventListener('click', (e)=>{carrusel("accion", "izq")}, paginacion("accion"));

let btnAccDer = document.getElementById('flecha-der-accion');
btnAccDer.addEventListener('click', (e)=>{carrusel("accion", "der")});

let btnMulIzq = document.getElementById('flecha-izq-multijugador');
btnMulIzq.addEventListener('click', (e)=>{carrusel("multijugador", "izq")}, paginacion("multijugador"));

let btnMulDer = document.getElementById('flecha-der-multijugador');
btnMulDer.addEventListener('click', (e)=>{carrusel("multijugador", "der")});

let btnDepIzq = document.getElementById('flecha-izq-deportes');
btnDepIzq.addEventListener('click', (e)=>{carrusel("deportes", "izq")}, paginacion("deportes"));

let btnDepDer = document.getElementById('flecha-der-deportes');
btnDepDer.addEventListener('click', (e)=>{carrusel("deportes", "der")});


function carrusel(variable, lado){
    const fila = document.querySelector(`.contenedor-carrusel-${variable}`);
    
    /**event listenener flecha derecha */
    const indicadorActivo = document.querySelector(`.indicadores-${variable} .activo`);
    if (lado === "der") {
        fila.scrollLeft += fila.offsetWidth;
        if(indicadorActivo != null){
            indicadorActivo.nextSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    } else if (lado === "izq")   /**event listenener flecha izquierda */
        {
            fila.scrollLeft -= fila.offsetWidth;
            if(indicadorActivo != null){
                indicadorActivo.previousSibling.classList.add('activo');
                indicadorActivo.classList.remove('activo');
            }
        }
}
    /**Paginacion */
function paginacion(variable){
    const fila = document.querySelector(`.contenedor-carrusel-${variable}`);
    const juegos = document.querySelectorAll(`.juego-${variable}`);
    const nroPaginas = Math.ceil(juegos.length / 3);
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

    /**HOVER 
    juegos.forEach((juego)=>{
        juego.addEventListener('mouseenter', (e)=>{
            const elemento = e.currentTarget;
            setTimeout(() => {
                juegos.forEach(juego => juego.classList.remove('hover'));
                elemento.classList.add('hover');
            }, 300);
        });
    });

    fila.addEventListener('mouseleave', () => {
        juegos.forEach(juego => juego.classList.remove('hover'));
    })*/
