// SLIDER
// Selecciono los elementos del archivo HTML
let slider = document.querySelector('.slider');

// Buscamos cuantas imagenes tenemos en el elemento seleccionado
let images = slider.querySelectorAll('img');
// Establecemos un index para saber en que posicion de imagen estamos y luego establecemos el intervalo para que aparezcan las imagenes
let index = 0;

setInterval(() => {
    // El porcentaje nos permite indicar cuanto se va a mover la imagen, a medida que este disminuya de 100 en 100 el slider se correra a la derecha en el tiempo indicado

    // Definimos la variable percentage para  que este disminuya a medida que la posicion de la imagen determinada por el index se vaya modificando
    let percentage = index * -100;
    slider.style.transform = "translateX(" + percentage + "%)";
    // Luego de esto, incrementamos el index en 1
    index++;
    // Si el index es mayor a la cantidad de imagenes menos 1, el index se resetea
    if (index > (images.length - 1)) {
        index = 0;
    }
}, 5000);

