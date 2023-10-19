// Traemos todos los elementos necesarios del DOM
const registerForm = document.getElementById('register-form');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const mailInput = document.getElementById('mail');
const contraseñaInput = document.getElementById('contraseña');

//////////////////////// FUNCIONES AUXILIARES ////////////////////////////////////
// 

// Nos traemos los usuarios del localStorage o creamos un array vacio si no hay usuarios registrados
const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// Función para guardar los usuarios en el LocalStorage 
const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
};

// Función para chequear si el campo esta vacio
const isEmpty = input => {
    // En JS el cero es un pseudo falso (falsy)
    return !input.value.trim().lenght;
};

// Función para determinar si el largo del value del input esta entre un minimo y un maximo de caracteres
const isBetween = (input, min, max) => {
    // Nos permite ver que los caracteres esten dentro del rango establecido
    return input.value.lenght >= min && input.value.lenght < max;
};

const showError = (input, message) => {
    // Si el input esta vacio, voy y a agarro el elemento padre del input, en este caso ".register-item" y lo guardo en registerItem.
    // Esto es poruqe debemos mostrar campo por campo donde esta el error
    const registerItem = input.parentElement;
    registerItem.classList.remove('success');
    registerItem.classList.add('error');
    const error = registerItem.querySelector('small');
    error.style.display = 'block';
    error.textContent = message;
};

const showSuccess = (input) => {
    const registerItem = input.parentElement;
    registerItem.classList.remove('error');
    registerItem.classList.add('success');
    const error = registerItem.querySelector('small');
    error.textContent = "";
}

// Función para validar una dirección de email con expresiones regulares
const isEmailValid = (input) => {
    const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
    // testeamos
    return re.test(input.value.trim());
};

const isExistingEmail = (input) => {
    return users.some((user) => user.email === input.value)
};

// FUNCIONES DE VALIDACION DE INPUTS // 

const checkTextInput = input => {
    // Seteamos la validez del value en false para empezar (las cosas arrancan sin estar, es decir, vacias)
    let valid = false;
    const minCharacters = 3;
    const maxCharacters = 28;
    // Si el input esta vacio 
    if (isEmpty(input)) {
        showError(input, `Este campo es obligatorio`);
        return
    };

    // No esta entre los caracteres requeridos
    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters}`)
    };
    // Si pasa por ambas validaciones , llamamos a la función de éxito y le cambiamos el estado valid a true
    showSuccess(input);
    valid = true;
    return valid;
};

const checkEmail = (input) => {
    // Seteamos la validez del value en falsa   
    let valid = false;
    if (isEmpty(input)) {
        showError(input, 'El email es obligatorio.');
        return;
    }
    if (!isEmailValid(input)) {
        showError(input, 'El email no es valido.');
        return;
    }
    if (isExistingEmail(input)) {
        showError(input, 'El email ya se encuentra registrado.')
        return;
    }
    // Si pasa por todas las validaciones llamamos a la función de éxito y cambiamos la validación a true
    showSuccess(input);
    valid = true;
    // Lo retornamos para utilizarlo en otra parte
    return valid;
};

// VALIDACION GRAL Y ALMACENAMIENTO DE DATOS //

const validateForm = () => {
    // Evitar el comportamiento por default (SIEMPRE EN LOS FORM)

    // Checkear que todos los inputs sean válidos

    // Si el input es válido, guardo la data 

    // Guardar en Local Storage

    // Feedback al usuario

    // Redirigir al login
};

// Funcion inicializadora para agregar los listeners a los inputs y al form

const init = () => {
    registerForm.addEventListener('submit', validateForm);
    // Validar cada campo por evento
    nombreInput.addEventListener('input', () => checkTextInput(nombreInput));
    apellidoInput.addEventListener('input', () => checkTextInput(apellidoInput));
    mailInput.addEventListener('input', () => checkEmail(mailInput))
};

init();    