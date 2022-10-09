"use strict"
// cuando carga la ventana pos toma el valor donde inicia o 0, y a continuacion hace un scroll
// a la posicion indicada.
window.onload = function(){
    let pos = window.name || 0;
    window.scrollTo(0, 0);
}

// al cerrar la ventana, se asigna el valor de pixeles desplazados en Y o en su defecto la suma de los 
// desplazados por el elemento de la mas los del cuerpo
window.onunload = function(){
    window.name = self.pageYOffset || (document.documentElement.scrollTop + document.body.scrollTop);
}
