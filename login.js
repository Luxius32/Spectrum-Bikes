const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-sesion');
const passInput = document.getElementById('pass-login');
const errorMessage = document.getElementById('form__error')

// FUNCIONES AUXILIADES
const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// Función para guardar los usuarios en el LocalStorage 
const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
};

const saveToSessionStorage = (user) => { 
    sessionStorage.setItem('activeUser', JSON.stringify(user));
};

const isEmpty = input => {
    // En JS el cero es un pseudo falso (falsy)
    return !input.value.trim().length;
};

const showError = (message) => {
    errorMessage.textContent = message
};

const isExistingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim());
};

const isMatchingPass = (input) => {
    const user = users.find((user) => user.email === emailInput.value.trim());
    return user.pass === input.value.trim();
};


const isValidAccount = () => {
    let valid = false;
    if (isEmpty(emailInput)) {
        showError('Por favor, complete los campos requeridos');
        return;
    };

    if (!isExistingEmail(emailInput)) {
        showError('El mail ingresado es inválido.');
        return;
    };

    if (isEmpty(passInput)){
        showError('Por favor completa los campos requeridos.');
        return;
    };

    if (!isMatchingPass(passInput)) {
        showError('Los datos ingresados son incorrectos.');
        loginForm.reset();
        return;
    };

    // En este punto el usuario paso todas las validaciones
    alert('Bienvenido nuevamente.');
    valid = true;
    errorMessage.textContent = '';
    loginForm.reset();
    return valid;
};

const login = (e) => {
    e.preventDefault();
    if(isValidAccount()) {
        const user = users.find((user) => user.email === emailInput.value.trim());
        saveToLocalStorage(user);
        window.location.href = 'index.html'
    };
    //Si la cuenta es válida:
    //  traigo al usuario
    // lo guardo en el local storage
    // redirigirlo al home
};


// Función inicializadora para agregar los escuchadores de los elementos del DOM
const init = () => {
    loginForm.addEventListener('submit', login);
};

init();

