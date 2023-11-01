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

// ANIMACION OFER 
// Seleccionamos los elementos a manipular
let animado = document.querySelectorAll('.animado');

// Creamos una función que nos permite detectar la cantidad de scroll que se hace para hacer aparecer los elementos
const mostrarScroll = () => {
    // Variable que me permite conocer la cantidad de scroll que vengo haciendo
    let scrollTop = document.documentElement.scrollTop;

    // Tengo que detectar la distancia que exite entre la ventana y el elemento que quiero hacer aparecer
    for (let i = 0; i < animado.length; i++) {
        // Primero contamos la distancia entre el inicio de la ventana y el elemento a aparecer
        let alturaAnimado = animado[i].offsetTop;
        if (alturaAnimado - 400 < scrollTop) {
            animado[i].style.opacity = 1;
            animado[i].classList.add('mostrarIzquierda');
        }
    }
};

window.addEventListener('scroll', mostrarScroll);




// PRODUCTOS EN OFERTA
// Defino las variables necesarias de los elementos html
const ofertasContainer = document.querySelector('.ofertas-container');
const showMoreBtn = document.querySelector('#showMore');
const categoriesContainer = document.querySelector('#categorias');
const categoriesList = document.querySelectorAll('.category');
const cartBtn = document.querySelector('.cart-label');
const cartMenu = document.querySelector('.cart');
const menuH = document.querySelector('#menu-list');
const menuBtn = document.querySelector('#menu-toggle');
const productsCart = document.querySelector('.cart-container');
const total = document.querySelector('.total')

// Función para renderizar una lista de productos
// Función auxiliar
const createProductTemplate = (product) => {
    // Traemos todos los elementos que tiene el objeto
    const { id, titulo, imagen, precio, oferta } = product;
    return `<div class="card-oferta">
    <div class="card-oferta-top">
        <h3>${titulo}</h3>
        <img src=${imagen} alt=${titulo} class="foto-portada">
    </div>
    <div class="card-oferta-bot">
        <h3>12 CUOTAS SIN INTERÉS <img src="/img/Iconos/tarjeta.svg" alt="tarjeta-de-credito"></h3>
        <p>${precio}</p>
        <span>${oferta}</span>
        <button class="boton-de-oferta" data-id='${id}' data-titulo='${titulo}' data-img='${imagen}'>AGREGAR AL CARRITO</button>
    </div>
</div>`
};

const renderProducts = (productList) => {
    ofertasContainer.innerHTML += productList.map(createProductTemplate).join('')
};

// Función para averiguar si el índice actual renderizado de la lista de productos es igual al límite de productos
const isLastIndexOf = () => {
    return appState.currentProductIndex === appState.productsLimit - 1;
};


// primer chequeo para aplicar el filtro
const isInactiveFilter = (element) => {
    return (element.classList.contains('category')) && !element.classList.contains('active');
}

// Función para aplicar el filtro cuando se clickea el botón de categoria
// Si el botón que se apretó no es un botón de categoría o ya esta activo, no hace nada
const applyFilter = ({ target }) => {
    if (!isInactiveFilter(target)) return;
    changeFilterState(target);
    ofertasContainer.innerHTML = '';
    if (appState.activeFilter) {
        renderFilterProducts();
        appState.currentProductIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};





// Renderizar los productos filtrados
const renderFilterProducts = () => {
    const filterProducts = productsOffer.filter((product) => product.category === appState.activeFilter);
    renderProducts(filterProducts);
}

// cambio el estado del filtro 
const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
};

// Función para cambiar el estado de los botones de categorías
const changeBtnActiveState = (selectedCategory) => {
    // lo guardo en una constante que va ser un array para poder aplicarle un forEach, ya que al seleccionarlo con el querySelecctorAll generamos una HTMLCollection
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove('active');
            return;
        }
        categoryBtn.classList.add('active');
    })
};

// Función para mostrar u ocultar el botón de "ver mas" según corresponda
const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove('hidden');
        return;
    }
    showMoreBtn.classList.add('hidden')
};


// Función para mostrar más productos ante el click del usuario en el botón  "ver más"
const showMoreProducts = () => {
    appState.currentProductIndex += 1;
    let { products, currentProductIndex } = appState;
    renderProducts(products[currentProductIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add('hidden');
    }
};

// Togglear el cart y si el menú esta abierto, lo cierra. Finalmente, muestra el overlay si no habia nada abierto y se esta abriendo el carrito.
const toggleCart = () => {
    // Cuando el usuario haga click, va a tener la clase open-cart
    cartMenu.classList.toggle('open-cart');

    // Chequear si el menu hamburguesa esta abierto, lo cierro y retorno
    if (menuH.classList.contains('open-menu')) {
        menuH.classList.remove('open-menu');
        return;
    };
};







// RENDERIZAR EL CARRITO
// Nuestro carrito sera un arreglo de objetos y tendra una logica parecida al to do list
// Setear el carrito vacio o lo que este en local storage

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Ya tenemos el carrito guardado, ahora hay que armar la lógica del renderizado
// Función para renderizar los productos del carrito 
const renderCart = () => {
    // capturo el lugar donde quiero mostrar el carrito
    if (!cart.length) {
        productsCart.innerHTML = `<p class='empty-msg'> Todavia no hay productos</p>`;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

// Función para crear el template de un producto del carrito
const createCartProductTemplate = (cartProduct) => {
    const { id, titulo, imagen, precio, oferta, quantity } = cartProduct;
    return `
    <div class="cart-item">
    <div class="item-info">
        <img src=${imagen} alt="Producto-carrito">
        <h3 class="item-title">${titulo}</h3>
        <p class="item-bid">Precio actual ${precio}</p>
        <span class="item-price">Precio con descuento ${oferta}</span>
    </div>
    <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
</div>`
};

// Función para mostrar el total de la compra
const showCartTotal = () => {
    //función auxiliar que me traiga el total del carrito
    total.innerHTML = `${getCartTotal().toFixed(2)}`
};

// FUnción para obtener el total de la compra
const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.oferta) * cur.quantity, 0)
};

// Lógica para agregar productos al carrito
// Función para crear un objeto con la info del producto que quiero agregar al carrito o bien agregar una unidad de un producto ya incorporado al carrito
const addProduct = (e) => {
    // Primero mi funcion recibe el evento y despues  
    if (!e.target.classList.contains('boton-de-oferta')) { return };
    // Ahora me voy a guardar el dataser de producto que estoy agregando para luego revisar si existe o no en el carrito
    // Llamo la funcion desestructuradora
    const product = createPoductData(e.target.dataset);
    if (isExistingCartProduct(product)) {
        addUnitProduct(product)
    } else {
        // Creamos el producto en el carrito
        createCartProduct(product);
    }
    updateCartState();
};


// Creamos un objeto con la info del prodcuto que queremos agregar
const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
}



// Función que me va a permitit añadir una unidad al producto que ya tengo en el cart
const addUnitProduct = (product) => {
    cart = cart.map((cartProduct) => cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct);
};

// Función desestructuradora 
const createPoductData = (product) => {
    const { id, titulo, imagen, precio, oferta } = product;
    return { id, titulo, imagen, precio, oferta }
};

// Función que comprueba si el producto ua fue agregado al carrito 
const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
};

// Función de actualización del carro
const updateCartState = () => {
    // Guardar carrito en localStorage
    saveCart();
    // Renderizo el carro
    renderCart();
    // Mostrar el total
    showCartTotal();
};

// Función inicializadora y renderizamos los productos
const init = () => {
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener('click', showMoreProducts);
    categoriesContainer.addEventListener('click', applyFilter);
    cartBtn.addEventListener('click', toggleCart);
    document.addEventListener('DOMContentLoaded', renderCart);
    document.addEventListener('DOMContentLoaded', showCartTotal);
    ofertasContainer.addEventListener('click', addProduct);
};

init();